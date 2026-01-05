# ⚡ QUICK REFERENCE - DEPLOY NOW!

## 🎯 Your Next 3 Actions

### Action 1: Push Code to GitHub

```bash
cd c:\Users\DELL 7540\Desktop\ScourgifyData
git add .
git commit -m "Ready for deployment"
git push origin main
```

✅ Done

---

### Action 2: Deploy Backend (Both Models)

**Go to**: https://render.com/dashboard

**Create 2 Web Services** (do this twice, once for each):

```
Service 1: scourgifydata-model1-api
Service 2: scourgifydata-model2-api

For both, use:
  Build: pip install -r requirements.txt
  Start: gunicorn --bind 0.0.0.0:$PORT --workers 4 --worker-class sync --max-requests 1000 --max-requests-jitter 50 --timeout 60 --access-logfile - --error-logfile - app:app
```

⏱️ Wait: 5-10 minutes total

✅ Save the URLs:

```
Model 1: https://scourgifydata-model1-api-XXXXX.onrender.com
Model 2: https://scourgifydata-model2-api-XXXXX.onrender.com
```

---

### Action 3: Deploy Frontend

**Step A**: Update `.env.production`

```
VITE_API_URL=https://scourgifydata-model1-api-XXXXX.onrender.com
```

**Step B**: Push to GitHub

```bash
git add frontmodels/models/.env.production
git commit -m "Update API URL"
git push origin main
```

**Step C**: Create Static Site on Render

```
Name: scourgifydata-frontend
Build: cd frontmodels/models && npm install && npm run build
Publish: frontmodels/models/dist
Env: VITE_API_URL=https://scourgifydata-model1-api-XXXXX.onrender.com
```

⏱️ Wait: 3 minutes

✅ Save the URL:

```
Frontend: https://scourgifydata-frontend-XXXXX.onrender.com
```

---

## 🧪 Test It Works

```bash
# Test backend
curl https://scourgifydata-model1-api-XXXXX.onrender.com/

# Test frontend
Open: https://scourgifydata-frontend-XXXXX.onrender.com
Try Model 1 and Model 2 predictions
```

---

## 📊 Timeline

- Backend: 10 mins
- Frontend: 10 mins
- Testing: 5 mins
- **Total: ~25 mins**

---

## 📖 Full Guides

- Backend details: `BACKEND_DEPLOYMENT_STEPS.md`
- Frontend details: `FRONTEND_DEPLOYMENT_GUIDE.md`
- Complete plan: `ACTION_PLAN.md`

---

**You're ready! Start with Step 1 above.** 🚀
