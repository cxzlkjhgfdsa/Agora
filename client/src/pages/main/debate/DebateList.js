import { useEffect, useState, useRef, Suspense, lazy, useCallback } from "react";

import styled from "styled-components"

import LargeDebateContainer from "components/main/debate/DebateContainerLarge";
import SmallDebateContainer from "components/main/debate/DebateContainerSmall";
import ModalContainerShowAll from "../../../components/main/debate/ModalContainerShowAll";
import ModalContainerJoin from "components/main/debate/ModalContainerJoin";
import ModalContainerCreate from "components/main/debate/ModalContainerCreate";
import { joinModalState } from "stores/ModalStates";
import { useRecoilValue } from "recoil";
// const SmallDebateContainer = lazy(() => import("../../../components/main/debate/SmallDebateContainer"));
// const LargeDebateContainer = lazy(() => import("../../../components/main/debate/LargeDebateContainer"));

function DebateList() {

  const [isDebatingModalOpen, setIsDebatingModalOpen] = useState(false);
  const [isWaitingModalOpen, setIsWaitingModalOpen] = useState(false);

  const renderingCounts = useRef(null);
  useEffect(() => {
    renderingCounts.current = 0;
  }, [])

  const openDebatingModal = useCallback(() => {
    console.log("open debate modal");
    renderingCounts.current++;
    console.log("render# >> ", renderingCounts.current);
    setIsDebatingModalOpen(true);
  }, [])

  const openWaitingModal = useCallback(() => {
    console.log("open waiting modal");
    renderingCounts.current++;
    console.log("render# >> ", renderingCounts.current);
    setIsWaitingModalOpen(true);
  }, [])

  const closeModalEvent = useCallback(() => {
    console.log("close modal")
    setIsDebatingModalOpen(false);
    setIsWaitingModalOpen(false);
  }, [])

  return (
      <Wrapper>
        <LargeDebateContainer url="/v2/search/main/hot5" position="top" />
        <SmallDebateContainer url="/v2/search/main/topInprogress" position="mid" openModalEvent={openDebatingModal}/>
        <SmallDebateContainer url="/v2/search/main/topReadystate" position="bottom" openModalEvent={openWaitingModal}/>

        <ModalContainerShowAll 
          closeModalEvent={closeModalEvent} 
          isDebatingModalOpen={isDebatingModalOpen}
          isWaitingModalOpen={isWaitingModalOpen} 
          renderingCounts={renderingCounts.current} />

        <ModalContainerJoin />

        <ModalContainerCreate />

      </Wrapper>
  )
}

export default DebateList;

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  background-color: white;
  /* height: 3000px; */
  min-width: 1024px;
  min-height: 1400px;

  display: flex;
  flex-direction: column;
`