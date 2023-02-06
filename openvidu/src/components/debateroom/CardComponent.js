import styled from "styled-components";


const CardArea = styled.div`
  width: 100%;
  height: 400px;
  
  background-color: #f1f1f1;
  border-radius: 12px;
`

const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

function CardComponent() {
  return(
    <Wrapper>
      <CardArea />
    </Wrapper>
  )
}

export default CardComponent