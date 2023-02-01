import styled from "styled-components";

const RoomInfoWrapper = styled.div`
  z-index: 2;
  
  // 크기 설정
  width: 100%;
  height: 75%;

  // 배경색 설정
  background-color: #222222;

  // 위치 설정
  position: absolute;
  top: 100%;
  left: 0;
`;
const RoomInfoTitle = styled.p`
  // 크기 및 마진 설정
  width: calc( 100% - 24px );
  margin: 12px;

  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1.6rem;
  font-weight: 700;
`;
const HashTags = styled.p`
  // 글꼴 설정
  color: #FFFFFF;

  // 크기 설정
  width: calc( 100% - 24px );
  margin: 12px;

  // 위치 설정
  position: absolute;
  bottom: 0;
  left: 0;
`;
const HashTag = styled.span`
  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1.2rem;

  // 마진 설정
  margin-right: 8px;
`;

function RoomInfo({ content }) {
  const roomId = content.room_id;

  const title = content.room_name;

  const leftOpinion = content.room_opinion_left;
  const rightOpinion = content.room_opinion_right;

  const viewers = content.room_watch_cnt;
  const phases = content.room_phase;
  const minutes = content.room_phase_current_time_minute;
  const seconds = content.room_phase_current_time_second;
  
  const hashTags = content.room_hashtags
    ? content.room_hashtags.split(",")
    : [];
  
  return (
    <RoomInfoWrapper>
      <RoomInfoTitle title={title}>
        {title}
      </RoomInfoTitle>
      <HashTags>
        {hashTags.map((item, index) => (
          <HashTag key={item + index}>{item}</HashTag>
        ))}
      </HashTags>
    </RoomInfoWrapper>
  );
}

export default RoomInfo;