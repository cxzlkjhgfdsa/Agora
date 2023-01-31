import Debate from "./Debate"

import styled from "styled-components";
import { useEffect } from "react";

function DebateContainerHot(props) {

  useEffect(() => {
    console.log("container rendered");
    if (!props.debateList) {
      console.log("넘겨받은 debatelist >> ", props.debateList);
    }
    
    return (() => {
      console.log("container willUnMount")
    })
  }, [props])

  return (
    <StyledDebateContainerHot>
      <h1>hot5 container</h1>
      {props.debateList.map(debate => {
        console.log("in map func >> ", debate)
        return <Debate roomInfo={debate} />
      })}
    </StyledDebateContainerHot>
  )
}

export default DebateContainerHot;

const StyledDebateContainerHot = styled.div`
    height: ${(props) => props.height};
    background-color: ${(props) => props.bgColor};
`


