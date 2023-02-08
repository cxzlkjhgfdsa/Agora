import axios from "axios";

const API = axios.create({
  baseURL: "${process.env.REACT_APP_SERVER_BASE_URL}",
  headers: {
    "Content-Type": "application/json"
  }
});

// 타임아웃 설정
API.defaults.timeout = 3000;

export default API;