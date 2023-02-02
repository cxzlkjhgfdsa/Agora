import styled from "styled-components";

// 컴포넌트 Wrapper
const StyledMainAgora = styled.div`
  font-weight: 700;
  display: inline-block;
  letter-spacing: -0.05rem;

  position: absolute;
  top: 630px;
  left: 300px;

  // 자동 줄바꿈 해제
  white-space: nowrap;
`;

// 화상 토론 사이트 글자
const StyledAboutSite = styled.p`
  font-size: 2.25rem;
  line-height: 1rem;
  color: #F6C026;

  padding: 0;
  margin: 0;
`;

// AGORA 아고라 글자
const StyledAgora = styled.p`
  padding: 0;
  margin: 0;
  color: #000000;
`;
// AGORA
const StyledAgoraEng = styled.span`
  font-size: 6.25rem;
  line-height: 7.5rem;
`;
// 아고라
const StyledAgoraKor = styled.span`
  font-size: 3.75rem;
  line-height: 4.5rem;
  margin-left: 16px;
`;

function MainAgora() {
  return (
    <StyledMainAgora>
      <StyledAboutSite>화상 토론 사이트</StyledAboutSite>
      <StyledAgora>
        <StyledAgoraEng>AGORA</StyledAgoraEng>
        <StyledAgoraKor>아고라</StyledAgoraKor>
      </StyledAgora>
    </StyledMainAgora>
  );
}

export default MainAgora;