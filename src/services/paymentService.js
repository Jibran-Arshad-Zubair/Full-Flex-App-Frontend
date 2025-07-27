import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const processPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/payments/create-payment-intent`, paymentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Payment failed');
  }
};