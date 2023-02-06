import styled from "styled-components";

const StyledNoContents = styled.span`
  // 글꼴 설정
  color: #FFFFFF;
  font-size: 3rem;
  letter-spacing: -0.05rem;

  // 정가운데 위치 설정
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function NoContents() {
  return (
    <StyledNoContents>
      토론방이 없습니다
    </StyledNoContents>
  )
}

export default NoContents;