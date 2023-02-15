import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import customAxios from "utils/customAxios";
import DebateHistory from "./DebateHistory";
import MyPageTitle from "../MyPageTitle";

const NoDebateHistory = styled.p`
  font-size: 2rem;
  letter-spacing: -0.05rem;
  textAlign: center;
`;

function MyDebateHistory() {
  const axios = customAxios();

  // 토론 기록
  const [histories, setHistories] = useState([
    {
      roomId: 123456,
      roomName: "라면에 계란을 계란에 라면을?",
      leftOpinion: "라면에 겨란을!",
      rightOpinion: "겨란에 라면을!",
      leftVoteList: [21, 86, 39],
      rightVoteList: [79, 14, 61],
      userTeam: "LEFT",
      total_player_result: "LOSE",
      leftPlayerList: [
        "left1creater",
        "left2",
        "left3"
      ],
      rightPlayerList: [
        "right1",
        "right2",
        "right3"
      ],
      category: "영화"
    },
    {
      roomId: 159038,
      roomName: "제육 VS 돈까스",
      leftOpinion: "제육이지",
      rightOpinion: "맛알못이네 돈까스지",
      leftVoteList: [58, 49, 38],
      rightVoteList: [42, 51, 62],
      userTeam: "LEFT",
      total_player_result: "LOSE",
      leftPlayerList: [
        "left1creater",
        "left2",
        "left3"
      ],
      rightPlayerList: [
        "right1",
        "right2",
        "right3"
      ],
      category: "영화"
    },
    {
      roomId: 123356,
      roomName: "국물 제육 VS 직화 제육",
      leftOpinion: "뜨끈한 국물에 밥 비벼 먹는 게 국룰",
      rightOpinion: "불향이 쥑이네",
      leftVoteList: [44, 67, 51],
      rightVoteList: [56, 33, 49],
      userTeam: "LEFT",
      total_player_result: "WIN",
      leftPlayerList: [
        "left1creater",
        "left2",
        "left3"
      ],
      rightPlayerList: [
        "right1",
        "right2",
        "right3"
      ],
      category: "음식"
    },
    {
      roomId: 513852,
      roomName: "반숙 VS 완숙",
      leftOpinion: "고소한 반숙이지~",
      rightOpinion: "목 막히는 완숙이지",
      leftVoteList: [55, 56, 69],
      rightVoteList: [45, 44, 31],
      userTeam: "RIGHT",
      total_player_result: "LOSE",
      leftPlayerList: [
        "left1creater",
        "left2",
        "left3"
      ],
      rightPlayerList: [
        "right1",
        "right2",
        "right3"
      ],
      category: "영화"
    },
    {
      roomId: 513873,
      roomName: "소고기 미듐레어 VS 웰던",
      leftOpinion: "부드러운 미듐레어지~",
      rightOpinion: "그럴 거면 생고기 먹든가",
      leftVoteList: [66, 76, 41],
      rightVoteList: [34, 24, 59],
      userTeam: "LEFT",
      total_player_result: "WIN",
      leftPlayerList: [
        "left1creater",
        "left2",
        "left3"
      ],
      rightPlayerList: [
        "right1",
        "right2",
        "right3"
      ],
      category: "영화"
    },
  ]);

  // 무한스크롤 감지용 Ref
  const [scrollRef, inView] = useInView();
  // 스크롤 페이지
  const [page, setPage] = useState(0);
  // 마지막 페이지 여부
  const [isEnd, setIsEnd] = useState(true);
  // 데이터 로딩 여부
  const [loading, setLoading] = useState(false);

  // 토론 기록 가져오는 함수
  const getHistories = useCallback(async () => {
    setLoading(true);
    
    // V1
    // await axios.get("/v1/debate/history/list", {
    //   data: {
    //     page: page,
    //     size: 10
    //   }
    // }).then(({ data }) => {

    // V2
    await axios.get("/v2/debate/history/list", {
      data: {
        page: page,
        size: 10
      }
    }).then(({ data }) => {
      // 데이터 가져오기
      setHistories(current => [...current, ...data.body.content]);

      // 마지막 페이지 여부 설정
      setIsEnd(data.body.last);
    }).catch(error => {
      console.log(error);
    });

    setLoading(false);
  }, [page]);

  // 페이지가 바뀌면 토록 기록 가져오기
  useEffect(() => {
    getHistories();
  }, [getHistories]);

  // 페이지 조작 함수
  useEffect(() => {
    if (inView && !loading && !isEnd) {
      setPage(current => current + 1);
    }
  }, [inView, loading, isEnd]);

  return (<>
    <MyPageTitle text="토론 기록" />
    {histories.map((item, index) => (
      <DebateHistory key={index} content={item} />
    ))}
    {histories.length === 0
      ? (
        <NoDebateHistory>
          토론 기록이 없습니다
        </NoDebateHistory>)
      : null}
    {loading || isEnd
      ? null
      : <p ref={scrollRef} style={{margin: "0"}}></p>}
    {/* <p style={{ marginTop: "48px" }}></p> */}
  </>);
}

export default MyDebateHistory;