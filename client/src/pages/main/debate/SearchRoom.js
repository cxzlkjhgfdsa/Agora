import AllSearchContent from "components/debate/search/AllSearchContent";
import AllSearchType from "components/debate/search/AllSearchType";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { dummyDataState } from "stores/SearchRoomStates";
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
  console.log("'" + searchWord + "'", "'" + hashTags + "'", "'" + searchType + "'");

  const [contents, setContents] = useState([]);  // 검색결과
  const [page, setPage] = useState(0);  // 검색할 페이지
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);  // 데이터 요청 후 대기중 여부

  const [ref, inView] = useInView();  // 감시할 컴포넌트

  // Axios 객체 생성
  const axios = customAxios();

  // 마지막 요소 도달 시 요청할 페이지 갱신
  useEffect(() => {
    // 마지막 요소가 view에 들어온데다 데이터 대기중도 아니고 마지막 페이지가 아닐 경우 페이지 갱신
    if (inView && !loading && !isEnd) {
      // 데이터 가져오기
      axios.get("/", {
        params: {
          
        }
      }).then(({ data }) => {
        
      }).catch(error => {
        console.log(error);
      });
    }
  }, [inView, loading]);

  return (
    <>
      <StyledSearchRoom>
        <AllSearchType searchType={searchType} />
        {contents.map((item, index) =>
          <AllSearchContent key={item + index} content={item} />
        )}
      </StyledSearchRoom>
      {/* 스크롤 마지막임을 알리는 컴포넌트 */}
      <span ref={ref} />
    </>
  );
}

export default SearchRoom;