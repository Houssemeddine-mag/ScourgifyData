# Sentiment Analysis in Tourism Platforms

A project focused on performing sentiment analysis on tourism review datasets to extract insights about customer opinions, business performance, and check‑in patterns. The work spans data collection, cleaning, exploratory analysis, model training (two model versions), evaluation, and visualization/reporting.

---

## 👥 Team & Responsibilities

| Team Member | Focus area |
|------------|------------|
| **Nada** | User & business datasets |
| **Houssem** | Reviews dataset (EDA + cleaning) |
| **Redouane** | Review & check‑in datasets |

---

## 🎯 What We Worked On

| Phase | Deliverables |
|-------|--------------|
| **Data collection & EDA** | Gathered tourism review datasets, performed initial exploration |
| **Cleaning & transformation** | Built preprocessing scripts, handled missing values, text cleaning, feature engineering |
| **ML modeling** | Developed two model versions: a logistic regression model (`src/1er model/sentiment_logreg_model.pkl`) and a Keras deep‑learning model (`src/2eme model/2eme model/sentiment_model.keras`) |
| **Evaluation** | Computed performance metrics, generated reports and visualizations |
| **Visualization & reporting** | Created charts, word clouds, and a final project report (PDF) |

---

## 📂 Project Structure Overview

```
sentiment-tourism-project/
├── .samcode/              # OpenCode configuration & vector DB
├── data/                  # Raw datasets & notebooks
├── docs/                  # Reports & planning documents
├── results/visualizations/ # Generated charts & graphs
├── src/                   # Source code & trained models
│   ├── 1er model/         # First model (logreg + pickles)
│   └── 2eme model/        # Second model (Keras + training notebooks)
├── .gitignore
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

---

## 🚀 Getting Started

1. **Install dependencies**: `pip install -r requirements.txt`
2. **Open the notebooks** in `data/` for exploration or `src/` for model training/evaluation.
3. **Run the notebooks** sequentially to reproduce the pipeline from data cleaning to model training.

---

*📅 Updated to separate description from formal documentation.*