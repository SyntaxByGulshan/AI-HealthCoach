from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import os
import logging
from typing import Optional

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI Health Coach API",
    description="API for TDEE prediction and health metrics",
    version="1.0.0"
)

# CORS Setup
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class UserStats(BaseModel):
    age: int = Field(..., gt=0, lt=120, description="Age in years")
    gender: str = Field(..., description="male or female")
    weight: float = Field(..., gt=20, lt=500, description="Weight in kg")
    height: float = Field(..., gt=50, lt=300, description="Height in cm")
    activity_level: str = Field(..., description="sedentary, light, moderate, active, very_active")
    goal: str = Field(..., description="lose, maintain, gain")
    goal_weight: Optional[float] = Field(None, description="Target weight in kg")

class PredictionResponse(BaseModel):
    tdee: float
    uncertainty: float
    unit: str = "kcal/day"

# Global model variable
model_data = None

@app.on_event("startup")
def load_model():
    global model_data
    # Load user provided model
    model_path = os.path.join(os.path.dirname(__file__), 'calorie_model.joblib')
    
    if os.path.exists(model_path):
        try:
            model_data = joblib.load(model_path)
            logger.info(f"Model loaded from {model_path}")
        except Exception as e:
            logger.error(f"Failed to load model from {model_path}: {e}")
    else:
        logger.warning(f"Model file not found at {model_path}")
    
    if model_data is None:
        logger.warning("No model loaded. Predictions will fail.")

@app.get("/")
def read_root():
    return {"status": "online", "message": "Welcome to AI Health Coach API"}

@app.post("/predict", response_model=PredictionResponse)
def predict_tdee(stats: UserStats):
    if model_data is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Prepare input dataframe
        # Note: If goal_weight is None, we might need to handle it. 
        # For the dummy model, I added it as a feature. 
        # If the user's model expects it, we pass it. If it's optional, we might pass 0 or current weight.
        # Let's default to current weight if None for robustness
        gw = stats.goal_weight if stats.goal_weight is not None else stats.weight

        input_df = pd.DataFrame([{
            'age': stats.age,
            'gender': stats.gender.lower(),
            'weight': stats.weight,
            'height': stats.height,
            'activity_level': stats.activity_level.lower(),
            'goal': stats.goal.lower(),
            'goal_weight': gw
        }])
        
        # Check if model is a pipeline or just the model object
        if isinstance(model_data, dict) and 'pipeline' in model_data:
            pipeline = model_data['pipeline']
            uncertainty = model_data.get('uncertainty', 0.0)
        else:
            # Assume it's the raw model object (e.g. user's joblib)
            pipeline = model_data
            uncertainty = 0.0 # Unknown if not in our dict format

        prediction = pipeline.predict(input_df)[0]
        
        return {
            "tdee": round(float(prediction), 2),
            "uncertainty": round(float(uncertainty), 2)
        }
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
