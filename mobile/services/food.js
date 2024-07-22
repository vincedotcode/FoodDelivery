import axios from 'axios';
import { useAuth } from '../hooks/useAuth'; 

const useFoodChatService = () => {
  const { user } = useAuth();

  /**
   * Sends a message to the Food Chat AI assistant.
   * @param {string} message - The message to send.
   * @returns {Promise<Object>} - The response from the AI assistant.
   * @throws {Error} - Throws an error if the user is not authenticated or if the request fails.
   */
  const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api/v1/ai/food-order';


  const sendMessageToFoodChat = async (message) => {
    const url = `${API_URL}`;

    if (!user || !user._id) {
      throw new Error('User is not authenticated.');
    }

    // Construct the message to include the user ID
    const messageWithUserId = `User ID: ${user._id}, Message: ${message}`;

    const requestBody = {
      user_id: user._id,
      message: messageWithUserId
    };

    try {
      const response = await axios.post(url, requestBody);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(JSON.stringify({
          statusCode: error.response.status,
          message: error.response.data.message || ['An unexpected error occurred'],
          error: error.response.data.error || 'Bad Request'
        }));
      } else {
        throw new Error(JSON.stringify({
          statusCode: 500,
          message: ['Network Error or Internal Server Error'],
          error: 'Server Error'
        }));
      }
    }
  };

  return { sendMessageToFoodChat };
};

export default useFoodChatService;
