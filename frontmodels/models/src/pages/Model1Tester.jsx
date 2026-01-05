import { useState } from "react";
import "../styles/ModelTester.css";

export default function Model1Tester() {
  const [input, setInput] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${apiUrl}/api/predict/model1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.prediction) {
        const pred = data.prediction;
        setPrediction({
          score: pred.score,
          confidence: pred.confidence,
          details: {
            sentiment: pred.sentiment,
            text: pred.text,
          },
        });
      } else {
        setError("Invalid response from API");
      }
    } catch (err) {
      setError(
        err.message ||
          "Error making prediction. Please check the API connection."
      );
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
          Baseline sentiment classifier trained on TF-IDF features. Fast and
          interpretable.
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
                <h3>Model Details:</h3>
                <ul>
                  <li>
                    <strong>Algorithm:</strong> Logistic Regression
                  </li>
                  <li>
                    <strong>Features:</strong> TF-IDF (10,000 dimensions)
                  </li>
                  <li>
                    <strong>Training Data:</strong> ~160+ tourism reviews
                  </li>
                  <li>
                    <strong>Approach:</strong> Traditional ML with text
                    preprocessing
                  </li>
                </ul>
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
          classifier trained on merged tourism business and review datasets. It
          uses TF-IDF feature extraction and logistic regression for fast,
          interpretable predictions. Perfect for understanding baseline
          performance and identifying areas for improvement.
        </p>
      </div>
    </div>
  );
}
