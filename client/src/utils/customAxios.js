import axios from "axios";

const customAxios = () => {
    const axiosConfig = {
        baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}`,
        timeout: 2000,
    };
    const axiosInstance = axios.create(axiosConfig);

    axiosInstance.interceptors.request.use(function (config) {
        console.log(config.baseURL + config.url + "?" + JSON.stringify(config.params));
        return config;
    });
    return axios.create(axiosConfig);
};

export default customAxios;
