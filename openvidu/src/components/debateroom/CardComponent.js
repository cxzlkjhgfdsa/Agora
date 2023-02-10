import styled from "styled-components";


const CardArea = styled.div`
  width: 100%;
  height: 550px;
  
  box-shadow: 1px 1px 3px #777777, -1px -1px 1px #eeeeee;
  border-radius: 12px;
  color: white;

  background-color: #777777;
`

const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

function CardComponent({test}) {
  return(
    <Wrapper>
      <CardArea>
        {test}
      </CardArea>
    </Wrapper>
  )
}

export default CardComponent