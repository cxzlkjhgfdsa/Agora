import styled, { css, keyframes } from "styled-components"
import DebateListModal from "components/main/debate/modal/showall/DebateListModal";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { showAllModalState } from "stores/ModalStates";

function ModalContainerShowAll() {
  
  const getShowAllModalState = useRecoilValue(showAllModalState);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (getShowAllModalState.isModalOpen) {
      setVisible(true);
    } else {
      timeoutId = setTimeout(() => {setVisible(false)}, 500)
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    }
  }, [getShowAllModalState])

  if (!visible) return null;

  return (
    <ModalContainer 
      isModalOpen={getShowAllModalState.isModalOpen}
    >
      <Background>
        <DebateListModal 
          isModalOpen={getShowAllModalState.isModalOpen}
          debateState={getShowAllModalState.type} 
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
