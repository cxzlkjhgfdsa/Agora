import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { showToggleMenuState, userInfoState } from "stores/atoms";
import styled from "styled-components";
import SearchBar from "../center/SearchBar";
import ToggleMenuItem from "./ToggleMenuItem";

const StyledToggleMenu = styled.ul`
  background-color: #DFDFDF;

  width: 100%;

  // 마진 및 패딩 없애기
  margin: 0 auto;
  padding: 0;

  // 위치 설정
  position: absolute;
  top: ${({ show }) => show ? 64 : -500}px;
  left: 0;
  // right: 0;
  z-index: -1;
  box-shadow: 1px 1px 1px #DCDCDC;  // 박스 그림자 설정

  list-style: none;

  transition: 1s;
`;

const StyledToggleSearchBarItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  
  padding: 8px;
  margin: 4px;
`;

function ToggleMenu() {
  const show = useRecoilValue(showToggleMenuState);

  let items = [];
  
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const curPath = useLocation().pathname;
  if (curPath.startsWith("/debate/list")) {
    items.push(
      <StyledToggleSearchBarItem>
        <SearchBar />
      </StyledToggleSearchBarItem>
    );
  }

  // 회원인 경우 마이페이지, 로그아웃 보여주기
  if (userInfo.isLoggedIn) {
    items.push(
      // 마이페이지
      <ToggleMenuItem
        key={"MyPage"}
        content={"My Page"}
        to={"/user/mypage"}
        color={"#FFFFFF"}
      />,
      // 로그아웃
      <ToggleMenuItem
        key={"Logout"}
        content={"Logout"}
        onClick={() => { alert("로그아웃~"); setUserInfo({}); }}
        color={"#EF404A"}
      />
    );
  }
  // 비회원인 경우 둘러보기, 회원가입 보여주기
  else {
    items.push(
      // 둘러보기
      <ToggleMenuItem
        key={"DebateList"}
        content={"둘러보기"}
        to={"/debate/list"}
      />,
      // 회원가입
      <ToggleMenuItem
        key={"SignUp"}
        content={"회원가입"}
        to={"/user/signup"}
      />
    );
  }

  return (
    <StyledToggleMenu show={show} height={items.length * 50}>
      {items.map(item => item)}
    </StyledToggleMenu>);
}

export default ToggleMenu;