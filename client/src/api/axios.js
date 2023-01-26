import axios from "axios";

const API = axios.create({
  baseURL: "https://2eabc1ce-08b7-4b51-a88a-89f8081e62e3.mock.pstmn.io",
  headers: {
    "Content-Type": "application/json"
  }
});

// 타임아웃 설정
API.defaults.timeout = 3000;

export default API;