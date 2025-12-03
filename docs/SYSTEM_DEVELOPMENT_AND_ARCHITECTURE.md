# Chapter 3: System Development and Architecture

## 3.1 Introduction

### Overview of the System
The AI Health Coach is a comprehensive digital health platform designed to provide personalized fitness and nutrition guidance. It integrates advanced Artificial Intelligence (AI) with modern web technologies to create an intelligent, responsive, and user-centric health management system. The application serves as a virtual personal trainer and nutritionist, offering tailored diet plans, workout routines, and real-time habit tracking.

### Purpose of the Architecture
The system architecture is designed to ensure scalability, maintainability, and a seamless user experience. It adopts a **Hybrid Full-Stack Architecture**, combining a responsive client-side frontend with a robust backend Machine Learning (ML) service and cloud-based AI integration. This design allows for:
-   **Real-time Interaction**: Instant feedback on user actions and tracking.
-   **Intelligent Processing**: Offloading complex ML tasks to a dedicated backend.
-   **Scalable AI**: Leveraging cloud APIs for generative tasks (diet/workout plans).
-   **Data Persistence**: Reliable storage of user progress and preferences.

### High-Level Explanation of Component Interaction
The system operates through three main interacting components:
1.  **Frontend Client (React)**: The user interface where users input data, view plans, and track progress. It manages application state and communicates with external services.
2.  **Backend ML Service (FastAPI)**: A dedicated Python server that hosts the trained Machine Learning model. It processes user data to predict Total Daily Energy Expenditure (TDEE) .
3.  **Cloud AI Service (Google Gemini)**: An external API used for generative tasks. It creates detailed, structured diet and workout plans based on user profiles and natural language prompts.

---

## 3.2 System Requirements

### 3.2.1 Functional Requirements

The system is designed to fulfill the following core functions:

1.  **User Profile Management**:
    *   Create and update user profiles (age, gender, weight, height, goals).
    *   Calculate and display Body Mass Index (BMI) and Basal Metabolic Rate (BMR).
2.  **AI-Powered Planning**:
    *   Generate personalized weekly diet plans with macronutrient breakdowns.
    *   Create tailored workout routines based on fitness levels.
    *   Regenerate plans based on changing user needs.
3.  **Health Metrics Prediction**:
    *   Predict accurate TDEE using a trained Random Forest model.
    *   Provide uncertainty estimates for predictions.
4.  **Daily Tracking**:
    *   Track daily water intake, sleep duration, and mood/energy levels.
    *   Monitor goal completion and maintain daily streaks.
5.  **Interactive AI Coach**:
    *   Provide a chat interface for health-related queries.
    *   Offer context-aware advice based on the user's current plan and stats.

### 3.2.2 Non-Functional Requirements

1.  **Performance**:
    *   The dashboard must load within 2 seconds.
    *   TDEE predictions should be returned in under 500ms.
    *   AI plan generation should complete within 10-15 seconds.
2.  **Security**:
    *   Secure handling of API keys (environment variables).
    *   Safe data storage in the browser's LocalStorage.
    *   Input validation to prevent injection attacks.
3.  **Scalability**:
    *   Modular architecture allowing independent scaling of frontend and backend.
    *   Stateless backend design for easy horizontal scaling.
4.  **Usability**:
    *   Responsive design working seamlessly on mobile, tablet, and desktop.
    *   Intuitive navigation and clear visual feedback.
    *   Dark mode interface for reduced eye strain.
5.  **Reliability**:
    *   Graceful error handling for API failures.
    *   Offline capability for viewing previously loaded data.

---

## 3.3 System Design Principles

### Design Approach
The system follows a **Modular and Layered Architecture**:
*   **Modular**: Functionalities are broken down into distinct modules (User, Diet, Workout, Habits), making the codebase easy to maintain and extend.
*   **Layered**: Clear separation between the Presentation Layer (UI), Business Logic Layer (Redux/State), and Data/Service Layer (API integrations).

