import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { db } from "../src/components/firebase";
import { addDoc, collection } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ success: true, message: "GET working" });
  }

  if (req.method === "POST") {
    try {
      const { type, role, level, techstack, amount, userid } = req.body;

      const { text: questionsText } = await generateText({
        model: google("gemini-2.0-flash-001", {
          apiKey: process.env.REACT_APP_GOOGLE_GENERATIVE_AI_API_KEY, // ✅ Explicitly pass it
        }),
        prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]`,
      });

      let questions;
      try {
        questions = JSON.parse(questionsText);
      } catch (err) {
        questions = questionsText
          .replace(/[\r\n]+/g, "")
          .replace(/“|”/g, '"')
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

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
