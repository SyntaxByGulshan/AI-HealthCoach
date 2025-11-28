# Developer Guide

## 1. Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   A Google Gemini API Key (Get it from [Google AI Studio](https://aistudio.google.com/))

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/ai-health-coach.git
    cd ai-health-coach
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    *   Create a `.env` file in the root directory.
    *   Add your API key:
        ```env
        VITE_GEMINI_API_KEY=your_actual_api_key_here
        ```

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 2. Project Structure

```text
ai-health-coach/
├── public/              # Static assets (images, icons)
├── src/
│   ├── assets/          # Imported assets
│   ├── components/      # Reusable UI components (Buttons, Cards)
│   ├── pages/           # Route components (Dashboard, DietPlan)
│   ├── services/        # API integration (gemini.js)
│   ├── store/           # Redux setup (slices, store configuration)
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles & Tailwind directives
├── docs/                # Project Documentation
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## 3. Scripts

*   `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
*   `npm run build`: Compiles TypeScript and builds the app for production in the `dist/` folder.
*   `npm run lint`: Runs ESLint to check for code quality issues.
*   `npm run preview`: Locally previews the production build.

## 4. Coding Standards

*   **Components**: Use Functional Components with Hooks.
*   **Styling**: Use Tailwind CSS utility classes. Avoid inline styles.
*   **State**: Use Redux for global state; `useState` for local component UI state.
*   **Naming**: PascalCase for Components (`UserProfile.tsx`), camelCase for functions/variables (`generatePlan`).
