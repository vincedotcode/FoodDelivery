import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api/v1/restaurants/menus';

export const getAllMenus = async () => {
  try {
    const response = await axios.get(API_URL);
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

export const getRestaurantByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
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

