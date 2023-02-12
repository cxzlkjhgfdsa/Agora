import styled, { css, keyframes } from "styled-components"
import DebateListModal from "components/main/debate/modal/showall/DebateListModal";
import { useRef } from "react";

function ModalContainerShowAll({ closeModalEvent, isDebatingModalOpen, isWaitingModalOpen, renderingCounts }) {
  
  const outside = useRef(null);

  if (renderingCounts === 0 || !renderingCounts) return null;

  return (
    <ModalContainer 
      isModalOpen={isDebatingModalOpen || isWaitingModalOpen}
    >
      <Background 
        ref={outside}
        onClick={(e) => {
          if (e.target === outside.current) {
            closeModalEvent()
            console.log("bg clicked")} 
          }}
        >
        <DebateListModal 
          isModalOpen={isDebatingModalOpen || isWaitingModalOpen} 
          closeModalEvent={closeModalEvent} 
          debateState={isDebatingModalOpen ? "debating" : "waiting"} 
        />
      </Background>
    </ModalContainer>
  )
}

export default ModalContainerShowAll;

const unfoldIn = keyframes`
  0% { transform: scale(0, 0.005); }
  50% { transform: scale(1, 0.005); }
  100% { transform: scale(1, 1); }
`

const unfoldOut = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1, 0.005); }
  100% { transform: scale(0, 0.005); }
`

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: table;
  height: 100%;
  width: 100%;
  z-index: 15;

  
  animation: ${props => props.isModalOpen 
    ? css`${unfoldIn} 1s` 
    : css`${unfoldOut} 1s .3s`
  } cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  transform: scale(${props => props.isModalOpen ? 0 : 1});
`

const Background = styled.div`
  display: table-cell;
  background: rgba(0, 0, 0, .9);
  text-align: center;
  vertical-align: middle; 
`
