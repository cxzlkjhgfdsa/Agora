import styled, { css, keyframes } from "styled-components"
import JoinRoomModal from "./modal/join/JoinRoomModal";
import { useState, useEffect } from "react";
import { joinModalState } from "stores/ModalStates";
import { useRecoilValue } from "recoil";

function ModalContainerJoin() {

  const getJoinModalState = useRecoilValue(joinModalState)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (getJoinModalState.isModalOpen) {
      setVisible(true);
    } else {
      timeoutId = setTimeout(() => {setVisible(false)}, 500)
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    }
  }, [getJoinModalState])


  if (!visible) return null;

  return (
    <ModalContainer 
      isModalOpen={getJoinModalState.isModalOpen}
    >
      <Background>
        <JoinRoomModal
          roomId={getJoinModalState.roomId}
          isModalOpen={getJoinModalState.isModalOpen}
        />
      </Background>
    </ModalContainer>
  )
}

export default ModalContainerJoin;

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