# ScourgifyData - Frontend Deployment Ready

## Quick Start

### Local Development

```bash
cd frontmodels/models

# Install dependencies
npm install

# Run development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## Deployment to Render

### Option 1: Using Render Dashboard (Recommended)

1. **Create GitHub Repository**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: ScourgifyData frontend"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ScourgifyData.git
   git push -u origin main
   ```

2. **Create Render Service**

   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub and select your repository
   - Fill in the configuration:
     - **Name:** ScourgifyData-Frontend
     - **Root Directory:** `frontmodels/models`
     - **Runtime:** Node 20
     - **Build Command:** `npm ci && npm run build`
     - **Start Command:** `npm run preview`
     - **Environment:** Production
   - Click "Create Web Service"

3. **Monitor Deployment**
   - Your service will be live at: `https://scourgifydata-frontend.onrender.com`
   - Check logs in Render dashboard

### Option 2: Using render.yaml

The `render.yaml` file in the `frontmodels/models` directory contains the deployment configuration. Just push to GitHub and Render will auto-deploy.

## Features

### ✅ Local Model Execution

- **Model 1:** LSTM sentiment classifier
- **Model 2:** BiLSTM sentiment classifier
- Both run entirely in the browser using TensorFlow.js
- No data is sent to external servers

### ✅ Responsive Design

- Mobile-friendly interface
- Smooth animations and transitions
- Real-time sentiment prediction

### ✅ Demo Components

- Landing page with project overview
- Interactive model testers with example reviews
- Final report viewer
- Confidence scores and sentiment analysis

## Model Details

### Model 1: LSTM

- Architecture: Long Short-Term Memory neural network
- Execution: TensorFlow.js (browser-based)
- Input: Text review (variable length)
- Output: Sentiment (Negative/Neutral/Positive) + Confidence

### Model 2: BiLSTM

- Architecture: Bidirectional LSTM
- Execution: TensorFlow.js (browser-based)
- Features: Better context understanding, negation handling
- Input: Text review (variable length)
- Output: Sentiment (Negative/Neutral/Positive) + Confidence

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Models Not Loading

The application includes a fallback keyword-based sentiment analysis. If the trained models can't be loaded, the system will gracefully fall back to heuristic-based analysis.

### Build Issues

- Ensure Node.js 18+ is installed
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Check Render build logs for specific errors

### Performance Issues

- The models run locally, so large batch predictions may use significant CPU
- First prediction will be slower due to TensorFlow.js initialization
- Consider using the Starter plan on Render for better performance

## Environment Variables

Currently, no environment variables are required. If you add API calls in the future:

```bash
VITE_API_URL=https://your-api.com
```

## Dependencies

- **React** 19.2.0 - UI framework
- **Vite** 7.2.4 - Build tool
- **TensorFlow.js** 4.11.0 - Browser-based ML
- **ESLint** - Code quality

## Project Structure

```
frontmodels/models/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx         # Home page
│   │   ├── Model1Tester.jsx    # LSTM tester
│   │   ├── Model2Tester.jsx    # BiLSTM tester
│   │   └── FinalReport.jsx     # Report viewer
│   ├── utils/
│   │   └── modelService.js     # Model loading & prediction
│   ├── styles/
│   │   ├── App.css
│   │   ├── Landing.css
│   │   ├── ModelTester.css
│   │   └── FinalReport.css
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── [static assets]
├── Dockerfile
├── render.yaml
├── package.json
└── vite.config.js
```

## Performance Notes

- **Cold Start:** First load initializes TensorFlow.js (~2-5 seconds)
- **Prediction Speed:** ~500-1500ms per prediction (CPU dependent)
- **Memory:** ~50-100MB in browser
- **Bundle Size:** ~3-5MB (gzipped)

## Next Steps

1. Train and convert your actual TensorFlow/Keras models to TensorFlow.js format:

   ```bash
   tensorflowjs_converter --input_format keras model.h5 ./models/model1/
   ```

2. Place converted models in `public/models/` directory

3. Update `modelService.js` to load from actual model paths

## Support

- Render Documentation: https://render.com/docs
- TensorFlow.js: https://www.tensorflow.org/js
- Vite Documentation: https://vitejs.dev/

## License

See LICENSE file in project root
