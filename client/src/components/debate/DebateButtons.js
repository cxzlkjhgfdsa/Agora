import styled from "styled-components";

// 공통 스타일
const CommonStyledButton = styled.button`
  // 글꼴 설정
  color: #FFFFFF;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: -0.05em;

  // 크기 설정
  width: 180px;
  height: 70px;

  // 박스 음영
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);

  // 둥근 테두리 및 선 없애기
  border: 0px;
  border-radius: 40px;
`;

// 나가기 버튼
const StyledExitButton = styled(CommonStyledButton)`
  // 배경색 및 커서 모양
  background-color: #EF404A;
  cursor: pointer;
`;
export function ExitButton({ onClick }) {
  return (
    <StyledExitButton onClick={onClick}>
      나가기
    </StyledExitButton>
  );
}

// 활성화 READY 버튼
const StyledEnabledReadyButton = styled(CommonStyledButton)`
  // 배경색 및 커서 모양
  background-color: #00BF00;
  cursor: pointer;
`;
export function EnabledReadyButton({ onClick }) {
  return (
    <StyledEnabledReadyButton onClick={onClick}>
      READY
    </StyledEnabledReadyButton>
  );
}

// 비활성화 READY 버튼
const StyledDisabledReadyButton = styled(CommonStyledButton)`
  background-color: #D4D4D4;
`;
export function DisabledReadyButton() {
  return (
    <StyledDisabledReadyButton>
      READY
    </StyledDisabledReadyButton>
  );
}

// 활성화 START 버튼
const StyledEnabledStartButton = styled(CommonStyledButton)`
  // 배경색 및 커서 모양
  background-color: #377BC3;
  cursor: pointer;
`;
export function EnabledStartButton({ onClick }) {
  return (
    <StyledEnabledStartButton onClick={onClick}>
      START
    </StyledEnabledStartButton>
  );
}

// 비활성화 READY 버튼
const StyledDisabledStartButton = styled(CommonStyledButton)`
  background-color: #D4D4D4;
`;
export function DisabledStartButton() {
  return (
    <StyledDisabledStartButton>
      START
    </StyledDisabledStartButton>
  );
}
