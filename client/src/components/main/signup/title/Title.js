import StepTitle from "./StepTitle";
import Maintitle from "./MainTitle";
import styled from "styled-components";

import { useLocation } from "react-router-dom";

// 제목을 감싸는 Wrapper 정의
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Title() {

  const curpath = useLocation().pathname
  let content

  if (curpath.startsWith('/user/signup/SNS')) {
    content = 'SNS 간편 회원가입'
  }
  else if (curpath.startsWith('/user/signup/input')) {
    content = '개인 정보 추가 입력'
  }
  else if (curpath.startsWith('/user/signup/category')) {
    content = '관심 카테고리 선택'
  }
  else {
    content = '회원가입 완료'
  }


  return(
    <Wrapper>
      <Maintitle>
        <StepTitle />
        {content}
      </Maintitle>
    </Wrapper>
  ) 
}

export default Title