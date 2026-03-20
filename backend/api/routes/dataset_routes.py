from fastapi import APIRouter, UploadFile, File
from backend.services.dataset_service import load_dataset

router = APIRouter(prefix="/dataset", tags=["Dataset"])

@router.post("/upload")
def upload_dataset(file: UploadFile = File(...)):
    path = load_dataset(file)
    return {"message": "Dataset uploaded", "path": path}