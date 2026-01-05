# 🎨 FRONTEND ADAPTATION GUIDE

## Once Your Backend is Deployed

After deploying both Model 1 and Model 2 APIs to Render, update the frontend to use those URLs.

---

## Step 1: Update Frontend Environment Variables

### 1.1 Update `.env.production`

Open: `frontmodels/models/.env.production`

Replace with your actual deployed URLs:

```env
VITE_API_URL=https://scourgifydata-model1-api.onrender.com
```

**Example (with real URLs):**

```env
VITE_API_URL=https://scourgifydata-model1-api-abc123.onrender.com
```

✅ Save the file

---

## Step 2: Create Separate Model URLs (Optional)

If you want to use both models separately, update the frontend components:

### 2.1 Update Model1Tester.jsx

Open: `frontmodels/models/src/pages/Model1Tester.jsx`

The component already uses:

```javascript
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const response = await fetch(`${apiUrl}/api/predict/model1`, {
```

This will automatically use your Render API!

### 2.2 Update Model2Tester.jsx

Open: `frontmodels/models/src/pages/Model2Tester.jsx`

The component already uses:

```javascript
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const response = await fetch(`${apiUrl}/api/predict/model2`, {
```

This will also use your Render API!

---

## Step 3: Test Frontend Locally

Before deploying frontend, test it locally:

```bash
cd frontmodels/models

# Test with local backend (if still running)
set VITE_API_URL=http://localhost:5000
npm run dev

# Or test with deployed backend
set VITE_API_URL=https://scourgifydata-model1-api.onrender.com
npm run dev
```

Visit: `http://localhost:5173`

✅ Test Model 1 and Model 2 prediction

---

## Step 4: Build Frontend

```bash
cd frontmodels/models

# Build for production
npm run build

# Output will be in: frontmodels/models/dist/
```

✅ Build succeeds with no errors

---

## Step 5: Deploy Frontend to Render

1. Go to **https://render.com/dashboard**
2. Click **"New +"** → **"Static Site"**
3. **Connect your GitHub repository**
4. Configure:

| Setting                   | Value                                                        |
| ------------------------- | ------------------------------------------------------------ |
| **Name**                  | `scourgifydata-frontend`                                     |
| **Build Command**         | `cd frontmodels/models && npm install && npm run build`      |
| **Publish Directory**     | `frontmodels/models/dist`                                    |
| **Environment Variables** | Add these:                                                   |
|                           | `VITE_API_URL=https://scourgifydata-model1-api.onrender.com` |

5. Click **"Create Static Site"**

⏳ **Wait**: 2-3 minutes for deployment

✅ **When done**: Note the frontend URL (e.g., `https://scourgifydata-frontend.onrender.com`)

---

## Step 6: Test Complete Deployment

### 6.1 Test Frontend

Open: `https://scourgifydata-frontend.onrender.com`

- [ ] Page loads without errors
- [ ] Navigation works
- [ ] Can access Model 1 page
- [ ] Can access Model 2 page

### 6.2 Test Model 1 Prediction

1. Click "Model 1" in navigation
2. Enter text: `"This place was amazing!"`
3. Click "Predict Sentiment"
4. Should see: Sentiment result with confidence score

✅ Works!

### 6.3 Test Model 2 Prediction

1. Click "Model 2" in navigation
2. Enter text: `"This was terrible!"`
3. Click "Predict Sentiment"
4. Should see: Sentiment result with confidence score

✅ Works!

### 6.4 Check Browser Console

Open DevTools (F12):

- [ ] No CORS errors
- [ ] No 404 errors
- [ ] No 500 errors
- [ ] All API calls successful

---

## 📋 Complete Checklist

### Backend ✅

- [ ] Model 1 API deployed to Render
- [ ] Model 2 API deployed to Render
- [ ] Both health endpoints return 200 OK
- [ ] Both prediction endpoints work

### Frontend Configuration ✅

- [ ] `.env.production` updated with API URL
- [ ] Model1Tester.jsx reads from env
- [ ] Model2Tester.jsx reads from env
- [ ] Local testing works

### Frontend Deployment ✅

- [ ] Frontend built successfully
- [ ] Frontend deployed to Render
- [ ] Frontend loads without errors
- [ ] API calls work from frontend

### Testing ✅

- [ ] Model 1 predictions work
- [ ] Model 2 predictions work
- [ ] No console errors
- [ ] No network errors

---

## 🎯 Final URLs

Save these URLs (you'll need them!):

```
Backend API 1: https://scourgifydata-model1-api.onrender.com
Backend API 2: https://scourgifydata-model2-api.onrender.com
Frontend:      https://scourgifydata-frontend.onrender.com
```

---

## 🆘 Troubleshooting

### Issue: Frontend shows "Cannot reach API"

**Solution**:

- Verify API URL in `.env.production`
- Check Render backend service is "Live"
- Wait 1-2 minutes for backend to fully start

### Issue: CORS error in console

**Solution**:

- Backend CORS is enabled
- Check API URL is correct (no trailing slash)
- Verify backend is responding to OPTIONS requests

### Issue: Build fails on Render

**Solution**:

- Check Render logs
- Verify Node.js version (18+)
- Ensure `npm install` works locally

### Issue: Predictions return errors

**Solution**:

- Check backend logs on Render
- Try the API directly with curl
- Verify request format (JSON with "text" field)

---

## ✨ Success Indicators

You'll know everything works when:

✅ Frontend loads at Render URL  
✅ Can navigate to Model 1 and Model 2  
✅ Predictions return sentiment + confidence  
✅ No errors in browser console  
✅ No network errors in DevTools  
✅ Both models work independently

---

## 🎉 YOU'RE LIVE!

Once all tests pass, your complete application is live on Render!

- Frontend: `https://scourgifydata-frontend.onrender.com`
- Model 1 API: `https://scourgifydata-model1-api.onrender.com`
- Model 2 API: `https://scourgifydata-model2-api.onrender.com`

Share the frontend URL and start using it! 🚀

---

## 📝 Next Steps

1. Share the frontend URL with others
2. Monitor Render logs for any issues
3. Consider upgrading to paid tier if needed
4. Add more features/models as desired
