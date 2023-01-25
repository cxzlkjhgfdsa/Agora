import KakaoBtn from "../../components/login/KakaoBtn";
import NaverBtn from "../../components/login/NaverBtn";
import GoogleBtn from "../../components/login/GoogleBtn";
import styled from 'styled-components'

function Login() {

  return (
    <LoginBtnContainer>
      <h1>This is Login page.</h1>

      <div>
        <GoogleBtn />
        <KakaoBtn />
        <NaverBtn />
      </div>

    </LoginBtnContainer>
  )
}

export default Login;

const LoginBtnContainer = styled.div`
position: relative;
width: 500px;
height: 500px;
margin: 0 auto;

position: absolute; 
left: 50%; top: 50%; 
transform: translate(-50%, -50%); 
text-align: center;

display: flex;
flex-direction: column;
justify-content: center; 
align-items: center;
`