 
📂 Resume Analyzer

A full-stack web application where users can upload their resumes in PDF format and receive AI-driven analysis, structured insights, and improvement suggestions. The app also stores analysis history for future reference.

✨ Features

📤 Upload resumes in PDF format

🔍 Extract and display structured details:

Personal Information

Summary / Objective

Work Experience

Education

Skills (Technical + Soft)

Projects

Certifications

🤖 AI Feedback:

Resume Rating (out of 10)

Suggested Improvements

Upskill Recommendations

📜 History Tab – view past uploads & analyses

⚡ Fast, responsive, and user-friendly UI

🛠️ Tech Stack
Frontend

React.js

TailwindCSS / CSS Modules

Axios (for API calls)

Backend

Node.js + Express.js

Multer (for file upload)

PDF Parser (pdf-parse / PyMuPDF)

AI API Integration (OpenAI / Gemini)

Database

MongoDB (or SQLite/PostgreSQL alternative)

📂 Project Structure
resume-analyzer/
│── backend/
│   ├── server.js         # Express server  
│   ├── routes/           # API routes (upload, analyze, history)  
│   ├── controllers/      # Resume parsing & AI logic  
│   ├── models/           # MongoDB/SQL models  
│   └── uploads/          # Uploaded resume files  
│
│── frontend/
│   ├── src/
│   │   ├── components/   # UI Components (UploadForm, ResumeCard, HistoryTable)  
│   │   ├── pages/        # Routes (Home, Analysis, History)  
│   │   ├── services/     # API calls (Axios)  
│   │   └── App.js  
│
│── sample-data/
│   ├── resume1.json      # John Doe – Full Stack Developer  
│   ├── resume2.json      # Jane Roe – Data Scientist  
│   ├── resume3.json      # Ravi Kumar – Frontend Developer  
│
│── README.md  
│── package.json  

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/resume-analyzer.git
cd resume-analyzer

2️⃣ Backend Setup
cd backend
npm install
npm start


Server will run on: http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm start


React app will run on: http://localhost:3000

📊 Sample Data

The project includes 3 sample resumes for testing:

resume1.json – John Doe (Full Stack Developer)

resume2.json – Jane Roe (Data Scientist)

resume3.json – Ravi Kumar (Frontend Developer)

Example output after uploading John Doe’s resume:

{
  "name": "John Doe",
  "email": "john.doe@gmail.com",
  "skills": ["JavaScript", "React", "Node.js", "AWS"],
  "projects": ["Twitter Clone", "Cryptocurrency Tracker"],
  "aiFeedback": {
    "rating": "7/10",
    "improvements": ["Add measurable metrics", "Expand leadership experience"],
    "suggestedUpskills": ["Kubernetes", "System Design"]
  }
}

📂 History Tab Example
Name	Email	File Name	Uploaded At	Action
John Doe	john.doe@gmail.com
	resume1.pdf	2025-09-07 20:15:00	🔍 View
Jane Roe	jane.roe@gmail.com
	resume2.pdf	2025-09-07 20:20:00	🔍 View
Ravi Kumar	ravi.kumar@gmail.com
	resume3.pdf	2025-09-07 20:25:00	🔍 View
