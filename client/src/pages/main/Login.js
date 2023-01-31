import KakaoBtn from "../../components/login/KakaoBtn";
import NaverBtn from "../../components/login/NaverBtn";
import GoogleBtn from "../../components/login/GoogleBtn";
import styled from 'styled-components'

import AgoraLogo from "assets/icons/AgoraLogo.png";

// export default Login;
function Login() {

  return (
    <LoginBtnContainer>

      <img src={AgoraLogo} alt="아고라 로고" width="150px"></img>

      <TextContainer>
        <StyledHr></StyledHr>
        <StyledText>SNS 간편 로그인/회원가입</StyledText>
        <StyledHr></StyledHr>
      </TextContainer>

      <GoogleBtn />
      <KakaoBtn />
      <NaverBtn />

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
transform: translate(-50%, -40%); 
text-align: center;

display: flex;
flex-direction: column;
justify-content: center; 
align-items: center;
`

const TextContainer = styled.div`
display: flex;
align-items: center;
padding: 80px 0px 30px;
`

const StyledHr = styled.hr`
flex: auto;
border: 1.5px solid #D9D9D9;
width: 5rem;

`

const StyledText = styled.span`
flex-basis: 70%;
align-items: center;
font-size: 15px;
color: #999999;


`