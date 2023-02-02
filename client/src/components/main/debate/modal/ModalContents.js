import Thumbnail from "components/debate/list/Thumbnail";
import styled from "styled-components";
import NoContents from "./NoContents";

const StyledModalContents = styled.div`
  // 크기 설정
  width: 100%;
  height: 75%;
  margin: 0;

  // display
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: auto;
`;

function ModalContents() {
  const contents = [
    {
      "room_id": 114,
      "room_name": "99번",
      "room_creater_name": "99작성자",
      "room_debate_type": "SHORT",
      "room_opinion_left": "leftopinon",
      "room_opinion_right": "rightopinion",
      "room_hashtags": "#9,#119",
      "room_watch_cnt": 109,
      "room_phase": 1,
      "room_phase_current_time_minute": 0,
      "room_phase_current_time_second": 22,
      "room_start_time": "2023-01-31T14:30:47.509536",
      "room_thumbnail_url": "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      "room_category": "9번",
      "room_state": true,
      "left_user_list": [],
      "right_user_list": [
          "테스트닉",
          "테스트닉"
      ]
    },];
  
  for (let i = 0; i < 6; i++) {
    contents.push(contents[0]);
  }

  return (
    <StyledModalContents>
      {contents.map((item, index) => (
        <Thumbnail key={item + index} content={item} />
      ))}
      {contents.length === 0 ? <NoContents /> : null}
    </StyledModalContents>
  )
}

export default ModalContents;