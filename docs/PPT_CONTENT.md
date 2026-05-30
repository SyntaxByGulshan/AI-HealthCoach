# AI Health Coach - Project Presentation Content

## Slide 1: Title Slide
**Title:** AI Health Coach: A Personalized Lifestyle Management System
**Subtitle:** Bridging the Gap Between Health Tracking and Actionable Insights
**Presented By:** [Student Name]
**Roll Number:** [Roll Number]
**Guide:** [Supervisor Name]
**Department:** Computer Science and Engineering

---

## Slide 2: Introduction
**Overview**
*   **Definition:** A web-based application delivering real-time, personalized health recommendations.
*   **Core Concept:** Combines traditional health tracking (steps, water, sleep) with Generative AI.
*   **Goal:** To transform raw health data into actionable, human-like advice.

**Key Highlights**
*   AI-driven Diet and Workout plans.
*   Real-time metabolic rate prediction.
*   Interactive AI coaching chat.

---

## Slide 3: Problem Statement
**The Challenge**
*   **Rising Health Crisis:** Global increase in obesity and lifestyle-related diseases.
*   **Data Overload:** Existing apps track metrics but fail to interpret them for the user.
*   **Generic Advice:** Static diet templates do not account for individual preferences or restrictions.
*   **Accessibility:** Professional human health coaches are expensive and not available 24/7.

**The Need**
*   A cost-effective, scalable, and personalized solution that guides users toward better habits.

---

## Slide 4: Objectives
**Primary Goals**
*   **Develop a Web Application:** User-friendly interface for seamless health tracking.
*   **Integrate Generative AI:** Use Google Gemini API to create dynamic, personalized plans.
*   **Implement Machine Learning:** accurate prediction of Total Daily Energy Expenditure (TDEE).
*   **Ensure Privacy:** Client-side data persistence using LocalStorage.
*   **Gamification:** Encourage consistency through streaks and daily goals.

---

## Slide 5: Literature Review
**Existing Solutions**
*   **MyFitnessPal:** Excellent for calorie tracking but lacks generative planning capabilities.
*   **HealthifyMe:** Offers good coaching but relies heavily on expensive premium tiers.

**Research Gaps**
*   Lack of free, accessible tools combining tracking with intelligent planning.
*   Need for systems that adapt to user feedback in real-time.

**Scientific Basis**
*   Personalized interventions using Behavior Change Techniques (BCTs) are proven to be more effective than generic advice.

---

## Slide 6: System Analysis - Functional Requirements
**What the System Does**
*   **User Profile Management:** Handles personal stats (Age, Gender, Weight, Height, Goals).
*   **AI Planning Engine:** Generates 7-day Diet and Workout schedules tailored to the user.
*   **Daily Tracking:** Logs Water (ml), Sleep (hrs), Steps, and Mood.
*   **AI Coach Interface:** Provides a chat window for specific health queries and motivation.
*   **Progress Monitoring:** Visualizes weight trends and habit consistency.

---

## Slide 7: System Analysis - Non-Functional Requirements
**Quality Attributes**
*   **Performance:** Dashboard loads in < 1 second; AI predictions in < 500ms.
*   **Security:** API keys secured via environment variables; User data stored locally on the device.
*   **Scalability:** Modular architecture allows independent scaling of Frontend and AI services.
*   **Usability:** Responsive design (Mobile/Desktop), Dark Mode for reduced eye strain.
*   **Reliability:** Graceful error handling for network or API failures.

---

## Slide 8: System Architecture
**High-Level Overview**
*   **Architecture Style:** Client-Side SPA with Microservices.
*   **Frontend:** React (Vite) acting as the central orchestrator.
*   **Backend ML Service:** Python (FastAPI) for numerical computations.
*   **AI Service:** Google Gemini API for generative content.
*   **Data Layer:** Browser LocalStorage (User Data) and Joblib (ML Model).

*(Include Architecture Diagram here)*

---

## Slide 9: Technology Stack
**Frontend**
*   **Framework:** React 19
*   **State Management:** Redux Toolkit
*   **Styling:** Tailwind CSS 4
*   **Build Tool:** Vite

**Backend & AI**
*   **API Framework:** FastAPI (Python)
*   **Machine Learning:** Scikit-learn, Pandas
*   **Generative AI:** Google Gemini 1.5 Flash Model

---

## Slide 10: System Design - UML Diagrams
**Visualizing the System**
*   **Use Case Diagram:**
    *   Actors: User, AI System.
    *   Actions: Create Profile, Generate Plan, Log Activity.
*   **Class Diagram:**
    *   Entities: `User`, `DietPlan`, `WorkoutPlan`, `DailyLog`.
    *   Relationships: User *has* Plans; User *creates* Logs.
