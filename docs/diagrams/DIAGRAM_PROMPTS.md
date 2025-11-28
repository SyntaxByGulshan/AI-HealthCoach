# AI-Generated Diagram Prompts for AI Health Coach Project

Use these prompts with AI image generation tools (ChatGPT, Claude, Midjourney, DALL-E, etc.) to create professional UML diagrams for your project report.

---

## 1. Use Case Diagram

**Prompt:**
```
Create a professional UML Use Case Diagram for an "AI Health Coach System" with clean white background and standard UML notation.

ACTORS (stick figures):
- User (left side)
- AI System (Gemini) (right side)
- System Admin (bottom right)

SYSTEM BOUNDARY:
Draw a large rectangle labeled "AI Health Coach System" containing these use cases as ellipses:
- Create Profile
- View Dashboard
- Generate Diet Plan
- Generate Workout Plan
- Log Daily Activity
- Track Progress
- Manage System Config

RELATIONSHIPS:
- User connects to (solid lines): Create Profile, View Dashboard, Generate Diet Plan, Generate Workout Plan, Log Daily Activity, Track Progress
- "Generate Diet Plan" has dashed arrow pointing to AI System actor with label "<<include>>"
- "Generate Workout Plan" has dashed arrow pointing to AI System actor with label "<<include>>"
- System Admin connects to: Manage System Config

Style: Professional UML, clear labels, proper spacing, black lines on white background.
```

---

## 2. Class Diagram

**Prompt:**
```
Create a professional UML Class Diagram for an AI Health Coach System with clean white background.

CLASSES (rectangles divided into 3 sections: name, attributes, methods):

1. UserProfile
   Attributes:
   - id: String
   - name: String
   - age: Int
   - gender: String
   - height: Float
   - weight: Float
   - goal: String
   Methods:
   + updateProfile()
   + calculateBMI()

2. DailyLog
   Attributes:
   - date: Date
   - waterIntake: Int
   - sleepHours: Float
   - steps: Int
   - completedHabits: List<String>
   Methods:
   + addWater(amount)
   + updateSleep(hours)
   + toggleHabit(habitId)

3. Plan (parent class)
   Attributes:
   - id: String
   - type: String
   - startDate: Date
   - endDate: Date
   - content: Object
   Methods:
   + generate()
   + validate()

4. DietPlan (inherits from Plan)
   Attributes:
   - meals: List<Meal>
   Methods:
   + getCalories()

5. WorkoutPlan (inherits from Plan)
   Attributes:
   - exercises: List<Exercise>
   Methods:
   + getDifficulty()

6. CaloriePredictor
   Attributes:
   - model: RandomForestRegressor
   Methods:
   + predict(age, gender, weight, height, activity)
   + train(dataset)

RELATIONSHIPS:
- UserProfile to DailyLog: solid line with "1" on UserProfile side, "1..*" on DailyLog side, label "tracks"
- UserProfile to Plan: solid line with "1" on UserProfile side, "1..*" on Plan side, label "has"
- DietPlan to Plan: inheritance arrow (hollow triangle pointing to Plan)
- WorkoutPlan to Plan: inheritance arrow (hollow triangle pointing to Plan)
- CaloriePredictor to UserProfile: dashed arrow with label "<<uses>>"

Style: Standard UML class diagram notation, clear hierarchy, professional layout.
```

---

## 3. Object Diagram

**Prompt:**
```
Create a professional UML Object Diagram showing a snapshot of system state for AI Health Coach with clean white background.

OBJECTS (rectangles with underlined names and attribute values):

1. :User_JohnDoe
   id = "u123"
   name = "John Doe"
   goal = "Weight Loss"

2. :DietPlan_Week1
   id = "dp001"
   calories = 2200
   status = "Active"

3. :DailyLog_Nov28
   date = "2025-11-28"
   water = 1500ml
   steps = 5000

LINKS (solid lines between objects):
- User_JohnDoe to DietPlan_Week1 with label "has"
- User_JohnDoe to DailyLog_Nov28 with label "tracks"

Style: Standard UML object diagram with underlined object names, clear attribute values, professional layout.
```

---

