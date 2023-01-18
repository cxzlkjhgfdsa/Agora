import styled from "styled-components";
import SearchResultSet from "./SearchResultSet";

const StyledSearchResultWrapper = styled.div`
  background-color: #DFDFDF;

  width: 650px;

  border-radius: 0px 0px 10px 10px;

  padding: 30px 50px;

  position: absolute;
  top: 60px;
  left: 0;
`;

function SearchResultSetWrapper() {
  return (
    <StyledSearchResultWrapper>
      <SearchResultSet searchType={"해시 태그 검색 결과"} data={[1, 2, 3, 4]} />
      <SearchResultSet searchType={"사용자 이름 검색 결과"} data={[6, 1, 5, 2]} />
    </StyledSearchResultWrapper>
  );
}

export default SearchResultSetWrapper;