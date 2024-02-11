import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5500/', // Replace with your actual backend API URL
});

export default instance;
