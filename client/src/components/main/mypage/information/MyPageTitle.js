import styled from "styled-components";

const StyledTitle = styled.p`
  // 크기 설정
  min-width: 400px;
  width: 100%;

  // 패딩 및 마진 초기화
  margin: 0;
  padding: 24px 0;

  // 글꼴 설정
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.05rem;
  text-align: center;
`;

function MyPageTitle({ text }) {
  return (
    <StyledTitle>
      {text}
    </StyledTitle>
  )
}

export default MyPageTitle;