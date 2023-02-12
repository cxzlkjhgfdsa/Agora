import styled, { css, keyframes } from "styled-components"
import CreateRoomModal from "./modal/create/CreateRoomModal";
import { useState, useEffect } from "react";
import { createModalState } from "stores/ModalStates";
import { useRecoilValue } from "recoil";

function ModalContainerCreate() {

  const getCreateModalState = useRecoilValue(createModalState)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (getCreateModalState.isModalOpen) {
      setVisible(true);
    } else {
      timeoutId = setTimeout(() => {setVisible(false)}, 500)
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    }
  }, [getCreateModalState])


  if (!visible) return null;

  console.log("create modal is visible")

  return (
    <ModalContainer 
      isModalOpen={getCreateModalState.isModalOpen}
    >
      <Background>
        <CreateRoomModal
          isModalOpen={getCreateModalState.isModalOpen}
        />
      </Background>
    </ModalContainer>
  )
}

export default ModalContainerCreate;

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: table;
  height: 100%;
  width: 100%;
  z-index: 16;

  animation: ${props => props.isModalOpen 
    ? css`${fadeIn} .5s`
    : css`${fadeOut} .5s`
  } cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
`

const Background = styled.div`
  display: table-cell;
  background: rgba(0, 0, 0, .9);
  text-align: center;
  vertical-align: middle; 
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`