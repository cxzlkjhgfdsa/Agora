import { useRecoilState } from "recoil";

import { userInfoState } from "stores/atoms";

function Logout() {
    const [ userInfo, setUserInfo ] = useRecoilState(userInfoState);


    return (
        <div>
            <button onClick={logout}>
                로그아웃
            </button>
        </div>
    )
}