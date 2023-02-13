import styled from "styled-components";

const StyledDebateHistory = styled.div`
  // 크기 설정
  width: 100%;

  margin: 48px 0;

  border: 1px solid #000000;
  border-radius: 10px;
`;

// 한 행을 감싸는 div
const Row = styled.div`
  // 크기 설정
  width: 100%;

  // Display
  display: flex;
`;

// Room ID Section
const RoomIdSection = styled.div`
  // 크기 설정
  width: 10%;

  // 글꼴 설정
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.05rem;
  text-align: center;

  border-right: 1px solid #000000;

  // Display
  display: flex;
  align-items: center;
  justify-content: center;
`;
// 방 제목 Section
const RoomTitleSection = styled.div`
  // 크기 설정
  width: 90%;
  padding: 12px 0;
  
  // 글꼴 설정
  font-size: 2rem;
  letter-spacing: -0.05rem;
  text-align: center;

  // Display
  display: inline-block;
`;

// 주장 Section
const OpinionSection = styled.div`
  // 크기 설정
  width: calc( 85% - 16px );
  padding: 12px 8px;
  min-width: calc( 85% - 150px );

  // 글꼴 설정
  font-size: 2rem;
  letter-spacing: -0.05rem;

  // 디자인
  border-top: 1px solid #000000;

  // Display
  display: inline-block;
`;
const Opinion = styled.p`
  margin: 12px 0;
  &.usually {
    // 글꼴 설정
    color: #FFFFFF;
    background-color: #F6C026;
  }
  display: inline-block;
`;
// 투표율 Section
const VoteSection = styled.div`
  // 크기 설정
  min-width: 150px;
  width: 15%;
  padding: 0;

  // 디자인
  border-top: 1px solid #000000;

  display: flex;
`;
const VoteWrapper = styled.div`
  // 크기 설정
  width: calc( 100% / 3 - 8px );
  height: 100%;
  padding: 0 4px;

  // 디자인
  border-left: 1px solid #000000;

  // 글꼴 설정
  font-size: 1.5rem;
  letter-spacing: -0.05rem;
  text-align: center;

  // Display
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Vote = styled.p`
  // 크기 설정
  max-width: 100%;
  margin: 0;
  padding: 0;

  &.usually {
    // 글꼴 설정
    color: #FFFFFF;
    background-color: #F6C026;
  }
`;

function DebateHistory({ content }) {
  const roomId = content.roomId;
  const roomTitle = content.roomName;
  const leftOpinion = content.leftOpinion;
  const rightOpinion = content.rightOpinion;
  const leftVotes = content.leftVotes;
  const rightVotes = content.rightVotes;

  return (
    <StyledDebateHistory>
      <Row>
        <RoomIdSection>{ roomId }</RoomIdSection>
        <RoomTitleSection title={roomTitle}>{ roomTitle }</RoomTitleSection>
      </Row>
      <Row>
        <OpinionSection>
          <Opinion
            title={leftOpinion}
            className="usually"
          >
            {leftOpinion}
          </Opinion>
        </OpinionSection>
        <VoteSection>
          {leftVotes.map((item, index) => (
            <VoteWrapper>
              <Vote
                key={index}
                className={item > rightVotes[index] ? "usually" : ""}
              >
                {item}
              </Vote>
            </VoteWrapper>
          ))}
        </VoteSection>
      </Row>
      <Row>
        <OpinionSection>
          <Opinion
            title={rightOpinion}
          >
            {rightOpinion}
          </Opinion>
        </OpinionSection>
        <VoteSection>
          {rightVotes.map((item, index) => (
            <VoteWrapper>
              <Vote
                key={index}
                className={item > leftVotes[index] ? "usually" : ""}
              >
                {item}
              </Vote>
            </VoteWrapper>
          ))}
        </VoteSection>
      </Row>
    </StyledDebateHistory>
  );
}

export default DebateHistory;