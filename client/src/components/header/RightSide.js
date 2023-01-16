import { DisabledReadyButton, EnabledReadyButton, EnabledStartButton, ExitButton } from "components/debate/DebateButtons";
import styled from "styled-components";

// Styled Button
import { StyledDarkButton, StyledLightButton } from "../common/Buttons";

// 사용자 프로필
import UserProfileIcon from "./UserProfileIcon";

// 상단바 우측 컴포넌트 Wrapper
const RightSideWrapper = styled.div`
  padding: 12px;
`;

function RightSide({ user }) {
  // 로그인 여부, 페이지 위치 등 각종 상태에 따라 다른 컴포넌트 반환
  if (user) {
    return (
      <RightSideWrapper>
        <UserProfileIcon nickname={user.nickname} />
      </RightSideWrapper>
    );
  } else {
    return (
      <RightSideWrapper>
        <StyledLightButton>둘러보기</StyledLightButton>
        <StyledLightButton>회원가입</StyledLightButton>
        <StyledDarkButton>로그인</StyledDarkButton>
        <EnabledReadyButton onClick={() => alert("준비합니다.")} />
        <DisabledReadyButton />
        <EnabledStartButton onClick={() => alert("시작합니다.")} />
        <DisabledReadyButton />
        <ExitButton onClick={() => alert("방에서 나갑니다.")} />
      </RightSideWrapper>
    );
  }
}

export default RightSide;