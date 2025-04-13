import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  // your config here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { type, role, level, techstack, amount, userid } = req.body;

  const { text: questions } = await generateText({
    model: google("gemini-2.0-flash-001"),
    prompt: `Prepare questions for a job interview.
      The job role is ${role}.
      The job experience level is ${level}.
      The tech stack used in the job is: ${techstack}.
      The focus between behavioural and technical questions should lean towards: ${type}.
      The amount of questions required is: ${amount}.
      Please return only the questions in this format: ["Q1", "Q2", "Q3"]`,
  });

  await addDoc(collection(db, "interviews"), {
    role,
    type,
    level,
    techstack: techstack.split(","),
    questions: JSON.parse(questions),
    userId: userid,
    finalized: true,
    createdAt: new Date().toISOString(),
  });

  return res.status(200).json({ success: true });
}
