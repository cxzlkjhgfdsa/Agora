import Debate from "./Debate"

import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import customAxios from "utils/customAxios";

function DebateContainer( {maximumVisibleCounts, minimumVisibleCounts, type, url, slidePerClick, position} ) {
  const [debateList, setDebateList] = useState([]);
  const [currSlideIdx, setCurrSlideIdx] = useState(0);
  const [visibleCounts, setVisibleCounts] = useState(maximumVisibleCounts);
  
  const SLIDE_PER_CLICK = useRef(null);
  const isBigScreen = useMediaQuery({ query: '(min-width: 1025px)'})

  useEffect(() => {
    async function get() {
      const axios = customAxios();
      const params = type === "hot-thumbnail"
        ? null
        : {roomState: `${type === "mid" ? true : false}`, category: "전체", order: "createnew", page: 0, size: 10,}
      const config = {params,}

      axios.get(`${url}`, config).then(res => {
      if (res.data.body.hasOwnProperty("content")) {
        console.log(res.data.body.content)
        setDebateList(res.data.body.content)
      } else {
        console.log(res.data.body);
        setDebateList(res.data.body);
      }
      }).catch(err => console.warn(err));
    }
    // get();

    const response = {
      "message": "화제의 토론 Top5 리스트입니다",
      "body": [
        {
          "roomId": 26,
          "roomName": "라면에 하나만 넣는다면?",
          "roomCreaterName": "라면조아",
          "roomDebateType": "FORMAL",
          "roomOpinionLeft": "김치",
          "roomOpinionRight": "계란",
          "roomHashtags": "#라면,#김치,#계란,#뭐든좋아",
          "roomWatchCnt": 344,
          "roomPhase": 2,
          "roomPhaseCurrentTimeMinute": 0,
          "roomPhaseCurrentTimeSecond": 5,
          "roomStartTime": "2023-02-03T12:32:51.44181",
          "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOd05v%2FbtrXHT3JqkJ%2Fl0Qhf5QygUqOIskZwYEqWK%2Fimg.png",
          "roomCategory": "음식",
          "roomState": false,
          "leftUserList": [
            "이동진",
            "로버트다우니주니어",
            "라면조아"
          ],
          "rightUserList": [
            "영화좋아하는사람",
            "김영한",
            "안침착맨"
          ]
        },
        {
          "roomId": 21,
          "roomName": "배트맨 최고 감독은?",
          "roomCreaterName": "영화좋아하는사람",
          "roomDebateType": "FORMAL",
          "roomOpinionLeft": "크리스토퍼 놀란",
          "roomOpinionRight": "맷 리브스",
          "roomHashtags": "#영화,#크리스토퍼놀란,#맷리브스",
          "roomWatchCnt": 203,
          "roomPhase": 3,
          "roomPhaseCurrentTimeMinute": 0,
          "roomPhaseCurrentTimeSecond": 5,
          "roomStartTime": "2023-02-03T12:32:51.44181",
          "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FRkqyn%2FbtrXIohMRVP%2FrXCZVNDLEEKPwNfjBCmjvK%2Fimg.png",
          "roomCategory": "영화/드라마",
          "roomState": false,
          "leftUserList": [
            "영화좋아하는사람",
            "김영한",
            "안침착맨"
          ],
          "rightUserList": [
            "이동진",
            "로버트다우니주니어",
            "라면조아"
          ]
        },
        {
          "roomId": 22,
          "roomName": "2022년의 영화는?",
          "roomCreaterName": "이동진",
          "roomDebateType": "FORMAL",
          "roomOpinionLeft": "탑건:매버릭",
          "roomOpinionRight": "에브리띵 에브리웨어 올앳원스",
          "roomHashtags": "#영화,#2022,#탑건:매버릭,#에에올",
          "roomWatchCnt": 192,
          "roomPhase": 1,
          "roomPhaseCurrentTimeMinute": 0,
          "roomPhaseCurrentTimeSecond": 5,
          "roomStartTime": "2023-02-03T12:32:51.44181",
          "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2r49z%2FbtrXInJW4Nx%2FMkuXqUZJNtfusYyWE6uUN0%2Fimg.png",
          "roomCategory": "영화/드라마",
          "roomState": false,
          "leftUserList": [
            "이동진",
            "로버트다우니주니어",
            "라면조아"
          ],
          "rightUserList": [
            "영화좋아하는사람",
            "김영한",
            "안침착맨"
          ]
        },
        {
          "roomId": 23,
          "roomName": "프로그래머 진로 상담",
          "roomCreaterName": "김영한",
          "roomDebateType": "FORMAL",
          "roomOpinionLeft": "백엔드",
          "roomOpinionRight": "프론트엔드",
          "roomHashtags": "#프로그래머,#백엔드,#프론트엔드,#뭐가좋아요",
          "roomWatchCnt": 176,
          "roomPhase": 2,
          "roomPhaseCurrentTimeMinute": 0,
          "roomPhaseCurrentTimeSecond": 5,
          "roomStartTime": "2023-02-03T12:32:51.44181",
          "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbuahof%2FbtrXGT4aryB%2FMp7YUmbKQd9gh7WKz4Tmd0%2Fimg.png",
          "roomCategory": "공부",
          "roomState": false,
          "leftUserList": [
            "영화좋아하는사람",
            "김영한",
            "안침착맨"
          ],
          "rightUserList": [
            "이동진",
            "로버트다우니주니어",
            "라면조아"
          ]
        },
        {
          "roomId": 24,
          "roomName": "시빌워 최애는?",
          "roomCreaterName": "로버트다우니주니어",
          "roomDebateType": "FORMAL",
          "roomOpinionLeft": "아이언맨",
          "roomOpinionRight": "캡틴아메리카",
          "roomHashtags": "#영화,#아이언맨,#마블,#캡아",
          "roomWatchCnt": 155,
          "roomPhase": 3,
          "roomPhaseCurrentTimeMinute": 0,
          "roomPhaseCurrentTimeSecond": 5,
          "roomStartTime": "2023-02-03T12:32:51.44181",
          "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F53miU%2FbtrXHNPZeR8%2FwgceDIMlSnydGK83o2LAk0%2Fimg.png",
          "roomCategory": "영화/드라마",
          "roomState": false,
          "leftUserList": [
            "이동진",
            "로버트다우니주니어",
            "라면조아"
          ],
          "rightUserList": [
            "영화좋아하는사람",
            "김영한",
            "안침착맨"
          ]
        },
        {
          "roomId": 36,
          "roomName": "라면에 하나만 넣는다면?",
          "roomCreaterName": "라면조아",
          "roomDebateType": "FORMAL",
          "roomOpinionLeft": "김치",
          "roomOpinionRight": "계란",
          "roomHashtags": "#라면,#김치,#계란,#뭐든좋아",
          "roomWatchCnt": 344,
          "roomPhase": 2,
          "roomPhaseCurrentTimeMinute": 0,
          "roomPhaseCurrentTimeSecond": 5,
          "roomStartTime": "2023-02-03T12:32:51.44181",
          "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOd05v%2FbtrXHT3JqkJ%2Fl0Qhf5QygUqOIskZwYEqWK%2Fimg.png",
          "roomCategory": "음식",
          "roomState": false,
          "leftUserList": [
            "이동진",
            "로버트다우니주니어",
            "라면조아"
          ],
          "rightUserList": [
            "영화좋아하는사람",
            "김영한",
            "안침착맨"
          ]
        },
        {
          "roomId": 31,
          "roomName": "배트맨 최고 감독은?",
          "roomCreaterName": "영화좋아하는사람",
          "roomDebateType": "FORMAL",
          "roomOpinionLeft": "크리스토퍼 놀란",
          "roomOpinionRight": "맷 리브스",
          "roomHashtags": "#영화,#크리스토퍼놀란,#맷리브스",
          "roomWatchCnt": 203,
          "roomPhase": 3,
          "roomPhaseCurrentTimeMinute": 0,
          "roomPhaseCurrentTimeSecond": 5,
          "roomStartTime": "2023-02-03T12:32:51.44181",
          "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FRkqyn%2FbtrXIohMRVP%2FrXCZVNDLEEKPwNfjBCmjvK%2Fimg.png",
          "roomCategory": "영화/드라마",
          "roomState": false,
          "leftUserList": [
            "영화좋아하는사람",
            "김영한",
            "안침착맨"
          ],
          "rightUserList": [
            "이동진",
            "로버트다우니주니어",
            "라면조아"
          ]
        },
        {
          "roomId": 32,
          "roomName": "2022년의 영화는?",
          "roomCreaterName": "이동진",
          "roomDebateType": "FORMAL",
          "roomOpinionLeft": "탑건:매버릭",
          "roomOpinionRight": "에브리띵 에브리웨어 올앳원스",
          "roomHashtags": "#영화,#2022,#탑건:매버릭,#에에올",
          "roomWatchCnt": 192,
          "roomPhase": 1,
          "roomPhaseCurrentTimeMinute": 0,
          "roomPhaseCurrentTimeSecond": 5,
          "roomStartTime": "2023-02-03T12:32:51.44181",
          "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2r49z%2FbtrXInJW4Nx%2FMkuXqUZJNtfusYyWE6uUN0%2Fimg.png",
          "roomCategory": "영화/드라마",
          "roomState": false,
          "leftUserList": [
            "이동진",
            "로버트다우니주니어",
            "라면조아"
          ],
          "rightUserList": [
            "영화좋아하는사람",
            "김영한",
            "안침착맨"
          ]
        },
        {
          "roomId": 33,
          "roomName": "프로그래머 진로 상담",
          "roomCreaterName": "김영한",
          "roomDebateType": "FORMAL",
          "roomOpinionLeft": "백엔드",
          "roomOpinionRight": "프론트엔드",
          "roomHashtags": "#프로그래머,#백엔드,#프론트엔드,#뭐가좋아요",
          "roomWatchCnt": 176,
          "roomPhase": 2,
          "roomPhaseCurrentTimeMinute": 0,
          "roomPhaseCurrentTimeSecond": 5,
          "roomStartTime": "2023-02-03T12:32:51.44181",
          "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbuahof%2FbtrXGT4aryB%2FMp7YUmbKQd9gh7WKz4Tmd0%2Fimg.png",
          "roomCategory": "공부",
          "roomState": false,
          "leftUserList": [
            "영화좋아하는사람",
            "김영한",
            "안침착맨"
          ],
          "rightUserList": [
            "이동진",
            "로버트다우니주니어",
            "라면조아"
          ]
        },
        {
          "roomId": 34,
          "roomName": "시빌워 최애는?",
          "roomCreaterName": "로버트다우니주니어",
          "roomDebateType": "FORMAL",
          "roomOpinionLeft": "아이언맨",
          "roomOpinionRight": "캡틴아메리카",
          "roomHashtags": "#영화,#아이언맨,#마블,#캡아",
          "roomWatchCnt": 155,
          "roomPhase": 3,
          "roomPhaseCurrentTimeMinute": 0,
          "roomPhaseCurrentTimeSecond": 5,
          "roomStartTime": "2023-02-03T12:32:51.44181",
          "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F53miU%2FbtrXHNPZeR8%2FwgceDIMlSnydGK83o2LAk0%2Fimg.png",
          "roomCategory": "영화/드라마",
          "roomState": false,
          "leftUserList": [
            "이동진",
            "로버트다우니주니어",
            "라면조아"
          ],
          "rightUserList": [
            "영화좋아하는사람",
            "김영한",
            "안침착맨"
          ]
        }
      ],
      "statusCode": 200,
      "state": true
    }
    setDebateList(response.body)
  }, [])

  // useEffect(() => {
  //   slidePerClick === 1 ? set_SLIDE_PER_CLICK(1) : set_SLIDE_PER_CLICK(visibleCounts);
  // }, [visibleCounts])

  useEffect(() => {
    isBigScreen ? setVisibleCounts(maximumVisibleCounts) : setVisibleCounts(minimumVisibleCounts);
  }, [isBigScreen])

  useEffect(() => {
    if (slidePerClick === 1) {
      SLIDE_PER_CLICK.current = 1;
      console.log("spk changed >> ", SLIDE_PER_CLICK.current)
    } else {
      SLIDE_PER_CLICK.current = visibleCounts;
      console.log("spk changed >> ", SLIDE_PER_CLICK.current)
    }
  }, [visibleCounts])

  const prevSlide = () => {
    const max = (a, b) => {return a < b ? b : a};
    if (currSlideIdx > 0) {
      setCurrSlideIdx(max(currSlideIdx - SLIDE_PER_CLICK.current, 0));
    }
  }

  const nextSlide = () => {
    const min = (a, b) => {return a < b ? a : b};
    if (currSlideIdx + visibleCounts < debateList.length) {
      setCurrSlideIdx(min(currSlideIdx + SLIDE_PER_CLICK.current, debateList.length - visibleCounts));
    }
  } 

  return (
    <Container>
      <LeftButton direction="left" onClick={prevSlide} currSlideIdx={currSlideIdx}><Text>&#8249;</Text></LeftButton>
        <DebateWrapper currSlideIdx={currSlideIdx} visibleCounts={visibleCounts} >
          {debateList.map((debate, idx) => {
            return <Debate 
            key={type + debate.roomId} 
            currSlideIdx={currSlideIdx} 
            itemIdx={idx} 
            visibleCounts={visibleCounts}
            type={type} 
            roomInfo={debate} 
            />
          })}
        </DebateWrapper>
      <RightButton direction="right" onClick={nextSlide} currSlideIdx={currSlideIdx} visibleCounts={visibleCounts} numOfSlides={debateList.length}><Text>&#8250;</Text></RightButton>
    </Container>
  )
} 

