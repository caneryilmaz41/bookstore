import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        key: 'AIzaSyCi29Xz-ra5E1jLFNYIZRPPM01oJj740LQ', // API anahtarı
    },
});

export default axiosInstance;