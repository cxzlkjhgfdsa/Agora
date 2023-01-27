import styled from "styled-components";
import NoContents from "./NoContents";
import SearchContent from "./SearchContent";
import SearchType from "./SearchType";

const StyledSearchResultSet = styled.div`
  width: 100%;

  margin-top: 30px;
`;

function SearchResultSet({ searchType, maxContents, contents }) {
  let data = contents.slice(0, maxContents);

  return (
    <StyledSearchResultSet>
      <SearchType searchType={searchType} />
      {data.map((item, index) => (
        <SearchContent key={item + index} content={item} />
      ))}
      {data.length === 0 && <NoContents />}
    </StyledSearchResultSet>
  );
}

export default SearchResultSet;