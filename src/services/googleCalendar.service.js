const { google } = require('googleapis');
const prisma = require('../config/db');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const getAuthenticatedClient = async (user) => {
  if (!user.accessToken) {
    throw new Error('User has no access token');
  }

  oauth2Client.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken,
    // If you saved expiry, you can check it here. 
    // googleapis library handles refresh automatically if refresh_token is present and auto-refresh is enabled?
    // Actually, usually you need to handle refresh token manually if expired, OR let the library do it.
    // The library will attempt to refresh if a refresh token is available and access token is expired/invalid.
  });
  
  // Handle token refresh events from the library if needed to update DB
  // But simpler: just use setCredentials. Ideally, we should check expiry and refresh explicitly.
  // For MVP: Let googleapis handle it, but we need to listen for 'tokens' event to save new tokens?
  // oauth2Client.on('tokens', ...) - this is global.
  
  return google.calendar({ version: 'v3', auth: oauth2Client });
};


/**
 * Inserts an event into the user's primary calendar.
 * @param {object} user - Prisma User object
 * @param {object} contest - Prisma Contest object
 */
const insertEvent = async (user, contest) => {
  try {
    const calendar = await getAuthenticatedClient(user);
    
    const event = {
      summary: `${contest.platform}: ${contest.name}`,
      description: `Contest Link: ${contest.url}\nRated: ${contest.isRated ? 'Yes' : 'No'}`,
      start: {
        dateTime: contest.startTime.toISOString(),
        timeZone: 'UTC', // or contest timezone if stored, but ISO is safe
      },
      end: {
        dateTime: contest.endTime.toISOString(),
        timeZone: 'UTC',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 60 },
          { method: 'popup', minutes: 15 },
        ],
      },
      // Avoid duplicates? Using a unique ID?
      // Google Calendar allows 'id' field, but it must be base32hex. 
      // Simple contest.id (uuid) might violate chars? 
      // Let's rely on allow duplicates for now or use dedupe logic later.
      // Better: Use source + id hashing.
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    console.log(`✅ Event created: ${response.data.htmlLink}`);
    return response.data;
  } catch (error) {
    console.error('Error inserting event:', error);
    throw error;
  }
};

/**
 * Deletes an event from the user's primary calendar.
 * @param {object} user - Prisma User object
 * @param {string} eventId - Google Calendar Event ID
 */
const deleteEvent = async (user, eventId) => {
  try {
    const calendar = await getAuthenticatedClient(user);
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });
    console.log(`🗑️ Event deleted: ${eventId}`);
  } catch (error) {
    console.error('Error deleting event:', error);
    // Be resilient if event already deleted (404/410)
    if (error.code === 404 || error.code === 410) {
      console.warn('Event already deleted or not found, ignoring.');
      return;
    }
    throw error;
  }
};

module.exports = { insertEvent, deleteEvent };
