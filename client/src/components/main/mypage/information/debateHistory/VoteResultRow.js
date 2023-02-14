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

  // 글꼴 설정
  font-weight: 700;

  // Display
  display: inline-block;

  &.more {
    color: #F6C026;
  }
  &.less {
    color: #BBBBBB;
  }
`;
const VotePercent = styled.div`
  // 크기 설정
  width: 8%;

  // 글꼴 설정
  font-weight: 700;

  // Display
  display: inline-block;
`;
const ColorBarDiv = styled.div`
  // 크기 설정
  width: 33%;
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

// leftPercent: 왼쪽 주장 투표율
// rightPercent: 오른쪽 주장 투표율
// phaseKorean: 페이즈 구분 단어 (첫번째, 두번째, ...)
// isPhaseMore: 현재 페이즈에서 우세했는지 (왼쪽 주장 기준 우세했을 경우 true, 아닐 경우 false)
// curPlayerTeam: 현재 페이즈에서 플레이어가 속한 팀 (LEFT: 왼쪽 팀, RIGHT: 오른쪽 팀, null: 미참여)
function VoteResultRow({ leftPercent, rightPercent, phaseKorean, isPhaseMore, curPlayerTeam }) {
  let leftCheckDivClass = "";  // 왼쪽 체크 표시 클래스명
  if (curPlayerTeam === "LEFT") {
    leftCheckDivClass = isPhaseMore ? "more" : "less";
  }

  let rightCheckDivClass = "";  // 오른쪽 체크 표시 클래스명
  if (curPlayerTeam === "RIGHT") {
    rightCheckDivClass = isPhaseMore ? "less" : "more";
  }

  return (
    <StyledVoteResultRow>
      <CheckDiv className={leftCheckDivClass}>{leftCheckDivClass === "" ? "" : "V"}</CheckDiv>
      <VotePercent>{leftPercent}%</VotePercent>
      <ColorBarDiv>
        <ColorBar
          percent={leftPercent}
          className={"leftColorBar" + (isPhaseMore ? " more" : " less")}
        />
      </ColorBarDiv>
      <Center>{phaseKorean}</Center>
      <ColorBarDiv>
        <ColorBar
          percent={rightPercent}
          className={"rightColorBar" + (isPhaseMore ? " less" : " more")}
        />
      </ColorBarDiv>
      <VotePercent>{rightPercent}%</VotePercent>
      <CheckDiv className={rightCheckDivClass}>{rightCheckDivClass === "" ? "" : "V"}</CheckDiv>
    </StyledVoteResultRow>
  );
}

export default VoteResultRow;