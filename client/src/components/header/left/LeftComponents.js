import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import { useSetRecoilState } from "recoil";
import { showToggleMenuState } from "stores/ToggleMenuStates";
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

  return (
    <Wrapper>
      {isDesktop ? DesktopComponents : null}
      {isTablet ? TabletComponents : null}
    </Wrapper>
  );
}

export default LeftComponents;