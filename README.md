🌳 Tree Monitoring Dashboard

A Geo-Tag Based Tree Monitoring System that tracks tree locations, health status, and environmental impact using an interactive dashboard and map.

This system helps organizations and campuses monitor plantation efforts, analyze environmental impact, and manage tree health digitally.

🚀 Features
🌳 Tree Management

Register new trees

Store species, location, and health status

Maintain centralized tree records

📍 Location Tracking

View trees on an interactive map

Monitor plantation areas

📊 Environmental Impact Dashboard

Automatically calculates:

Total trees planted

Estimated CO₂ absorbed

Estimated oxygen generated

🔍 Tree Health Monitoring

Track tree condition such as:

Healthy

Average

Needs Attention

📈 Analytics & Visualization

View plantation statistics through dashboards.

🏗 Project Architecture

This project uses Next.js for frontend and API routes for backend.

tree-monitoring-project
│
├── app
│   ├── api
│   │   ├── trees
│   │   │   └── route.ts
│   │   ├── register
│   │   │   └── route.ts
│   │   ├── stats
│   │   │   └── route.ts
│   │   └── health
│   │       └── route.ts
│
├── components
├── hooks
├── lib
│   └── db.ts
│
├── public
├── styles
│
├── package.json
└── README.md
🖥 Backend API Endpoints
Register Tree

POST /api/register

Registers a new tree.

Example request:

{
  "name": "Neem Tree",
  "species": "Azadirachta indica",
  "location": "Campus Garden",
  "health": "Healthy"
}
Get Tree List

GET /api/trees

Returns all registered trees.

Environmental Statistics

GET /api/stats

Returns environmental impact data.

Example response:

{
  "totalTrees": 120,
  "co2Absorbed": 2640,
  "oxygenGenerated": 12000
}
Health Monitoring

POST /api/health

Evaluates tree health status.

🗄 Database

The system uses SQLite to store tree data.

Example schema:

CREATE TABLE trees (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 species TEXT,
 location TEXT,
 health TEXT
);
⚙️ Installation

Clone the repository:

git clone https://github.com/lavanyamawale14/tree-monitoring-project.git

Move into the project folder:

cd tree-monitoring-project

Install dependencies:

npm install

Run the development server:

npm run dev

Open in browser:

http://localhost:3000
🛠 Technologies Used
Frontend

Next.js

React

TypeScript

CSS

Backend

Next.js API Routes

Node.js

Database

SQLite

Tools

GitHub

VS Code

👥 Team Contribution

This is a group project.

Possible roles:

Frontend Development – UI components and dashboard

Backend Development – API routes and database

Analytics – Environmental impact calculations

UI/UX Design – Layout and design system

🌍 Future Improvements

QR code tagging for trees

Tree image upload

AI-based tree health detection

Growth tracking charts

Mobile responsive dashboard
