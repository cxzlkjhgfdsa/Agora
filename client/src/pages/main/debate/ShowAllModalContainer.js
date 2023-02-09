import styled, { css, keyframes } from "styled-components"
import DebateListModal from "components/main/debate/modal/showall/DebateListModal";
import { useState } from "react";

function ShowAllModalContainer({ closeModalEvent, isDebatingModalOpen, isWaitingModalOpen, renderingCounts }) {

  if (renderingCounts === 0 || !renderingCounts) return null;

  return (
    <ModalContainer 
      isModalOpen={isDebatingModalOpen || isWaitingModalOpen}
    >
      <Background>
        <DebateListModal 
          isModalOpen={isDebatingModalOpen || isWaitingModalOpen} 
          closeModalEvent={closeModalEvent} 
          debateState={isDebatingModalOpen ? "debating" : "waiting"} 
        />
        {/* <White isModalOpen={isDebatingModalOpen || isWaitingModalOpen} ></White> */}
      </Background>
    </ModalContainer>
  )
}

export default ShowAllModalContainer;

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

const zoomIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`

const zoomOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
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

const StyledDebateListModal = styled(DebateListModal)`
  /* padding: 50px;
  display: inline-block;
  border-radius: 3px;
  position: relative; */
  display: none;

  /* transform: scale(${props => props.isModalOpen ? 0 : 1});
  animation: ${props => props.isModalOpen 
    ? css`${zoomIn} .5s 1s` 
    : css`${zoomOut} .5s`
  } cubic-bezier(0.165, 0.84, 0.44, 1) forwards; */
`

const Background = styled.div`
  display: table-cell;
  background: rgba(0, 0, 0, .8);
  text-align: center;
  vertical-align: middle; 
`

const White = styled.div`
  width: 500px;
  height: 500px;
  margin-left: 300px;
  background-color: white;

  transform: scale(${props => props.isModalOpen ? 0 : 1});
  animation: ${props => props.isModalOpen 
    ? css`${zoomIn} .7s 1s` 
    : css`${zoomOut} .7s`
  } cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
`
