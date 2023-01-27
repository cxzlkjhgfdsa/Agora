import { atom, selector, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect } from "react";

import customAxios from "../../utils/customAxios";
import Spinner from "../common/Spinner";

import { userInfoState } from "../../stores/atoms";
import ErrorBoundary from "./ErrorBoundary";

 
/* 

public class ResponseDTO {
    private String message;
    private Object body;
    private int statusCode;
    private boolean state;
}

public class LoginResponseDto {
    private UUID userId;
    private SocialType socialType;
    private String userNickname;
    private String userPhoto;
    private String accessToken;
}
*/

function LoginRedirectHandler() {
    const [setUserInfo] = useSetRecoilState(userInfoState);
    const navigate = useNavigate();

    const userId = new URL(window.location.href).searchParams.get("userId");

    const axios = customAxios();

    useEffect(() => {
        async function getAccessTokenWithUserInfos() {
            try {
                console.log("userId >> ", userId)
                const { data } = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/total/oauth`, {
                    data: {
                        user_id : userId
                    },
                }); 
                // response.data를 data라는 이름으로 저장
                console.log("data >> ", data)

                // const { message, body: loginResponseDto, statusCode, state } = data
                const loginResponseDto = data.body;
                console.log("loginResponseDto >> ", loginResponseDto);
                const userInfo = {
                    isLoggedIn: true,
                    ...loginResponseDto,
                }
                setUserInfo(userInfo); 
            } catch(err) {
                console.log("error occured")
                console.log("ERROR >>", err);
            }
        }

        getAccessTokenWithUserInfos();
        navigate("/");
    }, [setUserInfo, axios, navigate, userId]);


    return (
        <ErrorBoundary>
            <h1>login handler</h1>
            <Spinner />
        </ErrorBoundary>
    )
}

export default LoginRedirectHandler;