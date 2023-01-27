import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

// READY, START 버튼
import ReadyButton from "./ReadyButton";
import StartButton from "./StartButton";
import { useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { debateInfoState, showToggleMenuState } from "stores/atoms";
import LogoIcon from "./LogoIcon";

import HamburgerIcon from "assets/icons/Hamburger_Black.png";

const Wrapper = styled.div`
  height: calc( 100% - 16px );
  padding: 8px;
`;

const TabletIcon = styled.img`
  width: 48px;
  height: 48px;
  
  cursor: pointer;
`;

function LeftComponents() {
  // 현재 페이지 파악
  const curPath = useLocation().pathname;

  // 사용자 정보 및 토론방 정보 가져오기
  const [debateInfo, setDebateInfo] = useRecoilState(debateInfoState);

  // READY 이벤트
  const ready = () => {
    alert("준비 버튼을 눌렀습니다.");
    const copiedDebateInfo = { ...debateInfo, isReady: true };
    setDebateInfo(copiedDebateInfo);
  };

  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)"
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)"
  });

  // 토글 메뉴 State
  const setShowToggleMenu = useSetRecoilState(showToggleMenuState);
  const onClickHamburger = () => {
    setShowToggleMenu(cur => !cur);
  };

  // 데스크탑 컴포넌트 기본값은 로고 아이콘
  let DesktopComponents =
    <LogoIcon />;
  let TabletComponents =
    <TabletIcon src={HamburgerIcon} onClick={ onClickHamburger } />;

  // 토론방
  if (curPath.startsWith("/debate/room")) {
    // 방장일 경우 비활성화 START 표시
    if (debateInfo.isLeader) {
      DesktopComponents = TabletComponents = <StartButton enabled={false} />;
    }
    // 발언자일 경우 활성화 READY 표시
    else if (debateInfo.position === "Speaker") {
      DesktopComponents = TabletComponents = !debateInfo.isReady
        ? <ReadyButton onClick={ready} enabled={true} />
        : <ReadyButton enabled={false} />;
    }
  }

  return (
    <Wrapper>
      {isDesktop && DesktopComponents}
      {isTablet && TabletComponents}
    </Wrapper>
  );
}

export default LeftComponents;