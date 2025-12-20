const express = require('express');
const router = express.Router();
const prisma = require('../config/db');
// const { insertEvent } = require('../services/googleCalendar.service');

const { insertEvent, deleteEvent } = require('../services/googleCalendar.service');

// Middleware to check auth
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

// POST /calendar/sync/:contestId (Sync Individual)
router.post('/sync/:contestId', isAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    const { contestId } = req.params;

    const contest = await prisma.contest.findUnique({ where: { id: contestId } });
    if (!contest) return res.status(404).json({ error: 'Contest not found' });

    // Check existing mapping
    let userContest = await prisma.userContest.findUnique({
      where: { userId_contestId: { userId: user.id, contestId } }
    });

    if (userContest?.syncCalendar) {
      return res.json({ message: 'Already synced', status: 'skipped' });
    }

    // Insert to Google Calendar
    const event = await insertEvent(user, contest);
    
    // Update DB
    await prisma.userContest.upsert({
      where: { userId_contestId: { userId: user.id, contestId } },
      update: {
        syncCalendar: true,
        calendarEventId: event.id,
      },
      create: {
        userId: user.id,
        contestId: contestId,
        syncCalendar: true,
        calendarEventId: event.id,
        notify: true
      }
    });

    res.json({ message: 'Synced successfully', eventId: event.id, status: 'success' });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /calendar/sync (Bulk Sync - Smart)
router.post('/sync', isAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    
    // Fetch upcoming contests
    // Logic: Sync all upcoming that are NOT explicitly disabled (syncCalendar: false)
    // For now, let's sync ALL upcoming contests that haven't been synced yet.
    const contests = await prisma.contest.findMany({
      where: { startTime: { gte: new Date() } }
    });

    const results = [];
    for (const contest of contests) {
      try {
        // Check if already synced
        const existing = await prisma.userContest.findUnique({
          where: { userId_contestId: { userId: user.id, contestId: contest.id } }
        });

        if (existing?.syncCalendar) {
          results.push({ id: contest.id, status: 'already_synced' });
          continue;
        }

        // Insert
        const event = await insertEvent(user, contest);

        // Update DB
        await prisma.userContest.upsert({
          where: { userId_contestId: { userId: user.id, contestId: contest.id } },
          update: {
            syncCalendar: true,
            calendarEventId: event.id,
          },
          create: {
            userId: user.id,
            contestId: contest.id,
            syncCalendar: true,
            calendarEventId: event.id,
            notify: true
          }
        });
        results.push({ id: contest.id, status: 'success' });
      } catch (err) {
        console.error(`Failed to sync ${contest.id}:`, err.message);
        results.push({ id: contest.id, status: 'failed', error: err.message });
      }
    }

    res.json({ message: 'Bulk sync complete', results });
  } catch (error) {
    console.error('Bulk sync error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /calendar/sync/:contestId (Unsync Individual)
router.delete('/sync/:contestId', isAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    const { contestId } = req.params;

    const userContest = await prisma.userContest.findUnique({
      where: { userId_contestId: { userId: user.id, contestId } }
    });

    if (!userContest || !userContest.calendarEventId) {
      return res.json({ message: 'Not synced or no event ID found', status: 'skipped' });
    }

    // Delete from Google Calendar
    await deleteEvent(user, userContest.calendarEventId);

    // Update DB
    await prisma.userContest.update({
      where: { userId_contestId: { userId: user.id, contestId } },
      data: {
        syncCalendar: false,
        calendarEventId: null
      }
    });

    res.json({ message: 'Unsynced successfully', status: 'success' });
  } catch (error) {
    console.error('Unsync error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
