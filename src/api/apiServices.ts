import axios, { AxiosInstance } from 'axios';


const baseURL = import.meta.env.VITE_BASE_URL ;
const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
});

export const setJwtToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

export default axiosInstance;
