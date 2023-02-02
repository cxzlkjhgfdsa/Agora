import naverLogo from "../../assets/login/btnG_완성형.png"

function NaverBtn() {
    const NAVER_AUTH_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/oauth2/authorization/naver`

    return (
        <div>
            <a id="naver-login-btn" href={NAVER_AUTH_URL}>
                <img 
                    src={naverLogo}
                    width="222"
                    alt="네이버 로그인 버튼" />
            </a>
        </div>
    )
}

export default NaverBtn;