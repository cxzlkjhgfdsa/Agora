import Debate from "./Debate"

import styled from "styled-components";
import { useEffect, useState } from "react";

function DebateContainerHot(props) {
  const [currX, setCurrX] = useState(0);


  useEffect(() => {
    console.log("container rendered");
    if (!props.debateList) {
      console.log("넘겨받은 debatelist >> ", props.debateList);
    }

    return (() => {
      console.log("container willUnMount")
    })
  }, [props])

  const prevSlide = () => {

  }

  const nextSlide = () => {

  }

  return (
    <OuterContainer>
      <div>
        <span>화제의 토론 Top5</span> <span>나의 취향 TOP5</span>
      </div>

      <InnerContainer>
        <Button direction="left" onClick="prevSlide">&#60;</Button>
        <Button direction="right" onClick="nextSlide">&#62;</Button>
        <StyledDebateContainerHot>
          {props.debateList.map(debate => {
            console.log("in map func >> ", debate)
            return <Debate roomInfo={debate} />
          })}
        </StyledDebateContainerHot>
      </InnerContainer>
    </OuterContainer>
  )
} 

export default DebateContainerHot;

const OuterContainer = styled.div`
  width: 100%;
  
  height: 15rem;
  overflow: hidden;
  background-color: grey;
`

const InnerContainer = styled.div`
  width: 100%;
  height: 80%;
  position: relative;
  background-color: silver;
`


const StyledDebateContainerHot = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`

const Button = styled.button`
  position: absolute;
  width: 5%;
  height: 100%;
  ${props => props.direction === "left" ? "left: 0px;" : "right: 0px;"}
  top:50%; transform: translateY(-50%);
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
  z-index: 1; 

  font-size: 200%;
  font-weight: 600;
`