## 4. Component Diagram

**Prompt:**
```
Create a professional UML Component Diagram for AI Health Coach System with clean white background.

LAYERS/PACKAGES (grouped boxes):

CLIENT LAYER:
- Frontend App (component box with <<component>> stereotype)
- State Manager (component box)

BACKEND LAYER:
- Auth Service (component box)
- Plan Service (component box)
- API Gateway (component box)

DATA LAYER:
- MongoDB (database cylinder symbol)
- Redis Cache (database cylinder symbol)

EXTERNAL LAYER:
- ML Predictor (component box)
- Google Gemini (component box)

DEPENDENCIES (dashed arrows with open arrowheads):
- Frontend App → State Manager
- Frontend App → API Gateway
- API Gateway → Auth Service
- API Gateway → Plan Service
- Plan Service → MongoDB
- Plan Service → Redis Cache
- Plan Service → ML Predictor
- Plan Service → Google Gemini

Style: Standard UML component diagram with proper component notation, clear layers, professional layout.
```

---

## 5. Package Diagram

**Prompt:**
```
Create a professional UML Package Diagram for AI Health Coach System with clean white background.

PACKAGES (folder-style boxes with tab at top):

1. "Client_Layer" package containing:
   - Components (class)
   - Pages (class)
   - ReduxSlices (class)
   - ApiServices (class)

2. "Server_Layer" package containing:
   - Controllers (class)
   - DataModels (class)
   - ExpressRoutes (class)
   - Middleware (class)

3. "ML_Layer" package containing:
   - TrainingScripts (class)
   - InferenceService (class)
   - ModelRegistry (class)

DEPENDENCIES (dashed arrows):
- Client_Layer → Server_Layer labeled "HTTP/JSON"
- Server_Layer → ML_Layer labeled "Internal API"

Style: Standard UML package diagram with folder-style packages, clear class names, professional layout.
```

---

## 6. Composite Structure Diagram

**Prompt:**
```
Create a professional UML Composite Structure Diagram showing the internal composition of "DietPlan" class for AI Health Coach with clean white background.

CLASSES WITH COMPOSITION (filled diamond ◆):

1. DietPlan (main class)
   Attributes:
   - id: String
   - meals: List<Meal>

2. Meal (composed within DietPlan)
   Attributes:
   - name: String
   - time: String
   - items: List<FoodItem>

3. FoodItem (composed within Meal)
   Attributes:
   - name: String
   - calories: Int
   - macros: Macros

4. Macros (composed within FoodItem)
   Attributes:
   - protein: Int
   - carbs: Int
   - fats: Int

COMPOSITION RELATIONSHIPS (lines with filled diamond on container side):
- DietPlan ◆---- Meal with label "contains" and multiplicity "*"
- Meal ◆---- FoodItem with label "consists of" and multiplicity "*"
- FoodItem ◆---- Macros with label "has" and multiplicity "1"

Style: Standard UML composite structure diagram, filled diamonds for composition, clear hierarchy.
```

---

## 7. Communication Diagram

**Prompt:**
```
Create a professional UML Communication Diagram for "Daily Check-in" process in AI Health Coach with clean white background.

OBJECTS (boxes and symbols):
- User (actor stick figure or circle)
- Dashboard UI (rectangle)
- Controller (rectangle)
- Redux Store (rectangle)
- Backend API (rectangle)
- Database (cylinder)

NUMBERED MESSAGES (arrows with sequence numbers):
1. User → Dashboard UI: "1: Clicks Check-in"
2. Dashboard UI → Controller: "2: Dispatches Action"
3. Controller → Redux Store: "3: Updates State"
4. Controller → Backend API: "4: Syncs Data"
5. Backend API → Database: "5: Persists Log"
6. Database → Backend API: "6: Confirm" (dashed return arrow)
7. Backend API → Controller: "7: Success" (dashed return arrow)
8. Controller → Dashboard UI: "8: Show Notification" (dashed return arrow)

Style: Standard UML communication diagram with numbered messages along association lines, clear sequence.
```

---

## 8. Entity Relationship Diagram (ERD)

