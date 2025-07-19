
# 🧠 AI Interviewer – Real-Time Voice Interview Platform

An intelligent voice-based interview platform that allows users to **simulate real-time technical interviews** with an AI agent. Built using **Vapi AI for voice calls**, **Firebase Firestore for state management**, and **Gemini AI** to dynamically generate and evaluate interview questions based on user responses.

---

## 🎥 Demo Video

🎬 [Watch Demo on YouTube](https://societyproject.vercel.app/)  
🔗 [Live Site](https://your-vercel-app.vercel.app)


## 🚀 Tech Stack

- **Frontend:** React.js, HTML/CSS
- **Voice Calls:** [Vapi.ai](https://vapi.ai/)
- **Question Generation:** Google Gemini API
- **Database:** Firebase Firestore
- **Auth (optional):** Firebase Auth
- **Deployment:** Vercel (frontend)

---

## 🎯 Features

### 👥 User Flow
1. **User selects a topic** (e.g., Frontend, Backend, DSA)
2. **Click to start a call** – connects to a Vapi AI voice agent
3. AI asks an initial predefined question (topic-based)
4. User responds via voice
5. Gemini AI generates **follow-up questions** dynamically
6. Follow-ups are stored in **Firebase Firestore**
7. AI continues the interview with generated questions
8. **Score/Evaluation** shown after the interview

### 🧠 AI Logic
- Uses **Gemini API** for:
  - Understanding user responses
  - Generating contextual follow-ups
  - Scoring responses based on accuracy, depth, and fluency

### 🎙️ Real-Time Voice Experience
- Powered by **Vapi.ai**
- Custom voice agent with topic-specific scripting
- Interruptible conversations and timeout handling

---

## 📁 Folder Structure

```

ai-interviewer/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/     # Firebase & Gemini integrations
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env
└── README.md

````

---

## ⚙️ Setup & Installation

### 1. Clone the Repo

```bash
git clone https://github.com/ziyamohammad/ai-interviewer.git
cd ai-interviewer
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_GEMINI_API_KEY=your_gemini_key
VITE_VAPI_API_KEY=your_vapi_key
```

### 4. Run Locally

```bash
npm run dev
```

---

## 🧪 Key Integrations

### 🔊 Vapi.ai

* Custom voice agent with predefined & follow-up questions
* Handles real-time voice capture and playback
* Integrates with Firestore for question injection

### 🔥 Firebase

* Stores:

  * Questions asked
  * User responses
  * Scoring & feedback
* Can be extended with Firebase Auth

### 🧠 Gemini AI

* Called after every voice response
* Generates 2–3 follow-up questions based on:

  * Topic relevance
  * User's previous answer
* Evaluates response and returns score (0–10)

---

## 📚 Learnings

* Integrated multiple AI APIs for a **real-time multi-agent system**
* Built async voice interactions with **stateful memory**
* Learned how to structure dynamic voice flows with Firebase as the source of truth
* Optimized frontend performance and error handling

---

## 🚀 Future Enhancements

* Add **leaderboard / interview history**
* Integrate **resume analysis** for personalized interview topics
* Add **custom voice avatars** for different interview roles
* Track **improvement over time**

---

## 👨‍💻 Author

**Mohammad Ziya**
🔗 [LinkedIn](https://www.linkedin.com/in/mohammad-ziya-84a97232a/)
🔗 [GitHub](https://github.com/ziyamohammad)

---

## ⭐ Feedback

If this project helped you or inspired your own, please consider giving it a ⭐ on [GitHub](https://github.com/ziyamohammad/ai-interviewer)!

PRs, forks, and collabs welcome!
