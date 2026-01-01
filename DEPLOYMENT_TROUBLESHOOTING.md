# Deployment Troubleshooting - "Reloader Stuck" Issue

## ✅ Code Fix Applied

I've fixed the API URL issue in the code. Now follow these steps:

---

## Critical Checklist

### 1. ✅ Did you set up MongoDB Atlas?

**If NO** - This is the main cause of the stuck issue!

Your backend on Render **CANNOT** connect to your local MongoDB. You MUST set up MongoDB Atlas:

1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP: 0.0.0.0/0 (allow all)
5. Get connection string
6. Update Render environment variable:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/badge-generator?retryWrites=true&w=majority
   ```

**Without MongoDB Atlas, your backend will timeout trying to connect to database!**

---

### 2. ✅ Update Frontend Environment Variable in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add or update:
   ```
   REACT_APP_API_URL=https://your-actual-backend.onrender.com
   ```
   Replace `your-actual-backend` with your real Render URL
3. **Redeploy** after adding the variable

---

### 3. ✅ Push Code Changes

```bash
git add .
git commit -m "Fix API URL for production deployment"
git push origin main
```

Both Render and Vercel should auto-deploy the new code.

---

### 4. ✅ Wait for Render Cold Start

**Important:** Render free tier "sleeps" after 15 min of inactivity.

- First request takes 30-60 seconds to wake up
- This is NORMAL for free tier
- Show a loading message to users

**This is NOT a bug** - it's a free tier limitation.

---

### 5. ✅ Check Render Logs

Go to Render Dashboard → Your Service → Logs

Look for:
- ✅ "Server is running on port 3001"
- ❌ "MongoServerError: connection failed"
- ❌ "ECONNREFUSED"

If you see MongoDB errors, you need to set up MongoDB Atlas (see step 1).

---

### 6. ✅ Test Backend Health Check

Open in browser:
```
https://your-backend.onrender.com/api/health
```

Should return:
```json
{"status":"ok","timestamp":"2026-01-01T..."}
```

If it doesn't load:
- Wait 60 seconds (cold start)
- Check Render logs
- Verify MongoDB Atlas is set up

---

### 7. ✅ Test Frontend

1. Open your Vercel URL
2. Open Browser DevTools (F12) → Network tab
3. Try to verify a profile
4. Look for API calls:
   - Should call: `https://your-backend.onrender.com/api/badges/...`
   - Should NOT call: `http://localhost:3001/...`

If it's calling localhost, the environment variable isn't set in Vercel.

---

## Common Errors and Fixes

### Error: "Request timeout"
**Cause:** MongoDB Atlas not set up OR Render cold start
**Fix:** 
1. Set up MongoDB Atlas
2. Wait 60 seconds for cold start
3. Increase timeout in code (already set to 15s)

### Error: "Failed to fetch"
**Cause:** CORS issue OR wrong backend URL
**Fix:**
1. Verify REACT_APP_API_URL is set in Vercel
2. Check backend CORS settings (should be `app.use(cors())`)
3. Verify backend is running on Render

### Error: "MongoServerError"
**Cause:** MongoDB Atlas not configured
**Fix:** Complete MongoDB Atlas setup (step 1)

### Error: 404 on API calls
**Cause:** Wrong backend URL
**Fix:** Update REACT_APP_API_URL in Vercel to correct Render URL

---

## Priority Order

**DO THIS FIRST:**
1. ✅ Set up MongoDB Atlas (most common issue)
2. ✅ Update MONGODB_URI in Render
3. ✅ Update REACT_APP_API_URL in Vercel
4. ✅ Redeploy both services

**THEN:**
5. Test backend health endpoint
6. Test frontend with DevTools open
7. Check logs if issues persist

---

## Still Stuck?

Share these details:
1. Your Render backend URL
2. Screenshot of Render logs
3. Screenshot of browser console (F12)
4. Did you set up MongoDB Atlas? (Yes/No)
5. Screenshot of Vercel environment variables

---

## Success Checklist

After fixing everything, you should have:
- [ ] MongoDB Atlas cluster created
- [ ] MONGODB_URI set in Render
- [ ] REACT_APP_API_URL set in Vercel
- [ ] Backend health check returns JSON
- [ ] Frontend loads without errors
- [ ] Can verify a LeetCode profile
- [ ] Badges are stored (check MongoDB Atlas)
- [ ] Can view stored badges

---

## Note About Free Tier

**Expected behavior:**
- ✅ First request after 15 min: 30-60s delay (normal)
- ✅ Subsequent requests: Fast (< 1s)
- ✅ Works perfectly after wake up

**This is NOT a bug** - it's how Render free tier works!
