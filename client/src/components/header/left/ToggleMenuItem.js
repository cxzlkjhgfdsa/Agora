import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLi = styled.li`
  text-align: center;

  display: block;
  padding: 8px;
  margin: 4px;

  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: -0.05rem;

  ${({ color }) => color ? "color: " + color + ";" : ""}

  cursor: pointer;
`;

function ToggleMenuItem({ to, content, onClick, color }) {
  return (
    <StyledLi onClick={onClick} color={color}>
      {/* 이동할 경로가 있는 경우 Link 씌우기 */}
      {to &&
        <Link to={to} style={{display: "block"}}>
          {content}
        </Link>
      }

      {/* 이동할 경로가 없는 경우 Link도 없음 */}
      {!to && content}
    </StyledLi>
  );
}

export default ToggleMenuItem;