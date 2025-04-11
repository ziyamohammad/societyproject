// src/services/vapiService.js
import axios from 'axios';

const VAPI_BASE_URL = 'https://api.vapi.ai/v1';

export const startInterviewCall = async (userId, topic) => {
  const apiKey = process.env.REACT_APP_VAPI_API_KEY;
  const assistantId = process.env.REACT_APP_VAPI_ASSISTANT_ID;

  try {
    const response = await axios.post(
      `${VAPI_BASE_URL}/calls`,
      {
        assistant_id: assistantId,
        user: {
          user_id: userId,
          name: 'Candidate',
        },
        metadata: {
          topic,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error starting interview call:', error);
    throw error;
  }
};
