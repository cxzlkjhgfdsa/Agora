import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHashTag = styled.span`
  font-size: 0.8rem;
  margin: 2px;
  padding: 0px 8px;

  background-color: #DFDFDF;
  border: 1px solid #606060;
  border-radius: 8px;
`;

function HashTag({ tag }) {
  return (
    <Link to={"/" + tag}>
      <StyledHashTag>
        {tag}
      </StyledHashTag>
    </Link>
  );
}

export default HashTag;