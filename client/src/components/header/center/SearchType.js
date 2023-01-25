import { Link } from "react-router-dom";
import RightArrow from "assets/icons/Right_Arrow_Yellow.png";
import styled from "styled-components";

// 검색 유형, 모두보기 버튼을 갖는 Wrapper
const StyledSearchType = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
`;

// 검색 유형을 표시하는 span
const StyledTypeLabel = styled.span`
  font-size: 1.2rem;
  line-height: 1.44rem;
  color: #000000;
`;

// 모두보기 텍스트
const StyledSearchAll = styled.span`
  margin-left: 1rem;
  color: #F6C026;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.05em;
`;

function SearchType({ searchType }) {
  let searchTypeLabel = "";
  if (searchType === "hashtags") {
    searchTypeLabel = "해시태그 검색결과";
  } else if (searchType === "title") {
    searchTypeLabel = "방 제목 검색결과";
  } else if (searchType === "creator") {
    searchTypeLabel = "사용자 검색결과";
  }

  return (
    <StyledSearchType>
      <StyledTypeLabel>{searchTypeLabel}</StyledTypeLabel>
      <Link to={"/debate/search/" + searchType} style={{ display: "flex", alignItems: "center" }}>
        <StyledSearchAll>모두보기</StyledSearchAll>
        <img src={RightArrow} style={{ marginLeft: "8px" }} />
      </Link>
    </StyledSearchType>
  );
}

export default SearchType;