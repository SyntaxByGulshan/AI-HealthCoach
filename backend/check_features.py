import joblib
import pandas as pd

# Load the model
model = joblib.load('d:/ai-healthCoach/backend/calorie_model.joblib')

# Check for feature names
if hasattr(model, 'feature_names_in_'):
    print("Feature names required by model:")
    print(list(model.feature_names_in_))
    print(f"\nTotal features: {len(model.feature_names_in_)}")
elif hasattr(model, 'steps'):
    print("Model is a Pipeline")
    for name, step in model.steps:
        if hasattr(step, 'feature_names_in_'):
            print(f"Features in '{name}':")
            print(list(step.feature_names_in_))
else:
    print("Cannot determine feature names")
