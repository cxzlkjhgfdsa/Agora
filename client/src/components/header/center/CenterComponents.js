import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const Wrapper = styled.div`
`;

function CenterComponents() {
  const curPath = useLocation().pathname;

  // 토론방 목록 페이지에 있을 경우 검색창 표시
  if (curPath.startsWith("/debate/list")) {
    return (
      <Wrapper>
        <SearchBar />
      </Wrapper>
    );
  }
  // 토론방 페이지에 있을 경우 토론 주제 표시
  else if (curPath.startsWith("/debate/room")) {
    return (
      <Wrapper>
        <h1>딱딱한 복숭아 VS 소고기</h1>
      </Wrapper>
    );
  }

  // 이외의 페이지는 미표시
  return (
    <Wrapper></Wrapper>
  );
}

export default CenterComponents;