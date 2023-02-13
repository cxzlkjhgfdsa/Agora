import kakaoLogo from "../../assets/login/kakao_login_large_narrow.png";

function KakaoBtn() {
    const KAKAO_AUTH_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/oauth/kakao`;

    return (
        <div>
            <a id="kakao-login-btn" href={KAKAO_AUTH_URL}>
                <img src={kakaoLogo} width="222" alt="카카오 로그인 버튼" />
            </a>
        </div>
    );
}

export default KakaoBtn;
