from fastapi import FastAPI
from backend.api.routes import dataset_routes, model_routes, tuning_routes

app = FastAPI(title="ML Hyperparameter Tuning API")

app.include_router(dataset_routes.router)
app.include_router(model_routes.router)
app.include_router(tuning_routes.router)

@app.get("/")
def root():
    return {"message": "API running"}