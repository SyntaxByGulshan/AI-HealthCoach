# System Architecture

## 1. Executive Summary
The **AI Health Coach** is a comprehensive web application designed to assist users in achieving their health and fitness goals. By leveraging advanced Artificial Intelligence (Google Gemini), the platform provides personalized diet plans, workout routines, and daily habit tracking. The system is built with a modern, responsive frontend and is architected to scale into a full-stack solution with dedicated backend services and machine learning pipelines.

## 2. Architectural Overview

### 2.1 Current Architecture (Client-Side AI Integration)
Currently, the application operates as a **Single Page Application (SPA)** that interacts directly with the AI service.

*   **Client Layer**: A React-based frontend hosted on a CDN/Static Web Server (e.g., Vercel/Netlify). It handles all user interactions, state management, and routing.
*   **Service Layer (Client-Side)**: The frontend directly calls the **Google Gemini API** to generate health plans. This "Serverless-like" approach allows for rapid prototyping and reduced infrastructure costs.
*   **Data Persistence**: User data, including profiles, plans, and daily logs, is persisted locally using the browser's **LocalStorage**. This ensures data availability across sessions without a backend database in the MVP phase.

### 2.2 System Architecture (Full-Stack)
The system follows a **Layered Microservices** pattern to ensure scalability and maintainability.

*   **Client Layer**: The existing React App (Web) + Potential Mobile App (React Native).
*   **API Gateway**: A central entry point (e.g., Nginx, AWS API Gateway) to route requests, handle rate limiting, and manage authentication.
*   **Application Server (Backend)**: A **Node.js** server running **Express.js** to handle business logic, user management, and data orchestration.
*   **AI/ML Service**: A dedicated service (Python/Flask or TensorFlow Serving) to handle complex model inference, fine-tuning, and health scoring algorithms.
*   **Database Layer**:
    *   **Primary DB**: **MongoDB** (NoSQL) for storing flexible user profiles, diet plans, and workout logs.
    *   **Cache**: Redis for session management and caching frequent API responses.

## 3. Technology Stack

### 3.1 Frontend (Current)
*   **Framework**: [React 19](https://react.dev/) - The library for web and native user interfaces.
*   **Build Tool**: [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) - Strongly typed JavaScript for better maintainability.
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development.
*   **Routing**: [React Router DOM](https://reactrouter.com/) - Declarative routing for React web applications.
*   **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons.

### 3.2 AI & Machine Learning
*   **LLM Provider**: [Google Gemini 1.5 Flash](https://deepmind.google/technologies/gemini/) - Used for generating personalized text-based health plans (JSON output).
*   **Integration**: `@google/generative-ai` SDK.
*   **Calorie Prediction Model**:
    *   **Algorithm**: Random Forest Regressor (**Scikit-learn**).
    *   **Implementation**: **Python 3.x** Service using **FastAPI**.
    *   **Libraries**:
        *   `pandas`: Data manipulation and preprocessing.
        *   `numpy`: Numerical computations.
        *   `scikit-learn`: Model training and inference.
        *   `joblib`: Model serialization.
    *   **Purpose**: Predicts the precise daily caloric intake required for the user based on their specific profile.
    *   **Inputs**: Age, Gender, Weight, Height, Activity Level, Goal (Weight Loss/Gain).
    *   **Output**: Recommended Daily Calories (kcal).

### 3.3 Backend
*   **Runtime**: **Node.js** (v20+) - JavaScript runtime built on Chrome's V8 engine.
*   **Framework**: **Express.js** - Fast, unopinionated, minimalist web framework for Node.js.
*   **Authentication**: **JWT** (JSON Web Tokens) for secure stateless authentication.

### 3.4 Database
*   **NoSQL**: **MongoDB** - Document-oriented database used for storing:
    *   User Profiles
    *   Weekly Diet & Workout Plans
    *   Daily Activity Logs
*   **ODM**: **Mongoose** - Elegant mongodb object modeling for node.js.

## 4. Key Design Decisions
*   **Client-Side AI**: Chosen for the MVP to minimize backend complexity and latency.
*   **Redux for State**: Selected over Context API to handle complex global state (User Profile + Multiple Plans + Daily Tracking) with better debugging capabilities (Redux DevTools).
*   **Tailwind CSS**: Chosen for its small bundle size in production and ease of maintaining a consistent design system.
