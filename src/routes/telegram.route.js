const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware to check auth
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

// GET /api/telegram/link
// Generate a unique token for the user to start the bot with
router.get('/link', isAuthenticated, async (req, res) => {
  try {
    console.log('🔗 /api/telegram/link hit by user:', req.user.id);
    const user = req.user;
    const token = uuidv4();
    console.log('🎫 Generated token:', token);

    // Store token in DB
    await prisma.user.update({
      where: { id: user.id },
      data: { telegramConnectToken: token }
    });
    console.log('💾 Token saved to DB');

    // Use the bot username from env or default to the user's specific bot
    const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'coding_contest_reminder_bot';
    
    const link = `https://t.me/${botUsername}?start=${token}`;
    res.json({ link, token });
  } catch (error) {
    console.error('❌ Error generating telegram link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/telegram/status
// Check if user is connected
router.get('/status', isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { telegramChatId: true }
    });
    
    res.json({ 
      connected: !!user.telegramChatId,
      chatId: user.telegramChatId 
    });
  } catch (error) {
    console.error('Error checking status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
