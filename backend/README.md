# AI Health Coach Backend

This is the backend API for the AI Health Coach application, built with FastAPI.

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## Setup & Installation

1.  **Navigate to the backend directory:**
    It is critical to run these commands from inside the `backend` folder.

    ```bash
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

## Running the Server

To start the development server with hot-reload enabled:

```bash
python -m uvicorn main:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000).
Interactive API documentation is available at [http://localhost:8000/docs](http://localhost:8000/docs).

## Troubleshooting

### "Error loading ASGI app. Could not import module 'main'"
This error usually happens if you try to run the command from the root `AI-HealthCoach` directory instead of the `backend` directory. Make sure you `cd backend` first.

### "Model not loaded" Warning
You may see a warning: `Model file not found at .../calorie_model.joblib`.
This is expected if you haven't trained the model yet. The API will run, but the `/predict` endpoint will return an error until the model file is present.
