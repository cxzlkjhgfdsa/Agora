import { useQuery } from "react-query";
import customAxios from "utils/customAxios";

const axios = customAxios();

const fetchUserInfo = ({ queryKey }) => {
  return axios.post(
    "/v2/user/login", 
    { user_id: queryKey[1]}
  );
}

export const useUserInfo = (userId) => {
  return useQuery(["userInfo", userId], fetchUserInfo, {
    staleTime: 0,
    select,
    onError,
  });
}

const select = response => {
  return response.body.data;
}

const onError = err => {
  console.warn("onError >> ", err);
}