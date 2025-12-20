# Deployment Guide to Render.com

This guide helps you deploy the **Contest Reminder** app to the internet using Render.com.

## Prerequisites
1.  A [GitHub](https://github.com/) account.
2.  A [Render](https://render.com/) account.

## Steps

### 1. Push to GitHub
Ensure this project is pushed to a repository on GitHub.
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect to Render
1.  Log in to the [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Blueprint**.
3.  Connect your GitHub repository.
4.  Render will detect the `render.yaml` file automatically.
5.  Click **Apply**.

### 3. Configure Environment Variables
Render will ask for values for the "sync: false" variables. You must provide them:

*   `GOOGLE_CLIENT_ID`: From Google Cloud Console.
*   `GOOGLE_CLIENT_SECRET`: From Google Cloud Console.
*   `GOOGLE_REDIRECT_URI`: Update this to **`https://<YOUR-RENDER-APP-NAME>.onrender.com/auth/google/callback`**.
*   `TELEGRAM_BOT_TOKEN`: From BotFather.

### 4. Wait for Build
Render will:
1.  Provision a free PostgreSQL database.
2.  Build the backend and frontend.
3.  Start the server.

### 5. Update Google Console
**Crucial Step**:
1.  Go to [Google Cloud Console](https://console.cloud.google.com/).
2.  Edit your OAuth Client.
3.  Add the new Render URL to **Authorized JavaScript origins**: `https://<YOUR-RENDER-APP-NAME>.onrender.com`
4.  Add the new Callback URL to **Authorized redirect URIs**: `https://<YOUR-RENDER-APP-NAME>.onrender.com/auth/google/callback`

## Verification
Visit your new URL (e.g., `https://contest-reminder.onrender.com`). You should see the Landing Page!
