# MongoDB Data & Deployment Guide

## View Badge Data in MongoDB

### Option 1: Using MongoDB Compass (GUI - Easiest)

1. **Open MongoDB Compass**
2. **Connect**: Use connection string `mongodb://localhost:27017`
3. **Navigate**: 
   - Click on database: `badge-generator`
   - Click on collection: `user_badges`
4. **View Data**: You'll see all stored badge data with:
   - `username`: LeetCode username
   - `encrypted`: Encrypted badge data
   - `updatedAt`: Last update timestamp

### Option 2: Using MongoDB Shell (CLI)

```bash
# Connect to MongoDB
mongosh

# Switch to badge-generator database
use badge-generator

# View all badge records
db.user_badges.find().pretty()

# View badges for specific user
db.user_badges.find({username: "your_username"}).pretty()

# Count total records
db.user_badges.countDocuments()

# View latest 5 records
db.user_badges.find().sort({updatedAt: -1}).limit(5).pretty()
```

### Option 3: Using PowerShell

```powershell
# Quick check - count records
mongosh --eval "use badge-generator; db.user_badges.countDocuments()"

# View all data
mongosh --eval "use badge-generator; db.user_badges.find().pretty()"
```

---

## Deployment Guide

### Prerequisites for Deployment

1. ✅ MongoDB Atlas account (cloud database)
2. ✅ Hosting service account (Render/Railway/Heroku)
3. ✅ GitHub repository (for deployment)

---

## Step 1: Set Up MongoDB Atlas (Cloud Database)

### Why MongoDB Atlas?
- Local MongoDB only works on your machine
- For public access, you need a cloud database

### Setup Steps:

1. **Sign up**: Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Free Cluster**:
   - Choose "Shared" (Free tier - M0)
   - Select region closest to you
   - Cluster name: `leetcode-badges`
3. **Create Database User**:
   - Database Access → Add New User
   - Username: `badge-admin`
   - Password: Generate secure password (save it!)
   - Privileges: Read and write to any database
4. **Whitelist IP**:
   - Network Access → Add IP Address
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - *For production, restrict to your server IP*
5. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string:
     ```
     mongodb+srv://badge-admin:<password>@leetcode-badges.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Add database name: `...mongodb.net/badge-generator?retryWrites=true...`

---

## Step 2: Deploy Backend to Render (Free)

### Why Render?
- Free tier available
- Easy deployment from GitHub
- Automatic HTTPS
- Good for Node.js apps

### Setup Steps:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Sign up at [render.com](https://render.com)**

3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select your repo

4. **Configure Service**:
   - Name: `leetcode-badge-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server/index.js`
   - Plan: `Free`

5. **Add Environment Variables**:
   - Click "Environment" tab
   - Add variables:
     ```
     MONGODB_URI=mongodb+srv://badge-admin:YOUR_PASSWORD@leetcode-badges.xxxxx.mongodb.net/badge-generator?retryWrites=true&w=majority
     BADGE_ENCRYPTION_KEY=a3f9c2d47e8b5a0169d4e2c7f0b18a6d
     NODE_ENV=production
     PORT=3001
     ```

6. **Deploy**: Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your service URL: `https://leetcode-badge-backend.onrender.com`

7. **Test Backend**:
   ```bash
   curl https://leetcode-badge-backend.onrender.com/api/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

---

## Step 3: Deploy Frontend to Vercel (Free)

### Why Vercel?
- Best for React apps
- Free tier with custom domain
- Automatic deployments from GitHub
- Fast CDN

### Setup Steps:

1. **Update Frontend API URL**:
   - Create `.env.production` in project root:
     ```
     REACT_APP_API_URL=https://leetcode-badge-backend.onrender.com
     ```

2. **Sign up at [vercel.com](https://vercel.com)**

3. **Import Project**:
   - Click "New Project"
   - Import from GitHub
   - Select your repository

4. **Configure Build**:
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

5. **Add Environment Variables**:
   - Add variable:
     ```
     REACT_APP_API_URL=https://leetcode-badge-backend.onrender.com
     ```

6. **Deploy**: Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - Note your URL: `https://your-app.vercel.app`

7. **Test Frontend**:
   - Open your Vercel URL in browser
   - Try verifying a profile
   - Check if badges are stored and retrieved

---

## Alternative: Deploy Everything to Render

If you prefer keeping everything in one place:

### Backend (same as above)

### Frontend on Render:

1. **Create New Static Site**:
   - Name: `leetcode-badge-frontend`
   - Build Command: `npm run build`
   - Publish Directory: `build`

2. **Add Environment Variable**:
   ```
   REACT_APP_API_URL=https://leetcode-badge-backend.onrender.com
   ```

3. **Deploy**

---

## Post-Deployment Checklist

- [ ] Backend health check works
- [ ] MongoDB Atlas connection successful
- [ ] Frontend loads and displays correctly
- [ ] Can verify LeetCode profile
- [ ] Badges are stored in MongoDB Atlas
- [ ] Badges can be retrieved and displayed

---

## Troubleshooting

### Backend Not Connecting to MongoDB Atlas
- Check connection string format
- Verify password is correct (no special characters issues)
- Check IP whitelist in MongoDB Atlas

### Frontend Can't Reach Backend
- Check CORS settings in backend
- Verify `REACT_APP_API_URL` is set correctly
- Check backend logs in Render dashboard

### Badges Not Storing
- Check backend logs for errors
- Verify MongoDB connection in backend logs
- Test `/api/badges/store` endpoint manually

---

## Cost Summary

**Free Tier (Forever):**
- MongoDB Atlas: 512MB storage
- Render Backend: 750 hours/month (sleeps after inactivity)
- Vercel Frontend: Unlimited bandwidth

**Limitations:**
- Backend sleeps after 15 min inactivity (30-60s cold start)
- MongoDB: 512MB limit (~50,000 badge records)

**Paid Options (Optional):**
- Render Starter: $7/mo (no sleep, better performance)
- MongoDB Atlas M10: $10/mo (dedicated cluster)

---

## Migration Summary

**Current (Local):**
- MongoDB: localhost:27017
- Backend: localhost:3001
- Frontend: localhost:3000
- ❌ Not accessible publicly

**After Deployment:**
- MongoDB: Atlas (cloud)
- Backend: Render (public URL)
- Frontend: Vercel (public URL)
- ✅ Accessible from anywhere

---

## Quick Deployment Checklist

1. [ ] Create MongoDB Atlas cluster
2. [ ] Get connection string
3. [ ] Push code to GitHub
4. [ ] Deploy backend to Render
5. [ ] Add environment variables
6. [ ] Test backend health endpoint
7. [ ] Create .env.production
8. [ ] Deploy frontend to Vercel
9. [ ] Test full flow
10. [ ] Celebrate! 🎉
