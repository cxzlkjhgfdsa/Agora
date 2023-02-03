import styled from "styled-components";
import NoContents from "./NoContents";

import { useMediaQuery } from "react-responsive";
import ModalThumbnail from "./ModalThumbnail";

const StyledModalContents = styled.div`
  // 크기 설정
  width: 100%;
  height: 75%;
  margin: 0;

  // display
  display: flex;
  flex-wrap: wrap;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    background: #333333;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #666666;
    border-radius: 10px;
  }
`;

const StyledDebateWrapper = styled.div`
  width: calc( ${({ countInRow }) => 100 / countInRow}% - 16px );
  aspect-ratio: 16 / 9;
  margin: 0px; padding: 8px;
`;

function ModalContents({ contents, ref, loading, isEnd }) {
  // 한 행에 보여줄 토론방의 개수 설정
  let countInRow = 1;
  countInRow += useMediaQuery({
    query: "(min-width: 512px)"
  });
  countInRow += useMediaQuery({
    query: "(min-width: 1024px)"
  });
  
  return (
    <>
      <StyledModalContents>
        {contents.map((item, index) => (
          <StyledDebateWrapper countInRow={countInRow}>
            <ModalThumbnail key={item + index} content={item} />
          </StyledDebateWrapper>
        ))}
        {contents.length === 0 ? <NoContents /> : null}
      </StyledModalContents>
      {/* 스크롤 마지막임을 알리는 컴포넌트 */}
      {loading || isEnd ? null : <span ref={ref} />}
    </>
  );
}

export default ModalContents;