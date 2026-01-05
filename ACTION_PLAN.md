# 📋 ACTION PLAN - DEPLOY BACKEND, THEN FRONTEND

## Phase 1: Deploy Backend (30 mins)

### ✅ Prerequisites

- [x] Code is on GitHub
- [x] Backend ready (`app.py`, `requirements.txt`, `Procfile`)
- [x] Render account active
- [ ] You have the time (30 mins)

### 📝 Task 1: Deploy Model 1 API

**Time**: 5 mins setup + 5 mins wait = 10 mins

```
1. Go to: https://render.com/dashboard
2. Click: New → Web Service
3. Connect GitHub repo
4. Fill in these values:
   Name: scourgifydata-model1-api
   Environment: Python 3
   Build: pip install -r requirements.txt
   Start: gunicorn --bind 0.0.0.0:$PORT --workers 4 --worker-class sync --max-requests 1000 --max-requests-jitter 50 --timeout 60 --access-logfile - --error-logfile - app:app
5. Click: Create Web Service
6. Wait: 3-5 minutes
7. Save: The URL (will look like: https://scourgifydata-model1-api-xxxx.onrender.com)
```

✅ Model 1 deployed!

### 📝 Task 2: Deploy Model 2 API

**Time**: 5 mins setup + 5 mins wait = 10 mins

```
1. Click: New → Web Service (again)
2. Same steps as Task 1, but:
   Name: scourgifydata-model2-api
3. Wait: 3-5 minutes
4. Save: The URL
```

✅ Model 2 deployed!

### 📝 Task 3: Test Backend

**Time**: 2 mins

```
1. Test Model 1:
   curl https://scourgifydata-model1-api-xxxx.onrender.com/
   Should see: {"status": "healthy", ...}

2. Test Model 2:
   curl https://scourgifydata-model2-api-xxxx.onrender.com/
   Should see: {"status": "healthy", ...}
```

✅ Both backends working!

---

## Phase 2: Adapt & Deploy Frontend (30-40 mins)

### 📝 Task 4: Update Frontend Config

**Time**: 3 mins

```
1. Open: frontmodels/models/.env.production
2. Replace the URL:
   VITE_API_URL=https://scourgifydata-model1-api-xxxx.onrender.com
   (Use your actual URL from Task 1)
3. Save the file
4. Commit to GitHub:
   git add .
   git commit -m "Update frontend API URL for production"
   git push origin main
```

✅ Frontend configured!

### 📝 Task 5: Deploy Frontend to Render

**Time**: 5 mins setup + 3 mins wait = 8 mins

```
1. Go to: https://render.com/dashboard
2. Click: New → Static Site
3. Connect GitHub repo
4. Fill in:
   Name: scourgifydata-frontend
   Build: cd frontmodels/models && npm install && npm run build
   Publish: frontmodels/models/dist
5. Add Environment Variable:
   VITE_API_URL=https://scourgifydata-model1-api-xxxx.onrender.com
6. Click: Create Static Site
7. Wait: 2-3 minutes
8. Save: The URL (will look like: https://scourgifydata-frontend-xxxx.onrender.com)
```

✅ Frontend deployed!

### 📝 Task 6: Test Complete Application

**Time**: 5 mins

```
1. Open: https://scourgifydata-frontend-xxxx.onrender.com
2. Check DevTools (F12):
   - No errors in Console
   - No CORS errors
3. Click Model 1:
   - Enter: "This was amazing!"
   - Click: Predict
   - Should see sentiment result
4. Click Model 2:
   - Enter: "This was terrible!"
   - Click: Predict
   - Should see sentiment result
5. Everything works? ✅
```

✅ Application complete!

---

## 📊 Timeline Summary

| Phase     | Task                   | Time         |
| --------- | ---------------------- | ------------ |
| 1         | Deploy Model 1 API     | 10 min       |
| 1         | Deploy Model 2 API     | 10 min       |
| 1         | Test Backend           | 2 min        |
| 2         | Update Frontend Config | 3 min        |
| 2         | Deploy Frontend        | 8 min        |
| 2         | Test Complete App      | 5 min        |
| **TOTAL** | **Everything**         | **~38 mins** |

---

## 🎯 Success Criteria

### Phase 1 Complete When:

- [x] Model 1 API is "Live" on Render
- [x] Model 2 API is "Live" on Render
- [x] Health endpoints return 200 OK
- [x] Both URLs saved

### Phase 2 Complete When:

- [x] Frontend deployed to Render
- [x] Frontend loads without errors
- [x] Can test Model 1 predictions
- [x] Can test Model 2 predictions
- [x] No console errors

---

## 📍 Key Information to Save

```
📌 MODEL 1 API
URL: https://scourgifydata-model1-api-[XXXX].onrender.com
Health: https://scourgifydata-model1-api-[XXXX].onrender.com/
Predict: POST https://scourgifydata-model1-api-[XXXX].onrender.com/api/predict/model1

📌 MODEL 2 API
URL: https://scourgifydata-model2-api-[XXXX].onrender.com
Health: https://scourgifydata-model2-api-[XXXX].onrender.com/
Predict: POST https://scourgifydata-model2-api-[XXXX].onrender.com/api/predict/model2

📌 FRONTEND
URL: https://scourgifydata-frontend-[XXXX].onrender.com
```

---

## 🔗 Documents to Use

1. **Phase 1**: Read `BACKEND_DEPLOYMENT_STEPS.md`
2. **Phase 2**: Read `FRONTEND_DEPLOYMENT_GUIDE.md`

---

## ✨ Final Result

After completing all tasks:

```
User
  ↓
https://scourgifydata-frontend-xxxx.onrender.com
  ↓
↙                    ↘
Model 1 API      Model 2 API
  ↓                  ↓
Logistic Reg    BiLSTM Deep Learning
  ↓                  ↓
Sentiment Prediction
  ↓
Results displayed to user
```

**All live on Render! 🎉**

---

## 🚀 Start Now!

### Step 1: Open BACKEND_DEPLOYMENT_STEPS.md

### Step 2: Follow all tasks

### Step 3: Come back here

### Step 4: Open FRONTEND_DEPLOYMENT_GUIDE.md

### Step 5: Follow all tasks

### Step 6: Share the frontend URL

**You'll be live in under an hour!** ⏱️
