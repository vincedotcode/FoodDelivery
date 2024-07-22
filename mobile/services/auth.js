import axios from 'axios';
import { saveToken, saveUser } from '../hooks/useStorage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api/v1/auth';

export const register = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/register`, credentials);
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

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { token, user } = response.data;
    await saveToken(token);
    await saveUser(user);
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


export const getUserDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`);
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

