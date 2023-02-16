import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import Spinner from "../common/Spinner";

import { userInfoState } from "../../stores/userInfoState";
import { useUserInfo } from "utils/hooks/useUserInfo";

function LoginRedirectHandler() {

    const setUserInfo = useSetRecoilState(userInfoState);
    const navigate = useNavigate();
    const userId = new URL(window.location.href).searchParams.get("userId");

    const { isLoading, data: userData, isError, error } = useUserInfo(userId);

    if (isLoading) return <Spinner />;
    if (isError) {
        alert("로그인에 실패했습니다.")
        navigate("/user/login");
    } else {
        const data = {...userData, isLoggedIn: true}
        setUserInfo(data);
        navigate("/debate/list");
    }


}

export default LoginRedirectHandler;


    // const unpackedData = {
    //     isLoggedIn: true,
    //     accessToken: data.data.body.accessToken,
    //     userId: data.data.body.userId,
    //     userNickname: data.data.body.userNickname,
    //     socialType: data.data.body.socialType,
    //     userPhoto: data.data.body.userPhoto,
    // };