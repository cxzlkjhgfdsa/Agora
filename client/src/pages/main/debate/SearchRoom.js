import AllSearchContent from "components/debate/search/AllSearchContent";
import AllSearchType from "components/debate/search/AllSearchType";
import styled from "styled-components";

const StyledSearchRoom = styled.div`
  width: 70%;
  margin: 32px 15%;
`;

function SearchRoom() {
  // 더미 데이터
  const contents = [
    {},
    {
      "room_id": 14,
      "room_name": "13번",
      "room_creater_name": "13작성자",
      "room_debate_type": "SHORT",
      "room_opinion_left": "leftopinon",
      "room_opinion_right": "rightopinion",
      "room_hashtags": "#13,#213",
      "room_watch_cnt": 13,
      "room_phase": 2,
      "room_start_time": "2023-01-26T14:09:54.00494",
      "room_thumbnail_url": "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      "room_category": "일상"
    },
    {
      "room_id": 127,
      "room_name": "감자튀김 vs 고구마튀김 님들의 선택은?",
      "room_creater_name": "감튀파",
      "room_debate_type": "SHORT",
      "room_opinion_left": "leftopinon",
      "room_opinion_right": "rightopinion",
      "room_hashtags": "#감튀,#고튀,#튀김",
      "room_watch_cnt": 140,
      "room_phase": 2,
      "room_start_time": "2023-01-26T14:09:54.00494",
      "room_thumbnail_url": "https://picsum.photos/400/225",
      "room_category": "음식"
    },
    {
      "room_id": 127,
      "room_name": "감자튀김 vs 고구마튀김 님들의 선택은?",
      "room_creater_name": "감튀파",
      "room_debate_type": "SHORT",
      "room_opinion_left": "leftopinon",
      "room_opinion_right": "rightopinion",
      "room_hashtags": "#감튀,#고튀,#튀김",
      "room_watch_cnt": 140,
      "room_phase": 2,
      "room_start_time": "2023-01-26T14:09:54.00494",
      "room_thumbnail_url": "https://picsum.photos/400/225",
      "room_category": "음식"
    }
  ];

  return (
    <StyledSearchRoom>
      <AllSearchType searchType={"hashtags"} />
      {contents.map((item, index) =>
        <AllSearchContent key={item + index} content={item} />
      )}
    </StyledSearchRoom>
  );
}

export default SearchRoom;