import axios from 'axios';

const customAxios = () => {
    const axiosConfig = {
        baseURL: process.env.REACT_APP_SERVER_BASE_URL,
        timeout: 2000,
        withCredentials: true,
    }
    return axios.create(axiosConfig);
}

export default customAxios;