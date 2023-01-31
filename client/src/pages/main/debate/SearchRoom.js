import AllSearchContent from "components/debate/search/AllSearchContent";
import AllSearchType from "components/debate/search/AllSearchType";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import customAxios from "utils/customAxios";

const StyledSearchRoom = styled.div`
  width: 70%;
  margin: 32px 15%;
`;

function SearchRoom() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchWord = searchParams.get("searchWord");
  const hashTags = searchParams.get("hashTags");
  const searchType = searchParams.get("searchType");

  // 검색 유형에 따라 End Point 설정해주기
  let endPoint = "";
  if (searchType === "creator") {  // 사용자 이름
    endPoint = "creatername";
  } else if (searchType === "title") {  // 방 제목
    endPoint = "roomname";
  } else if (searchType === "hashtags") {  // 해시태그
    endPoint = "hashTags";
  }

  const [contents, setContents] = useState([]);  // 검색결과
  const [page, setPage] = useState(0);  // 검색할 페이지
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);  // 데이터 요청 후 대기중 여부

  const [ref, inView] = useInView();  // 감시할 컴포넌트

  // Axios 객체 생성
  const axios = customAxios();

  const getContents = useCallback(async () => {
    console.log("Get", page);

    // 로딩 상태 설정
    setLoading(true);

    // 데이터 가져오기
    await axios.get(`/api/v1/search/showall/${endPoint}`, {
      params: {
        searchWord: searchWord,
        hashTags: hashTags,
        page: page,
        size: 10
      },
      withCredentials: false,
    }).then(({ data }) => {
      // 데이터 분해
      const body = data.body;
      const contents = body.content;

      // 컨텐츠 설정
      setContents(current => [...current, ...contents]);

      // 마지막 페이지 여부 설정
      setIsEnd(body.last);
    }).catch(error => {
      console.log(error);
    });

    // 로딩 상태 해제
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getContents();
  }, [getContents]);

  // 마지막 요소 도달 시 요청할 페이지 갱신
  useEffect(() => {
    // 마지막 요소가 view에 들어온데다 데이터 대기중도 아니고 마지막 페이지가 아닐 경우 페이지 갱신
    if (inView && !loading && !isEnd) {
      setPage(current => current + 1);
    }
  }, [inView, loading]);

  return (
    <>
      <StyledSearchRoom>
        <AllSearchType searchType={searchType} />
        {contents.map((item, index) =>
          <AllSearchContent key={item + index} content={item} />
        )}
        {contents.length === 0
          ? <p style={{fontSize: "1.2rem", textAlign: "center", marginTop: "20px"}}>검색결과 없음</p>
          : null}
      </StyledSearchRoom>
      {/* 스크롤 마지막임을 알리는 컴포넌트 */}
      {loading ? null : <span ref={ref} />}
    </>
  );
}

export default SearchRoom;