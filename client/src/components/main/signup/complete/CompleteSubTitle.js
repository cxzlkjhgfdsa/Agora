import { SubText } from "../content/ContentBox";
import styled from "styled-components";

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 50px;
`

function CompleteSubTitle() {
  return(
    <Wrapper>
      <SubText>
        축하합니다! 아고라 가입이 완료되었습니다.
      </SubText>
    </Wrapper>
  )
}

export default CompleteSubTitle