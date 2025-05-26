import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
