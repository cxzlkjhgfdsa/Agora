import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { showToggleMenuState } from "stores/ToggleMenuStates";
import { userInfoState } from "stores/userInfoState";
import styled from "styled-components";
import SearchBar from "../center/SearchBar";
import ToggleMenuItem from "./ToggleMenuItem";

// 토글 메뉴 가리기 위한 상단바
const StyledFakeHeader = styled.div`
  // 높이 고정
  height: 64px;

  // 헤더 색상 설정, 배경색 그림자색
  background-color: #FFFFFF;  // 배경색 : 흰색
  box-shadow: 1px 1px 1px #DCDCDC;  // 박스 그림자 설정

  z-index: -1;
  
  // 상단 고정
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const StyledToggleMenu = styled.ul`
  background-color: #DFDFDF;

  width: 100%;

  // 마진 및 패딩 없애기
  margin: 0 auto;
  padding: 0;

  // 위치 설정
  position: absolute;
  top: ${({ show, height }) => show ? 64 : 64 + height}px;
  left: 0;
  // right: 0;
  z-index: -2;
  box-shadow: 1px 1px 1px #DCDCDC;  // 박스 그림자 설정

  list-style: none;

  transition: 0.8s;
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
  let topLocation = 0;
  const ITEM_HEIGHT = 48;  // 리스트 아이템 높이 상수, top 위치 조정해주기 위함
  
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const curPath = useLocation().pathname;
  if (curPath.startsWith("/debate/list")) {
    // 검색창 추가
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

  // 추가된 리스트 아이템들의 높이만큼 top 위치를 올려 토글 전엔 안 보이게 하기
  if (items.length > 0) {
    // 토론방 목록 페이지의 경우 검색창이 추가되어 높이를 다르게 설정해야 함
    if (curPath.startsWith("/debate/list")) {
      topLocation -= 56;  // 검색창 높이
      topLocation -= (items.length - 1) * ITEM_HEIGHT;  // 검색창을 제외한 다른 아이템들의 높이 반영
    } else {  // 검색창이 없는 페이지의 경우 모두 동일한 높이의 아이템이므로 그대로 반영
      topLocation -= items.length * ITEM_HEIGHT;
    }
  }

  return (
    <>
      {/* 토글 시 기존 헤더와 겹치는 현상을 방지하기 위해 가짜 헤더 삽입 */}
      <StyledFakeHeader show={show} />

      {/* 토글 메뉴 */}
      <StyledToggleMenu show={show} height={topLocation}>
        {/* 메뉴 아이템 추가 */}
        {items.map(item => item)}
      </StyledToggleMenu>
    </>
  );
}

export default ToggleMenu;