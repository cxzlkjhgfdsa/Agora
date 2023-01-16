// 화면의 상단 부분에 들어갈 헤더입니다.
// components 폴더의 컴포넌트들을 조합하여 사용자에게 보여지는 페이지를 구성합니다.

// 헤더 컴포넌트를 불러 와 페이지에 배치합니다.
import styled from "styled-components";

// 로고
import AgoraLogo from "assets/icons/AgoraLogo.png";

// 헤더 중앙, 검색창
import SearchBar from "../components/header/SearchBar";

// 헤더 우측, 로그인 버튼 및 사용자 프로필 등
import RightSide from "../components/header/RightSide";

// 상단바
const StyledHeader = styled.header`
  // 높이 고정
  height: 94px;

  // 헤더 색상 설정, 배경색 그림자색
  background-color: #FFFFFF;  // 배경색 : 흰색
  box-shadow: 1px 1px 1px #DCDCDC;  // 박스 그림자 설정

  // 컴포넌트 배치
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  // 상단 고정
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

// 로고 이미지와 '아고라' 이미지를 합치는 Wrapper
const LogoIcon = styled.img`
  // 전체 크기 설정
  width: 234px;
  height: 70px;

  // 호버링 시 커서 모양 설정
  cursor: pointer;

  // 마진 설정
  margin: 12px;
`;

function Header() {
  const clickLogo = () => {
    alert("로고를 눌렀습니다.");
  };

  // Test : 활성화 시 검색창, 사용자 프로필 보기
  // const user = { userId: "ssafy123", userPw: "qwer1234", nickname: "SSAFY123" };
  
  // Test : 활성화 시 모든 헤더 버튼들 보기
  const user = null;

  return (
    <StyledHeader>
      {/* 로고 */}
      <LogoIcon src={AgoraLogo} onClick={clickLogo} />
      
      {/* 검색창 */}
      {user ? <SearchBar /> : null}
      
      {/* 그룹 */}
      <RightSide user={user} />
    </StyledHeader>
  );
}

export default Header;