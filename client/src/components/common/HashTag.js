import styled from "styled-components";

const StyledHashTag = styled.span`
  font-size: 0.8rem;
  margin: 2px;
  padding: 0px 8px;

  background-color: ${({color}) => color ? color : "#DFDFDF"};
  border: 1px solid #606060;
  border-radius: 8px;
`;

function HashTag({ tag, color }) {
  return (
    <StyledHashTag color={color}>
      {tag}
    </StyledHashTag>
  );
}

export default HashTag;