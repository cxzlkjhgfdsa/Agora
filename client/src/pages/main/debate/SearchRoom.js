import AllSearchContent from "components/debate/search/AllSearchContent";
import AllSearchType from "components/debate/search/AllSearchType";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

const StyledSearchRoom = styled.div`
  width: 70%;
  margin: 32px 15%;
`;

function SearchRoom() {
  const [contents, setContents] = useState([]);  // 검색결과
  const [page, setPage] = useState(0);  // 검색할 페이지
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);  // 데이터 요청 후 대기중 여부

  const [ref, inView] = useInView();  // 감시할 컴포넌트

  // 서버에서 검색결과 가져오기
  const getContents = useCallback(async () => {
    console.log("Get", page);
    const getData = (page) => {
      // 더미 데이터
      const data = [[
        // 첫 데이터, Page 0
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
        },
        {
          "room_id": 127,
          "room_name": "마지막 토론방",
          "room_creater_name": "마지막",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page0,#last,#content",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        }
      ],
      // 추가 데이터, Page 1
      [
        {
          "room_id": 127,
          "room_name": "추가 토론방 1",
          "room_creater_name": "추가1",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#1",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 2",
          "room_creater_name": "추가2",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#2",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 3",
          "room_creater_name": "추가3",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#3",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        }
      ],
      // 추가 데이터, Page 2
      [
        {
          "room_id": 127,
          "room_name": "추가 토론방 1",
          "room_creater_name": "추가1",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#1",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 2",
          "room_creater_name": "추가2",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#2",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 3",
          "room_creater_name": "추가3",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#3",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        }
      ],
      // 추가 데이터, Page 2
      [
        {
          "room_id": 127,
          "room_name": "추가 토론방 1",
          "room_creater_name": "추가1",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#1",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 2",
          "room_creater_name": "추가2",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#2",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 3",
          "room_creater_name": "추가3",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#3",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        }
      ],
      // 추가 데이터, Page 2
      [
        {
          "room_id": 127,
          "room_name": "추가 토론방 1",
          "room_creater_name": "추가1",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#1",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 2",
          "room_creater_name": "추가2",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#2",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 3",
          "room_creater_name": "추가3",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#3",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        }
      ],
      // 추가 데이터, Page 2
      [
        {
          "room_id": 127,
          "room_name": "추가 토론방 1",
          "room_creater_name": "추가1",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#1",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 2",
          "room_creater_name": "추가2",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#2",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 3",
          "room_creater_name": "추가3",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#3",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        }
      ],
      // 추가 데이터, Page 2
      [
        {
          "room_id": 127,
          "room_name": "추가 토론방 1",
          "room_creater_name": "추가1",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#1",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 2",
          "room_creater_name": "추가2",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#2",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 3",
          "room_creater_name": "추가3",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#3",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        }
      ],
      // 추가 데이터, Page 2
      [
        {
          "room_id": 127,
          "room_name": "추가 토론방 1",
          "room_creater_name": "추가1",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#1",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 2",
          "room_creater_name": "추가2",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#2",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 3",
          "room_creater_name": "추가3",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#3",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        }
      ],
      // 추가 데이터, Page 2
      [
        {
          "room_id": 127,
          "room_name": "추가 토론방 1",
          "room_creater_name": "추가1",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#1",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 2",
          "room_creater_name": "추가2",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#2",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        },
        {
          "room_id": 127,
          "room_name": "추가 토론방 3",
          "room_creater_name": "추가3",
          "room_debate_type": "SHORT",
          "room_opinion_left": "leftopinon",
          "room_opinion_right": "rightopinion",
          "room_hashtags": "#page1,#3",
          "room_watch_cnt": 140,
          "room_phase": 2,
          "room_start_time": "2023-01-26T14:09:54.00494",
          "room_thumbnail_url": "https://picsum.photos/400/225",
          "room_category": "음식"
        }
      ]];
      
      return data[page];
    };

    setLoading(true);
    // 데이터 받아오기
    await setContents(data => [...data, ...getData(page)]);
    // isEnd 설정해주기
    // setIsEnd(false? true?);
    setLoading(false);
  }, [page]);

  // 페이지가 갱신되면 새로운 검색결과를 가져오기
  useEffect(() => {
    getContents();
  }, [getContents]);

  // 마지막 요소 도달 시 요청할 페이지 갱신
  useEffect(() => {
    // 마지막 요소가 view에 들어온데다 데이터 대기중도 아니고 마지막 페이지가 아닐 경우 페이지 갱신
    console.log(inView);
    if (inView && !loading && page < 9) {
      setPage(current => current + 1);
    }
  }, [inView, loading, page]);

  return (
    <StyledSearchRoom>
      <AllSearchType searchType={"hashtags"} />
      {contents.map((item, index) =>
        <AllSearchContent key={item + index} content={item} />
      )}
      {/* 스크롤 마지막임을 알리는 컴포넌트 */}
      <span ref={ref} />
    </StyledSearchRoom>
  );
}

export default SearchRoom;