### Technology Selection Reasoning
*   **React 19**: Chosen for its component-based architecture and efficient DOM updates.
*   **TypeScript**: Ensures type safety, reducing runtime errors and improving developer productivity.
*   **FastAPI**: Selected for the backend due to its high performance, native async support, and easy integration with Python ML libraries.
*   **Redux Toolkit**: Provides a predictable state container, essential for managing complex application state (plans, user data, tracking).
*   **Tailwind CSS**: Enables rapid UI development with a utility-first approach, ensuring consistency and responsiveness.

### Design Constraints
*   **Browser Storage**: Reliance on LocalStorage means data is local to the device.
*   **API Rate Limits**: Dependency on external AI APIs requires handling rate limits and potential downtime.

---

## 3.4 System Architecture Overview

### High-Level Description
The architecture is a modern web application stack. The **Frontend** is a Single Page Application (SPA) built with React. It communicates with the **Backend ML Service** via REST API for numerical predictions and with **Google Gemini** via SDK for generative content.

### Major Components
1.  **Presentation Layer**: React components, Pages, and CSS styles.
2.  **State Management Layer**: Redux store, slices, and selectors.
3.  **Service Layer**: API clients for Backend and Gemini.
4.  **Backend Layer**: FastAPI server, Pydantic models, ML inference engine.
5.  **Data Layer**: LocalStorage (Browser) and Joblib Model File (Server).

### Communication Flow
1.  **User Action**: User updates weight in the Dashboard.
2.  **State Update**: Redux updates the user store.
3.  **API Call**: The `predictTDEE` service sends updated stats to the Backend.
4.  **Processing**: Backend calculates features, runs the Random Forest model, and returns the result.
5.  **UI Update**: The Dashboard receives the TDEE and updates the display.

### System Architecture Diagram

*(Note: Please refer to the generated diagram image in the `diagrams` folder)*

**Diagram Description**:
The diagram illustrates the central React Frontend connecting to two distinct services: the Python Backend (hosting the ML model) and the Google Gemini Cloud API. Data flows bi-directionally, with the frontend acting as the orchestrator.

---

## 3.5 Architecture Diagram Explanation

### Frontend Layer
*   **Role**: The client-side application running in the user's browser.
*   **Responsibilities**: Rendering UI, handling user input, managing session state, and coordinating API calls.
*   **Key Tech**: React, Redux, Vite.

### Backend ML Service
*   **Role**: A specialized microservice for numerical computation and prediction.
*   **Responsibilities**: Hosting the `calorie_model.joblib`, performing feature engineering (BMI, weight diff calculation), and serving predictions via REST endpoints.
*   **Key Tech**: Python, FastAPI, Scikit-learn, Pandas.

### Cloud AI Service
*   **Role**: External intelligence provider.
*   **Responsibilities**: Generating creative and structured content (diet plans, workout routines, chat responses) that requires Large Language Model capabilities.
*   **Key Tech**: Google Gemini API.

### Data Flow
*   **Frontend ↔ Backend**: JSON payloads containing user stats (age, weight, etc.) are sent; numerical predictions (TDEE, uncertainty) are returned.
*   **Frontend ↔ Cloud AI**: Prompts and context are sent; structured JSON (plans) or text (chat) are returned.

---

## 3.6 Data Flow Diagrams (DFD)

### 3.6.1 DFD Level 0 (Context Diagram)
*   **Entity**: User
*   **Process**: AI Health Coach System
*   **Data Flow**:
    *   User inputs -> System (Profile, Goals, Logs)
    *   System outputs -> User (Plans, Predictions, Progress)

### 3.6.2 DFD Level 1
*   **Subsystems**:
    1.  **User Profile Management**: Handles registration and updates.
    2.  **Plan Generation**: Orchestrates AI calls for diets/workouts.
    3.  **Tracking System**: Records daily habits and logs.
    4.  **ML Prediction**: Interfaces with the backend model.
*   **Data Movement**: User data flows from Profile Management to Plan Generation and ML Prediction subsystems.

---

## 3.7 UML Diagrams

### 3.7.1 Use Case Diagram
*   **Actors**: User, AI System.
*   **Key Use Cases**:
    *   Create Profile
    *   Generate Diet Plan
    *   Log Daily Habits
    *   View Progress
    *   Chat with AI Coach

