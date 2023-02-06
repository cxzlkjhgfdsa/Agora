import styled from "styled-components";

const AreaDiv = styled.div`
  width: 100%;
  height: 250px;

  margin-top: 10px;

  background-color: #f1f1f1;
  border-radius: 12px;
`
const Wrapper = styled.div`

`

function TimeBar() {
    return(
      <Wrapper>
        <AreaDiv />
      </Wrapper>
  )

}

export default TimeBar