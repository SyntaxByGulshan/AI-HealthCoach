# Requirements Documentation

## 1. Functional Requirements

### 1.1 User Authentication & Profile
*   **FR-01**: The system shall allow users to register using email and password.
*   **FR-02**: The system shall allow users to log in securely.
*   **FR-03**: The system shall allow users to create and update their profile (Age, Gender, Height, Weight, Activity Level, Dietary Preferences).
*   **FR-04**: The system shall calculate and display the user's BMI based on profile data.

### 1.2 AI Plan Generation
*   **FR-05**: The system shall generate a personalized Weekly Diet Plan based on user profile and calorie needs.
*   **FR-06**: The system shall generate a personalized Weekly Workout Plan based on user fitness level and goals.
*   **FR-07**: The system shall use a Random Forest ML model to predict the user's optimal daily calorie intake.
*   **FR-08**: The system shall provide a fallback plan in case the AI service is unavailable.

### 1.3 Daily Tracking & Dashboard
*   **FR-09**: The system shall allow users to log daily water intake.
*   **FR-10**: The system shall allow users to log daily sleep duration.
*   **FR-11**: The system shall allow users to log daily steps.
*   **FR-12**: The system shall allow users to check off completed daily habits.
*   **FR-13**: The system shall display real-time progress bars for all tracked metrics.

### 1.4 Gamification
*   **FR-14**: The system shall award points for completing daily tasks (e.g., +10 points for hitting water goal).
*   **FR-15**: The system shall display a daily score and provide visual feedback (e.g., confetti) upon goal completion.

## 2. Non-Functional Requirements

### 2.1 Performance
*   **NFR-01**: The application shall load the dashboard in under 2 seconds on 4G networks.
*   **NFR-02**: AI Plan generation shall complete within 10 seconds.

### 2.2 Security
*   **NFR-03**: User passwords shall be hashed (e.g., bcrypt) before storage.
*   **NFR-04**: All API communication shall be encrypted using HTTPS/TLS 1.2+.
*   **NFR-05**: API endpoints shall be protected using JWT authentication.

### 2.3 Scalability
*   **NFR-06**: The backend shall support horizontal scaling to handle increased user load.
*   **NFR-07**: The database shall be sharded if user data exceeds 1TB.

### 2.4 Usability
*   **NFR-08**: The UI shall be responsive and function correctly on Mobile, Tablet, and Desktop devices.
*   **NFR-09**: The interface shall follow WCAG 2.1 AA accessibility standards.

## 3. User Stories

### US-01: Profile Setup
"As a **new user**, I want to **enter my physical details and goals**, so that **the system can understand my health needs**."

### US-02: Get Diet Plan
"As a **health-conscious user**, I want to **generate a weekly meal plan**, so that **I know exactly what to eat to reach my weight goal**."

### US-03: Track Water
"As a **user**, I want to **quickly log a glass of water**, so that **I can ensure I stay hydrated throughout the day**."

### US-04: View Progress
"As a **user**, I want to **see my daily progress at a glance**, so that **I stay motivated to complete my remaining tasks**."
