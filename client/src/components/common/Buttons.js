import styled from "styled-components"

// 버튼 공통 디자인
const Button = styled.button`
  // 글자 크기 및 자간 설정
  font-size: 1rem;
  letter-spacing: -0.05em;

  // 둥근 테두리
  border-style: solid;
  border-radius: 40px;

  // 기본 마진 및 패딩
  margin: 8px;
  padding: 4px;

  // 호버링 시 커서 모양
  cursor: pointer;
`;

// 메인 버튼 (노란색 배경, 노란색 테두리)
export const MainButton = styled(Button)`
  // 버튼 크기
  width: 130px;
  height: 50px;

  // 글자 크기 및 두께
  font-size: 20px;
  font-weight: 700;
  
  // 버튼 색상
  background-color: #F6C026;
  border-color: #F6C026;
  color: #333333;
`;

// 상단바 메인 버튼 (어두운 배경, 어두운 테두리)
export const StyledDarkButton = styled(Button)`
  // 버튼 색상
  background-color: #4C4556;
  border-color: #4C4556;
  color: #FFFFFF;

  // 마진 및 패딩
  margin: 4px 12px 4px 12px;
  padding: 8px 20px 8px 20px;
`;

// 상단바 서브 버튼 (투명 배경, 투명 테두리)
export const StyledLightButton = styled(Button)`
  // 버튼 색상
  background-color: transparent;
  border-color: transparent;
  color: #4C4556;
`;