import { useRecoilValue } from "recoil";
import { creatorSearchResultState, hashTagsSearchResultState, titleSearchResultState } from "stores/atoms";
import styled from "styled-components";
import SearchResultSet from "./SearchResultSet";

const StyledSearchResultWrapper = styled.div`
  background-color: #DFDFDF;

  width: 650px;
  max-height: 650px;
  overflow: auto;

  border-radius: 0px 0px 10px 10px;

  padding: 0px 50px 20px 50px;

  position: absolute;
  top: 60px;
  left: 0;
`;

function SearchResultSetWrapper() {
  const hashTagsContents = useRecoilValue(hashTagsSearchResultState);
  const creatorContents = useRecoilValue(creatorSearchResultState);
  const titleContents = useRecoilValue(titleSearchResultState);

  // 해시태그로만 검색했을 때 결과
  let contents = <SearchResultSet searchType={"hashtags"} maxContents={4} contents={hashTagsContents} />;
  
  // 그 외 검색결과 (사용자 이름 검색결과 및 방제 검색결과)
  if (creatorContents.length > 0 || titleContents.length > 0) {
    contents = (
      <>
      <SearchResultSet searchType={"creator"} maxContents={1} contents={creatorContents} />
      <SearchResultSet searchType={"title"} maxContents={2} contents={titleContents} />
      </>
    );
  }

  return (
    <StyledSearchResultWrapper>
      {contents}
    </StyledSearchResultWrapper>
  );
}

export default SearchResultSetWrapper;