export default DebateContainer;

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  &:hover {
    z-index: 1;
  }
  /* margin-bottom: 200px; */
`

const DebateWrapper = styled.div`
  width: 92%;
  --current-index: ${props => props.currSlideIdx};
  --visible-counts: ${props => props.visibleCounts};

  transform: translateX(calc(-100% * var(--current-index) / var(--visible-counts)));
  transition: transform 150ms ease-in-out;

  display: flex;
  flex-grow: 1;
  margin: 0 .25rem;
`

const Text = styled.div`
  transition: transform 150ms ease-in-out;
`

const Button = styled.button`
  position: relative;
  flex-grow: 0;
  width: 4%;
  margin: .25rem 0;
  border-radius: 1rem;
  opacity: 0.5;
  transition: background-color 150ms ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, .5);
    ${Text} {
      transform: scale(2);
    }
  }
  cursor: pointer;
  z-index: 10; 

  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 3rem;
  line-height: 0;
`

const LeftButton = styled(Button)`
  border-top-left-radius: 0; border-bottom-left-radius: 0;
  transition: visibility 150ms ease-in-out;
  visibility: ${props => props.currSlideIdx === 0 ? "hidden" : "visible"};
`

const RightButton = styled(Button)`
  border-top-right-radius: 0; border-bottom-right-radius: 0;
  transition: visibility 150ms ease-in-out;
  visibility: ${props => props.currSlideIdx + props.visibleCounts >= props.numOfSlides ? "hidden" : "visible"};
`

