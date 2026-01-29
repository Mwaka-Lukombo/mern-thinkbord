import axios from 'axios';


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost/api" :"/api"

const AxiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})


export default AxiosInstance;






