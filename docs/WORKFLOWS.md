# Workflows and Data Flow

## 1. User Journey Maps

### 1.1 Onboarding & Profile Setup
This flow ensures the system gathers necessary data to personalize the experience.

1.  **Landing Page**: User arrives at the application.
2.  **Get Started**: User clicks "Get Started" and enters the Profile Setup Wizard.
3.  **Data Entry**:
    *   **Personal Info**: Name, Age, Gender.
    *   **Physical Stats**: Height, Weight.
    *   **Goals**: Target Weight, Primary Goal (Weight Loss/Gain/Maintenance).
    *   **Preferences**: Dietary preferences (Veg/Non-Veg), Activity Level.
4.  **Completion**: User submits data.
5.  **System Action**: Data is validated and stored in Redux/LocalStorage.
6.  **Redirection**: User is redirected to the Dashboard.

### 1.2 AI Plan Generation
The core feature where the user requests a personalized plan.

1.  **Trigger**: User navigates to "Diet Plan" or "Workout Plan" page.
2.  **Check**: System checks if a valid plan exists for the current week.
3.  **Action**: If no plan exists, User clicks "Generate Plan".
4.  **Processing**:
    *   **Step 1: Calorie Prediction**: System passes user stats to the **Random Forest Model** to get the target daily calories (e.g., 2200 kcal).
    *   **Step 2: Plan Generation**: System constructs a prompt using User Profile data AND the predicted calorie target.
    *   Request sent to Google Gemini API.
    *   Loading state displayed to user.
5.  **Response**: AI returns a JSON structure containing the weekly plan.
6.  **Fallback**: If AI fails, system loads a default fallback plan.
7.  **Display**: Plan is rendered on the UI.

### 1.3 Daily Tracking & Gamification
The engagement loop for daily usage.

1.  **Daily Check-in**: User opens Dashboard.
2.  **Logging**:
    *   **Water**: User increments water counter (+250ml).
    *   **Sleep**: User inputs hours slept.
    *   **Habits**: User checks off daily habits (e.g., "No Sugar").
3.  **Feedback**:
    *   Progress bars update in real-time.
    *   **Gamification**: Points are awarded for completing tasks.
    *   **Visuals**: Confetti or success messages on reaching goals.
4.  **Persistence**: Updates are saved immediately to LocalStorage.

## 2. Data Flow Description

### 2.1 State Management (Redux)
The application uses a unidirectional data flow pattern.

*   **Actions**: Events triggered by UI (e.g., `SET_USER`, `UPDATE_WATER`, `GENERATE_PLAN`).
*   **Reducers**: Pure functions that take current state and action to produce new state.
*   **Store**: The single source of truth holding the entire application state.
*   **Selectors**: Functions to retrieve specific data from the store for UI components.

### 2.2 Data Persistence Strategy
Data is persisted in a centralized **MongoDB** database via the Backend API.

*   **Save**: Redux middleware intercepts state changes and dispatches async actions (Thunks) to send `POST/PUT` requests to the Express API.
*   **Load**: On app initialization, the frontend sends a `GET /user/profile` request to fetch the latest data from the server and hydrate the Redux store.
*   **Offline Mode**: `LocalStorage` is used as a temporary cache to allow limited functionality when offline, syncing with the server once connectivity is restored.

### 2.3 API Interaction Flow
1.  **Component**: Calls a Redux Thunk (e.g., `updateWaterIntake`).
2.  **Service Layer (Frontend)**: Uses `axios` or `fetch` to make an HTTP request.
3.  **API Gateway / Backend**:
    *   **Express Controller**: Receives the request.
    *   **Service Layer (Backend)**: Validates business logic.
    *   **Database**: Updates the `DailyLog` document in **MongoDB**.
4.  **Response**: Backend returns the updated resource.
5.  **Redux**: Store is updated with the new data.
