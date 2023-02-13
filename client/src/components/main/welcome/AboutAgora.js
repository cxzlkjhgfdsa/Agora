import styled from "styled-components";

const StyledAboutAgora = styled.p`
  // 글꼴, 자간, 문장 간격 설정
  color: #999999;
  font-size: 1.5rem;
  letter-spacing: -0.05rem;
  line-height: 3rem;

  display: inline-block;

  // 패딩 및 마진 설정
  padding: 0;
  margin: 0;

  // 위치 설정
  position: absolute;
  top: 220px;
  left: 300px;

  // 자동 줄바꿈 해제
  white-space: nowrap;
`;
const Bold = styled.span`
  // 볼드체 설정
  color: #999999;
  font-weight: 700;
`;

function AboutAgora() {
  return (
    <StyledAboutAgora>
      <Bold>아고라</Bold>는 고대 그리스의 도시들에 있었던<br />
      열린 '<Bold>회의의 장소</Bold>'였다.<br />
      도시의 운동, 예술, 영혼, 정치적<br />
      삶의 중심지였다.
    </StyledAboutAgora>
  );
}

export default AboutAgora;