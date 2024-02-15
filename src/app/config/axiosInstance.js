import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        key: 'AIzaSyDZTvhLcqVhDaMvxbZ0Lx_XQsjTGfrpxow', // API anahtarı
    },
});

export default axiosInstance;