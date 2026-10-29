# Sentiment Analysis in Tourism Platforms

This repository contains all code, data, analysis, and documentation for sentiment analysis on tourism review datasets.

---

## 📂 Project Structure Overview

```
sentiment-tourism-project/
├── data/
│   ├── BisnessDataSetLastVersion1.ipynb
│   ├── Business.ipynb
│   ├── clean_model_dataset.ipynb
│   ├── Datasets used.txt
│   └── README.md
├── docs/
│   ├── report/
│   ├── Site web portfolio du projet.txt
│   ├── 1er rapport.pdf
│   └── rapport_final_Scorgify (2).pdf
├── results/
│   └── visualizations/
├── src/
│   ├── 1er model/
│   │   ├── clean_dataset_joined.ipynb
│   │   ├── sentiment_logreg_model.pkl
│   │   └── testing_model01.ipynb
│   │   └── tfidf_vectorizer.pkl
│   ├── 2eme model/
│   │   ├── 2eme model/
│   │   │   ├── model training.ipynb
│   │   │   ├── sentiment_model.keras
│   │   │   └── testing_model02.ipynb
│   │   └── removing imbalance/
│   │       └── dataset_model_upsampling.ipynb
│   └── Part 1.pdf
│   └── Part 2.pdf
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 📊 Dataset Sources

| Dataset                                   | Description                   | Team Contributor |
| ----------------------------------------- | ----------------------------- | ---------------- |
| `data/BisnessDataSetLastVersion1.ipynb` | Business dataset with reviews | ?                |
| `data/Business.ipynb`                   | Tourism business data         | ?                |
| `data/redouane.ipynb`                   | Check‑in + review dataset    | Redouane         |
| `data/clean_model_dataset.ipynb`        | Empty notebook (placeholder)  |                  |

---

## 🗂️ Project Phases Covered by Folder Organization

| Phase                     | Folder                                    | Description                                             |
| ------------------------- | ----------------------------------------- | ------------------------------------------------------- |
| Data collection & EDA     | `data/`                                 | Raw notebooks & dataset descriptions                    |
| Cleaning & transformation | `src/`                                  | Scripts, models, notebooks for preprocessing & training |
| Visualization & reporting | `docs/` and `results/visualizations/` | PDFs, reports, and visual outputs                       |

---

## 📁 Key Directories

### `.samcode/`

Configuration and vector database for OpenCode.

### `data/`

All raw datasets and exploratory notebooks. Contains placeholder notebooks ready for data cleaning and integration.

### `docs/`

Project documentation, reports, and planning files.

### `results/visualizations/`

Generated visualizations and charts from analysis.

### `src/`

Production‑ready code:

- **`1er model/`**: First model version – notebooks, pickles, and trained models.
- **`2eme model/`**: Second model version – Keras model + training scripts.

### `src/2eme model/2eme model/`

Contains the core Keras sentiment‑analysis model (`sentiment_model.keras`), training notebook, and evaluation notebook.

---

## 📝 Notes

- **Large files** (e.g., `sentiment_model.keras`, PDFs) are stored in the repository but may exceed typical GitHub limits. Consider using Git LFS for future large files.
- All notebooks are documented with inline comments and descriptions.
- The codebase is organized for reproducibility and teamwork.
- For development, ensure dependencies from `requirements.txt` are installed.
- Keep `.gitignore` up‑to‑date to exclude sensitive data or large assets.

---

*📅 Updated after recent repository restructuring.*
