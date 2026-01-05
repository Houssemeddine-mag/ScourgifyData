# ScourgifyData - Interactive Sentiment Analysis Portfolio

## 📋 Project Overview

This interactive React portfolio showcases a complete data preprocessing and machine learning pipeline for sentiment analysis on Yelp tourism reviews.

**Dataset**: ~7 million tourism reviews from Yelp Academic Dataset
**Task**: 3-class sentiment classification (Negative, Neutral, Positive)
**Models**: Logistic Regression (baseline) + Bidirectional LSTM (advanced)

## 🏗️ Architecture

### Frontend Structure

```
src/
├── pages/
│   ├── Landing.jsx          # Portfolio landing page with detailed pipeline info
│   ├── Model1Tester.jsx     # Logistic Regression testing interface
│   └── Model2Tester.jsx     # BiLSTM testing interface
├── styles/
│   ├── Landing.css          # Landing page styling
│   └── ModelTester.css      # Model tester styling
├── App.jsx                  # Main app with navigation
└── index.css                # Global styles
```

## 📊 Data Preprocessing Pipeline (8 Phases)

### Phase 1: Data Collection

- **Source**: Yelp Academic Dataset
- **Size**: ~7 million reviews
- **Content**: Tourism business reviews with star ratings (1-5)

### Phase 2: Dataset Merging

- Left join on `business_id`
- Combined business metadata with review data
- Created unified tourism review dataset

### Phase 3: Exploratory Data Analysis

- Analyzed rating distributions
- Identified missing values
- Examined review text characteristics
- Detected class imbalance issue

### Phase 4: Data Cleaning

- Removed duplicates
- Handled missing values
- Normalized formatting
- Dropped irrelevant columns

### Phase 5: Sentiment Labeling

```
1-2 stars → Negative
3 stars   → Neutral
4-5 stars → Positive
```

### Phase 6: Text Preprocessing

- Convert to lowercase
- Remove special characters, URLs, mentions
- Tokenization
- Whitespace normalization
- Consistent formatting

### Phase 7: Feature Engineering

**Model 1 (Logistic Regression)**:

- TF-IDF vectorization
- 10,000 dimensions
- Bigram support
- Sparse matrix format

**Model 2 (BiLSTM)**:

- Word embeddings (128 dimensions)
- TextVectorization layer (60K vocab)
- Sequence padding (max 200 tokens)
- Upsampling for class balance

### Phase 8: Model Training & Deployment

- Split data: 80% training, 20% testing
- Balanced class distribution for Model 2
- Saved models in production formats
- Packaged for web deployment

## 🤖 ML Models

### Model 1: Logistic Regression (Baseline)

**Purpose**: Establish baseline performance

**Features**:

- Algorithm: Logistic Regression (Scikit-learn)
- Input: TF-IDF vectors (10,000 dims)
- Classes: 3 (Negative, Neutral, Positive)
- Training Data: Original imbalanced dataset

**Characteristics**:

- ✅ Fast inference
- ✅ Interpretable weights
- ✅ Good for benchmarking
- ⚠️ Limited context understanding
- ⚠️ Bag-of-words approach

**Files**:

- Model: `sentiment_logreg_model.pkl`
- Vectorizer: `tfidf_vectorizer.pkl`

### Model 2: Bidirectional LSTM (Advanced)

**Purpose**: Production deployment with superior accuracy

**Architecture**:

```
Input Text
    ↓
TextVectorization (60K vocab)
    ↓
Embedding (128D)
    ↓
Bidirectional LSTM (128 units)
    ↓
GlobalMaxPooling
    ↓
Dense (64 units, ReLU)
    ↓
Dropout (40%)
    ↓
Output (3 classes, Softmax)
```

**Characteristics**:

- ✅ Captures sequential dependencies
- ✅ Understands context and word order
- ✅ Handles negation and nuance
- ✅ Bidirectional processing
- ✅ Trained on balanced data
- ✅ Better minority class performance

**Training**:

- Epochs: 3
- Batch Size: 4,096
- Optimizer: Adam (lr=0.001)
- Loss: Sparse Categorical Cross-entropy
- Data: Upsampled balanced dataset

**Files**:

- Model: `sentiment_model.keras`

## 🎨 Portfolio Features

### Landing Page

Comprehensive overview featuring:

- **Hero Section**: Project description and key stats
- **Deliverables**: Notebooks, models, portfolio
- **Pipeline Details**: 8-phase process with visual breakdown
- **Preprocessing Techniques**: 4 core techniques explained
- **Model Comparison**: Side-by-side comparison table
- **Timeline**: 8 major development milestones
- **Team**: Team member roles and contributions

### Model Testers

Interactive interfaces for both models:

- **Input Textarea**: Enter custom review text
- **Example Reviews**: Pre-loaded examples for quick testing
- **Real-time Prediction**: Instant sentiment classification
- **Confidence Scores**: Display prediction confidence
- **Detailed Results**: Show sentiment emoji, label, confidence
- **Model Info**: Detailed architecture and training info

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Access at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📦 Dependencies

- **React**: 19.2.0
- **Vite**: 7.2.4
- **ESLint**: Code quality

## 🎯 Key Achievements

✅ Processed ~7 million Yelp tourism reviews
✅ Implemented comprehensive 8-phase preprocessing pipeline
✅ Addressed class imbalance through upsampling
✅ Developed two complementary ML models
✅ Created interactive web-based testing interface
✅ Achieved 100% data quality for ML training
✅ Generated production-ready models

## 📈 Metrics

| Metric              | Value                           |
| ------------------- | ------------------------------- |
| Dataset Size        | ~7,000,000 reviews              |
| Sentiment Classes   | 3 (Negative, Neutral, Positive) |
| Training Data       | Upsampled balanced              |
| Test Data           | 20% holdout                     |
| TF-IDF Dimensions   | 10,000                          |
| BiLSTM Embedding    | 128 dimensions                  |
| Vocab Size          | 60,000 tokens                   |
| Max Sequence Length | 200 tokens                      |

## 👥 Team Members

| Name         | Role                 | Responsibility                   |
| ------------ | -------------------- | -------------------------------- |
| **Nada**     | Data Collection Lead | User & business datasets         |
| **Houssem**  | EDA Specialist       | Review dataset exploration       |
| **Redouane** | Pipeline Lead        | Data integration & preprocessing |

## 📚 Related Files

In parent ScourgifyData repository:

- `notebooks/1st model/clean_dataset_joined.ipynb` - Model 1 development
- `notebooks/2nd model/model training.ipynb` - Model 2 development
- `notebooks/1st model/sentiment_logreg_model.pkl` - Saved Model 1
- `notebooks/1st model/tfidf_vectorizer.pkl` - TF-IDF vectorizer
- `notebooks/2nd model/sentiment_model.keras` - Saved Model 2
- `docs/report/` - Full project report

## 🔧 Technology Stack

- **Frontend**: React 19, Vite, CSS3
- **ML Framework**: TensorFlow/Keras, Scikit-learn
- **Data Processing**: Pandas, NumPy
- **Styling**: Modern CSS with animations
- **Data Source**: Yelp Academic Dataset

## 🎨 Design Features

- **Dark Theme**: Modern cyan/purple gradient background
- **Responsive**: Mobile, tablet, desktop support
- **Animated**: Smooth transitions and hover effects
- **Accessible**: Clear typography and color contrast
- **Interactive**: Real-time model predictions
- **Visual Indicators**: Emoji and color-coded sentiments

---

**ScourgifyData** - Sentiment Analysis for Tourism | January 2025
