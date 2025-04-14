import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../src/components/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { role, type, level, techstack, amount, userid } = req.body;

      if (!userid) {
        return res.status(400).json({ error: "Missing userid from request body" });
      }

      // ✅ Generate questions with Gemini
      const { text: questionsText } = await generateText({
        model: google("gemini-2.0-flash-001", {
          apiKey: "AIzaSyC2-l-L72khcrl4ikyWC05DocZ2PGHPM5M",
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

      // ✅ Save to Firestore with client-passed user ID
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
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Server error", details: err.message });
    }
  }

  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
