import axios from "axios";

// 객체를 생성하여 
const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}`,
    timeout: 2000,
});

api.interceptors.request.use(
    config => {
        // 세션 스토리지에서 Access Token 가져오기, 없다면 Undefined
        const accessToken = JSON.parse(
            sessionStorage.getItem("user_info")
        )?.accessToken;
        
        // Authorization 헤더에 토큰 추가
        if (accessToken) {
            config["Authorization"] = "Bearer " + accessToken;
        }
        return config;
    }
);

// 위의 Axios 인스턴스 자체를 export 하면 기존 코드를 모두 수정해야 하므로 (const axios = customAxios() -> const axios = api;)
// 인스턴스를 반환하는 함수를 구성
const customAxios = () => {
    return api;
};

export default customAxios;
