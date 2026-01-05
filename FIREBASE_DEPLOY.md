# Firebase Deployment Guide

## Quick Deploy

### Prerequisites
```bash
npm install -g firebase-tools
firebase login
```

### Deploy Steps

1. **Build the app**
```bash
cd frontmodels/models
npm run build
```

2. **Deploy to Firebase**
```bash
firebase deploy
```

Your app will be live at: `https://scourgifydata.web.app`

### One-Command Deploy
```bash
npm run build && firebase deploy
```

## Setup Firebase Project

If you don't have a Firebase project yet:

1. Go to https://console.firebase.google.com
2. Create a new project named `scourgifydata`
3. Enable Hosting
4. Run `firebase login` in terminal
5. Run `firebase init hosting` (select your project)
6. Follow the prompts (use `dist` as public directory)

## Post-Deployment

- Live URL: https://scourgifydata.web.app
- Alternative: https://scourgifydata.firebaseapp.com
- Check deployment: `firebase hosting:channel:list`

## Rollback
```bash
firebase hosting:channel:rollback
```
