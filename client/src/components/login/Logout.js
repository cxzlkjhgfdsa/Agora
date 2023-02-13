import { useResetRecoilState } from "recoil";

import { userInfoState } from "stores/atoms";

function Logout() {
    const resetUserInfo = useResetRecoilState(userInfoState);

    const logout = () => {
        resetUserInfo();
        window.location.href = '/';
    }

    return (
        <div>
            <button onClick={logout}>
                로그아웃
            </button>
        </div>
    )
}

export default Logout;