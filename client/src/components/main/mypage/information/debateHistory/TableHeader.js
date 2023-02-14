import styled from "styled-components";

const StyledTableHeader = styled.div`
  // 크기 설정
  width: 100%;
  
  // 글꼴 설정
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.05rem;
  text-align: center;
`;

const Opinion = styled.p`
  // 크기 설정
  width: calc( 45% - 36px );
  margin: 18px;

  &.more {
    // 색상 설정
    color: #F6C026;
  }
  &.less {
    // 색상 설정
    color: #BBBBBB;
  }

  // Display
  display: inline-block;

  // 글자수 초과 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Center = styled.p`
  // 크기 설정
  width: calc( 10% - 36px );
  margin: 18px 0;

  display: inline-block;

  // 글자수 초과 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function TableHeader({ leftOpinion, rightOpinion, isLeftMore }) {
  return (
    <StyledTableHeader>
      <Opinion
        title={leftOpinion}
        className={isLeftMore ? "more" : "less"}
      >
        {leftOpinion}
      </Opinion>
      <Center>투표</Center>
      <Opinion
        title={rightOpinion}
        className={isLeftMore ? "less" : "more"}
      >
        {rightOpinion}
      </Opinion>
    </StyledTableHeader>
  );
}

export default TableHeader;