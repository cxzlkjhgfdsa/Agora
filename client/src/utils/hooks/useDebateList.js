import { useQuery } from "react-query";
import customAxios from "utils/customAxios";

const axios = customAxios();

const fetchDebateList = ({ queryKey }) => {
  // const url = "makeError";
  const url = queryKey[1];
  // const params = queryKey[2];
  return axios.get(url);
}

export const useDebateList = (url) => {
  return useQuery(["debateList", url], fetchDebateList, {
    select,
    onError,

    retry: 0, //default: 3
    refetchOnWindowFocus: false, //default: true
    refetchOnMount: true, //default: true
    refetchOnReconnect: true, //default: true
    staleTime: 60*1000, //default: 0
    cacheTime: 60*5*1000, //default: 5분 (60 * 5 * 1000)
  });
}

const select = (response) => {
  if (response.data.body.length === 0) {
    console.log("no contents loaded");
    return alterData;
  }
  return response.data.body;
}

const onError = (err) => {
  err.alterData = alterData;
  return err;
}

const alterData = [
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
    ],
  }
];