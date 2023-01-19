import ExitButton from "./ExitButton";
import styled from "styled-components";

// Styled Button
import { StyledDarkButton, StyledLightButton } from "../../common/Buttons";

// 사용자 프로필
import UserProfileIcon from "./UserProfileIcon";

// 라우터 이동을 위한 Link
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { debateInfoState, userInfoState } from "stores/atoms";

// 상단바 우측 컴포넌트 Wrapper
const Wrapper = styled.div`
  height: 70px;
  padding: 12px;
  display: flex;
  align-items: center;
`;

function RightComponents() {
  // 로그인 여부, 페이지 위치 등 각종 상태에 따라 다른 컴포넌트 반환
  const userInfo = useRecoilValue(userInfoState);
  const setDebateInfo = useSetRecoilState(debateInfoState);
  const curPath = useLocation().pathname;
  const navigate = useNavigate();


  // 토론방에서는 나가기 버튼 표시
  if (curPath.startsWith("/debate/room")) {
    const exit = () => {
      alert("나가기 버튼을 눌렀습니다. 나가기 처리 후 토론방 목록으로 이동합니다.");
      // 토론방 정보 초기화?
      setDebateInfo({});
      // 나가기
      navigate("/debate/list");
    };

    return (
      <Wrapper>
        <ExitButton onClick={exit} />
      </Wrapper>
    );
  }
  // 회원가입 페이지라면 미표시
  else if (curPath.startsWith("/user/signup")) {
    return (
      <Wrapper></Wrapper>
    );
  }
  // 회원이라면 사용자 프로필 표시
  else if (userInfo.isLoggedIn) {
    return (
      <Wrapper>
        <Link to={"/debate/list"}>
          <StyledLightButton>둘러보기</StyledLightButton>
        </Link>
        <UserProfileIcon nickname={userInfo.nickname} />
      </Wrapper>
    );
  }
  // 손님이라면 기본 사항 표시
  else {
    return (
      <Wrapper>
        <Link to={"/debate/list"}>
          <StyledLightButton>둘러보기</StyledLightButton>
        </Link>
        <Link to={"/user/signup/SNS"}>
          <StyledLightButton>회원가입</StyledLightButton>
        </Link>
        <Link to={"/user/login"}>
          <StyledDarkButton>로그인</StyledDarkButton>
        </Link>
      </Wrapper>
    );
  }
}

export default RightComponents;