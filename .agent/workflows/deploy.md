---
description: how to deploy the application to Render.com
---

# Deployment Workflow for Contest Reminder App

This workflow guides you through deploying the Contest Reminder application to Render.com (or other platforms).

## Prerequisites Checklist

Before deploying, ensure you have:

- [ ] A [GitHub](https://github.com/) account with this project pushed to a repository
- [ ] A [Render.com](https://render.com/) account (free tier is sufficient)
- [ ] Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Telegram Bot Token from [BotFather](https://t.me/botfather)

---

## Deployment Steps

### 1. Prepare Your Repository

Ensure all changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

> **Note**: If you don't have a GitHub repository yet, create one and push your code:
> ```bash
> git init
> git add .
> git commit -m "Initial commit"
> git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
> git push -u origin main
> ```

---

### 2. Deploy to Render Using Blueprint

1. **Log in** to [Render Dashboard](https://dashboard.render.com/)

2. **Create New Blueprint**:
   - Click **New +** → **Blueprint**
   - Connect your GitHub account if not already connected
   - Select your `contest-reminder` repository
   - Render will automatically detect the `render.yaml` file

3. **Apply Blueprint**:
   - Click **Apply** to create all services defined in `render.yaml`
   - This will create:
     - PostgreSQL database (`contest-reminder-db`)
     - Web service (`contest-reminder-api`)

---

### 3. Configure Environment Variables

Render will prompt you to provide values for the following environment variables:

| Variable | Where to Get It | Example Value |
|----------|-----------------|---------------|
| `GOOGLE_CLIENT_ID` | Google Cloud Console → APIs & Services → Credentials | `470776098046-xxxxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Same as above | `GOCSPX-xxxxxxxxxxxxxxxx` |
| `GOOGLE_REDIRECT_URI` | Your Render app URL + callback path | `https://YOUR-APP-NAME.onrender.com/auth/google/callback` |
| `TELEGRAM_BOT_TOKEN` | BotFather on Telegram | `123456789:ABCdefGHIjklMNOpqrsTUVwxyz` |

> **Important**: The `GOOGLE_REDIRECT_URI` must match your actual Render deployment URL. You'll get this URL after Render deploys your app.

**How to set variables in Render**:
- During blueprint creation, Render will ask for these values
- OR go to your service → **Environment** tab → Add/Edit variables

---

### 4. Update Google OAuth Settings

**Critical Step** - Your deployment won't work without this:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Add the following to **Authorized JavaScript origins**:
   ```
   https://YOUR-APP-NAME.onrender.com
   ```
5. Add the following to **Authorized redirect URIs**:
   ```
   https://YOUR-APP-NAME.onrender.com/auth/google/callback
   ```
6. Click **Save**

> Replace `YOUR-APP-NAME` with your actual Render service name (e.g., `contest-reminder-api`)

---

### 5. Monitor Deployment

1. **Watch the Build Logs**:
   - In Render Dashboard, click on your service
   - Go to **Logs** tab
   - Monitor for successful build and deployment

2. **Expected Build Steps**:
   ```
   Installing dependencies...
   Building client...
   Running Prisma migrations...
   Starting server...
   ```

3. **Deployment usually takes 3-5 minutes**

---

### 6. Verify Deployment

Once deployed, verify everything works:

1. **Visit your app**: `https://YOUR-APP-NAME.onrender.com`

2. **Test the following**:
   - [ ] Landing page loads successfully
   - [ ] Google OAuth login works
   - [ ] Dashboard displays contests
   - [ ] Telegram notifications can be configured
   - [ ] Calendar export functionality works

3. **Check Database**:
   - Ensure Prisma migrations ran successfully
   - Verify contests are being fetched and stored

---

## Alternative Deployment Options

### Option A: Deploy to Railway

1. Sign up at [Railway.app](https://railway.app/)
2. Create new project → Deploy from GitHub repo
3. Add PostgreSQL database
4. Configure environment variables (same as above)
5. Railway will auto-deploy on push

### Option B: Deploy to Vercel + External Database

**Note**: Vercel is primarily for frontend/serverless. For this full-stack app with cron jobs, Render or Railway is recommended.

If you still want to use Vercel:
1. You'll need to provision a PostgreSQL database separately (e.g., Neon, Supabase)
2. Convert cron jobs to Vercel Cron (requires paid plan)
3. Deploy using `vercel` CLI

### Option C: Deploy to Your Own VPS (Advanced)

1. Get a VPS (DigitalOcean, Linode, AWS EC2)
2. Install Node.js and PostgreSQL
3. Clone your repository
4. Set up environment variables
5. Use PM2 to keep the app running:
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name contest-reminder
   pm2 save
   pm2 startup
   ```

---

## Post-Deployment Maintenance

### Monitor Your App

- Check Render logs regularly for errors
- Set up uptime monitoring (e.g., UptimeRobot)
- Monitor database usage (free tier has 1GB limit)

### Update Environment Variables

If you need to change env vars after deployment:
1. Go to Render Dashboard → Your Service → **Environment**
2. Edit the variable
3. Service will auto-redeploy

### Deploy Updates

Every time you push to your GitHub repository's main branch:
1. Render will automatically detect the change
2. Rebuild and redeploy your app
3. Monitor logs to ensure successful deployment

---

## Troubleshooting Common Issues

### Issue: "Database connection failed"
**Solution**: Check that `DATABASE_URL` is correctly set. Render should auto-populate this from the database service.

### Issue: "Google OAuth error"
**Solution**: Verify redirect URIs in Google Cloud Console match your Render URL exactly.

### Issue: "Telegram bot not responding"
**Solution**: Check `TELEGRAM_BOT_TOKEN` is correctly set and the bot is active.

### Issue: "Build fails during client build"
**Solution**: Check client dependencies and ensure build script works locally first.

### Issue: "Cron jobs not running"
**Solution**: Free tier on Render may spin down when inactive. Consider upgrading or using external cron service.

---

## Cost Estimate

**Render Free Tier**:
- ✅ PostgreSQL Database: Free (1GB storage, limited to 1 month data retention)
- ✅ Web Service: Free (512MB RAM, spins down after 15 min inactivity)
- ⚠️ Limitations: Apps spin down when inactive, 750 hours/month free

**Paid Options** (if you need 24/7 uptime):
- Render Starter: $7/month per service
- Database: $7/month for persistent PostgreSQL

---

## Security Checklist

Before going to production:

- [ ] Never commit `.env` file to GitHub
- [ ] Use strong `SESSION_SECRET` (Render auto-generates this)
- [ ] Regularly rotate API keys and tokens
- [ ] Enable HTTPS (Render provides this automatically)
- [ ] Set up proper CORS if needed
- [ ] Review Google OAuth scopes

---

## Need Help?

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com/
- **Your existing guide**: Check `/DEPLOY.md` in this repository
