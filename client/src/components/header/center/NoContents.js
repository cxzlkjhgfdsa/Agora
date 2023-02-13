import styled from "styled-components";

const StyledLabel = styled.p`
  margin-top: 8px;
  width: 100%;
  text-align: center;
`;

function NoContents() {
  return (
    <StyledLabel>
      검색결과 없음
    </StyledLabel>
  );
}

export default NoContents;