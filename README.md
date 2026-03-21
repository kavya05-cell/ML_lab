# 🚀 Hyperparameter Tuning Visualizer (ML Playground)

## 📌 Overview

The **Hyperparameter Tuning Visualizer** is an interactive machine learning playground designed to help users **understand how hyperparameters impact model performance** through real-time experimentation and visualization.

Most beginners treat ML models as black boxes. This project solves that by enabling:

- Interactive hyperparameter tuning  
- Real-time model training  
- Performance visualization  
- Comparison of optimization strategies  

---

## 🎯 Problem Statement

Hyperparameter tuning is:

- Hidden in code  
- Hard to interpret  
- Not beginner-friendly  

As a result, most users:
- Use default parameters  
- Don’t understand model behavior  
- Rely blindly on libraries  

---

## 💡 Solution

An interactive system where users can:

- Adjust hyperparameters using sliders  
- Train models instantly  
- Visualize performance changes  
- Understand model behavior visually  

---

## 🧠 Features

### 1. Dataset Handling
- Upload CSV datasets  
- Preloaded datasets (Iris, Wine, Breast Cancer)  
- Automatic preprocessing:
  - Missing value handling  
  - Encoding  
  - Scaling  

---

### 2. Model Selection

Supported models:

- K-Nearest Neighbors (KNN)  
- Random Forest  
- Support Vector Machine (SVM)  
- Logistic Regression  

---

### 3. Hyperparameter Controls

| Model | Parameters |
|------|-----------|
| KNN | K value |
| Random Forest | n_estimators, max_depth |
| SVM | C, kernel |
| Logistic Regression | penalty, C |

---
 ### 4. Training Pipeline
Dataset → Preprocessing → Training → Evaluation → Tuning

---

Supports:

- Manual tuning  
- Grid Search  
- Random Search  
- Optuna (advanced tuning)  

---

### 5. Evaluation Metrics

- Accuracy  
- Precision  
- Recall  
- F1 Score  
- Confusion Matrix  

---

### 6. Visualization Dashboard

- Accuracy comparison  
- Hyperparameter vs performance graphs  
- Decision boundary visualization  
- Feature importance  

---

### 7. Experiment Tracking

Stores:


- Model  
- Hyperparameters  
- Metrics  
- Timestamp
---


Frontend (UI)
↓
Backend (FastAPI)
↓
ML Engine
↓
Evaluation + Visualization
↓
Storage (Models + Experiments)


hyperparameter-tuning/

├── ml_engine/
├── backend/
├── frontend/
├── visualizations/
├── experiments/
├── models/
├── data/
├── configs/
├── tests/
└── docs/

⚙️ Tech Stack
ML
scikit-learn
pandas
numpy
Backend
FastAPI
Uvicorn
Frontend
Streamlit / React
Visualization
Plotly
Matplotlib
Seaborn

🧪 Usage
Upload dataset
Select model
Adjust hyperparameters
Train model
Analyze results via visualizations
📈 Future Improvements
Bayesian Optimization
Hyperband
AutoML pipeline
Real-time training visualization
⚠️ Note
This project is only impactful if:
Visualization is strong
Hyperparameter effects are clearly shown
At least one advanced tuning method is implemented
Otherwise, it becomes a basic ML demo.
👤 Author
Kavya Rajput
Riddhi Gupta

---

### 4. Training Pipeline
