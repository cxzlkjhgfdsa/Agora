import styled from "styled-components";

const StyledSelectOpinion = styled.div`
  // 

  // Display
  display: flex;

`;
const OpinionButtonDiv = styled.div`
  // 

  // Display
  display: inline-block;

`;
const OpinionButton = styled.button`
  // 크기 설정
  width: 40%;
  aspect-ratio: 7 / 5;
`;

function SelectOpinion(props) {
  const leftOpinion = props?.leftOpinion;
  const rightOpinion = props?.rightOpinion;
  const leftUserList = props?.leftUserList;
  const rightUserList = props?.rightUserList;

  return (
    <StyledSelectOpinion>
      {/* 왼쪽 의견 */}
      <OpinionButtonDiv>
        <OpinionButton>{leftOpinion}</OpinionButton>
      </OpinionButtonDiv>
      
      {/* 오른쪽 의견 */}
      <OpinionButtonDiv>
        <OpinionButton>{rightOpinion}</OpinionButton>
      </OpinionButtonDiv>
    </StyledSelectOpinion>
  );
}

export default SelectOpinion;