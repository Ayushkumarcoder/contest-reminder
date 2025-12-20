const TelegramBot = require('node-telegram-bot-api');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const token = process.env.TELEGRAM_BOT_TOKEN;
let bot = null;

const startBot = () => {
  if (!token) {
    console.error('TELEGRAM_BOT_TOKEN is not set.');
    return;
  }

  // Polling means the bot fetches updates
  bot = new TelegramBot(token, { polling: true });
  console.log('🤖 Telegram Bot started in Polling mode.');

  // Handle /start <token>
  bot.onText(/\/start (.+)/, async (msg, match) => {
    const chatId = msg.chat.id.toString();
    const connectToken = match[1]; // The captured "token"

    console.log(`📩 Received /start with token: ${connectToken} from chat: ${chatId}`);

    try {
      // Find user with this token
      const user = await prisma.user.findUnique({
        where: { telegramConnectToken: connectToken }
      });

      if (!user) {
        bot.sendMessage(chatId, '❌ Invalid or expired connection token. Please try again from the dashboard.');
        return;
      }

      // Link User
      await prisma.user.update({
        where: { id: user.id },
        data: {
          telegramChatId: chatId,
          telegramConnectToken: null // One-time use
        }
      });

      bot.sendMessage(chatId, `✅ Success! Your account (${user.name || user.email}) is now linked.\nYou will receive reminders for your contests here.`);
      console.log(`🔗 Linked user ${user.email} to Telegram Chat ${chatId}`);

    } catch (error) {
      console.error('Bot Error:', error);
      bot.sendMessage(chatId, '❌ An error occurred while linking your account.');
    }
  });

  // Handle simple /start without token
  bot.onText(/\/start$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Hi! Please use the "Connect Telegram" button on the website to link your account.');
  });
};

/**
 * Send a message to a specific Telegram Chat ID
 * @param {string} chatId 
 * @param {string} text 
 */
const sendTelegramMessage = async (chatId, text) => {
  if (!bot) {
    console.warn('Telegram bot not initialized. Message skipped.');
    return;
  }
  try {
    await bot.sendMessage(chatId, text);
    console.log(`📤 Sent Telegram to ${chatId}: ${text}`);
  } catch (error) {
    console.error(`Failed to send Telegram message to ${chatId}:`, error.message);
  }
};

module.exports = { startBot, sendTelegramMessage };
