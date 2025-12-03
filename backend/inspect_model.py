import joblib
import os
import pandas as pd
import sklearn

try:
    model_path = 'd:/ai-healthCoach/backend/calorie_model.joblib'
    model = joblib.load(model_path)
    print(f"Model type: {type(model)}")
    
    if hasattr(model, 'feature_names_in_'):
        print(f"Feature names: {model.feature_names_in_}")
    elif hasattr(model, 'steps'): # Pipeline
        # Try to find the step that has feature names, usually the last estimator or a transformer
        print("Model is a Pipeline.")
        for name, step in model.steps:
            print(f"Step: {name}, Type: {type(step)}")
            if hasattr(step, 'feature_names_in_'):
                print(f"Feature names in step '{name}': {step.feature_names_in_}")
    
    # Try a dummy prediction to see if it works with current schema
    try:
        dummy_data = pd.DataFrame([{
            'age': 25,
            'gender': 'male',
            'weight': 70,
            'height': 175,
            'activity_level': 'moderate',
            'goal': 'maintain',
            'goal_weight': 70
        }])
        print("Attempting prediction with schema:")
        print(dummy_data.columns.tolist())
        pred = model.predict(dummy_data)
        print(f"Prediction successful: {pred}")
    except Exception as e:
        print(f"Prediction failed: {e}")
        if hasattr(e, 'args'):
            print(f"Exception args: {e.args}")

except Exception as e:
    print(f"Error loading or inspecting model: {e}")
