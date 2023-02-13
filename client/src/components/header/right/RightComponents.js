import styled from "styled-components";

// Styled Button
import { StyledDarkButton, StyledLightButton } from "../../common/Buttons";

// 사용자 프로필
import UserProfileIcon from "./UserProfileIcon";

// 라우터 이동을 위한 Link
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoState } from "stores/userInfoState";

import { useMediaQuery } from "react-responsive";

// 상단바 우측 컴포넌트 Wrapper
const Wrapper = styled.div`
  height: calc( 100% - 16px );
  padding: 8px;
`;

function RightComponents() {
  // 로그인 여부, 페이지 위치 등 각종 상태에 따라 다른 컴포넌트 반환
  const userInfo = useRecoilValue(userInfoState);
  const curPath = useLocation().pathname;

  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)"
  });

  // 회원가입 페이지라면 미표시
  if (curPath.startsWith("/user/signup")) {
    return (
      <Wrapper></Wrapper>
    );
  }
  // 회원이라면 사용자 프로필 표시
  else if (userInfo.isLoggedIn) {
    return (
      <Wrapper>
        <UserProfileIcon nickname={userInfo.nickname} />
      </Wrapper>
    );
  }
  // 손님이라면 기본 사항 표시
  else {
    return (
      <Wrapper>
        {isDesktop ? <>
          <Link to={"/debate/list"}>
            <StyledLightButton>둘러보기</StyledLightButton>
          </Link>
          <Link to={"/user/signup/SNS"}>
            <StyledLightButton>회원가입</StyledLightButton>
          </Link>
        </>
        : null}
        <Link to={"/user/login"}>
          <StyledDarkButton>로그인</StyledDarkButton>
        </Link>
      </Wrapper>
    );
  }
}

export default RightComponents;