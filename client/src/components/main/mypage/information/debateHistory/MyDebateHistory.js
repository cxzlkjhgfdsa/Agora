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
  const [histories, setHistories] = useState([]);

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