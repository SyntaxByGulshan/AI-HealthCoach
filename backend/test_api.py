import requests
import json

# Test the backend with the same data the user used
test_data = {
    "age": 50,
    "gender": "male",
    "weight": 100,
    "height": 200,
    "activity_level": "sedentary",
    "goal": "lose",
    "goal_weight": 80
}

print("Testing AI Health Coach API...")
print(f"Input data: {json.dumps(test_data, indent=2)}")
print()

try:
    response = requests.post("http://localhost:8000/predict", json=test_data)
    
    print(f"Status code: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print("✅ Prediction successful!")
        print(f"TDEE: {result['tdee']} {result['unit']}")
        print(f"Uncertainty: ±{result['uncertainty']} kcal/day")
        print()
        print(f"Expected from model test: ~1876.10 kcal/day")
    else:
        print(f"❌ Error: {response.status_code}")
        print("Response:")
        print(response.text)
except Exception as e:
    print(f"❌ Failed to connect: {e}")
    import traceback
    traceback.print_exc()
