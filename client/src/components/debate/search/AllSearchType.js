import styled from "styled-components";

const StyledAllSearchType = styled.p`
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 2.5rem;
  letter-spacing: -0.05rem;

  padding: 0;
  margin: 0;
`;

function AllSearchType({ searchType }) {
  let searchTypeLabel = "";
  if (searchType === "hashtags") {
    searchTypeLabel = "해시태그 검색결과";
  } else if (searchType === "title") {
    searchTypeLabel = "방 제목 검색결과";
  } else if (searchType === "creator") {
    searchTypeLabel = "사용자 검색결과";
  }

  return (
    <StyledAllSearchType>
      {searchTypeLabel}
    </StyledAllSearchType>
  );
}

export default AllSearchType;