const express = require('express');
const contestsRouter = require('./routes/contests.route');

const app = express();

const path = require('path');

const session = require('express-session');
const passport = require('./config/passport');
const authRouter = require('./routes/auth.route');
const calendarRouter = require('./routes/calendar.route');
const telegramRouter = require('./routes/telegram.route');
const { startBot } = require('./services/telegram.service');

// Initialize Telegram Bot
if (process.env.TELEGRAM_BOT_TOKEN) {
  startBot();
}

// Middleware
app.use(express.json());
app.use(session({
  secret: 'supersecretkey', // In prod use env
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../client/dist')));

// Routes
app.use('/auth', authRouter);
app.use('/api/contests', contestsRouter);
app.use('/calendar', calendarRouter);
app.use('/api/telegram', telegramRouter);

// Serve React App for any other route (SPA Fallback)
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

module.exports = app;