### 3.7.2 Class Diagram
*   **Key Classes**:
    *   `User`: Attributes (name, age, weight, etc.), Methods (updateProfile, calculateBMI).
    *   `DietPlan`: Attributes (meals, calories, macros).
    *   `WorkoutPlan`: Attributes (exercises, duration, difficulty).
    *   `HabitLog`: Attributes (date, water, sleep, mood).

### 3.7.3 Sequence Diagram
*   **Scenario**: Generating a TDEE Prediction.
*   **Flow**:
    1.  User updates profile.
    2.  Frontend calls `predictTDEE()`.
    3.  Backend receives request.
    4.  Backend loads model & calculates features.
    5.  Backend returns prediction.
    6.  Frontend updates UI.

### 3.7.4 Activity Diagram
*   **Process**: Weekly Plan Generation.
*   **Steps**: Check if plan exists -> If no, gather user prefs -> Construct prompt -> Call Gemini API -> Parse JSON -> Save to Store -> Display Plan.

---

## 3.8 Backend System Development

### Technologies Used
*   **Framework**: FastAPI (Python)
*   **Server**: Uvicorn (ASGI)
*   **ML Library**: Scikit-learn, Joblib, Pandas

### API Endpoints Design
*   `POST /predict`: Accepts `UserStats` JSON. Returns `{"tdee": float, "uncertainty": float, "unit": "kcal/day"}`.
*   `GET /`: Health check endpoint.

### Server Architecture
The backend is a stateless REST API. It loads the ML model into memory on startup (`lifespan` event or global scope) to ensure low-latency predictions. It uses Pydantic models for strict request validation.

---

## 3.9 Frontend System Development

### React Architecture
*   **Components**: Functional components with Hooks (`useState`, `useEffect`).
*   **Routing**: `react-router-dom` for client-side navigation between Dashboard, Diet, Workout, etc.

### State Management
*   **Redux Toolkit**: Used for global state.
    *   `userSlice`: Stores profile data.
    *   `dietSlice` / `workoutSlice`: Stores generated plans.
    *   `dailyHabitsSlice`: Stores tracking logs.
*   **Persistence**: A custom middleware/subscriber saves the Redux state to `localStorage` on every update.

### UI/UX Design
*   **Styling**: Tailwind CSS for rapid, responsive styling.
*   **Theme**: Dark mode aesthetic with glassmorphism effects (translucent cards).
*   **Icons**: Lucide-React for consistent iconography.

---

## 3.10 Machine Learning Model Development



### 3.10.1 Data Preparation and Feature Engineering
*   **Dataset**: `calorie_prediction_dataset_50k.csv` (50,000 samples).
*   **Target Variable**: `calories`.
*   **Key Steps**:
    *   **Required Columns Check**: Ensured presence of `age`, `gender`, `weight`, `height`.
    *   **BMI Calculation**: `BMI = weight_kg / (height_m^2)`. Heights of 0 were treated as NaN and filled with the median.
    *   **Weight Difference**: `weight_diff = goal_weight - weight`. If `goal_weight` was present, the difference was calculated; otherwise, it defaulted to 0.0.
    *   **Categorical Handling**: `activity_level` and `goal` defaulted to 'unknown' if missing.
    *   **Train/Test Split**: Data was split into 80% training and 20% testing sets using `random_state=42`.

### 3.10.2 Preprocessing Pipeline
A `ColumnTransformer` was used to apply specific transformations to numeric and categorical features:
*   **Numeric Features**: `age`, `weight`, `height`, `BMI`, `weight_diff`.
    *   **Transformation**: `StandardScaler` for standardization.
*   **Categorical Features**: `gender`, `activity_level`, `goal`.
    *   **Transformation**: `OneHotEncoder(handle_unknown="ignore", sparse_output=False)` for one-hot encoding.

### 3.10.3 Model Architectures and Training

