import axios from "axios";
import { auth, db } from "../firebase";
import { doc, setDoc, addDoc, collection, Timestamp } from "firebase/firestore";

export const startInterview = async (topic) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const userId = user.uid;

  const initialQuestion = `Start an interview with the user on the topic of ${topic}. Ask technical questions like a real interviewer.`;

  // Store call metadata in Firestore
  const interviewRef = await addDoc(collection(db, "interviews"), {
    userId,
    topic,
    timestamp: Timestamp.now(),
    score: null,
    status: "in-progress"
  });

  const response = await axios.post("https://api.vapi.ai/call/phone", {
    assistant_id: process.env.REACT_APP_VAPI_ASSISTANT_ID,
    user: {
      user_id: userId,
    },
    metadata: {
      topic,
      interviewId: interviewRef.id
    },
    phone_number: "browser" // Vapi uses this for web calls
  }, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_VAPI_API_KEY}`,
    }
  });

  return response.data;
};
