import styled from "styled-components";

const StyledVoteResultRow = styled.div`
  // 크기 설정
  width: 100%;
  margin: 0 0 32px 0;

  // 글꼴 설정
  font-size: 1.6rem;
  letter-spacing: -0.05rem;
  text-align: center;

  // Display
  display: flex;
  align-items: center;
`;

const CheckDiv = styled.div`
  // 크기 설정
  width: 3%;

  // Display
  display: inline-block;
`;
const VotePercent = styled.div`
  // 크기 설정
  width: 10%;

  // 글꼴 설정
  font-weight: 700;

  // Display
  display: inline-block;
`;
const ColorBarDiv = styled.div`
  // 크기 설정
  width: 31%;
  height: 1.2rem;

  // Display
  display: inline-block;

  position: relative;
`;
const ColorBar = styled.div`
  // 크기 설정
  width: calc( ${({ percent }) => percent}% );
  height: 100%;

  // 디자인 설정
  &.less {
    background-color: #BBBBBB;
  }
  &.more {
    background-color: #F6C026;
  }

  // 위치 설정
  position: absolute;
  top: 0;
  &.leftColorBar {
    right: 0;
  }
  &.rightColorBar {
    left: 0;
  }

  display: inline-block;
`;
const Center = styled.p`
  // 크기 설정
  width: 12%;
  margin: 0;

  display: inline-block;

  // 글자수 초과 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function VoteResultRow({ leftPercent, rightPercent, phaseKorean, isPhaseMore }) {
  return (
    <StyledVoteResultRow>
      <CheckDiv></CheckDiv>
      <VotePercent>{leftPercent}%</VotePercent>
      <ColorBarDiv>
        <ColorBar percent={leftPercent} className={"leftColorBar" + (isPhaseMore ? " more" : " less")}></ColorBar>
      </ColorBarDiv>
      <Center>{phaseKorean}</Center>
      <ColorBarDiv>
        <ColorBar percent={rightPercent} className={"rightColorBar" + (isPhaseMore ? " less" : " more")}></ColorBar>
      </ColorBarDiv>
      <VotePercent>{rightPercent}%</VotePercent>
      <CheckDiv></CheckDiv>
    </StyledVoteResultRow>
  );
}

export default VoteResultRow;