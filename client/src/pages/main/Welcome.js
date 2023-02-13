import AboutAgora from "components/main/welcome/AboutAgora";
import MainAgora from "components/main/welcome/MainAgora";
import WelcomeImage from "assets/images/Welcome_Image.png";

import styled from "styled-components";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "stores/userInfoState";
import { useNavigate } from "react-router";

const WelcomeWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const WelcomeImg = styled.img`
  // 크기 설정
  width: 810px;

  // 위치 설정
  position: absolute;
  top: 130px;
  left: 900px;
`;

function Welcome() {
  // 회원이 Welcome 페이지에 방문할 경우 토론방 목록으로 리다이렉트
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo.isLoggedIn) {
      navigate("/debate/list");
    }
  }, [userInfo, navigate]);

  return (
    <WelcomeWrapper>
      <AboutAgora />
      <MainAgora />
      <WelcomeImg src={WelcomeImage} />
    </WelcomeWrapper>
  )
}

export default Welcome;