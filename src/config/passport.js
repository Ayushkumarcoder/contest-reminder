const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const prisma = require('./db');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const googleId = profile.id;
      const name = profile.displayName;

      let user = await prisma.user.findUnique({ where: { googleId } });

      if (!user) {
        // Create new user
        user = await prisma.user.create({
          data: {
            googleId,
            email,
            name,
            accessToken,
            refreshToken, // May be undefined if not first time consent, handled logic below?
            // Google only sends refresh token on first consent. We might want to force it or handle updates.
          }
        });
      } else {
        // Update tokens
        const dataToUpdate = { accessToken };
        if (refreshToken) {
            dataToUpdate.refreshToken = refreshToken;
        }
        
        user = await prisma.user.update({
          where: { id: user.id },
          data: dataToUpdate
        });
      }

      done(null, user);
    } catch (err) {
      console.error('Passport Error', err);
      done(err, null);
    }
  }
));

module.exports = passport;
