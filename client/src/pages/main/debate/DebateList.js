import { useEffect, useState, useRef, Suspense } from "react";

import styled from "styled-components"

import customAxios from "utils/customAxios";

import Header from "../../Header";
import Spinner from "../../../components/common/Spinner"
import DebateContainerHot from "../../../components/main/debate/DebateContainerHot";
 
function DebateList() {
  // let debateList_hot = useRef([]);
  // let debateList_inProgress = useRef([]);
  // let debateList_waiting = useRef([]);
  let [debateListHot, setDebateListHot] = useState([]);

  const axios = customAxios();

  useEffect(() => {
    // axios.get("/api/v1/search/main/hot5")
    //   .then(res => {
    //     console.log(res.data.body)
    //     setDebateListHot(res.data.body)
    //   })
    //   .catch(err => console.warn(err));
      
    
    setTimeout(() => {
      const response = {
        "message": "화제의 토론 Top5 리스트입니다",
        "body": [
          {
            "room_id": 126,
            "room_name": "라면에 하나만 넣는다면?",
            "room_creater_name": "라면조아",
            "room_debate_type": "FORMAL",
            "room_opinion_left": "김치",
            "room_opinion_right": "계란",
            "room_hashtags": "#라면,#김치,#계란,#뭐든좋아",
            "room_watch_cnt": 344,
            "room_phase": 2,
            "room_phase_current_time_minute": 0,
            "room_phase_current_time_second": 2,
            "room_start_time": "2023-01-31T16:54:20.448455",
            "room_thumbnail_url": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOd05v%2FbtrXHT3JqkJ%2Fl0Qhf5QygUqOIskZwYEqWK%2Fimg.png",
            "room_category": "음식",
            "room_state": false,
            "left_user_list": [
              "이동진",
              "로버트다우니주니어",
              "라면조아"
            ],
            "right_user_list": [
              "영화좋아하는사람",
              "김영한",
              "안침착맨"
            ]
          },
          {
            "room_id": 121,
            "room_name": "배트맨 최고 감독은?",
            "room_creater_name": "영화좋아하는사람",
            "room_debate_type": "FORMAL",
            "room_opinion_left": "크리스토퍼 놀란",
            "room_opinion_right": "맷 리브스",
            "room_hashtags": "#영화,#크리스토퍼놀란,#맷리브스",
            "room_watch_cnt": 203,
            "room_phase": 3,
            "room_phase_current_time_minute": 0,
            "room_phase_current_time_second": 2,
            "room_start_time": "2023-01-31T16:54:20.448455",
            "room_thumbnail_url": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FRkqyn%2FbtrXIohMRVP%2FrXCZVNDLEEKPwNfjBCmjvK%2Fimg.png",
            "room_category": "영화/드라마",
            "room_state": false,
            "left_user_list": [
              "영화좋아하는사람",
              "김영한",
              "안침착맨"
            ],
            "right_user_list": [
              "이동진",
              "로버트다우니주니어",
              "라면조아"
            ]
          },
          {
            "room_id": 122,
            "room_name": "2022년의 영화는?",
            "room_creater_name": "이동진",
            "room_debate_type": "FORMAL",
            "room_opinion_left": "탑건:매버릭",
            "room_opinion_right": "에브리띵 에브리웨어 올앳원스",
            "room_hashtags": "#영화,#2022,#탑건:매버릭,#에에올",
            "room_watch_cnt": 192,
            "room_phase": 1,
            "room_phase_current_time_minute": 0,
            "room_phase_current_time_second": 2,
            "room_start_time": "2023-01-31T16:54:20.448455",
            "room_thumbnail_url": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2r49z%2FbtrXInJW4Nx%2FMkuXqUZJNtfusYyWE6uUN0%2Fimg.png",
            "room_category": "영화/드라마",
            "room_state": false,
            "left_user_list": [
              "이동진",
              "로버트다우니주니어",
              "라면조아"
            ],
            "right_user_list": [
              "영화좋아하는사람",
              "김영한",
              "안침착맨"
            ]
          },
          {
            "room_id": 123,
            "room_name": "프로그래머 진로 상담",
            "room_creater_name": "김영한",
            "room_debate_type": "FORMAL",
            "room_opinion_left": "백엔드",
            "room_opinion_right": "프론트엔드",
            "room_hashtags": "#프로그래머,#백엔드,#프론트엔드,#뭐가좋아요",
            "room_watch_cnt": 176,
            "room_phase": 2,
            "room_phase_current_time_minute": 0,
            "room_phase_current_time_second": 2,
            "room_start_time": "2023-01-31T16:54:20.448455",
            "room_thumbnail_url": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbuahof%2FbtrXGT4aryB%2FMp7YUmbKQd9gh7WKz4Tmd0%2Fimg.png",
            "room_category": "공부",
            "room_state": false,
            "left_user_list": [
              "영화좋아하는사람",
              "김영한",
              "안침착맨"
            ],
            "right_user_list": [
              "이동진",
              "로버트다우니주니어",
              "라면조아"
            ]
          },
          {
            "room_id": 124,
            "room_name": "시빌워 최애는?",
            "room_creater_name": "로버트다우니주니어",
            "room_debate_type": "FORMAL",
            "room_opinion_left": "아이언맨",
            "room_opinion_right": "캡틴아메리카",
            "room_hashtags": "#영화,#아이언맨,#마블,#캡아",
            "room_watch_cnt": 155,
            "room_phase": 3,
            "room_phase_current_time_minute": 0,
            "room_phase_current_time_second": 2,
            "room_start_time": "2023-01-31T16:54:20.448455",
            "room_thumbnail_url": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F53miU%2FbtrXHNPZeR8%2FwgceDIMlSnydGK83o2LAk0%2Fimg.png",
            "room_category": "영화/드라마",
            "room_state": false,
            "left_user_list": [
              "이동진",
              "로버트다우니주니어",
              "라면조아"
            ],
            "right_user_list": [
              "영화좋아하는사람",
              "김영한",
              "안침착맨"
            ]
          }
        ],
        "statusCode": 200,
        "state": true
      };
      const debateList = response.body;
      setDebateListHot(debateList);
    }, 1000)
  }, [])



  return (
    <MainWrapper>
      <Header></Header>
      <h1>메인 페이지</h1>
        { debateListHot.length === 0
          ? <Spinner />
          : <DebateContainerHot debateList={debateListHot}/>
        }

      {/* <DebateContainerInProgress debateList={debateList_inProgress.current}/> */}
      
      {/* <DebateContainerWaiting debateList={debateList_waiting.current}/> */}
  
    </MainWrapper>
  )
}

export default DebateList;

const MainWrapper = styled.div`

`