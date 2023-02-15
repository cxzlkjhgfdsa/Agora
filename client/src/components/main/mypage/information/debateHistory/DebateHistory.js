import styled from "styled-components";
import TableHeader from "./TableHeader";
import VoteResultRow from "./VoteResultRow";

// 토론 기록 Container
const StyledDebateHistory = styled.div`
  // 크기 설정
  width: 60%;
  margin: 60px 20% 48px 20%;
  padding: 0 0 12px 0;

  // 디자인
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25), -1px -1px 2px rgba(0, 0, 0, 0.25);

  position: relative;
`;

// 방 번호 span
const RoomIdSpan = styled.span`
  // 글꼴 설정
  color: #F6C026;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.05rem;

  // 위치 설정
  position: absolute;
  top: calc( -1.5rem - 4px );
  left: 0;
`;

// 방제 Div
const DebateTitleDiv = styled.div`
  // 크기 설정
  width: calc( 100% - 24px );
  padding: 12px;

  // 디자인
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25), -1px -1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  &.more {
    background-color: #FCEFC8;
  }
  &.less {
    background-color: #BBBBBB;
  }
`;
const DebateTitle = styled.p`
  margin: 0;
  padding: 0;

  // 글꼴 설정
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.05rem;

  // 글자수 초과 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function DebateHistory({ content }) {
  const roomId = content.roomId;
  const roomTitle = content.roomName;
  const leftOpinion = content.leftOpinion;
  const rightOpinion = content.rightOpinion;
  const leftVotes = content.leftVoteList;
  const rightVotes = content.rightVoteList;

  const userTeam = content.userTeam;
  const totalPlayerResult = content.total_player_result;

  // 사용자가 발언한 페이즈를 알기 위해 세션에서 닉네임 가져오기
  let playerNickname = "";
  if (sessionStorage.getItem("user_info")) {
    playerNickname = sessionStorage.getItem("user_info").userNickname;
  }
  const leftPlayerList = content.leftPlayerList;
  const rightPlayerList = content.rightPlayerList;

  // 전체 토론 및 플레이어 우세 여부
  const isLeftMore = (userTeam === "LEFT" && totalPlayerResult === "WIN")
    || (userTeam === "RIGHT" && totalPlayerResult === "LOSE");
  const isPlayerMore = totalPlayerResult === "WIN";

  // 페이즈별 우세 여부 (왼쪽 주장 기준)
  const phasesKorean = ["첫번째", "두번째", "세번째"];
  const phasesMore = [];
  leftVotes.forEach((item, index) => {
    phasesMore.push(item > rightVotes[index]);
  });
  
  return (
    <StyledDebateHistory>
      {/* 방 번호 */}
      <RoomIdSpan>{roomId}번 토론</RoomIdSpan>
      
      {/* 방제 */}
      <DebateTitleDiv className={isPlayerMore ? "more" : "less"}>
        <DebateTitle title={roomTitle}>
          {roomTitle}
        </DebateTitle>
      </DebateTitleDiv>

      {/* 투표 결과 테이블 헤더 */}
      <TableHeader
        content={content}
        leftOpinion={leftOpinion}
        rightOpinion={rightOpinion}
        isLeftMore={isLeftMore}
      />

      {/* 투표 결과 */}
      {phasesMore.map((item, index) => (
        <VoteResultRow
          key={index}
          leftPercent={leftVotes[index]}
          rightPercent={rightVotes[index]}
          phaseKorean={phasesKorean[index]}
          isPhaseMore={item}
          curPlayerTeam={
            (playerNickname === leftPlayerList[index]
            || playerNickname === rightPlayerList[index])
              ? userTeam
              : null
          }
        />
      ))}
    </StyledDebateHistory>
  );
}

export default DebateHistory;