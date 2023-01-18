import { Link } from "react-router-dom";
import styled from "styled-components";

// 검색 유형, 모두보기 버튼을 갖는 Wrapper
const StyledSearchType = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
`;

// 검색 유형을 표시하는 span
const StyledTypeLabel = styled.span`
  font-size: 30px;
  line-height: 36px;
`;

// 모두보기 텍스트
const StyledSearchAll = styled.span`
  margin-left: 20px;
  color: #F6C026;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.05em;
`;

function SearchType({ searchType }) {
  return (
    <StyledSearchType>
      <StyledTypeLabel>{searchType}</StyledTypeLabel>
      <Link to={"/debate/search"}>
        <StyledSearchAll>모두보기 &gt;</StyledSearchAll>
      </Link>
    </StyledSearchType>
  );
}

export default SearchType;