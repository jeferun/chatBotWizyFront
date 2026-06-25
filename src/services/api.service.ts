import axios from 'axios';

const API_URL = 'http://localhost:3000/chatbot/chat';

export const sendChatMessage = async (query: string): Promise<string> => {
  try {
    const response = await axios.post(API_URL, { query });
    return response.data.response || 'No response from server.';
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Error de conexión con el servidor. Intente nuevamente.');
  }
};
