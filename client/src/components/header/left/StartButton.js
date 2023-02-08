import styled from "styled-components";
import DebateCommonStyledButton from "components/header/style/DebateCommonStyledButton";

// START 버튼
const StyledStartButton = styled(DebateCommonStyledButton)`
  // 배경색 및 커서 모양
  background-color: ${({ enabled }) => enabled ? "#377BC3" : "#D4D4D4"};
  cursor: ${({ enabled }) => enabled ? "pointer" : "default"};
`;

function StartButton({ onClick, enabled }) {
  return (
    <StyledStartButton onClick={onClick} enabled={enabled}>
      START
    </StyledStartButton>
  );
}

export default StartButton;