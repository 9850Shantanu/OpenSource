import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your API base URL
  timeout: 5000, // Set a timeout value, if desired
  headers: {
    'Content-Type': 'application/json', // Set the content type you expect to send/receive
  },
});

const makeApiRequest = async (method, url, data = null, params = null) => {
  try {
    const response = await api({
      method,
      url,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    // Handle the error or throw it to the caller
    throw error;
  }
};

export default makeApiRequest;