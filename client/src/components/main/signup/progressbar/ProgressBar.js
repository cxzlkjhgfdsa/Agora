import styled from "styled-components";
import { Expand } from "./ExpandAnimation";

const Wrapper = styled.div`
`

const ProgressBarBox = styled.div`
  // 진행바 크기
  width: 0%;
  height: 8px;

  // 진행바 색상
  background-color: #F6C026;

  // 애니메이션 적용
  animation: ${ Expand } 0.5s 0.01s ease 1 forwards;
  transition: all 1s
`

function ProgressBar() {
  // 진행바 렌더링
  return(
    <Wrapper>
      <ProgressBarBox />
    </Wrapper>
  )
}

export default ProgressBar