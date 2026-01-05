import "../styles/Landing.css";
import { useState } from "react";

export default function Landing({ onNavigate }) {
  const [activePhase, setActivePhase] = useState(null);

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            End-to-End{" "}
            <span className="gradient-text">Sentiment Analysis Pipeline</span>
          </h1>
          <p className="hero-description">
            From raw Yelp tourism reviews to production ML models: complete
            preprocessing methodology, feature engineering, and deep learning
            implementation with interactive model testing.
          </p>
        </div>
      </section>

      {/* Data Overview Section */}
      <section className="data-overview">
        <h2 className="section-title">Dataset Composition</h2>
        <div className="overview-container">
          <div className="overview-stat">
            <div className="stat-large">~7M</div>
            <div className="stat-desc">Tourism Reviews</div>
            <div className="stat-detail">From Yelp Academic Dataset</div>
          </div>
          <div className="overview-stat">
            <div className="stat-large">3</div>
            <div className="stat-desc">Sentiment Classes</div>
            <div className="stat-detail">
              Negative (1-2) | Neutral (3) | Positive (4-5)
            </div>
          </div>
          <div className="overview-stat">
            <div className="stat-large">~500K</div>
            <div className="stat-desc">Final Balanced Dataset</div>
            <div className="stat-detail">After upsampling & cleaning</div>
          </div>
        </div>

        {/* Data Flow Visualization */}
        <div className="data-flow">
          <div className="flow-step">
            <div className="flow-icon">📥</div>
            <div className="flow-label">Raw Data</div>
            <div className="flow-detail">~7M reviews</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="flow-icon">🧹</div>
            <div className="flow-label">Cleaning</div>
            <div className="flow-detail">Handle nulls, duplicates</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="flow-icon">✂️</div>
            <div className="flow-label">Text Prep</div>
            <div className="flow-detail">Normalize, tokenize</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="flow-icon">⚡</div>
            <div className="flow-label">Vectorize</div>
            <div className="flow-detail">TF-IDF / Embeddings</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="flow-icon">⚖️</div>
            <div className="flow-label">Balance</div>
            <div className="flow-detail">Upsample minority</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="flow-icon">🤖</div>
            <div className="flow-label">Models</div>
            <div className="flow-detail">LR + BiLSTM</div>
          </div>
        </div>
      </section>

      {/* Detailed Preprocessing Section */}
      <section className="preprocessing-detailed">
        <h2 className="section-title">Preprocessing Methodology</h2>
        <p className="section-subtitle">
          Complete walkthrough of our data transformation pipeline
        </p>

        {/* Phase 1-2 */}
        <div className="phase-section">
          <div
            className="phase-header"
            onClick={() => setActivePhase(activePhase === 1 ? null : 1)}
          >
            <div className="phase-num">1-2</div>
            <div className="phase-title">Data Acquisition & Selection</div>
            <div className="phase-toggle">{activePhase === 1 ? "▼" : "▶"}</div>
          </div>
          {activePhase === 1 && (
            <div className="phase-details">
              <div className="detail-grid">
                <div className="detail-box">
                  <h4>📦 Five Available Datasets</h4>
                  <ul>
                    <li>
                      <strong>✅ Review Dataset:</strong> Text + star ratings
                      (1-5)
                    </li>
                    <li>
                      <strong>✅ Business Dataset:</strong> Categories,
                      location, attributes
                    </li>
                    <li>
                      <strong>❌ User Dataset:</strong> Discarded (metadata
                      noise)
                    </li>
                    <li>
                      <strong>❌ Check-in Dataset:</strong> Discarded (no text
                      info)
                    </li>
                    <li>
                      <strong>❌ Tip Dataset:</strong> Discarded (too short, no
                      ratings)
                    </li>
                  </ul>
                </div>
                <div className="detail-box">
                  <h4>🎯 Dataset Selection Rationale</h4>
                  <ul>
                    <li>
                      <strong>Review Dataset:</strong> Core data with text +
                      labels
                    </li>
                    <li>
                      <strong>Business Dataset:</strong> For tourism filtering
                      only
                    </li>
                    <li>
                      <strong>Why discarded others:</strong>
                    </li>
                    <li>User metadata ≠ sentiment correlation</li>
                    <li>No textual content in check-ins/tips</li>
                  </ul>
                </div>
                <div className="detail-box">
                  <h4>🔗 Tourism Filtering & Merge</h4>
                  <ul>
                    <li>Filter businesses: tourism-related categories</li>
                    <li>Left join: Review ← Business (on business_id)</li>
                    <li>Result: Only tourism review corpus</li>
                    <li>Initial dataset: ~7 million reviews</li>
                  </ul>
                </div>
                <div className="detail-box">
                  <h4>📊 Feature Retention</h4>
                  <ul>
                    <li>
                      <strong>Kept:</strong> text, stars
                    </li>
                    <li>
                      <strong>Dropped:</strong> IDs, dates, user metadata
                    </li>
                    <li>
                      <strong>Reason:</strong> Focus on textual sentiment
                    </li>
                    <li>
                      <strong>Result:</strong> Clean 2-column dataset
                    </li>
                  </ul>
                </div>
              </div>

              {/* Data Source Flow Visual */}
              <div className="data-source-visual">
                <h4>Dataset Selection Pipeline</h4>
                <div className="source-flow">
                  <div className="source-item">
                    <div className="source-icon">📄</div>
                    <div className="source-name">5 Datasets</div>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="source-item selected">
                    <div className="source-icon">✅</div>
                    <div className="source-name">2 Selected</div>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="source-item">
                    <div className="source-icon">🏨</div>
                    <div className="source-name">Tourism Only</div>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="source-item">
                    <div className="source-icon">🎯</div>
                    <div className="source-name">Clean Dataset</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Phase 3 */}
        <div className="phase-section">
          <div
            className="phase-header"
            onClick={() => setActivePhase(activePhase === 3 ? null : 3)}
          >
            <div className="phase-num">3</div>
            <div className="phase-title">Data Cleaning & Preprocessing</div>
            <div className="phase-toggle">{activePhase === 3 ? "▼" : "▶"}</div>
          </div>
          {activePhase === 3 && (
            <div className="phase-details">
              <div className="detail-grid">
                <div className="detail-box">
                  <h4>🧹 Data Quality Issues</h4>
                  <ul>
                    <li>
                      <strong>Null Values:</strong> Dropped rows with missing
                      text/ratings
                    </li>
                    <li>
                      <strong>Empty Strings:</strong> Stripped whitespace
                    </li>
                    <li>
                      <strong>Short Reviews:</strong> Removed &lt;5 char reviews
                      (insufficient context)
                    </li>
                    <li>
                      <strong>Anomalous Data:</strong> Garbage characters
                      cleaned
                    </li>
                  </ul>
                </div>
                <div className="detail-box">
                  <h4>🔤 NLP Text Preprocessing</h4>
                  <ul>
                    <li>
                      <strong>Lowercasing:</strong> "Hotel" → "hotel"
                    </li>
                    <li>
                      <strong>URL Removal:</strong> Strip http:// links
                    </li>
                    <li>
                      <strong>Punctuation Removal:</strong> Remove
                      non-alphabetic chars
                    </li>
                    <li>
                      <strong>Whitespace Normalization:</strong> Collapse
                      multiple spaces
                    </li>
                  </ul>
                </div>
                <div className="detail-box example-before-after">
                  <h4>📌 Transformation Example</h4>
                  <div className="before">
                    <strong>Before:</strong> "OMG!!! 😍 This place is AMAZING...
                    http://xyz"
                  </div>
                  <div className="arrow">↓</div>
                  <div className="after">
                    <strong>After:</strong> "this place is amazing"
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Phase 4 */}
        <div className="phase-section">
          <div
            className="phase-header"
            onClick={() => setActivePhase(activePhase === 4 ? null : 4)}
          >
            <div className="phase-num">4</div>
            <div className="phase-title">
              Feature Engineering & Vectorization
            </div>
            <div className="phase-toggle">{activePhase === 4 ? "▼" : "▶"}</div>
          </div>
          {activePhase === 4 && (
            <div className="phase-details">
              <div className="detail-grid">
                <div className="detail-box">
                  <h4>⭐ Sentiment Class Mapping</h4>
                  <ul>
                    <li>
                      <strong>1-2 Stars:</strong> Negative 🔴
                    </li>
                    <li>
                      <strong>3 Stars:</strong> Neutral 🟠
                    </li>
                    <li>
                      <strong>4-5 Stars:</strong> Positive 🟢
                    </li>
                    <li>
                      <strong>Result:</strong> 3-class classification
                    </li>
                  </ul>
                </div>
                <div className="detail-box">
                  <h4>📊 Model 1: TF-IDF (Baseline)</h4>
                  <ul>
                    <li>
                      <strong>Algorithm:</strong> Term Frequency-Inverse
                      Document Frequency
                    </li>
                    <li>
                      <strong>Dimensions:</strong> 10,000 features
                    </li>
                    <li>
                      <strong>N-grams:</strong> (1,2) - unigrams + bigrams
                    </li>
                    <li>
                      <strong>Purpose:</strong> Capture negations ("not good")
                    </li>
                    <li>
                      <strong>Stop words:</strong> Standard English removed
                    </li>
                    <li>
                      <strong>Format:</strong> Sparse matrix
                    </li>
                  </ul>
                </div>
                <div className="detail-box">
                  <h4>🧠 Model 2: Embeddings (Deep Learning)</h4>
                  <ul>
                    <li>
                      <strong>Tokenization:</strong> TensorFlow
                      TextVectorization
                    </li>
                    <li>
                      <strong>Vocab Size:</strong> 60,000 tokens (max)
                    </li>
                    <li>
                      <strong>Sequence Length:</strong> 200 tokens (fixed)
                    </li>
                    <li>
                      <strong>Embedding Dim:</strong> 128-dimensional dense
                      vectors
                    </li>
                    <li>
                      <strong>Learning:</strong> Embeddings trained with model
                    </li>
                    <li>
                      <strong>Format:</strong> Dense integer sequences
                    </li>
                  </ul>
                </div>
                <div className="detail-box">
                  <h4>⚙️ Vectorization Strategy</h4>
                  <ul>
                    <li>
                      <strong>TF-IDF Benefits:</strong> Fast, interpretable,
                      sparse
                    </li>
                    <li>
                      <strong>TF-IDF Limitation:</strong> No semantic context
                    </li>
                    <li>
                      <strong>Embedding Benefits:</strong> Semantic
                      relationships, context-aware
                    </li>
                    <li>
                      <strong>Embedding Limitation:</strong> Slower inference,
                      "black box"
                    </li>
                  </ul>
                </div>
                <div className="detail-box">
                  <h4>📈 Dimension Comparison</h4>
                  <div className="comparison-small">
                    <div>
                      <strong>TF-IDF:</strong> 10,000D sparse
                    </div>
                    <div>
                      <strong>Embeddings:</strong> 128D dense
                    </div>
                    <div>
                      <strong>Compression:</strong> ~78x reduction
                    </div>
                    <div>
                      <strong>Trade-off:</strong> Space vs accuracy
                    </div>
                  </div>
                </div>
              </div>

              {/* TF-IDF vs Embedding Visual */}
              <div className="vectorization-visual">
                <h4>TF-IDF vs Word Embeddings</h4>
                <div className="comparison-boxes">
                  <div className="comp-box tf-idf-box">
                    <div className="comp-title">TF-IDF (Sparse)</div>
                    <div className="comp-example">
                      <div className="example-label">Example: "good hotel"</div>
                      <div className="vector-display">
                        [0, 0, 2.3, 0, ..., 1.8, 0, 0]
                        <div className="vector-note">
                          10,000 dimensions (mostly zeros)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="comp-box embedding-box">
                    <div className="comp-title">Embeddings (Dense)</div>
                    <div className="comp-example">
                      <div className="example-label">Example: "good hotel"</div>
                      <div className="vector-display">
                        [0.23, -0.81, 0.15, ..., 0.67]
                        <div className="vector-note">
                          128 dimensions (all meaningful)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Phase 5 */}
        <div className="phase-section">
          <div
            className="phase-header"
            onClick={() => setActivePhase(activePhase === 5 ? null : 5)}
          >
            <div className="phase-num">5</div>
            <div className="phase-title">
              Class Balancing with Data Augmentation
            </div>
            <div className="phase-toggle">{activePhase === 5 ? "▼" : "▶"}</div>
          </div>
          {activePhase === 5 && (
            <div className="phase-details">
              <div className="detail-grid">
                <div className="detail-box">
                  <h4>⚖️ Class Imbalance Problem</h4>
                  <ul>
                    <li>
                      <strong>Original Distribution:</strong>
                    </li>
                    <li>Positive (4-5 ⭐): ~70-80%</li>
                    <li>Neutral (3 ⭐): Minority</li>
                    <li>Negative (1-2 ⭐): Minority</li>
                    <li>
                      <em>Cause: Users review when satisfied</em>
                    </li>
                  </ul>
                </div>
                <div className="detail-box">
                  <h4>🔧 Solution: Synonym-Based Augmentation</h4>
                  <ul>
                    <li>
                      <strong>Library:</strong> nlpaug with WordNet
                    </li>
                    <li>
                      <strong>Method:</strong> Synonym replacement (10% of
                      words)
                    </li>
                    <li>
                      <strong>Example:</strong> "bad hotel" → "poor hotel"
                    </li>
                    <li>
                      <strong>Result:</strong> Synthetic samples with semantic
                      preservation
                    </li>
                    <li>
                      <strong>Target:</strong> Minority classes only
                    </li>
                  </ul>
                </div>
                <div className="detail-box">
                  <h4>📊 Augmentation Pipeline</h4>
                  <ul>
                    <li>
                      <strong>Start:</strong> 7M tourism reviews
                    </li>
                    <li>
                      <strong>After Augmentation:</strong> 14M total samples
                    </li>
                    <li>
                      <strong>Selected:</strong> 7M samples (50% of augmented)
                    </li>
                    <li>
                      <strong>Final:</strong> Balanced 7M dataset for training
                    </li>
                  </ul>
                </div>
                <div className="detail-box">
                  <h4>✅ Final Balanced Distribution</h4>
                  <ul>
                    <li>
                      <strong>Negative:</strong> ~2.33M samples 🔴
                    </li>
                    <li>
                      <strong>Neutral:</strong> ~2.33M samples 🟠
                    </li>
                    <li>
                      <strong>Positive:</strong> ~2.33M samples 🟢
                    </li>
                    <li>
                      <strong>Ratio:</strong> Perfect 1:1:1 balance
                    </li>
                  </ul>
                </div>
              </div>

              {/* Class Distribution Comparison */}
              <div className="distribution-visual">
                <h4>
                  Class Distribution: 7M → 14M (Augmentation) → 7M (Training)
                </h4>
                <div className="bars-container">
                  <div className="bar-group">
                    <div className="bar-label">Original 7M (Imbalanced)</div>
                    <div className="bar-row">
                      <div
                        className="bar"
                        style={{ width: "75%", backgroundColor: "#10b981" }}
                      >
                        <span>75%</span>
                      </div>
                      <div
                        className="bar"
                        style={{ width: "15%", backgroundColor: "#f59e0b" }}
                      >
                        <span>15%</span>
                      </div>
                      <div
                        className="bar"
                        style={{ width: "10%", backgroundColor: "#ef4444" }}
                      >
                        <span>10%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bar-group">
                    <div className="bar-label">After Augmentation (14M)</div>
                    <div className="bar-row">
                      <div
                        className="bar"
                        style={{ width: "45%", backgroundColor: "#10b981" }}
                      >
                        <span>45%</span>
                      </div>
                      <div
                        className="bar"
                        style={{ width: "27.5%", backgroundColor: "#f59e0b" }}
                      >
                        <span>28%</span>
                      </div>
                      <div
                        className="bar"
                        style={{ width: "27.5%", backgroundColor: "#ef4444" }}
                      >
                        <span>27%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bar-group">
                    <div className="bar-label">
                      Final 7M (Selected 50%, Balanced)
                    </div>
                    <div className="bar-row">
                      <div
                        className="bar"
                        style={{ width: "33.3%", backgroundColor: "#10b981" }}
                      >
                        <span>33%</span>
                      </div>
                      <div
                        className="bar"
                        style={{ width: "33.3%", backgroundColor: "#f59e0b" }}
                      >
                        <span>33%</span>
                      </div>
                      <div
                        className="bar"
                        style={{ width: "33.3%", backgroundColor: "#ef4444" }}
                      >
                        <span>33%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="legend">
                  <span>
                    <strong>🟢</strong> Positive (4-5⭐)
                  </span>
                  <span>
                    <strong>🟠</strong> Neutral (3⭐)
                  </span>
                  <span>
                    <strong>🔴</strong> Negative (1-2⭐)
                  </span>
                </div>
              </div>

              {/* Augmentation Example */}
              <div className="augmentation-example">
                <h4>📝 Data Augmentation Example</h4>
                <div className="example-rows">
                  <div className="example-row">
                    <div className="example-label">Original:</div>
                    <div className="example-text">
                      "The service was bad and the food was terrible."
                    </div>
                  </div>
                  <div className="example-row">
                    <div className="example-label">Augmented 1:</div>
                    <div className="example-text">
                      "The service was poor and the food was horrible."
                    </div>
                  </div>
                  <div className="example-row">
                    <div className="example-label">Augmented 2:</div>
                    <div className="example-text">
                      "The service was awful and the food was atrocious."
                    </div>
                  </div>
                  <div className="augmentation-note">
                    ✓ Semantic meaning preserved | ✓ Creates training variety |
                    ✓ No data leakage
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Model Architecture Section */}
      <section className="models-section">
        <h2 className="section-title">Model Architectures & Comparison</h2>
        <p className="section-subtitle">
          Two approaches: Baseline vs Advanced deep learning
        </p>

        <div className="models-grid">
          {/* Model 1 */}
          <div className="model-card">
            <div className="model-header model-1">
              <h3>Model 1: Logistic Regression</h3>
              <div className="model-badge">Baseline</div>
            </div>
            <div className="model-details">
              <div className="detail-item">
                <span className="label">Algorithm:</span>
                <span className="value">Logistic Regression (Linear)</span>
              </div>
              <div className="detail-item">
                <span className="label">Input Features:</span>
                <span className="value">TF-IDF vectors (10,000D sparse)</span>
              </div>
              <div className="detail-item">
                <span className="label">N-grams:</span>
                <span className="value">Unigrams + Bigrams</span>
              </div>
              <div className="detail-item">
                <span className="label">Training Data:</span>
                <span className="value">~400K balanced samples</span>
              </div>
              <div className="detail-item">
                <span className="label">Training Time:</span>
                <span className="value">Seconds (very fast)</span>
              </div>
              <div className="detail-item">
                <span className="label">Memory Usage:</span>
                <span className="value">Low (~100MB)</span>
              </div>
            </div>
            <div className="model-pros-cons">
              <div className="pros">
                <strong>✅ Strengths</strong>
                <ul>
                  <li>Extremely fast inference</li>
                  <li>Interpretable (feature weights)</li>
                  <li>Good baseline benchmark</li>
                  <li>Low computational cost</li>
                </ul>
              </div>
              <div className="cons">
                <strong>❌ Limitations</strong>
                <ul>
                  <li>No word order understanding</li>
                  <li>Struggles with negation</li>
                  <li>Misses semantic nuances</li>
                  <li>Limited context awareness</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Model 2 */}
          <div className="model-card">
            <div className="model-header model-2">
              <h3>Model 2: Bidirectional LSTM</h3>
              <div className="model-badge">Advanced</div>
            </div>
            <div className="model-details">
              <div className="detail-item">
                <span className="label">Architecture:</span>
                <span className="value">
                  Embedding → BiLSTM → GlobalMaxPool → Dense
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Embedding Dimension:</span>
                <span className="value">128D dense vectors</span>
              </div>
              <div className="detail-item">
                <span className="label">LSTM Units:</span>
                <span className="value">Bidirectional with state</span>
              </div>
              <div className="detail-item">
                <span className="label">Max Sequence Length:</span>
                <span className="value">200 tokens (padding/truncating)</span>
              </div>
              <div className="detail-item">
                <span className="label">Training Data:</span>
                <span className="value">~400K balanced samples</span>
              </div>
              <div className="detail-item">
                <span className="label">Training Time:</span>
                <span className="value">Minutes per epoch</span>
              </div>
            </div>
            <div className="model-pros-cons">
              <div className="pros">
                <strong>✅ Strengths</strong>
                <ul>
                  <li>Understands word sequence</li>
                  <li>Handles negation properly</li>
                  <li>Captures semantic meaning</li>
                  <li>Bidirectional context</li>
                </ul>
              </div>
              <div className="cons">
                <strong>⚠️ Considerations</strong>
                <ul>
                  <li>Slower inference (~100ms)</li>
                  <li>More complex to interpret</li>
                  <li>Higher memory usage</li>
                  <li>Requires GPU for efficiency</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="architecture-comparison">
          <h3>Architecture Flow Comparison</h3>
          <div className="flow-diagram">
            <div className="flow-column">
              <div className="flow-title">Model 1: TF-IDF → LR</div>
              <div className="flow-boxes">
                <div className="flow-box">Review Text</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box">Lowercase & Clean</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box">Tokenization</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box">
                  TF-IDF Vectorize
                  <br />
                  <small>(10,000D sparse)</small>
                </div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box">Logistic Regression</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box result">Sentiment Prediction</div>
              </div>
            </div>
            <div className="flow-column">
              <div className="flow-title">Model 2: Embedding → BiLSTM</div>
              <div className="flow-boxes">
                <div className="flow-box">Review Text</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box">Lowercase & Clean</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box">
                  Integer Encode
                  <br />
                  <small>(vocab mapping)</small>
                </div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box">Pad to 200 tokens</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box">
                  Word Embedding
                  <br />
                  <small>(128D dense)</small>
                </div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box">BiLSTM Layer</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box">GlobalMaxPooling</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box">Dense Layers</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-box result">Sentiment Prediction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Testing Section */}
      <section className="results-section">
        <h2 className="section-title">Implementation Results</h2>
        <p className="section-subtitle">
          Final deliverables and what we learned
        </p>

        <div className="results-container">
          <div className="result-box">
            <h4>📊 Dataset Statistics</h4>
            <ul>
              <li>
                <strong>Original:</strong> ~7M reviews
              </li>
              <li>
                <strong>After cleaning:</strong> ~6.8M valid
              </li>
              <li>
                <strong>For training:</strong> ~500K balanced
              </li>
              <li>
                <strong>Train split:</strong> ~400K (80%)
              </li>
              <li>
                <strong>Test split:</strong> ~100K (20%)
              </li>
              <li>
                <strong>Avg tokens/review:</strong> ~80
              </li>
            </ul>
          </div>

          <div className="result-box">
            <h4>🎯 Feature Engineering Impact</h4>
            <ul>
              <li>
                <strong>TF-IDF:</strong> 10,000 sparse dimensions
              </li>
              <li>
                <strong>Embeddings:</strong> 128 dense dimensions
              </li>
              <li>
                <strong>Compression:</strong> 78x reduction
              </li>
              <li>
                <strong>Vocabulary:</strong> 50,000 most common words
              </li>
              <li>
                <strong>Sequence length:</strong> Fixed at 200 tokens
              </li>
              <li>
                <strong>OOV handling:</strong> Special token mapping
              </li>
            </ul>
          </div>

          <div className="result-box">
            <h4>🚀 Model Deployment</h4>
            <ul>
              <li>
                <strong>Model 1:</strong> Serialized as sklearn pickle
              </li>
              <li>
                <strong>Model 2:</strong> Saved as Keras .h5 format
              </li>
              <li>
                <strong>Inference Mode 1:</strong> Instant (~1ms)
              </li>
              <li>
                <strong>Inference Mode 2:</strong> Fast (~100ms)
              </li>
              <li>
                <strong>API ready:</strong> Both models callable
              </li>
              <li>
                <strong>Testing:</strong> Interactive web interface
              </li>
            </ul>
          </div>

          <div className="result-box">
            <h4>📈 Key Insights</h4>
            <ul>
              <li>
                <strong>Class imbalance:</strong> Positive reviews 3x more
                common
              </li>
              <li>
                <strong>Upsampling benefit:</strong> Fair training across all
                classes
              </li>
              <li>
                <strong>Negation patterns:</strong> BiLSTM captures "NOT good"
                correctly
              </li>
              <li>
                <strong>Context matters:</strong> Deep learning vs Bag-of-words
              </li>
              <li>
                <strong>Preprocessing power:</strong> 50% of model quality
                improvement
              </li>
              <li>
                <strong>Trade-off:</strong> Speed vs accuracy (choose based on
                use case)
              </li>
            </ul>
          </div>
        </div>

        {/* Testing Interface */}
        <div className="testing-interface">
          <h3>🧪 Interactive Model Testing</h3>
          <p>Use the model testing pages to see both approaches in action:</p>
          <div className="test-cards">
            <div className="test-card">
              <div className="test-num">1</div>
              <h4>Model 1 Tester</h4>
              <p>
                Test the fast Logistic Regression model. See how TF-IDF captures
                keyword sentiment.
              </p>
              <button className="test-btn" onClick={() => onNavigate("model1")}>
                Test LR Model →
              </button>
            </div>
            <div className="test-card">
              <div className="test-num">2</div>
              <h4>Model 2 Tester</h4>
              <p>
                Test the advanced BiLSTM model. Notice how it handles complex
                negations and context.
              </p>
              <button className="test-btn" onClick={() => onNavigate("model2")}>
                Test BiLSTM →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