**Prompt:**
```
Create a professional Entity Relationship Diagram (ERD) for AI Health Coach database with clean white background using crow's foot notation.

ENTITIES (rectangles with attributes listed inside):

1. USER
   Primary Key: id
   Attributes:
   - id (PK)
   - email
   - password_hash
   - name
   - age
   - weight
   - height
   - goal

2. DAILY_LOG
   Primary Key: id
   Foreign Key: user_id
   Attributes:
   - id (PK)
   - user_id (FK)
   - date
   - water_ml
   - sleep_hours
   - steps
   - habits_status (JSON)

3. PLAN
   Primary Key: id
   Foreign Key: user_id
   Attributes:
   - id (PK)
   - user_id (FK)
   - type
   - start_date
   - end_date
   - content (JSON)

RELATIONSHIPS (crow's foot notation):
- USER to DAILY_LOG: One-to-Many (||----<) labeled "has"
- USER to PLAN: One-to-Many (||----<) labeled "generates"

Style: Standard ERD with crow's foot notation, clear primary/foreign keys marked, professional database schema layout.
```

---

## 9. Data Flow Diagram - Level 0 (Context Diagram)

**Prompt:**
```
Create a professional Data Flow Diagram Level 0 (Context Diagram) for AI Health Coach System with clean white background.

EXTERNAL ENTITIES (rectangles):
- User (left side)
- Google Gemini AI (right side)

CENTRAL PROCESS (circle):
- "AI Health Coach System" (center, numbered "0")

DATA FLOWS (labeled arrows):
FROM User TO System:
- "Profile Data" (arrow)
- "Daily Logs" (arrow)

FROM System TO User:
- "Health Plans" (arrow)
- "Progress Reports" (arrow)

FROM System TO Gemini AI:
- "Prompts" (arrow)

FROM Gemini AI TO System:
- "Generated Content" (arrow)

Style: Standard DFD Level 0 notation with process as circle, external entities as rectangles, labeled data flows.
```

---

## 10. Data Flow Diagram - Level 1 (Process Diagram)

**Prompt:**
```
Create a professional Data Flow Diagram Level 1 for AI Health Coach System with clean white background.

EXTERNAL ENTITY (rectangle):
- User (top of diagram)

PROCESSES (numbered circles):
- 1.0 Manage Profile
- 2.0 Generate Plan
- 3.0 Track Activity

DATA STORES (parallel horizontal lines):
- D1: User DB
- D2: Plan DB
- D3: Activity DB

EXTERNAL SERVICES (rectangles):
- ML Service (right side)
- Gemini API (right side)

DATA FLOWS (labeled arrows):
1. User → 1.0 Manage Profile → D1 User DB
2. User → 2.0 Generate Plan
3. D1 User DB → 2.0 Generate Plan
4. 2.0 Generate Plan ↔ ML Service (bidirectional)
5. 2.0 Generate Plan ↔ Gemini API (bidirectional)
6. 2.0 Generate Plan → D2 Plan DB
7. User → 3.0 Track Activity
8. 3.0 Track Activity ↔ D3 Activity DB (bidirectional)

Style: Standard DFD Level 1 notation with numbered processes, data stores, clear data flow directions.
```

---

## Usage Instructions

1. **Copy the prompt** for the diagram you want to generate
2. **Paste it into your AI tool** (ChatGPT with DALL-E, Claude with image generation, or other AI image generators)
3. **Request**: "Generate this diagram as a professional UML diagram image"
4. **Save the image** to `d:\ai-healthCoach\docs\diagrams\` with the appropriate filename:
   - `usecase.png`
   - `class.png`
   - `object.png`
   - `component.png`
   - `package.png`
   - `composite.png`
   - `communication.png`
   - `erd.png`
   - `dfd_level0.png`
   - `dfd_level1.png`

## Alternative Tools

If AI image generation doesn't work well, you can also use:
- **PlantUML**: https://plantuml.com/
- **Mermaid Live**: https://mermaid.live/
- **Draw.io**: https://app.diagrams.net/
- **Lucidchart**: https://www.lucidchart.com/

All Mermaid source code is available in `docs/UML_DIAGRAMS.md` for reference.
