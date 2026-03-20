from fastapi import APIRouter

from backend.api.schemas.request_schema import TrainRequest

from backend.services.training_service import train_model

router = APIRouter(prefix="/model", tags=["Model"])

@router.post("/train")
def train(req: TrainRequest):
    result = train_model(req.model_name, req.params)
    return result