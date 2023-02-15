import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import Spinner from "../common/Spinner";

import { userInfoState } from "../../stores/userInfoState";
import { useUserInfo } from "utils/hooks/useUserInfo";

function LoginRedirectHandler() {

    const setUserInfo = useSetRecoilState(userInfoState);
    const navigate = useNavigate();
    const userId = new URL(window.location.href).searchParams.get("userId");

    const { isLoading, data, isError, error } = useUserInfo(userId);

    if (isLoading) return <Spinner />;
    if (isError) throw error.message;

    data.isLoggedIn = true;
    setUserInfo(data);

    navigate("/debate/list");
}

export default LoginRedirectHandler;
