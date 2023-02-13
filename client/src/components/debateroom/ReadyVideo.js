import styled from "styled-components";

function ReadyVideo ({opinion}) {
  return (
    <div>
      <OpinionDiv>
        {opinion}
      </OpinionDiv>
      <EmptyVideoDiv>
        토론 준비중
      </EmptyVideoDiv>
    </div>
  )
}

// 대기 상태 박스
const EmptyVideoDiv = styled.div`
  // 박스 크기
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  border-radius: 18px;
  letter-spacing: -2px;
  
  // 배경 색상
  background-color: #f1f1f1;
  
  // font
  font-size: 36px;
  font-weight: bold;
  color: #bbbbbb;

  // 중앙배치
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  // 드래그 방지
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
`

const OpinionDiv = styled.div`
  // font
  font-size: 24px;
  font-weight: bold;
  color: #555555;
  // letter-spacing: -1px;

  // 문자 정렬
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px; 
`
export default ReadyVideo