import { useSetRecoilState } from "recoil";
import { showPageState } from "stores/myPageStates";
import styled from "styled-components";

const StyledSideNav = styled.ul`
  // 크기 설정

  // 마진 및 패딩 삭제
  margin: 0;
  padding: 64px 0 0 0;

  // 아이템 가운데 정렬
  text-align: center;

  position: relative;
`;

const StyledLi = styled.li`
  // 마진 설정
  margin: 24px 12px;

  // 구분점 삭제
  list-style: none;
  
  // 글꼴
  font-size: 1.5rem;
  letter-spacing: -0.05rem;

  &.selectedSideNavItem {
    font-weight: 700;
  }

  cursor: pointer;

  // 밑줄 Transition
  &.to-right-underline{
    position: relative;
  }
  &.to-right-underline:after{
    content: "";
    position: absolute;
    left: 25%;
    bottom: -5px;
    width: 0px;
    height: 3px;
    margin: 5px 0 0;
    transition: all 0.2s ease-in-out;
    transition-duration: 0.3s;
    opacity: 0;
    background-color: #F6C026;
  }
  &.to-right-underline:hover:after{
    width: 50%;
    opacity: 1;
  }
`;

function SideNav() {
  const setShowPage = useSetRecoilState(showPageState);

  const onClickMenu = (event) => {
    document.querySelector(".selectedSideNavItem").classList.toggle("selectedSideNavItem");
    event.target.classList.toggle("selectedSideNavItem");
    setShowPage(event.target.id);
  };

  return (
    <StyledSideNav>
      <StyledLi
        id="MyInfo"
        className="to-right-underline selectedSideNavItem"
        onClick={onClickMenu}
      >
        내 정보
      </StyledLi>

      <StyledLi
        id="MyDebateHistory"
        className="to-right-underline"
        onClick={onClickMenu}
      >
        토론 기록
      </StyledLi>
    </StyledSideNav>
  );
}

export default SideNav;