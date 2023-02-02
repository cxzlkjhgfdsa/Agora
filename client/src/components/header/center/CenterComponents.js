import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DebateTopic from "./DebateTopic";
import SearchBar from "./SearchBar";

import { useMediaQuery } from "react-responsive";
import LogoIcon from "../left/LogoIcon";

const Wrapper = styled.div`
`;

function CenterComponents() {
  const curPath = useLocation().pathname;
  
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)"
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)"
  });

  // 데스크탑 기본 컴포넌트는 빈 컴포넌트
  let DesktopComponents = <></>;
  // 태블릿 이하 크기 기기 컴포넌트
  const TabletComponents = <LogoIcon />;

  // 토론방 목록 페이지에 있을 경우 검색창 표시
  if (curPath.startsWith("/debate/list")) {
    DesktopComponents = <SearchBar />;
  }
  // 토론방 페이지에 있을 경우 토론 주제 표시
  else if (curPath.startsWith("/debate/room")) {
    DesktopComponents = <DebateTopic topic={"딱딱한 복숭아 vs 물렁한 복숭아"} />;
  }

  // 이외의 페이지는 미표시
  return (
    <Wrapper>
      {isDesktop ? DesktopComponents : null}
      {isTablet ? TabletComponents : null}
    </Wrapper>
  );
}

export default CenterComponents;