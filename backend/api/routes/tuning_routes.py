from fastapi import APIRouter

from backend.api.schemas.request_schema import TuneRequest

from backend.services.tuning_service import tune_model

router = APIRouter(prefix="/tuning", tags=["Tuning"])

@router.post("/")
def tune(req: TuneRequest):
    result = tune_model(req.model_name, req.method)
    return result