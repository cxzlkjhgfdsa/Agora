import styled from "styled-components";
import { useLocation } from "react-router-dom";

const StepTitleDiv = styled.div`
  // 글자 크기 및 색상 설정
  font-size: 16px;
  color: #F6C026;
  font-weight: normal;
`

function StepTitle() {
  const curpath = useLocation().pathname
  // 사용자 위치에 따른 단계 숫자 변화
  let stepNum
  if (curpath.startsWith('/user/signup/SNS')) {
    stepNum = '1/3단계'
  } 
  else if (curpath.startsWith('/user/signup/input')) {
    stepNum = '2/3단계'
  }
  else if (curpath.startsWith('/user/signup/category')) {
    stepNum = '3/3단계'
  }
  else {
    stepNum = '완료'
  }
  
  return (
    <StepTitleDiv>
      {stepNum}
    </StepTitleDiv>
  )
}

export default StepTitle