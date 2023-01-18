import styled from "styled-components";
import SearchContent from "./SearchContent";
import SearchType from "./SearchType";

const StyledSearchResultSet = styled.div`
  width: 650px;

  margin-bottom: 40px;
  border: 3px;
`;

function SearchResultSet({ searchType, dataSet }) {
  return (
    <StyledSearchResultSet>
      <SearchType searchType={searchType} dataSet={dataSet} />
      <SearchContent />
      <SearchContent />
    </StyledSearchResultSet>
  );
}

export default SearchResultSet;