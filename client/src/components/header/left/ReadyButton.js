import styled from "styled-components";
import DebateCommonStyledButton from "components/header/style/DebateCommonStyledButton";

// READY 버튼
const StyledReadyButton = styled(DebateCommonStyledButton)`
  // 배경색 및 커서 모양
  background-color: ${({ enabled }) => enabled ? "#00BF00" : "#D4D4D4"};
  cursor: ${({ enabled }) => enabled ? "pointer" : "default"};
`;

function ReadyButton({ onClick, enabled }) {
  return (
    <StyledReadyButton onClick={onClick} enabled={enabled}>
      READY
    </StyledReadyButton>
  );
}

export default ReadyButton;