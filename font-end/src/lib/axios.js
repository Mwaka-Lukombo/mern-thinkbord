import axios from 'axios';


const AxiosInstance = axios.create({
    baseURL:"http://localhost:5001/api/",
    withCredentials:true
})


export default AxiosInstance;






