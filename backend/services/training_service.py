from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

def train_model(model_name, params):
    data = load_iris()
    X, y = data.data, data.target

    if model_name == "random_forest":
        model = RandomForestClassifier(**params)
    else:
        raise ValueError("Unsupported model")

    model.fit(X, y)
    accuracy = model.score(X, y)

    return {
        "accuracy": accuracy,
        "params": params
    }