*   **Sequence Diagram:**
    *   Flow: User Request -> Frontend -> Gemini API -> JSON Response -> LocalStorage -> UI Display.

---

## Slide 11: Data Flow
**How Data Moves**
1.  **Input:** User enters physical stats in the Dashboard.
2.  **Processing (ML):** Stats sent to FastAPI Backend -> Random Forest Model -> TDEE Prediction.
3.  **Processing (AI):** User Context + TDEE sent to Gemini -> Structured JSON Plan Generation.
4.  **Storage:** All generated data and logs saved to Redux Store and persisted in LocalStorage.
5.  **Output:** Dynamic UI updates (Charts, Plan Cards, Progress Rings).

---

## Slide 12: Machine Learning Model
**Calorie Prediction Engine**
*   **Objective:** Predict Total Daily Energy Expenditure (TDEE) accurately.
*   **Algorithm:** Random Forest Regressor.
*   **Dataset:** 50,000 samples containing Age, Gender, Weight, Height, Activity Level.
*   **Preprocessing:** One-Hot Encoding for categorical data; StandardScaler for numeric data.
*   **Performance:**
    *   R-Squared Score: ~0.99
    *   Mean Absolute Error (MAE): ~22 kcal

---

## Slide 13: AI Integration (Gemini)
**Generative Intelligence**
*   **Model:** Google Gemini 1.5 Flash.
*   **SDK:** `google-generative-ai` for JavaScript.
*   **Prompt Engineering:**
    *   Role: "Expert Nutritionist and Fitness Coach".
    *   Context: User's specific goals (e.g., "Lose Weight", "Vegan").
    *   Output Enforcement: Strict JSON schema for easy parsing by the frontend.
*   **Function:** Generates weekly meal plans, workout routines, and answers chat queries.

---

## Slide 14: Implementation - Frontend
**Building the UI**
*   **Component-Based:** Modular components (e.g., `DietCard`, `ProgressRing`, `ChatInterface`).
*   **Global State:** Redux slices for `user`, `diet`, `workout`, and `habits`.
*   **Routing:** `react-router-dom` for navigation between Dashboard, Planner, and Profile.
*   **Design System:** Glassmorphism aesthetic using Tailwind utility classes.

---

## Slide 15: Implementation - Backend
**The ML Microservice**
*   **Framework:** FastAPI for high-performance, async execution.
*   **Model Serving:** `joblib` loads the pre-trained model into memory at startup.
*   **Endpoints:**
    *   `POST /predict`: Accepts user stats, returns TDEE and uncertainty metrics.
    *   `GET /health`: System status check.
*   **Validation:** Pydantic models ensure data integrity for requests and responses.

---

## Slide 16: Key Features Showcase
**1. Dynamic Dashboard**
*   Visualizes daily progress with animated rings.
*   Displays real-time BMR and BMI calculations.

**2. Smart Planner**
*   One-click generation of 7-day Diet and Workout plans.
*   Adapts to dietary preferences (Keto, Vegan, etc.).

**3. Wellness Tracker**
*   Logs Water, Sleep, Mood, and Steps.
*   Provides historical data visualization.

---

## Slide 17: Testing
**Quality Assurance**
*   **Unit Testing:** Verified individual logic (BMI calculation, Macro distribution).
*   **Integration Testing:** Ensured seamless data exchange between Frontend, Backend, and Gemini API.
*   **User Acceptance Testing (UAT):** Validated the "Generate Plan" flow with real user scenarios.
*   **Performance Testing:** Achieved Lighthouse scores of 98/100 for Performance and 100/100 for Accessibility.

---

## Slide 18: Results & Discussion
**Outcomes**
*   **AI Accuracy:** Gemini generates highly relevant, context-aware advice.
*   **Responsiveness:** System feels instant due to optimistic UI updates and fast API responses.
*   **Engagement:** Gamification elements (streaks) successfully motivate daily logging.
*   **Comparison:** Superior to static apps by offering infinite variability in planning.

---

## Slide 19: Future Scope
**Roadmap**
*   **Wearable Integration:** Sync with Fitbit/Apple Health for automated tracking.
*   **Computer Vision:** "Snap to Log" feature for food tracking using Image-to-Calories AI.
*   **Community:** Leaderboards, challenges, and social sharing features.
*   **Advanced ML:** Implementing Deep Learning (Neural Networks) for even more precise metabolic predictions.

---

## Slide 20: Conclusion
**Summary**
*   The AI Health Coach successfully demonstrates the power of integrating Large Language Models with personal health tracking.
*   It provides a scalable, free, and highly personalized alternative to expensive human coaching.

**Final Thought**
*   "By leveraging AI, we are not just tracking health; we are actively guiding users towards a better, healthier future."

---
