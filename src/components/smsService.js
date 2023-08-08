// smsService.js

import axios from 'axios';
const port = process.env.PORT||5000;
const sendSMS = async (to, body) => {
  try {
    console.log(to);
    console.log(body);
    const response = await axios.post(`http://localhost:${port}/send-sms`, { to, body });
    console.log(response.data);
    // Handle successful response here if needed
    return response.data;
  } catch (error) {
    console.error('Error sending SMS:', error.response?.data?.message || 'Unknown error occurred');
    // Handle error here or re-throw to be handled elsewhere if needed
    throw error;
  }
};

export default sendSMS;
