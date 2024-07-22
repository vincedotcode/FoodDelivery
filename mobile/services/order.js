import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api/v1/orders';

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData);
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

export const updateDeliveryStepStatus = async (orderId, stepId, status) => {
  try {
    const response = await axios.put(`${API_URL}/${orderId}/steps/${stepId}`, { status });
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

export const cancelOrder = async (orderId) => {
  try {
    const response = await axios.put(`${API_URL}/${orderId}`);
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

export const completeDelivery = async (orderId) => {
  try {
    const response = await axios.put(`${API_URL}/${orderId}/complete`);
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

export const getOrdersByRestaurantId = async (restaurantId) => {
  try {
    const response = await axios.get(`${API_URL}/restaurant/${restaurantId}`);
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

export const getOrdersByUserId = async (userId) => {
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
