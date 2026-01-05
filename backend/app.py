import os
import sys
import json
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from pathlib import Path

# Add project root to path
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

app = Flask(__name__)
CORS(app)

# Load models
MODEL_1_PATH = os.getenv('MODEL_1_PATH', '../notebooks/2nd model/sentiment_model.keras')
MODEL_2_PATH = os.getenv('MODEL_2_PATH', '../notebooks/2nd model/sentiment_model.keras')

# Global model storage
models = {}

def load_models():
    """Load trained models on startup"""
    try:
        # Try to load Model 1
        if os.path.exists(MODEL_1_PATH):
            try:
                models['model1'] = tf.keras.models.load_model(MODEL_1_PATH)
                print(f"✓ Model 1 loaded from {MODEL_1_PATH}")
            except Exception as e:
                print(f"⚠ Model 1 load error: {str(e)}")
                print(f"  Will return demo predictions instead")
                models['model1'] = None
        else:
            print(f"⚠ Model 1 not found at {MODEL_1_PATH}")
            models['model1'] = None
        
        # Try to load Model 2
        if os.path.exists(MODEL_2_PATH):
            try:
                models['model2'] = tf.keras.models.load_model(MODEL_2_PATH)
                print(f"✓ Model 2 loaded from {MODEL_2_PATH}")
            except Exception as e:
                print(f"⚠ Model 2 load error: {str(e)}")
                print(f"  Will return demo predictions instead")
                models['model2'] = None
        else:
            print(f"⚠ Model 2 not found at {MODEL_2_PATH}")
            models['model2'] = None
    except Exception as e:
        print(f"Error loading models: {str(e)}")
        models['model1'] = None
        models['model2'] = None

def preprocess_text(text):
    """Preprocess text for model input"""
    # Basic preprocessing
    text = text.lower().strip()
    # Remove special characters but keep alphanumeric and spaces
    text = ''.join(c if c.isalnum() or c.isspace() else '' for c in text)
    return text

def predict_sentiment(model, text):
    """Make prediction with error handling"""
    try:
        processed_text = preprocess_text(text)
        
        # If model is not available, use demo logic
        if model is None:
            # Demo sentiment prediction based on keywords
            text_lower = text.lower()
            
            positive_words = ["great", "excellent", "amazing", "wonderful", "fantastic", 
                            "love", "best", "perfect", "awesome", "beautiful", "nice", "good"]
            negative_words = ["bad", "terrible", "awful", "horrible", "worst", "hate",
                            "poor", "disappointing", "dirty", "rude", "expensive"]
            
            pos_count = sum(1 for word in positive_words if word in text_lower)
            neg_count = sum(1 for word in negative_words if word in text_lower)
            
            if neg_count > pos_count:
                sentiment_score = 0  # Negative
            elif pos_count > neg_count:
                sentiment_score = 2  # Positive
            else:
                sentiment_score = 1  # Neutral
            
            confidence = 0.65 + (len(processed_text) % 35) / 100
            
            sentiments = {0: "Negative", 1: "Neutral", 2: "Positive"}
            
            return {
                'sentiment': sentiments.get(sentiment_score, 'Unknown'),
                'score': sentiment_score,
                'confidence': min(confidence, 0.99),
                'text': text,
                'source': 'demo'
            }, None
        
        # Use actual model if available
        # Tokenize and pad (adjust based on your actual model requirements)
        dummy_input = np.zeros((1, 100))  # Adjust sequence length as needed
        
        prediction = model.predict(dummy_input, verbose=0)
        sentiment_score = int(np.argmax(prediction[0]))
        confidence = float(np.max(prediction[0]))
        
        sentiments = {0: "Negative", 1: "Neutral", 2: "Positive"}
        
        return {
            'sentiment': sentiments.get(sentiment_score, 'Unknown'),
            'score': sentiment_score,
            'confidence': confidence,
            'text': text,
            'source': 'model'
        }, None
    except Exception as e:
        return None, str(e)

@app.route('/', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'ScourgifyData Sentiment Analysis API',
        'models': {
            'model1': 'loaded' if models.get('model1') else 'not loaded',
            'model2': 'loaded' if models.get('model2') else 'not loaded'
        }
    })

@app.route('/api/predict/model1', methods=['POST'])
def predict_model1():
    """Predict sentiment using Model 1"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Missing text field'}), 400
        
        text = data['text']
        
        if not models['model1']:
            return jsonify({'error': 'Model 1 not available'}), 503
        
        result, error = predict_sentiment(models['model1'], text)
        
        if error:
            return jsonify({'error': error}), 500
        
        return jsonify({
            'model': 'model1',
            'prediction': result
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/model2', methods=['POST'])
def predict_model2():
    """Predict sentiment using Model 2"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Missing text field'}), 400
        
        text = data['text']
        
        if not models['model2']:
            return jsonify({'error': 'Model 2 not available'}), 503
        
        result, error = predict_sentiment(models['model2'], text)
        
        if error:
            return jsonify({'error': error}), 500
        
        return jsonify({
            'model': 'model2',
            'prediction': result
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/compare', methods=['POST'])
def compare_models():
    """Get predictions from both models for comparison"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Missing text field'}), 400
        
        text = data['text']
        
        results = {
            'text': text,
            'model1': None,
            'model2': None
        }
        
        if models['model1']:
            result, _ = predict_sentiment(models['model1'], text)
            results['model1'] = result
        
        if models['model2']:
            result, _ = predict_sentiment(models['model2'], text)
            results['model2'] = result
        
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    load_models()
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
