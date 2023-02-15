import styled, { keyframes } from "styled-components";
import customAxios from "utils/customAxios";

function SkipButton({roomId}) {

  const handleSkip = () => {
    const axios = customAxios();
    axios
      .put('/v2/debate/phaseskip', {
        "roomId" : roomId
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  };

  return (
    <ButtonDiv onClick={handleSkip}>
      발언 끝내기
    </ButtonDiv>
  )
}

const hoverAnimation = keyframes`
  to {
    background-color: #F6C026;
    color: white;
  }
`

const ButtonDiv = styled.div`
  // position
  position: absolute;
  bottom: 16px;
  right: 5%;

  background-color: white;
  padding: 3px 10px 5px 10px;

  color: #F6C026;
  font-weight: bold;
  font-size: 20px;

  // border: 2px solid #F6C026;
  border-radius: 5px;


  display: flex;
  justify-content: center;
  align-items: center;

   z-index: 3;
   cursor: pointer;

   &:hover {
    animation: ${hoverAnimation} 0.3s 0.01s 1 ease forwards;
   }
`

export default SkipButton