import styled from "styled-components"

// 버튼 공통 디자인
const Button = styled.button`
  // 글자 크기 및 자간 설정
  font-size: 1rem;
  letter-spacing: -0.05em;

  // 둥근 테두리
  border-style: solid;
  border-radius: 2rem;

  // 기본 마진 및 패딩
  margin: 8px;
  padding: 4px;

  // 호버링 시 커서 모양
  cursor: pointer;
`;

// 상단바 메인 버튼 (어두운 배경, 어두운 테두리)
export const StyledDarkButton = styled(Button)`
  // 버튼 색상
  background-color: #4C4556;
  border-color: #4C4556;
  color: #FFFFFF;

  // 마진 및 패딩
  margin: 4px 4px;
  padding: 8px 20px;
`;

// 상단바 서브 버튼 (투명 배경, 투명 테두리)
export const StyledLightButton = styled(Button)`
  // 버튼 색상
  background-color: transparent;
  border-color: transparent;
  color: #4C4556;
`;