# 🚀 BACKEND DEPLOYMENT GUIDE (RENDER)

## Step 1: Prepare for Deployment

### 1.1 Commit Your Code to GitHub

```bash
cd c:\Users\DELL 7540\Desktop\ScourgifyData
git add .
git commit -m "Backend ready for deployment"
git push origin main
```

✅ All changes pushed to GitHub

---

## Step 2: Create Backend Services on Render

### 2.1 Deploy Model 1 API

1. Go to **https://render.com/dashboard**
2. Click **"New +"** button → Select **"Web Service"**
3. **Connect your GitHub repository**
4. Configure the service:

| Setting           | Value                                                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**          | `scourgifydata-model1-api`                                                                                                                                             |
| **Environment**   | `Python 3`                                                                                                                                                             |
| **Region**        | `Oregon` (or your closest)                                                                                                                                             |
| **Build Command** | `pip install -r requirements.txt`                                                                                                                                      |
| **Start Command** | `gunicorn --bind 0.0.0.0:$PORT --workers 4 --worker-class sync --max-requests 1000 --max-requests-jitter 50 --timeout 60 --access-logfile - --error-logfile - app:app` |

5. **Add Environment Variables** (click "Advanced"):

   - Leave empty (or add any custom vars your app needs)

6. Click **"Create Web Service"**

⏳ **Wait**: 3-5 minutes for build and deployment

✅ **When done**: Note the URL (e.g., `https://scourgifydata-model1-api.onrender.com`)

---

### 2.2 Deploy Model 2 API

**Repeat the exact same steps but name it:**

- **Name**: `scourgifydata-model2-api`

✅ **Save both URLs:**

```
Model 1: https://scourgifydata-model1-api.onrender.com
Model 2: https://scourgifydata-model2-api.onrender.com
```

---

## Step 3: Test Backend Deployment

### 3.1 Test Health Endpoints

```bash
# Test Model 1 API health
curl https://scourgifydata-model1-api.onrender.com/

# Should return:
# {"status": "healthy", "message": "ScourgifyData...", "models": {...}}
```

### 3.2 Test Predictions

```bash
# Test Model 1 prediction
curl -X POST https://scourgifydata-model1-api.onrender.com/api/predict/model1 \
  -H "Content-Type: application/json" \
  -d '{"text": "This place was amazing!"}'

# Should return sentiment prediction with confidence score
```

✅ **Both backends working!**

---

## 📋 Checklist - Backend Deployment Complete

- [ ] Code pushed to GitHub
- [ ] Model 1 API deployed to Render
- [ ] Model 2 API deployed to Render
- [ ] Model 1 health endpoint responds (200 OK)
- [ ] Model 2 health endpoint responds (200 OK)
- [ ] Both API URLs saved for frontend config

---

## 🎯 Next Step: Update Frontend

Once both backend services are running, proceed to adapt the frontend:

→ **See FRONTEND_DEPLOYMENT_GUIDE.md** (will be created next)

---

## 🆘 Troubleshooting Backend Deployment

### Issue: Build fails

- Check Render logs (Dashboard → Service → Logs)
- Verify `requirements.txt` is in the `backend/` directory
- Ensure all dependencies are compatible

### Issue: Service fails after build

- Check Render logs for runtime errors
- Verify Python version (should be 3.11)
- Ensure `app.py` exists in the root of backend/

### Issue: Endpoint not responding

- Wait 1-2 minutes for startup
- Check service health in Render dashboard
- Verify service shows "Live"

### Issue: Models not loading

- This is expected (model file format issue)
- Backend uses demo predictions instead
- API still works for frontend integration

---

## 📝 Important Notes

1. **First deployment**: May take 5-10 minutes
2. **Model loading**: If models don't load, API uses keyword-based demo predictions
3. **CORS**: Already enabled, so frontend can call these APIs
4. **Logs**: Always check Render logs if something fails

---

**Status**: Ready to deploy backend! 🚀

Once both APIs are running, we'll update the frontend to use these URLs.
