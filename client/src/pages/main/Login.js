// import { useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { userInfoState } from "stores/atoms";

// import KakaoBtn from "../../components/login/KakaoBtn"
// import NaverBtn from "../../components/login/NaverBtn"

// function Login() {
//   const [userInfo, setUserInfo] = useRecoilState(userInfoState);

//   const navigate = useNavigate();

//   const login = () => {
//     alert("로그인 처리");
//     setUserInfo({ userId: "ssafy123", nickname: "Coffee", isLoggedIn: true });
//     navigate("/debate/list");
//   };

//   const logout = () => {
//     alert("로그아웃 처리");
//     setUserInfo({ isLoggedIn: false});
//     //navigate("/");  
//   };

//   return (
//     <div>
//       <h1>This is Login page.</h1>

//       <KakaoBtn>카카오계정으로 로그인</KakaoBtn>
//       {/* <NaverBtn>네이버 로그인</NaverBtn> */}

//       { !userInfo.isLoggedIn 
//       ? <button onClick={login}>
//         TEST: 로그인 (다음으로 설정됨 - userId: ssafy123, nickname: Coffee, isLoggedIn: true)
//         </button> 
//       : <button onClick={logout}>
//         TEST: 로그아웃
//         </button>
//       }

//     </div>
//   )
// }

// export default Login;
function Login() {
  return(
    <div>

    </div>
  )
}
export default Login