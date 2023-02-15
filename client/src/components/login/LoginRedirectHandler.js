import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Spinner from "../common/Spinner";

import { userInfoState } from "../../stores/userInfoState";
import { useUserInfo } from "utils/hooks/useUserInfo";

/* 
public class LoginResponseDto {
    private UUID userId;
    private SocialType socialType;
    private String userNickname;
    private String userPhoto;
    private String accessToken;
}
*/

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

    
    // useEffect(() => {
    //     async function getAccessTokenWithUserInfos() {
    //         try {
    //             console.log("userId >> ", userId);
    //             const { data } = await axios.post(
    //                 `${process.env.REACT_APP_SERVER_BASE_URL}/v2/user/login`,
    //                 { user_id: userId }
    //             );
    //             // response.data를 data라는 이름으로 저장
    //             console.log("data >> ", data);

    //             if (!data.state) {
    //                 throw new Error("data state is false");
    //             }

    //             // const { message, body: loginResponseDto, statusCode, state } = data
    //             const loginResponseDto = data.body;
    //             console.log("loginResponseDto >> ", loginResponseDto);
    //             const userInfo = {
    //                 isLoggedIn: true,
    //                 ...loginResponseDto,
    //             };
    //             setUserInfo(userInfo);
    //         } catch (err) {
    //             console.log("error occured");
    //             console.log("ERROR >>", err);
    //         }
    //     }

    //     getAccessTokenWithUserInfos().then(() => navigate("/debate/list"));
    // }, []);

    // return (
    //     <ErrorBoundary>
    //         <Spinner />
    //     </ErrorBoundary>
    // );
}

export default LoginRedirectHandler;
