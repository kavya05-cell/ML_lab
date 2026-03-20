from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

def tune_model(model_name, method):
    data = load_iris()
    X, y = data.data, data.target

    if model_name == "random_forest":
        model = RandomForestClassifier()

        param_grid = {
            "n_estimators": [50, 100, 150],
            "max_depth": [3, 5, 10]
        }

        grid = GridSearchCV(model, param_grid, cv=3)
        grid.fit(X, y)

        return {
            "best_params": grid.best_params_,
            "best_score": grid.best_score_
        }
    else:
        raise ValueError("Unsupported model")