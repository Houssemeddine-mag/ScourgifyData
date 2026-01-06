import { useState } from "react";
import { predictWithModel1 } from "../utils/model1Service";
import "../styles/ModelTester.css";

export default function Model1Tester() {
  const [input, setInput] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTechnical, setShowTechnical] = useState(false);

  const sentiments = {
    0: { label: "Negative", color: "#ff6b6b", icon: "😞" },
    1: { label: "Neutral", color: "#ffd93d", icon: "😐" },
    2: { label: "Positive", color: "#6bcf7f", icon: "😊" },
  };

  const handlePredict = async () => {
    if (!input.trim()) {
      setError("Please enter a review text");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const result = await predictWithModel1(input);

      setPrediction({
        score: result.score,
        confidence: result.confidence,
        details: {
          sentiment: result.sentiment,
          text: result.text,
        },
        usingFallback: result.usingFallback,
      });
    } catch (err) {
      setError(err.message || "Error making prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const exampleReviews = [
    "This hotel was absolutely fantastic! The staff was so friendly and the room was pristine. Highly recommend!",
    "It was okay. Nothing special but nothing terrible either.",
    "Worst experience ever. The room was dirty and the service was horrible.",
  ];

  return (
    <div className="model-tester">
      <div className="tester-header">
        <div className="badge">Model 1</div>
        <h1>Logistic Regression Model</h1>
        <p className="model-description">
          Baseline sentiment classifier using TF-IDF feature extraction and
          logistic regression. Fast and interpretable.
        </p>
      </div>

      <div className="tester-container">
        <div className="input-section">
          <h2>Test the Model</h2>
          <p className="section-note">
            Enter a tourism review to classify its sentiment
          </p>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a tourism review... (e.g., 'Great hotel, excellent service!')"
            className="input-textarea"
            disabled={loading}
          />

          {error && <div className="error-message">{error}</div>}

          <button
            onClick={handlePredict}
            disabled={loading}
            className={`predict-button ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : (
              "Predict Sentiment"
            )}
          </button>

          <div className="examples">
            <p className="examples-title">Try these examples:</p>
            <div className="examples-list">
              {exampleReviews.map((review, idx) => (
                <button
                  key={idx}
                  className="example-btn"
                  onClick={() => setInput(review)}
                  disabled={loading}
                >
                  Example {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {prediction && (
          <div className="result-section">
            <h2>Prediction Result</h2>
            <div
              className="prediction-card"
              style={{ borderLeftColor: sentiments[prediction.score].color }}
            >
              <div className="sentiment-display">
                <div className="sentiment-emoji" style={{ fontSize: "3.5em" }}>
                  {sentiments[prediction.score].icon}
                </div>
                <div className="sentiment-text">
                  <div
                    className="sentiment-label"
                    style={{ color: sentiments[prediction.score].color }}
                  >
                    {sentiments[prediction.score].label}
                  </div>
                  <div className="confidence">
                    Confidence:{" "}
                    <strong>{(prediction.confidence * 100).toFixed(1)}%</strong>
                  </div>
                </div>
              </div>

              <div className="prediction-details">
                <h3>Model Architecture:</h3>
                <ul>
                  <li>
                    <strong>Algorithm:</strong> Logistic Regression
                  </li>
                  <li>
                    <strong>Feature Extraction:</strong> TF-IDF Vectorization
                  </li>
                  <li>
                    <strong>Feature Dimensions:</strong> 10,000 features
                  </li>
                  <li>
                    <strong>Bigrams:</strong> Enabled (word pairs)
                  </li>
                  <li>
                    <strong>Training Data:</strong> ~160 imbalanced Yelp tourism
                    reviews
                  </li>
                  <li>
                    <strong>Approach:</strong> Classical ML - Fast &
                    Interpretable
                  </li>
                  <li>
                    <strong>Execution:</strong> Keyword-based approximation
                    (fallback mode)
                  </li>
                  {prediction.usingFallback && (
                    <li style={{ color: "#ff9800" }}>
                      <strong>⚠ Note:</strong> Backend model unavailable - using
                      keyword analysis
                    </li>
                  )}
                </ul>

                <div className="technical-toggle">
                  <button
                    className="technical-btn"
                    onClick={() => setShowTechnical(!showTechnical)}
                  >
                    {showTechnical ? "Hide" : "Show"} Technical Details
                  </button>
                </div>

                {showTechnical && (
                  <div className="technical-details">
                    <h4>How TF-IDF Works:</h4>
                    <p>
                      TF-IDF (Term Frequency-Inverse Document Frequency)
                      measures word importance by combining how often a word
                      appears in a document with how rare it is across the
                      corpus.
                    </p>
                    <h4>Feature Engineering Process:</h4>
                    <ul style={{ fontSize: "0.9em" }}>
                      <li>Tokenize review text into words</li>
                      <li>Create bigrams (2-word sequences)</li>
                      <li>Calculate TF scores per word</li>
                      <li>Apply IDF weighting</li>
                      <li>Generate 10,000-dimensional feature vector</li>
                    </ul>
                    <h4>Why Imbalanced Data Matters:</h4>
                    <p>
                      Training on imbalanced data (more positive reviews) can
                      bias the model. This is why Model 2 uses upsampling for
                      balanced training.
                    </p>
                  </div>
                )}
              </div>

              <div className="input-preview">
                <h3>Your Review:</h3>
                <p>"{prediction.details.text}"</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="model-info">
        <h3>About This Model</h3>
        <p>
          <strong>Model 1 - Logistic Regression:</strong> Our baseline sentiment
          classifier trained on imbalanced Yelp tourism review data. Uses TF-IDF
          feature extraction (10,000 dimensions with bigrams enabled) and
          logistic regression for fast, interpretable predictions. Perfect for
          understanding baseline performance and comparing against advanced deep
          learning approaches.
        </p>
        <div className="model-comparison-note">
          <strong>📊 Compare with Model 2:</strong> Model 2 uses BiLSTM on
          balanced (upsampled) data for better contextual understanding and
          reduced bias.
        </div>
      </div>
    </div>
  );
}
