from pydantic import BaseModel

class TrainRequest(BaseModel):
    model_name: str
    params: dict

class TuneRequest(BaseModel):
    model_name: str
    method: str   # grid / random