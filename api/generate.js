import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCtegc72QL0bumlJL8DINwTPHE1EW5T4UQ",
    authDomain: "prepwise-a1779.firebaseapp.com",
    projectId: "prepwise-a1779",
    storageBucket: "prepwise-a1779.firebasestorage.app",
    messagingSenderId: "74511285485",
    appId: "1:74511285485:web:81a6bf7e48e53b9fb5a0e4",
    measurementId: "G-GFJ59QW2LB"
  };

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type, role, level, techstack, amount, userid } = req.body;

    const { text: questionsText } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `Prepare questions for a job interview.
        Role: ${role}
        Level: ${level}
        Tech Stack: ${techstack}
        Focus: ${type}
        Number of questions: ${amount}
        Format: ["Question 1", "Question 2", ...]`,
    });

    let questions;
    try {
      questions = JSON.parse(questionsText);
    } catch (err) {
      console.warn("Fallback parsing:", err.message);
      questions = questionsText
        .replace(/[\r\n]+/g, "")
        .replace(/“|”/g, '"') // fix smart quotes
        .match(/"[^"]+?"/g)
        ?.map((q) => q.replace(/"/g, "")) || [];
    }

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions,
      userId: userid,
      finalized: true,
      createdAt: new Date().toISOString(),
    };

    await addDoc(collection(db, "interviews"), interview);

    return res.status(200).json({ success: true, questions });
  } catch (error) {
    console.error("Internal error:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
