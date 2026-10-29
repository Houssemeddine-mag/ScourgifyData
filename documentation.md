# Sentiment Analysis in Tourism Platforms – Documentation

## 📋 Overview

This project performs sentiment analysis on tourism-related review datasets. The workflow includes:

- Data collection and exploratory data analysis (EDA)
- Text preprocessing and feature engineering
- Training two sentiment classification models:
  1. **Logistic Regression** (saved as a pickle in `src/1er model/sentiment_logreg_model.pkl`)
  2. **Keras Deep Learning model** (`src/2eme model/2eme model/sentiment_model.keras`)
- Evaluation and generation of visual reports

The repository is organized to support team collaboration, reproducibility, and easy integration of new models or datasets.

---

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Houssemeddine-mag/ScourgifyData.git
   cd ScourgifyData
   ```
2. Install the required Python packages (see `requirements.txt`). If the file is empty, install the commonly used libraries manually:
   ```bash
   pip install numpy pandas scikit-learn tensorflow matplotlib seaborn jupyter
   ```
3. Launch JupyterLab / Jupyter Notebook:
   ```bash
   jupyter lab
   ```
   or
   ```bash
   jupyter notebook
   ```

---

## ▶️ How to Run the Project

| Step | Notebook | Description |
|------|----------|-------------|
| 1 | `data/01_data_exploration.ipynb` (if present) | Initial exploration of the raw datasets |
| 2 | `data/02_data_cleaning.ipynb` | Clean text, handle missing values, create features |
| 3 | `src/1er model/model training.ipynb` (or equivalent) | Train the logistic‑regression baseline model |
| 4 | `src/2eme model/2eme model/model training.ipynb` | Train the Keras deep‑learning model (includes upsampling for class imbalance) |
| 5 | `src/1er model/testing_model01.ipynb` / `src/2eme model/2eme model/testing_model02.ipynb` | Evaluate the trained models on validation/test data |
| 6 | `results/visualizations/` | Generate and inspect charts, word clouds, and performance graphs |

Open the desired notebook in Jupyter and run all cells sequentially.

---

## 📊 Dataset Descriptions

| File | Source | Notes |
|------|--------|-------|
| `data/BisnessDataSetLastVersion1.ipynb` | Kaggle – business dataset with reviews | Used for the first model |
| `data/Business.ipynb` | Kaggle – tourism business data | Supplementary business metadata |
| `data/redouane.ipynb` | Kaggle – check‑in + review dataset | Used by Redouane for EDA |
| `data/clean_model_dataset.ipynb` | Placeholder | Currently empty; can be used for a consolidated cleaned dataset |

Dataset links are listed in `data/Datasets used.txt`.

---

## 🧩 Model Details

### 1️⃣ First Model (Logistic Regression)
- **Location**: `src/1er model/sentiment_logreg_model.pkl`
- **Training data**: Upsampled imbalanced dataset (see Kaggle links above)
- **Preprocessing**: TF‑IDF vectorization (vectorizer saved as `tfidf_vectorizer.pkl`)
- **Evaluation metrics**: Accuracy, Precision, Recall, F1‑score (see notebook `testing_model01.ipynb`)

### 2️⃣ Second Model (Keras Deep Learning)
- **Location**: `src/2eme model/2eme model/sentiment_model.keras`
- **Architecture**: Simple feed‑forward network (details in `model training.ipynb`)
- **Training data**: Same upsampled dataset, with class‑balanced sampling
- **Evaluation metrics**: Accuracy, loss curves, confusion matrix (see `testing_model02.ipynb`)

---

## 📈 Results & Visualizations

- Charts and word clouds are stored in `results/visualizations/`.
- Performance reports (precision/recall curves, loss plots) are generated during notebook execution.
- The final project report (PDF) is located in `docs/report/` and summarizes findings, model comparisons, and business insights.

---

## 📁 Folder Responsibilities (Quick Reference)

| Folder | Main content | Owner |
|--------|--------------|-------|
| `data/` | Raw notebooks & dataset descriptions | Nada / Houssem / Redouane |
| `src/1er model/` | First model, pickles, notebooks | Houssem |
| `src/2eme model/` | Keras model, training/up‑sampling notebooks | Redouane |
| `docs/` | Project report, planning docs | Team |
| `results/visualizations/` | Generated charts & graphs | Team |
| `.samcode/` | OpenCode config & vector DB | — |

---

## 🛡️ Notes & Tips

- **Large files** (`sentiment_model.keras`, PDFs) exceed GitHub’s 50 MB recommendation; consider Git LFS for future versions.
- Keep the `requirements.txt` file updated whenever new dependencies are added.
- All notebooks should contain clear markdown cells explaining the steps and results.
- If you add a new model or dataset, update this documentation accordingly.

---

*🗂️ This file serves as the formal documentation for the project. For a concise project overview, see `README.md`.*