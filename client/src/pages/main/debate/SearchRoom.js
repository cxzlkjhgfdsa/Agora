import AllSearchContent from "components/debate/search/AllSearchContent";
import AllSearchType from "components/debate/search/AllSearchType";
import styled from "styled-components";

const StyledSearchRoom = styled.div`
  width: calc( 100% - 200px );
  margin: 30px 100px;
`;

function SearchRoom() {
  return (
    <StyledSearchRoom>
      <AllSearchType searchType={"hashtags"} />
      <AllSearchContent />
      <AllSearchContent />
      <AllSearchContent />
      <AllSearchContent />
      <AllSearchContent />
      <AllSearchContent />
      <AllSearchContent />
    </StyledSearchRoom>
  );
}

export default SearchRoom;