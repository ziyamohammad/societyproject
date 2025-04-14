import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { db } from "../../src/components/firebase";
import { addDoc, collection } from "firebase/firestore";

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY; // From Firebase console

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { role, type, level, techstack, amount } = req.body;

      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({ error: "Missing token" });
      }

      // ✅ Use Firebase Identity Toolkit REST API to verify ID token
      const verifyRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: token }),
        }
      );

      const verifyData = await verifyRes.json();
      if (!verifyData.users || !verifyData.users[0]) {
        return res.status(403).json({ error: "Invalid token" });
      }

      const uid = verifyData.users[0].localId; // ✅ User UID

      // ✅ Generate questions
      const { text: questionsText } = await generateText({
        model: google("gemini-2.0-flash-001", {
          apiKey: process.env.GEMINI_API_KEY,
        }),
        prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Return the questions like: ["Question 1", "Question 2"]`,
      });

      let questions;
      try {
        questions = JSON.parse(questionsText);
      } catch {
        questions = questionsText
          .replace(/[\r\n]+/g, "")
          .replace(/“|”/g, '"')
          .match(/"[^"]+?"/g)
          ?.map((q) => q.replace(/"/g, "")) || [];
      }

      // ✅ Save to Firestore
      const interview = {
        role,
        type,
        level,
        techstack: techstack.split(","),
        questions,
        userId: uid,
        finalized: true,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "interviews"), interview);

      return res.status(200).json({ success: true, questions });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Server error", details: err.message });
    }
  }

  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
