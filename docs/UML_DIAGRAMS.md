# UML Diagrams

## 1. Use Case Diagram
Visualizes the interactions between actors and the system.

```mermaid
usecaseDiagram
    actor "User" as U
    actor "AI System (Gemini)" as AI
    actor "System Admin" as Admin

    package "AI Health Coach System" {
        usecase "Create Profile" as UC1
        usecase "View Dashboard" as UC2
        usecase "Generate Diet Plan" as UC3
        usecase "Generate Workout Plan" as UC4
        usecase "Log Daily Activity" as UC5
        usecase "Track Progress" as UC6
        usecase "Manage System Config" as UC7
    }

    U --> UC1
    U --> UC2
    U --> UC3
    U --> UC4
    U --> UC5
    U --> UC6

    UC3 ..> AI : Include
    UC4 ..> AI : Include

    Admin --> UC7
```

## 2. Class Diagram
Represents the static structure of the system's data and components.

```mermaid
classDiagram
    class UserProfile {
        +String id
        +String name
        +Int age
        +String gender
        +Float height
        +Float weight
        +String goal
        +updateProfile()
        +calculateBMI()
    }

    class DailyLog {
        +Date date
        +Int waterIntake
        +Float sleepHours
        +Int steps
        +List~String~ completedHabits
        +addWater(amount)
        +updateSleep(hours)
        +toggleHabit(habitId)
    }

    class Plan {
        +String id
        +String type
        +Date startDate
        +Date endDate
        +Object content
        +generate()
        +validate()
    }

    class DietPlan {
        +List~Meal~ meals
        +getCalories()
    }

    class WorkoutPlan {
        +List~Exercise~ exercises
        +getDifficulty()
    }

    class CaloriePredictor {
        +RandomForestRegressor model
        +predict(age, gender, weight, height, activity)
        +train(dataset)
    }

    UserProfile "1" -- "1..*" DailyLog : tracks
    UserProfile "1" -- "1..*" Plan : has
    Plan <|-- DietPlan
    Plan <|-- WorkoutPlan
    CaloriePredictor ..> UserProfile : uses
```

## 3. Sequence Diagram: Generate Diet Plan
Shows the dynamic interaction during plan generation.

```mermaid
sequenceDiagram
    participant User
    participant UI as React Component
    participant Controller as Redux Thunk
    participant ML as CaloriePredictor
    participant API as Express API
    participant DB as MongoDB
    participant Service as AI Service
    participant Gemini as Google API
    participant Store as Redux Store

    User->>UI: Click "Generate Diet Plan"
    UI->>Controller: dispatch(generateDietPlan(userProfile))
    
    Controller->>ML: predict(userProfile)
    ML-->>Controller: Target Calories (e.g. 2200)

    Controller->>API: POST /api/plans/generate
    API->>Service: callGenerateAPI(prompt + calories)
    Service->>Gemini: POST /v1beta/models/gemini-1.5-flash:generateContent
    activate Gemini
    Gemini-->>Service: JSON Response (Weekly Plan)
    deactivate Gemini
    
    alt Success
        Service-->>API: Parsed Plan Object
        API->>DB: Save Plan
        API-->>Controller: Plan Data
        Controller->>Store: dispatch(setDietPlan(plan))
        Store-->>UI: State Updated
        UI-->>User: Display Plan
    else Failure
        Service-->>API: Error
        API-->>Controller: Error Response
        Controller->>Store: dispatch(setFallbackPlan())
        UI-->>User: Display Fallback Plan + Error Toast
    end
```

## 4. Activity Diagram: Daily Check-in
Flowchart of the daily user routine.

```mermaid
activityDiagram-v2
    start
    :Open Dashboard;
    if (New Day?) then (yes)
        :Reset Daily Counters;
        :Archive Previous Day Log;
    else (no)
        :Load Current Progress;
    endif

    fork
        :Log Water Intake;
    fork again
        :Log Sleep Hours;
    fork again
        :Log Steps;
    fork again
        :Check off Habits;
    end fork

    :Calculate Daily Score;
    if (Score >= Goal?) then (yes)
        :Show Success Animation;
        :Award Bonus Points;
    endif
    
    :Save to LocalStorage;
    stop
```

## 5. Deployment Diagram
Illustrates the physical deployment of artifacts.

```mermaid
deploymentDiagram
    node "Client Device" {
        component "Web Browser" {
            artifact "React SPA"
        }
    }

    node "Cloud Infrastructure" {
        node "CDN / Host" {
            artifact "Static Assets (HTML/JS/CSS)"
        }
        
        node "Backend Server" {
            component "Node.js + Express"
        }

        node "ML Service" {
            component "Python + FastAPI"
        }

        node "Database Cluster" {
            database "MongoDB"
        }
        
        node "Google Cloud Platform" {
            component "Gemini API"
        }
    }

    "Web Browser" -- "HTTPS" --> "CDN / Host" : Requests Assets
    "Web Browser" -- "HTTPS/REST" --> "Backend Server" : API Calls
    "Backend Server" -- "TCP" --> "MongoDB" : Read/Write Data
    "Backend Server" -- "HTTP/gRPC" --> "ML Service" : Prediction Requests
    "Backend Server" -- "HTTPS/REST" --> "Gemini API" : Generates Content
```

