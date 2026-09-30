# 🚀 CodeQuest — Learn • Play • Code • Conquer

> A production-grade, full-stack educational web application designed to teach **Python Programming** and **Data Structures & Algorithms (DSA)** through interactive arcade games, quizzes, coding challenges, and multi-stage adventures.

---

## 🌟 Table of Contents
1. [Overview & Project Vision](#overview--project-vision)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Architecture & Folder Structure](#architecture--folder-structure)
5. [Database Architecture & MongoDB Atlas](#database-architecture--mongodb-atlas)
6. [Environment Variables](#environment-variables)
7. [Getting Started & Local Setup](#getting-started--local-setup)
8. [Database Seeding](#database-seeding)
9. [REST API Documentation](#rest-api-documentation)
10. [Postman Testing & Token Capture](#postman-testing--token-capture)
11. [Administrator System & CRUD](#administrator-system--crud)
12. [Git & GitHub Preparation](#git--github-preparation)
13. [Troubleshooting & FAQ](#troubleshooting--faq)

---

## 📖 Overview & Project Vision

**CodeQuest** eliminates the passive monotony of video tutorials. Instead, learners embark on a structured quest spanning three distinct realms:
- 🌿 **Python World (12 Levels)**: Introduction to Python, Variables, Data Types, Conditionals, Loops, Strings, Lists, Tuples, Sets, Dictionaries, Functions, Recursion, Exception Handling, File I/O, and Object-Oriented Programming (OOP).
- 🏰 **DSA Citadel (10 Levels)**: Big-O Asymptotic Complexity, Contiguous Arrays, Linked Lists, Stacks (LIFO), Queues (FIFO), Binary Trees, BST Traversals, Graph Algorithms (BFS/DFS), Quadratic Sorts, Merge Sort, Quick Sort, Greedy Algorithms, Dynamic Programming, and Dijkstra's Shortest Path.
- 🔥 **Adventure Realm (6 Stages)**: Hybrid boss battles merging Python language constructs with algorithmic patterns (e.g. Lists + Array Searching, Recursion + Call Stack Visualization, OOP Classes + Trees, Sorting + Lambda Comparators, and Dynamic Programming + 0/1 Knapsack).

---

## 🎯 Key Features

- **Real Full-Stack Architecture**: React + Vite frontend served alongside an Express REST API backend with real Mongoose/MongoDB data persistence.
- **Secure Authentication**: JWT (JSON Web Tokens) with 7-day expiration, bcryptjs password hashing with salt rounds, and Bearer authorization middleware.
- **Role-Based Access Control (RBAC)**: Distinct `student` and `admin` roles guarded by `authMiddleware` and `adminMiddleware`.
- **Dynamic XP & Leveling Engine**: Non-duplicating XP rewards (+20 XP for topics, +20 XP for minigames, +20 XP for quizzes, +50 XP for challenges). Levels dynamically recalculate as XP thresholds are breached.
- **Server-Enforced Topic Unlocking**: Backend verifies prerequisite completion before granting access to sequential topics.
- **Interactive Arcade Minigames**:
  - *List Treasure Hunt* (Zero-based indexing & slicing)
  - *Guess the Output* (Operator precedence & type coercion)
  - *Fix the Code* (Syntax errors & conditional logic)
  - *Stack Tower Operator* (LIFO mechanics)
  - *Queue Gatekeeper* (FIFO mechanics)
  - *Binary Search Step Guesser* (Logarithmic search division)
  - *Algorithm Speed Match* (Time complexity matching)
- **4-Option MCQ Quizzes**: Instant visual scorecards, 70% passing threshold, detailed feedback, and explanations.
- **Safe Python Challenge Evaluator**: Sandbox-safe pattern and test-case runner testing edge cases with hidden assertions.
- **Comprehensive Admin Dashboard**: Complete CRUD interfaces for managing Topics, Games, Quizzes, Challenges, viewing all registered users, and system analytics.

---

## 💻 Technology Stack

### Frontend:
- **React 19** (Functional components, hooks, React Router v7)
- **Vite 8** (Lightning-fast HMR and bundling)
- **Tailwind CSS v4** (Custom pastel theme, clean typography hierarchy)
- **Framer Motion / Motion** (Smooth micro-interactions and transitions)
- **Lucide Icons** (Affordance-driven SVG iconography)
- **Axios** (Configured with request/response interceptors for Bearer tokens)
- **Canvas Confetti** (Rewarding victory celebrations on XP gains)

### Backend:
- **Node.js & Express.js** (Modular REST API routers, controllers, middleware)
- **Mongoose & MongoDB Atlas** (Resilient document modeling with in-memory persistence fallback)
- **JSON Web Token (JWT)** (Stateless secure authentication)
- **bcryptjs** (Cryptographic one-way password hashing)
- **Cors & Dotenv** (CORS management and environment isolation)

---

## 📁 Architecture & Folder Structure

```
CodeQuest/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas connection & fallback
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, Me
│   │   ├── userController.js     # Profiles & progress summaries
│   │   ├── topicController.js    # Unlocked topic queries
│   │   ├── gameController.js     # Game completion & XP rewards
│   │   ├── quizController.js     # Quiz evaluation & 70% pass check
│   │   ├── codingController.js   # Controlled code challenge runner
│   │   ├── progressController.js # Topic progression logs
│   │   └── adminController.js    # Full CRUD & platform statistics
│   ├── middleware/
│   │   ├── authMiddleware.js     # Bearer token verification
│   │   ├── adminMiddleware.js    # Role === 'admin' verification
│   │   └── errorMiddleware.js    # Clean JSON error responses
│   ├── models/
│   │   ├── User.js               # User accounts & roles
│   │   ├── Topic.js              # Curriculum topics
│   │   ├── Game.js               # Interactive minigames
│   │   ├── Quiz.js               # 4-option MCQs
│   │   ├── CodingChallenge.js    # Python coding problems
│   │   ├── Progress.js           # Student activity records
│   │   ├── Achievement.js        # Badges and milestones
│   │   └── modelStore.js         # Unified Mongoose/Atlas adapter
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── topicRoutes.js
│   │   ├── gameRoutes.js
│   │   ├── quizRoutes.js
│   │   ├── codingRoutes.js
│   │   ├── progressRoutes.js
│   │   └── adminRoutes.js
│   ├── seed/
│   │   └── seedData.js           # Comprehensive seed script (30+ topics, 8 games, 8 quizzes, 8 challenges)
│   ├── utils/
│   │   └── helpers.js            # XP formula & achievement evaluation
│   ├── .env.example
│   ├── server.js                 # Standalone backend entry point
│   └── package.json
│
├── src/
│   ├── assets/
│   │   └── images/               # High-fidelity generated game world assets
│   ├── components/
│   │   ├── Navbar.jsx & .css     # Responsive navigation with live XP chip
│   │   ├── Footer.jsx & .css     # Site-wide links & footer
│   │   ├── ProtectedRoute.jsx    # Student route guard
│   │   ├── AdminRoute.jsx        # Admin route guard
│   │   ├── TopicCard.jsx & .css  # Unlocking status & quick actions
│   │   ├── GameCard.jsx & .css   # Minigame card
│   │   ├── ProgressBar.jsx & .css# Visual progress indicators
│   │   └── XPBadge.jsx & .css    # Gamified glowing XP badge
│   ├── pages/
│   │   ├── Home.jsx & .css       # Landing page with mascot & journey
│   │   ├── Login.jsx & .css      # Coding adventure portal login
│   │   ├── Registration.jsx & .css# Account registration
│   │   ├── Dashboard.jsx & .css  # Real-time player dashboard
│   │   ├── PythonWorld.jsx & .css# Python curriculum & games
│   │   ├── DSAWorld.jsx & .css   # Data Structures & Algorithms
│   │   ├── AdventureWorld.jsx & .css # Hybrid endgame stages
│   │   ├── Topic.jsx & .css      # Concept lessons, syntax, code examples
│   │   ├── Game.jsx & .css       # Interactive minigame player
│   │   ├── Quiz.jsx & .css       # 4-option MCQ quiz engine
│   │   ├── CodingChallenge.jsx & .css # Python code editor & test suite
│   │   ├── Progress.jsx & .css   # Historical activity table
│   │   └── Profile.jsx & .css    # Adventurer handle & avatar customization
│   ├── admin/
│   │   ├── AdminLogin.jsx & .css # Privileged admin login portal
│   │   ├── AdminDashboard.jsx & .css # Overview & metric counters
│   │   ├── Users.jsx & .css      # Student user table
│   │   ├── ManageTopics.jsx & .css # Full Topics CRUD
│   │   ├── ManageGames.jsx & .css# Full Games CRUD
│   │   ├── ManageQuizzes.jsx & .css # Full Quizzes CRUD
│   │   ├── ManageChallenges.jsx & .css # Full Challenges CRUD
│   │   └── Statistics.jsx & .css # Database health & topic analytics
│   ├── services/
│   │   ├── api.js                # Axios instance with interceptors
│   │   ├── authService.js        # Authentication & profile calls
│   │   ├── topicService.js       # Topic data access
│   │   ├── gameService.js        # Game completion calls
│   │   ├── quizService.js        # Quiz submissions
│   │   ├── challengeService.js   # Challenge runner calls
│   │   ├── progressService.js    # Progress updates
│   │   └── adminService.js       # Administrative endpoints
│   ├── utils/
│   │   └── helpers.js            # Confetti & level math
│   ├── App.jsx & App.css
│   ├── index.css                 # Tailwind setup & ambient pastel mesh
│   └── main.jsx
│
├── postman/
│   └── CodeQuest.postman_collection.json # 20+ automated API tests & token capture
├── server.ts                     # Full-stack integrated Express + Vite dev server
├── package.json
└── README.md
```

---

## 🗄️ Database Architecture & MongoDB Atlas

### 1. User Schema (`server/models/User.js`)
- `username`: String (Unique, required, trimmed)
- `email`: String (Unique, required, lowercase, validated)
- `password`: String (Bcrypt salted hash)
- `role`: String (`student` or `admin`, default `student`)
- `avatar`: String (Selected avatar persona key)
- `xp`: Number (Total experience points accumulated)
- `level`: Number (Level 1–6 based on XP milestones)
- `completedTopics`: Array of Topic ID strings
- `completedGames`: Array of Game ID strings
- `completedQuizzes`: Array of Quiz ID strings
- `completedChallenges`: Array of Challenge ID strings
- `currentWorld`: String (`python`, `dsa`, `adventure`)
- `achievements`: Array of unlocked badge keys

### 2. Topic Schema (`server/models/Topic.js`)
- `title`, `slug`, `world`, `level`, `order`, `difficulty`
- `description`, `objectives` (Array of Strings)
- `explanation`, `syntax`
- `examples`: Array of `{ title, code, output, notes }`
- `keyPoints`, `commonMistakes`
- `gameId`, `quizId`, `challengeId`
- `xpReward`: Number (Default 20 XP)

### 3. Game Schema (`server/models/Game.js`)
- `title`, `world`, `topicId`, `type`, `instructions`
- `questions`: Array of `{ prompt, codeSnippet, options, correctAnswer, hint, explanation }`
- `xpReward`: Number (Default 20 XP)

### 4. Quiz Schema (`server/models/Quiz.js`)
- `title`, `world`, `topicId`, `passingPercentage` (70%)
- `questions`: Array of 4-option questions with `correctAnswer` index (0–3) and `explanation`
- `xpReward`: Number (Default 20 XP)

### 5. CodingChallenge Schema (`server/models/CodingChallenge.js`)
- `title`, `world`, `topicId`, `difficulty`, `problem`, `constraints`
- `starterCode`, `solutionCode`
- `testCases`: Array of `{ input, expectedOutput, description, hidden }`
- `xpReward`: Number (Default 50 XP)

### 6. Progress Schema (`server/models/Progress.js`)
- `userId`, `topicId`, `world`, `completed` (Boolean)
- `gameCompleted`, `quizCompleted`, `codingCompleted`
- `score`, `xpEarned`, `attempts`, `lastAccessed`

---

## 🔑 Environment Variables

Create a `.env` file in the root and in `server/.env`:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/codequest?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=codequest_super_secret_jwt_key_2026_gamified

# Port Configuration
PORT=3000

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000

# Default Administrator Credentials (Seeded automatically)
ADMIN_EMAIL=admin@codequest.dev
ADMIN_PASSWORD=Admin@CodeQuest2026
```

> **Note on Persistence**: If `MONGODB_URI` is not set or the cluster is temporarily unreachable, CodeQuest seamlessly boots its embedded in-memory persistence engine, ensuring zero crashes and 100% operational functionality for demonstrations.

---

## ⚡ Getting Started & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/codequest.git
cd codequest
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server (Full-Stack Express + Vite)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🌰 Database Seeding

The database seeds automatically on first launch! To trigger a manual re-seed:
```bash
# Via cURL:
curl -X POST http://localhost:3000/api/seed

# Or via Node script in server/:
cd server && npm run seed
```

### Default Pre-Configured Accounts:
- **Admin**: `admin@codequest.dev` / `Admin@CodeQuest2026`
- **Student Demo**: `coder@codequest.dev` / `Student@CodeQuest2026`

---

## 📡 REST API Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new student (`username`, `email`, `password`, `confirmPassword`)
- `POST /api/auth/login` — Login with credentials, returns JWT token & user object
- `GET /api/auth/me` — *(Protected)* Retrieve current authenticated user profile

### Users (`/api/users`)
- `GET /api/users/profile` — *(Protected)* Get profile data, level & unlocked achievements
- `PUT /api/users/profile` — *(Protected)* Update username and avatar
- `GET /api/users/progress` — *(Protected)* Aggregate progress statistics across all worlds

### Topics (`/api/topics`)
- `GET /api/topics` — List all topics (supports `?world=python|dsa|adventure`)
- `GET /api/topics/:id` — Get topic details, code examples, pitfalls, and unlock status

### Games (`/api/games`)
- `GET /api/games` — List available arcade minigames
- `GET /api/games/:id` — Fetch game question items
- `POST /api/games/:id/complete` — *(Protected)* Submit completion score & claim +20 XP

### Quizzes (`/api/quizzes`)
- `GET /api/quizzes` — List quizzes
- `GET /api/quizzes/:id` — Get quiz questions
- `POST /api/quizzes/:id/submit` — *(Protected)* Evaluate answers, score against 70% threshold & award XP

### Coding Challenges (`/api/coding`)
- `GET /api/coding` — List coding challenges
- `GET /api/coding/:id` — Fetch challenge problem and starter boilerplate
- `POST /api/coding/:id/submit` — *(Protected)* Safely run against test cases & award +50 XP

### Progress (`/api/progress`)
- `GET /api/progress` — *(Protected)* List all activity logs
- `GET /api/progress/:topicId` — *(Protected)* Specific topic progress
- `POST /api/progress` — *(Protected)* Mark topic completed, award XP, unlock next topic
- `PUT /api/progress/:id` — *(Protected)* Update progress document

### Admin Hub (`/api/admin`) *(Protected & Admin Only)*
- `GET /api/admin/users` — View all registered students and their XP
- `GET /api/admin/statistics` — Real-time analytics, averages, and document tallies
- `POST, PUT, DELETE /api/admin/topics` — Topics CRUD
- `POST, PUT, DELETE /api/admin/games` — Games CRUD
- `POST, PUT, DELETE /api/admin/quizzes` — Quizzes CRUD
- `POST, PUT, DELETE /api/admin/challenges` — Challenges CRUD

---

## 📮 Postman Testing & Token Capture

A complete Postman Collection is provided in `postman/CodeQuest.postman_collection.json`:

1. Open Postman and click **Import**.
2. Select `postman/CodeQuest.postman_collection.json`.
3. Collection Variables (`baseUrl`, `token`, `adminToken`) are pre-configured.
4. Execute **Authentication > 2. Student Login**:
   - The test script captures the JWT token and automatically saves it to `{{token}}`.
5. Execute **Admin > 1. Admin Login**:
   - The test script captures the admin token and saves it to `{{adminToken}}`.
6. Run the entire collection with the Postman Collection Runner to verify all 20+ endpoints.

---

## 🛡️ Administrator System

Navigate to `/admin/login` or click **Admin Portal** in the footer:
- Use credentials: `admin@codequest.dev` / `Admin@CodeQuest2026`
- Once logged in, manage curriculum topics, modify minigames, edit quiz questions, create new coding challenges, view student registrations, and inspect live database telemetry.

---

## 📦 Git & GitHub Instructions

```bash
git init
git add .
git commit -m "feat: complete CodeQuest full-stack application"
git branch -M main
git remote add origin https://github.com/<your-username>/codequest.git
git push -u origin main
```

---

## ❓ Troubleshooting & FAQ

- **Q: "Can I connect my own MongoDB Atlas cluster?"**
  - **A**: Yes! Simply paste your Atlas connection URI in `.env` under `MONGODB_URI`. The application connects automatically using Mongoose.
- **Q: "What happens if MONGODB_URI is not provided?"**
  - **A**: CodeQuest features a dual-mode persistence architecture. It will boot using an embedded in-memory document store so all routes, JWTs, and tests remain 100% operational.
- **Q: "Are passwords secure?"**
  - **A**: Yes. Passwords are hashed using bcryptjs with 10 salt rounds before storage, and excluded from API responses.

---

© 2026 CodeQuest. Crafted for curious coders worldwide.
