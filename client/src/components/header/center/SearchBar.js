import styled from "styled-components";

// 검색 돋보기 아이콘
import SearchIcon from "assets/icons/Search_Gray.png";

// 디바운싱, API 호출 최적화
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import SearchResult from "./SearchResult";
import { useSetRecoilState } from "recoil";
import { creatorSearchResultState, hashTagsSearchResultState, titleSearchResultState } from "stores/atoms";
import API from "api/axios";

// 검색바 전체
const StyledSearchBar = styled.div`
  // 크기 설정
  width: 30rem;
  height: 40px;

  // 배경색 설정
  background-color: #EBEBEB;

  // 둥근 테두리
  border-radius: 10px 10px ${({ isSearched }) => isSearched ? "0px 0px" : "10px 10px"};

  position: relative;
`;

// 돋보기 아이콘
const StyledImg = styled.img`
  // 돋보기 아이콘 크기 설정
  width: 36px;
  height: 36px;

  // 위치 설정
  position: absolute;
  top: 2px;
  left: 2px;
`;

// 검색어 입력 컴포넌트
const StyledInput = styled.input`
  // 배경색 투명
  background-color: transparent;
  border-color: transparent;

  // 크기 설정
  width: calc( 30rem - 44px );
  height: 36px;

  // 글자 설정
  font-size: 1.2rem;

  // 위치 설정
  position: absolute;
  top: 0tpx;
  left: 40px;
  padding: 0px;
`;

function SearchBar() {
  // 사용자 입력 검색어
  const [searchString, setSearchString] = useState("");
  
  // 검색결과 State
  const setHashTagsContents = useSetRecoilState(hashTagsSearchResultState);
  const setTitleContents = useSetRecoilState(titleSearchResultState);
  const setCreatorContents = useSetRecoilState(creatorSearchResultState);

  // 검색결과 존재 여부 State, 검색결과 창 띄우기
  const [isSearched, setIsSearched] = useState(false);

  // 키워드, 해시태그 토큰화
  const tokenize = (inputString) => {
    let tokens = inputString.split(" ");  // 공백 기준 토큰화

    let keyword = "";  // 키워드
    let hashTags = [];  // 해시태그 리스트

    // 소문자로 변환하여 해시태그 통일
    tokens.forEach(element => {
      if (element !== "") {  // 빈칸 건너뛰기
        if (element.startsWith("#")) {  // 해시태그 처리
          element = element.toLowerCase();  // 소문자로 변환하여 해시태그 통일
          hashTags.push(element.toLowerCase());  // 해시태그 리스트에 추가
        } else {  // 키워드 처리
          if (keyword.length !== 0) {  // 앞에 단어가 있을 경우 띄어쓰기 부착
            keyword += " ";
          }
          keyword += element;  // 키워드 연장
        }
      }
    });
    
    return [keyword, hashTags];
  };

  // Change Event Listener
  const changeEvent = (event) => {
    const inputString = event.target.value;
    // 입력값 반영
    setSearchString(inputString);
    
    // 기존 검색결과 삭제
    setIsSearched(false);
    setHashTagsContents([]);
    setTitleContents([]);
    setCreatorContents([]);
    
    // 모두 삭제해서 빈 문자열이 됐을 경우 호출 건너뛰기
    if (inputString === "") {
      return;
    }
    
    // API 호출하여 현재 토론중인 방 목록 가져오기
    callApi(inputString, event);
  };
  
  const callApi = useCallback(
    // 글자를 모두 지울 경우,
    // 마지막으로 실행한 함수로 인해 불필요하게 API를 호출함.
    // 따라서 event를 같이 넘겨주고, 현재의 값을 한 번 더 확인함으로써 방지
    debounce(async (inputString, event) => {
      // 값을 모두 지워서 검색할 필요가 없을 경우 그대로 종료
      if (event.target.value === "") {
        return;
      }
      
      // 키워드와 해시태그 토큰화, 키워드는 String, 해시태그는 String Array
      const [keyword, hashTags] = tokenize(inputString);
      
      // 입력 정보에 따라 (사용자, 방제) 또는 해시태그 검색      
      API.get("/room/search", {
        params: {
          searchWord: keyword,
          hashTags: hashTags.join(",")
        }
      }).then(({ data }) => {
        // 사용자 및 방제 검색
        setTitleContents(data.body.searchByRoomName);
        setCreatorContents(data.body.searchByCreaterName);
        setHashTagsContents(data.body.findByHashTags);

        // 검색결과 창 표시
        setIsSearched(true);
      });

      // 프론트 더미 데이터
      // if (keyword !== "") {
      //   setTitleContents([
      //     { title: "감자 vs 고구마 존심 대결", creator: "감자", viewers: 100, hashTags: ["감자", "고구마", "구황작물"] },
      //     { title: "감자전 vs 김치전 어느 쪽이 더 존맛?", creator: "막걸리러버", viewers: 22, hashTags: ["감자전", "김치전", "전", "막걸리"] },
      //   ]);
      //   setCreatorContents([
      //     { title: "감자 vs 고구마 존심 대결", creator: "감자", viewers: 100, hashTags: ["감자", "고구마", "구황작물"] },
      //   ]);
      // }
      // // 해시태그 검색
      // else {
      //   setHashTagsContents([
      //     { title: "감자 vs 고구마 존심 대결", creator: "감자", viewers: 100, hashTags: ["감자", "고구마", "구황작물"] },
      //     { title: "감튀 vs 고구마튀김 어느 쪽이 주류?", creator: "콜레스테롤수집가", viewers: 80, hashTags: ["감자", "고구마", "튀김", "솔직히감튀임난"] },      
      //   ]);
      // }
    }, 500)
    , []
  );

  // Enter Event
  const pressEnter = (event) => {
    if (event.key === "Enter") {
      // event.target.value 대신 Recoil Atom 만들어서 관리하기
      alert("엔터를 눌렀으며 검색어는 `" + event.target.value + "` 입니다.");
    }
  };

  return (
    <StyledSearchBar isSearched={isSearched}>
      <StyledImg src={SearchIcon} />
      <StyledInput
        type="text"
        placeholder="검색"
        value={searchString}
        onChange={changeEvent}
        onKeyDown={pressEnter}
      />
      {isSearched && <SearchResult />}
    </StyledSearchBar>
  );
}

export default SearchBar;