#### Scikit-learn RandomForest Regressor
*   **Implementation**: A Pipeline combining the preprocessor and `RandomForestRegressor`.
*   **Hyperparameters**: `n_estimators=200`, `random_state=42`, `n_jobs=-1`.
*   **Training**: Fitted on the training data (`X_train`, `y_train`).
*   **Persistence**: Saved as `calorie_model.pkl` (pickle) and `calorie_model.joblib` (joblib).

#### Keras Neural Network (Optional)
*   **Architecture**: Sequential neural network.
    *   **Input Layer**: `Input(shape=(input_dim,))` (15 features after preprocessing).
    *   **Hidden Layers**: Three Dense layers (128, 64, 32 units) with ReLU activation.
    *   **Output Layer**: `Dense(1, activation="linear")` for regression.
*   **Compilation**:
    *   **Optimizer**: Adam (`learning_rate=1e-3`).
    *   **Loss Function**: MSE (Mean Squared Error).
    *   **Metrics**: MAE (Mean Absolute Error).
*   **Training**: 50 Epochs, Batch Size 32, with EarlyStopping and ModelCheckpoint.
*   **Persistence**: Saved as `keras_calorie_model.h5`.

### 3.10.4 Model Performance
Both models were evaluated on the held-out test set.

**Scikit-learn RandomForest Regressor Metrics**:
*   **Mean Absolute Error (MAE)**: 22.51
*   **Root Mean Squared Error (RMSE)**: 29.51
*   **R-squared (R2)**: 0.9983

**Keras Neural Network Metrics**:
*   **Mean Absolute Error (MAE)**: 0.35
*   **Root Mean Squared Error (RMSE)**: 0.43
*   **R-squared (R2)**: 1.0000

### 3.10.5 Conclusion
Both models demonstrate strong predictive capabilities for calorie estimation. The Keras Neural Network notably achieved superior performance metrics (MAE 0.35 vs 22.51), suggesting it captures the underlying patterns in the data more effectively. However, the RandomForest Regressor is currently integrated into the backend for its robustness and ease of deployment.

---

## 3.11 Cloud AI Integration

### Gemini API Usage
The system uses the `google-generative-ai` SDK.
*   **Model**: `gemini-1.5-flash`.
*   **Configuration**: `responseMimeType: "application/json"` is used to enforce structured output.

### Prompt Engineering
Prompts are carefully constructed to include:
1.  **Role Definition**: "You are an expert nutritionist..."
2.  **User Context**: JSON string of user profile and goals.
3.  **Task**: "Generate a 7-day meal plan..."
4.  **Output Format**: Explicit JSON schema requirements.

---

## 3.12 System Workflow

### End-to-End Workflow
1.  **Onboarding**: User lands on the app, fills out their profile.
2.  **Initialization**: App calculates BMI, fetches TDEE from Backend, and generates initial Diet/Workout plans via Gemini.
3.  **Daily Routine**: User logs in, checks the Dashboard, views today's meals/exercises, and logs habits (water, sleep).
4.  **Progress**: As user logs data, the Progress page updates charts and stats.
5.  **Adaptation**: If user updates their weight, the TDEE and plans are recalculated.

---

## 3.13 Deployment Architecture

### Backend Hosting
*   The FastAPI backend is designed to be containerized (Docker) and deployed to a cloud provider (e.g., AWS EC2, Google Cloud Run, or Render).
*   It requires the `calorie_model.joblib` file to be present in the container.

### Frontend Hosting
*   The React frontend is a static site after building (`npm run build`).
*   It can be deployed to any static host (Vercel, Netlify, GitHub Pages).

### Model Deployment
*   The model is embedded within the backend service ("Model-as-a-Service"). This simplifies deployment as there is no separate model server; the API wraps the model directly.

---

## 3.14 Summary

The AI Health Coach system architecture successfully integrates distinct technologies to solve the problem of personalized health management. By decoupling the Frontend (UI/UX), Backend (ML/Computation), and Cloud AI (Generative Content), the system achieves a balance of performance, scalability, and intelligence. The use of industry-standard tools like React, FastAPI, and Scikit-learn ensures the system is robust, maintainable, and ready for future enhancements.
