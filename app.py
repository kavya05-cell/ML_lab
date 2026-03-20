import streamlit as st
import pandas as pd
import numpy as np
from sklearn.datasets import load_iris, load_breast_cancer, load_wine, make_classification
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from io import StringIO
import time

# Set page configuration
st.set_page_config(
    page_title="ML Experiment Dashboard",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: bold;
        background: linear-gradient(45deg, #667eea 25%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1rem;
        border-radius: 10px;
        color: white;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .sidebar-header {
        font-size: 1.5rem;
        font-weight: bold;
        color: #667eea;
        margin-bottom: 1rem;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'trained_models' not in st.session_state:
    st.session_state.trained_models = {}
if 'current_dataset' not in st.session_state:
    st.session_state.current_dataset = None
if 'training_history' not in st.session_state:
    st.session_state.training_history = []

def load_sample_dataset(dataset_name):
    """Load sample datasets"""
    if dataset_name == "Iris":
        data = load_iris()
    elif dataset_name == "Breast Cancer":
        data = load_breast_cancer()
    elif dataset_name == "Wine":
        data = load_wine()
    else:
        # Generate synthetic dataset
        X, y = make_classification(n_samples=1000, n_features=20, n_informative=10,
                                 n_redundant=10, n_classes=2, random_state=42)
        return pd.DataFrame(X, columns=[f'feature_{i}' for i in range(20)]), None

    df = pd.DataFrame(data.data, columns=data.feature_names)
    df['target'] = data.target
    return df, data.target_names

def train_model(model_name, X_train, y_train, params=None):
    """Train a machine learning model"""
    if model_name == "Random Forest":
        model = RandomForestClassifier(random_state=42, **(params or {}))
    elif model_name == "Gradient Boosting":
        model = GradientBoostingClassifier(random_state=42, **(params or {}))
    elif model_name == "SVM":
        model = SVC(random_state=42, **(params or {}))
    elif model_name == "Logistic Regression":
        model = LogisticRegression(random_state=42, max_iter=1000, **(params or {}))
    else:
        raise ValueError("Unsupported model")

    # Train the model
    model.fit(X_train, y_train)

    return model

def evaluate_model(model, X_test, y_test):
    """Evaluate model performance"""
    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, output_dict=True)

    return {
        'accuracy': accuracy,
        'precision': report['weighted avg']['precision'],
        'recall': report['weighted avg']['recall'],
        'f1_score': report['weighted avg']['f1-score'],
        'predictions': y_pred
    }

def perform_grid_search(model_name, X_train, y_train, param_grid):
    """Perform hyperparameter tuning using GridSearchCV"""
    if model_name == "Random Forest":
        model = RandomForestClassifier(random_state=42)
    elif model_name == "Gradient Boosting":
        model = GradientBoostingClassifier(random_state=42)
    elif model_name == "SVM":
        model = SVC(random_state=42)
    elif model_name == "Logistic Regression":
        model = LogisticRegression(random_state=42, max_iter=1000)
    else:
        raise ValueError("Unsupported model")

    grid_search = GridSearchCV(model, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
    grid_search.fit(X_train, y_train)

    return grid_search.best_estimator_, grid_search.best_params_, grid_search.best_score_

def plot_confusion_matrix(y_true, y_pred, class_names=None):
    """Plot confusion matrix"""
    cm = confusion_matrix(y_true, y_pred)
    fig, ax = plt.subplots(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=ax,
                xticklabels=class_names, yticklabels=class_names)
    ax.set_xlabel('Predicted')
    ax.set_ylabel('Actual')
    ax.set_title('Confusion Matrix')
    return fig

def plot_feature_importance(model, feature_names):
    """Plot feature importance for tree-based models"""
    if hasattr(model, 'feature_importances_'):
        importance_df = pd.DataFrame({
            'feature': feature_names,
            'importance': model.feature_importances_
        }).sort_values('importance', ascending=False)

        fig = px.bar(importance_df.head(10), x='importance', y='feature',
                    orientation='h', title='Top 10 Feature Importance')
        return fig
    return None

def main():
    # Main header
    st.markdown('<h1 class="main-header">🧠 ML Experiment Dashboard</h1>', unsafe_allow_html=True)
    st.markdown("Train, tune, and evaluate machine learning models with an intuitive interface")

    # Sidebar
    with st.sidebar:
        st.markdown('<h2 class="sidebar-header">⚙️ Configuration</h2>', unsafe_allow_html=True)

        # Dataset selection
        st.subheader("📊 Dataset")
        dataset_option = st.selectbox(
            "Choose Dataset",
            ["Iris", "Breast Cancer", "Wine", "Synthetic"],
            help="Select a dataset or upload your own CSV"
        )

        # File upload
        uploaded_file = st.file_uploader("Upload CSV (optional)", type=['csv'])

        # Model selection
        st.subheader("🤖 Model Selection")
        model_name = st.selectbox(
            "Algorithm",
            ["Random Forest", "Gradient Boosting", "SVM", "Logistic Regression"]
        )

        # Hyperparameters
        st.subheader("🔧 Hyperparameters")
        if model_name == "Random Forest":
            n_estimators = st.slider("Number of Trees", 10, 200, 100)
            max_depth = st.slider("Max Depth", 3, 20, 10)
            params = {"n_estimators": n_estimators, "max_depth": max_depth}
        elif model_name == "Gradient Boosting":
            n_estimators = st.slider("Number of Trees", 10, 200, 100)
            learning_rate = st.slider("Learning Rate", 0.01, 1.0, 0.1)
            max_depth = st.slider("Max Depth", 3, 10, 3)
            params = {"n_estimators": n_estimators, "learning_rate": learning_rate, "max_depth": max_depth}
        elif model_name == "SVM":
            C = st.slider("C (Regularization)", 0.1, 10.0, 1.0)
            kernel = st.selectbox("Kernel", ["rbf", "linear", "poly", "sigmoid"])
            params = {"C": C, "kernel": kernel}
        else:  # Logistic Regression
            C = st.slider("C (Regularization)", 0.1, 10.0, 1.0)
            params = {"C": C}

        # Test size
        test_size = st.slider("Test Size", 0.1, 0.5, 0.2)

    # Main content
    tab1, tab2, tab3, tab4 = st.tabs(["📊 Data Exploration", "🎯 Model Training", "🔍 Hyperparameter Tuning", "📈 Model Comparison"])

    # Load dataset
    if uploaded_file is not None:
        df = pd.read_csv(uploaded_file)
        if 'target' not in df.columns:
            st.error("CSV must contain a 'target' column")
            return
        X = df.drop('target', axis=1)
        y = df['target']
        feature_names = X.columns.tolist()
        target_names = sorted(y.unique())
    else:
        df, target_names = load_sample_dataset(dataset_option)
        X = df.drop('target', axis=1)
        y = df['target']
        feature_names = X.columns.tolist()

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42, stratify=y)

    with tab1:
        st.header("📊 Data Exploration")

        col1, col2 = st.columns(2)

        with col1:
            st.subheader("Dataset Overview")
            st.write(f"**Shape:** {df.shape}")
            st.write(f"**Features:** {len(feature_names)}")
            st.write(f"**Classes:** {len(target_names)}")
            st.write(f"**Class Distribution:**")
            class_counts = pd.Series(y).value_counts().sort_index()
            for i, count in enumerate(class_counts):
                label = target_names[i] if target_names is not None and isinstance(target_names, (list, np.ndarray)) and i < len(target_names) else str(i)
                st.write(f"- {label}: {count}")

        with col2:
            st.subheader("Feature Statistics")
            st.dataframe(X.describe())

        st.subheader("Data Preview")
        st.dataframe(df.head())

        # Correlation heatmap
        if len(feature_names) <= 10:  # Only show for smaller datasets
            st.subheader("Feature Correlation")
            corr = X.corr()
            fig, ax = plt.subplots(figsize=(10, 8))
            sns.heatmap(corr, annot=True, cmap='coolwarm', ax=ax)
            st.pyplot(fig)

    with tab2:
        st.header("🎯 Model Training")

        if st.button("🚀 Train Model", type="primary"):
            with st.spinner("Training model..."):
                progress_bar = st.progress(0)

                # Scale features if needed
                if model_name in ["SVM", "Logistic Regression"]:
                    scaler = StandardScaler()
                    X_train_scaled = scaler.fit_transform(X_train)
                    X_test_scaled = scaler.transform(X_test)
                else:
                    X_train_scaled = X_train
                    X_test_scaled = X_test

                progress_bar.progress(30)

                # Train model
                model = train_model(model_name, X_train_scaled, y_train, params)
                progress_bar.progress(70)

                # Evaluate
                results = evaluate_model(model, X_test_scaled, y_test)
                progress_bar.progress(100)

                # Store results
                model_key = f"{model_name}_{len(st.session_state.trained_models)}"
                st.session_state.trained_models[model_key] = {
                    'model': model,
                    'params': params,
                    'results': results,
                    'model_name': model_name,
                    'timestamp': time.time()
                }

                st.session_state.training_history.append({
                    'model': model_name,
                    'accuracy': results['accuracy'],
                    'params': params,
                    'timestamp': time.time()
                })

            st.success("✅ Model trained successfully!")

            # Display results
            col1, col2, col3, col4 = st.columns(4)

            with col1:
                st.metric("Accuracy", f"{results['accuracy']:.3f}")

            with col2:
                st.metric("Precision", f"{results['precision']:.3f}")

            with col3:
                st.metric("Recall", f"{results['recall']:.3f}")

            with col4:
                st.metric("F1-Score", f"{results['f1_score']:.3f}")

            # Confusion Matrix
            st.subheader("Confusion Matrix")
            fig = plot_confusion_matrix(y_test, results['predictions'],
                                      target_names if target_names is not None and len(target_names) > 2 else None)
            st.pyplot(fig)

            # Feature Importance (for tree-based models)
            if model_name in ["Random Forest", "Gradient Boosting"]:
                st.subheader("Feature Importance")
                fig = plot_feature_importance(model, feature_names)
                if fig:
                    st.plotly_chart(fig)

    with tab3:
        st.header("🔍 Hyperparameter Tuning")

        st.info("🔧 Configure hyperparameter search space")

        # Parameter grid configuration
        if model_name == "Random Forest":
            st.subheader("Random Forest Parameters")
            n_estimators_range = st.multiselect("n_estimators", [10, 50, 100, 150, 200], default=[50, 100, 150])
            max_depth_range = st.multiselect("max_depth", [3, 5, 7, 10, None], default=[3, 5, 10])
            param_grid = {
                'n_estimators': n_estimators_range,
                'max_depth': max_depth_range
            }
        elif model_name == "Gradient Boosting":
            st.subheader("Gradient Boosting Parameters")
            n_estimators_range = st.multiselect("n_estimators", [50, 100, 150], default=[50, 100])
            learning_rate_range = st.multiselect("learning_rate", [0.01, 0.1, 0.2], default=[0.01, 0.1])
            max_depth_range = st.multiselect("max_depth", [3, 5, 7], default=[3, 5])
            param_grid = {
                'n_estimators': n_estimators_range,
                'learning_rate': learning_rate_range,
                'max_depth': max_depth_range
            }
        elif model_name == "SVM":
            st.subheader("SVM Parameters")
            C_range = st.multiselect("C", [0.1, 1, 10], default=[0.1, 1])
            kernel_options = st.multiselect("kernel", ["rbf", "linear"], default=["rbf"])
            param_grid = {
                'C': C_range,
                'kernel': kernel_options
            }
        else:  # Logistic Regression
            st.subheader("Logistic Regression Parameters")
            C_range = st.multiselect("C", [0.1, 1, 10], default=[0.1, 1])
            param_grid = {'C': C_range}

        if st.button("🎯 Start Hyperparameter Tuning", type="primary"):
            with st.spinner("Performing hyperparameter search..."):
                # Scale features if needed
                if model_name in ["SVM", "Logistic Regression"]:
                    scaler = StandardScaler()
                    X_train_scaled = scaler.fit_transform(X_train)
                else:
                    X_train_scaled = X_train

                best_model, best_params, best_score = perform_grid_search(
                    model_name, X_train_scaled, y_train, param_grid
                )

                # Evaluate best model
                if model_name in ["SVM", "Logistic Regression"]:
                    X_test_scaled = scaler.transform(X_test)
                    results = evaluate_model(best_model, X_test_scaled, y_test)
                else:
                    results = evaluate_model(best_model, X_test, y_test)

            st.success("✅ Hyperparameter tuning completed!")

            st.subheader("Best Parameters Found")
            st.json(best_params)
            st.metric("Best Cross-Validation Score", f"{best_score:.3f}")
            st.metric("Test Accuracy", f"{results['accuracy']:.3f}")

    with tab4:
        st.header("📈 Model Comparison")

        if st.session_state.training_history:
            st.subheader("Training History")

            # Convert to DataFrame for display
            history_df = pd.DataFrame(st.session_state.training_history)
            history_df['timestamp'] = pd.to_datetime(history_df['timestamp'], unit='s')

            # Display as table
            st.dataframe(history_df[['model', 'accuracy', 'timestamp']].sort_values('timestamp', ascending=False))

            # Plot comparison
            if len(history_df) > 1:
                st.subheader("Accuracy Comparison")
                fig = px.bar(history_df, x='model', y='accuracy',
                           title='Model Accuracy Comparison', color='model')
                st.plotly_chart(fig)
        else:
            st.info("🤖 Train some models first to see comparisons!")

if __name__ == "__main__":
    main()