# Backend API for ScourgifyData Sentiment Analysis Models

This is the Flask API server that serves both sentiment analysis models.

## Setup

1. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set environment variables:

```bash
export MODEL_1_PATH=../notebooks/2nd\ model/sentiment_model.keras
export MODEL_2_PATH=../notebooks/2nd\ model/sentiment_model.keras
export PORT=5000
```

4. Run the server:

```bash
python app.py
```

## API Endpoints

### Health Check

- **GET** `/`
  - Returns server status and model availability

### Model 1 Prediction

- **POST** `/api/predict/model1`
  - Request body: `{"text": "Your review text here"}`
  - Response: Sentiment prediction with score and confidence

### Model 2 Prediction

- **POST** `/api/predict/model2`
  - Request body: `{"text": "Your review text here"}`
  - Response: Sentiment prediction with score and confidence

### Compare Models

- **POST** `/api/compare`
  - Request body: `{"text": "Your review text here"}`
  - Response: Predictions from both models for comparison

## Deployment to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set Build Command: `pip install -r requirements.txt`
4. Set Start Command: `gunicorn -w 4 -b 0.0.0.0:$PORT app:app`
5. Add environment variables in Render dashboard:
   - `MODEL_1_PATH`: Path to model 1
   - `MODEL_2_PATH`: Path to model 2

## Example Usage

```bash
# Test health endpoint
curl https://your-render-url.onrender.com/

# Make prediction
curl -X POST https://your-render-url.onrender.com/api/predict/model1 \
  -H "Content-Type: application/json" \
  -d '{"text": "This hotel was amazing!"}'
```
