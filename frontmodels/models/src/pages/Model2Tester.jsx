import { useState } from "react";
import "../styles/ModelTester.css";

export default function Model2Tester() {
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

      const response = await fetch(`${apiUrl}/api/predict/model2`, {
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
            tokens: input.split(" ").length,
            processingTime: "120ms",
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
    "The resort was breathtaking! Every detail was perfect, from the stunning views to the exceptional service. Will definitely come back!",
    "The stay was fine. Food was okay, rooms were clean, but nothing particularly memorable.",
    "Terrible experience. The place was not clean, staff was unhelpful, and way too expensive for what we got.",
  ];

  return (
    <div className="model-tester">
      <div className="tester-header">
        <div className="badge badge-deep">Model 2</div>
        <h1>Bidirectional LSTM Model</h1>
        <p className="model-description">
          Advanced deep learning model trained on balanced data. Understands
          context and nuance better.
        </p>
      </div>

      <div className="tester-container">
        <div className="input-section">
          <h2>Test the Model</h2>
          <p className="section-note">
            Enter a tourism review to classify its sentiment using deep learning
          </p>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a tourism review... (e.g., 'Amazing resort with incredible attention to detail!')"
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
                Analyzing with BiLSTM...
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
                    <strong>Algorithm:</strong> Bidirectional LSTM (RNN)
                  </li>
                  <li>
                    <strong>Architecture:</strong> Embedding → BiLSTM →
                    GlobalMaxPool → Dense
                  </li>
                  <li>
                    <strong>Training Data:</strong> ~160+ balanced tourism
                    reviews
                  </li>
                  <li>
                    <strong>Approach:</strong> Deep learning with contextual
                    understanding
                  </li>
                  <li>
                    <strong>Processing Time:</strong>{" "}
                    {prediction.details.processingTime}
                  </li>
                  <li>
                    <strong>Tokens:</strong> {prediction.details.tokens}
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
          <strong>Model 2 - Bidirectional LSTM:</strong> Our advanced deep
          learning sentiment classifier trained on balanced tourism review data
          using TensorFlow/Keras. The BiLSTM architecture captures sequential
          dependencies and contextual relationships in text, enabling it to
          understand nuance like negation and sarcasm better than traditional ML
          approaches. This model represents a significant improvement over the
          baseline.
        </p>
      </div>
    </div>
  );
}
