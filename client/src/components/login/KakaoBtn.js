import { KAKAO_AUTH_URL } from "./OAuth";

function KakaoBtn() {
    

    return (
        <a id="kakao-login-btn" href={KAKAO_AUTH_URL}>
            <img 
                src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" 
                width="222"
                alt="카카오 로그인 버튼" />
        </a>
    )
}

export default KakaoBtn;  