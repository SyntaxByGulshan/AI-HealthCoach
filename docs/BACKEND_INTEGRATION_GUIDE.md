# How to Use the Backend ML Model for TDEE Predictions

## ✅ Already Integrated!

Good news! Your **Profile.tsx** already integrates with the backend API! Here's what's happening:

### Current Integration (Profile.tsx lines 35-66)

When a user saves their profile, the app:
1. Calls the backend API at `http://localhost:8000/predict`
2. Gets the TDEE prediction from the trained ML model
3. Saves it to Redux store and displays it

```typescript
const calculateTDEE = async (data: UserProfileData) => {
    setIsCalculating(true);
    try {
        const response = await fetch('http://localhost:8000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                age: data.age,
                gender: data.gender,
                weight: data.weight,
                height: data.height,
                activity_level: data.activity_level,
                goal: data.goal,
                goal_weight: data.goal_weight
            }),
        });
        
        const result = await response.json();
        return result.tdee; // Returns the ML prediction
    } catch (error) {
        console.error("Error calculating TDEE:", error);
        return null;
    }
}
```

## 🚀 How to Use in Other Components

I've created two new helpful files:

### 1. **API Service** ([src/services/api.ts](file:///d:/ai-healthCoach/src/services/api.ts))

Reusable functions for calling the backend:

```typescript
import { predictTDEE, mapActivityLevel, mapGoal } from '../services/api';

// Example usage:
const result = await predictTDEE({
    age: 25,
    gender: 'male',
    weight: 70,
    height: 175,
    activity_level: 'moderate',
    goal: 'maintain',
    goal_weight: 70
});

console.log(result.tdee); // e.g., 2500
console.log(result.uncertainty); // e.g., 125
```

### 2. **Example Component** ([src/components/TDEEPredictionExample.tsx](file:///d:/ai-healthCoach/src/components/TDEEPredictionExample.tsx))

Two ways to use predictions in your components:

**Option A: Component**
```typescript
import { TDEEPredictionExample } from '../components/TDEEPredictionExample';

// In your page:
<TDEEPredictionExample />
```

**Option B: Custom Hook**
```typescript
import { useTDEEPrediction } from '../components/TDEEPredictionExample';

function MyComponent() {
    const { tdee, loading, error, getPrediction } = useTDEEPrediction();
    
    return (
        <div>
            <button onClick={getPrediction}>Get Prediction</button>
            {loading && <p>Loading...</p>}
            {tdee && <p>Your TDEE: {tdee} kcal/day</p>}
        </div>
    );
}
```

## 📋 Quick Start Guide

### Step 1: Ensure Backend is Running

```bash
cd d:\ai-healthCoach\backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 2: Test from Frontend

1. **Create/Edit Profile**: Go to Profile page and enter your details
2. **Save**: Click "Create Profile" or "Save Changes"
3. **View Result**: The TDEE will be calculated and displayed automatically

### Step 3: Use in Dashboard or Other Pages

```typescript
import { useAppSelector } from '../store/hooks';

function Dashboard() {
    const userData = useAppSelector(state => state.user.userData);
    
    return (
        <div>
            {userData?.tdee && (
                <div>
                    <h3>Daily Calories</h3>
                    <p>{Math.round(userData.tdee)} kcal/day</p>
                </div>
            )}
        </div>
    );
}
```

## 🔄 Data Flow

```
1. User fills profile form (Profile.tsx)
       ↓
2. Form submitted → calculateTDEE() called
       ↓
3. POST request to http://localhost:8000/predict
       ↓
4. Backend ML model processes:
   - Calculates BMI
   - Calculates weight_diff
   - Runs Random Forest prediction
       ↓
5. Backend returns { tdee, uncertainty, unit }
       ↓
6. Frontend saves to Redux store (userData.tdee)
       ↓
7. Profile page displays result
       ↓
8. Any component can access via useAppSelector
```

## 🎯 Common Use Cases

### Use Case 1: Display TDEE on Dashboard

```typescript
const tdee = useAppSelector(state => state.user.userData?.tdee);
// Display: {tdee} kcal/day
```

### Use Case 2: Calculate New Prediction

```typescript
import { predictTDEE } from '../services/api';

const newPrediction = await predictTDEE({
    age: 30,
    gender: 'female',
    weight: 65,
    height: 165,
    activity_level: 'light',
    goal: 'lose'
});
```

### Use Case 3: Update Profile & Recalculate

```typescript
import { updateUserData } from '../store/slices/userSlice';
import { predictTDEE } from '../services/api';

// Update weight
const newWeight = 68;
const newTdee = await predictTDEE({ ...userData, weight: newWeight });

dispatch(updateUserData({ 
    weight: newWeight,
    tdee: newTdee.tdee 
}));
```

## ⚙️ Configuration

### Change Backend URL

Edit `src/services/api.ts`:
```typescript
const BACKEND_URL = 'http://localhost:8000'; // Change to production URL
```

## 🐛 Troubleshooting

### "Failed to calculate TDEE"
- **Check**: Is backend running? Visit http://localhost:8000
- **Fix**: Start backend with `python -m uvicorn main:app --reload`

### CORS Errors
- Backend already configured to allow all origins
- Check browser console for specific error

### Model Not Loaded
- Check backend logs for "Model loaded from..."
- Ensure `calorie_model.joblib` exists in backend folder

## 📊 Backend API Reference

### Endpoint: POST /predict

**Request:**
```json
{
  "age": 25,
  "gender": "male",
  "weight": 70,
  "height": 175,
  "activity_level": "moderate",
  "goal": "maintain",
  "goal_weight": 70
}
```

**Response:**
```json
{
  "tdee": 2345.67,
  "uncertainty": 117.28,
  "unit": "kcal/day"
}
```

**Error Response:**
```json
{
  "detail": "Model not loaded"
}
```

## ✨ Summary

You're all set! The backend is already integrated and working. The ML model predictions are:

✅ Calculated when profile is saved  
✅ Stored in Redux (userData.tdee)  
✅ Displayed on Profile page  
✅ Available to all components via useAppSelector  

Just make sure the backend server is running, and everything will work automatically!