## 6. Object Diagram
Snapshot of objects and their relationships at a specific point in time.

```mermaid
classDiagram
    class User_JohnDoe {
        id = "u123"
        name = "John Doe"
        goal = "Weight Loss"
    }
    class DietPlan_Week1 {
        id = "dp001"
        calories = 2200
        status = "Active"
    }
    class DailyLog_Nov28 {
        date = "2025-11-28"
        water = 1500ml
        steps = 5000
    }

    User_JohnDoe -- DietPlan_Week1 : has
    User_JohnDoe -- DailyLog_Nov28 : tracks
```

## 7. Component Diagram
Depicts the high-level software components and their dependencies.

```mermaid
graph TD
    subgraph Client
        FE[Frontend App]
        Redux[State Manager]
    end

    subgraph Backend
        Auth[Auth Service]
        Plan[Plan Service]
        API[API Gateway]
    end

    subgraph Data
        DB[(MongoDB)]
        Redis[(Redis Cache)]
    end

    subgraph External
        ML[ML Predictor]
        Gemini[Google Gemini]
    end

    FE --> Redux
    FE --> API
    API --> Auth
    API --> Plan
    Plan --> DB
    Plan --> Redis
    Plan --> ML
    Plan --> Gemini
```

## 8. Package Diagram
Organizes the system classes into logical packages.

```mermaid
classDiagram
    namespace Client_Layer {
        class Components
        class Pages
        class ReduxSlices
        class ApiServices
    }

    namespace Server_Layer {
        class Controllers
        class DataModels
        class ExpressRoutes
        class Middleware
    }

    namespace ML_Layer {
        class TrainingScripts
        class InferenceService
        class ModelRegistry
    }

    Client_Layer ..> Server_Layer : HTTP/JSON
    Server_Layer ..> ML_Layer : Internal API
```

## 9. Composite Structure Diagram
Details the internal structure of the `DietPlan` and `WorkoutPlan` classes.

```mermaid
classDiagram
    class DietPlan {
        +String id
        +List~Meal~ meals
    }
    class Meal {
        +String name
        +String time
        +List~FoodItem~ items
    }
    class FoodItem {
        +String name
        +Int calories
        +Macros macros
    }
    class Macros {
        +Int protein
        +Int carbs
        +Int fats
    }

    DietPlan *-- Meal : contains
    Meal *-- FoodItem : consists of
    FoodItem *-- Macros : has
```

## 10. Communication Diagram
Shows the collaboration between objects for the "Daily Check-in" process.

```mermaid
graph LR
    User((User))
    UI[Dashboard UI]
    Ctrl[Controller]
    Store[Redux Store]
    API[Backend API]
    DB[(Database)]

    User -- 1. Clicks Check-in --> UI
    UI -- 2. Dispatches Action --> Ctrl
    Ctrl -- 3. Updates State --> Store
    Ctrl -- 4. Syncs Data --> API
    API -- 5. Persists Log --> DB
    DB -.-> API : Confirm
    API -.-> Ctrl : Success
    Ctrl -.-> UI : Show Notification
```

## 11. Entity Relationship Diagram (ERD)
Visualizes the database schema and relationships.

```mermaid
erDiagram
    USER ||--o{ DAILY_LOG : has
    USER ||--o{ PLAN : generates
    USER {
        string id PK
        string email
        string password_hash
        string name
        int age
        float weight
        float height
        string goal
    }
    DAILY_LOG {
        string id PK
        string user_id FK
        date date
        int water_ml
        float sleep_hours
        int steps
        json habits_status
    }
    PLAN {
        string id PK
        string user_id FK
        string type
        date start_date
        date end_date
        json content
    }
```

## 12. Data Flow Diagram (DFD)
Shows how data moves through the system.

### Level 0: Context Diagram
```mermaid
graph LR
    User((User))
    System[AI Health Coach System]
    Gemini((Google Gemini AI))

    User -- Profile Data --> System
    User -- Daily Logs --> System
    System -- Health Plans --> User
    System -- Progress Reports --> User
    
    System -- Prompts --> Gemini
    Gemini -- Generated Content --> System
```

### Level 1: Process Diagram
```mermaid
graph TD
    User((User))
    P1(1.0 Manage Profile)
    P2(2.0 Generate Plan)
    P3(3.0 Track Activity)
    D1[(User DB)]
    D2[(Plan DB)]
    D3[(Activity DB)]
    ML(ML Service)
    AI(Gemini API)

    User --> P1
    P1 --> D1
    
    User --> P2
    D1 --> P2
    P2 --> ML
    ML --> P2
    P2 --> AI
    AI --> P2
    P2 --> D2
    
    User --> P3
    P3 --> D3
    D3 --> P3
```
