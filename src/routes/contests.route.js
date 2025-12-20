const express = require('express');
const prisma = require('../config/db');
const router = express.Router();

// GET /api/contests/calendar.ics
router.get('/calendar.ics', async (req, res) => {
  try {
    const { generateICS } = require('../services/calendar.service');
    
    // Fetch contests (only upcoming? or all watched? usually upcoming watched)
    // Let's fetch ALL upcoming watched contests, or all upcoming if none watched?
    // Strategy: Fetch all upcoming, but highlight watched? 
    // Plan: Fetch upcoming watched + upcoming rated (if filtered).
    // Simplest value add: Fetch all upcoming contests so user has a full calendar.
    // Or strictly watched.
    // Let's stick to "IsWatched" || "IsRated" if filter is on.
    // Actually, widespread practice is to give *all* upcoming contests in calendar feed so user can see them in calendar.
    
    const contests = await prisma.contest.findMany({
      where: {
        startTime: { gte: new Date() }
      },
      orderBy: { startTime: 'asc' }
    });

    const icsContent = await generateICS(contests);

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="contests.ics"');
    res.send(icsContent);
  } catch (error) {
    console.error('Error serving calendar:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET /api/contests/upcoming
router.get('/upcoming', async (req, res) => {
  try {
    const { platform } = req.query;
    
    const where = {};
    if (platform) {
      where.platform = {
        equals: platform,
        mode: 'insensitive' // case insensitive
      };
    }
    
    // Fetch contests where startTime >= now
    const contests = await prisma.contest.findMany({
      where: {
        AND: [
          { startTime: { gte: new Date() } },
          where
        ]
      },
      orderBy: {
        startTime: 'asc'
      }
    });

    res.json(contests);
  } catch (error) {
    console.error('Error fetching contests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/contests/watch-all
router.put('/watch-all', async (req, res) => {
  try {
    // Set isWatched = true for all upcoming contests
    await prisma.contest.updateMany({
      where: {
        startTime: { gte: new Date() }
      },
      data: { isWatched: true }
    });
    res.json({ message: 'All upcoming contests are now being watched.' });
  } catch (error) {
    console.error('Error watching all:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/contests/:id/watch
router.put('/:id/watch', async (req, res) => {
  try {
    const { id } = req.params;
    const { isWatched } = req.body;
    
    const contest = await prisma.contest.update({
      where: { id },
      data: { isWatched }
    });
    
    res.json(contest);
  } catch (error) {
    console.error('Error toggling watch:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
