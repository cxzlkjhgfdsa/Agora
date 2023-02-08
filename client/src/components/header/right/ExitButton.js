import styled from "styled-components";
import DebateCommonStyledButton from "components/header/style/DebateCommonStyledButton";

// 나가기 버튼
const StyledExitButton = styled(DebateCommonStyledButton)`
  // 배경색 및 커서 모양
  background-color: #EF404A;
  cursor: pointer;
`;

function ExitButton({ onClick }) {
  return (
    <StyledExitButton onClick={onClick}>
      나가기
    </StyledExitButton>
  );
}

export default ExitButton;