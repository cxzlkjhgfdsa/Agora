// 화면의 상단 부분에 들어갈 헤더입니다.
// components 폴더의 컴포넌트들을 조합하여 사용자에게 보여지는 페이지를 구성합니다.

// 헤더 컴포넌트를 불러 와 페이지에 배치합니다.
import styled from "styled-components";

// 라우터 이동을 위한 Link
import LeftComponents from "components/header/left/LeftComponents";
import CenterComponents from "components/header/center/CenterComponents";
import RightComponents from "components/header/right/RightComponents";

// 토론방 정보 및 사용자 정보 상태 관리
import { useRecoilValue } from "recoil";
import { DebateInfoAtom, UserInfoAtom } from "stores/atoms";

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

function Header() {
  // Test : 활성화 시 모든 헤더 버튼들 보기
  const userInfo = useRecoilValue(UserInfoAtom);
  const debateInfo = useRecoilValue(DebateInfoAtom);

  console.log(userInfo);
  console.log(debateInfo);
  
  return (
    <StyledHeader>
      {/* 로고 */}
      <LeftComponents />
      
      {/* 검색창 */}
      <CenterComponents />
      
      {/* 그룹 */}
      <RightComponents />
    </StyledHeader>
  );
}

export default Header;