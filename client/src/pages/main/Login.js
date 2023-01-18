import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserInfoAtom } from "stores/atoms";

function Login() {
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);

  const navigate = useNavigate();

  const login = () => {
    alert("로그인 처리");
    setUserInfo({ userId: "ssafy123", nickname: "Coffee", isLoggedIn: true });
    navigate("/debate/list");
  };
  const logout = () => {
    alert("로그아웃 처리");
    setUserInfo({});
    navigate("/");
  };

  return (
    <div>
      <h1>This is Login page.</h1>
      { !userInfo.isLoggedIn &&
        <button onClick={login}>
          TEST: 로그인 (userId: ssafy123, nickname: Coffee, isLoggedIn: true)
        </button>
      }
      {
        userInfo.isLoggedIn &&
        <button onClick={logout}>
            TEST: 로그아웃
        </button>
      }
    </div>
  )
}

export default Login;