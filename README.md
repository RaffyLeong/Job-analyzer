# Job Post Analyzer
A React application that analyzes job descriptions against your profile with a 4-step workflow, providing detailed match percentages and actionable insights.

🚀 Live Demo
View the live project here - https://job-analyzer.netlify.app/

🎥 Video Demonstration
Watch explainer video here - https://www.loom.com/share/b40ab271605e4345a2d303e24c1a1e69

---

## 📸 **Application Preview**

### Step 1: Role, Experience Selection 
<img width="1860" height="916" alt="Screenshot 2026-02-01 at 1 01 51 PM" src="https://github.com/user-attachments/assets/603e73bc-b657-4a01-98f6-8b4a52a91734" />

### 1: Step 2: Skills Selection 
<img width="1715" height="923" alt="Screenshot 2026-02-01 at 1 02 12 PM" src="https://github.com/user-attachments/assets/055b6b06-6484-4b8f-8122-86c4f85a4eda" />

### 1: Step 3: Job Description
<img width="1798" height="924" alt="Screenshot 2026-02-01 at 1 02 53 PM" src="https://github.com/user-attachments/assets/b99833fd-f5e4-46df-92a2-659bb5d87919" />

### Step 4: Analysis Results 
<img width="1755" height="929" alt="Screenshot 2026-02-01 at 1 03 12 PM" src="https://github.com/user-attachments/assets/07ff9f69-9530-4c91-ae3c-49789b909361" />

### History Dropdown 
<img width="1786" height="901" alt="Screenshot 2026-02-01 at 1 03 31 PM" src="https://github.com/user-attachments/assets/732e72d2-fdf4-40d8-a2f8-0b733ca5c58e" />

---

## 🎯 **Key Features**

**1. 4-Step Analysis Workflow**
1. **Choose Role** - Select from 12+ tech roles
2. **Select Skills** - Pick from 60+ technical skills with search
3. **Paste Job Description** - Any job board, any format
4. **View Analysis** - Get detailed match breakdown

**2. Smart Matching Algorithm**
- **50% Skills Match** - Your skills vs job requirements
- **25% Role Compatibility** - Role keyword analysis  
- **25% Experience Alignment** - Experience level comparison
- **Color-coded results** - Green/Yellow/Red based on match score

**3. History & Persistence**
- **Dual storage system**: Backend API + localStorage fallback
- **Save analyses** for future reference
- **Load previous matches** with one click
- **Clear history** functionality

**4. Professional UI/UX**
- **Dark/Light mode** toggle
- **Responsive design** - Mobile to desktop
- **Visual progress indicators**
- **Interactive skill selection**

---

## 🛠️ **Tech Stack**

### **Frontend**
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Netlify

### **Backend**
- **Runtime:** Node.js + Express
- **Database:** MongoDB Atlas
- **Deployment:** Render
- **Language:** TypeScript

---

## 🚀 **Running Locally**

📁 Running Locally
### **Step-by-Step Setup**
# 1. Clone repository
git clone https://github.com/RaffyLeong/Job-Analyzer.git
cd Job-Analyzer

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Start development server
npm run dev
