import { useEffect, useState, useRef, Suspense, lazy, useCallback } from "react";

import styled from "styled-components"

import Header from "../../Header";
import Spinner from "../../../components/common/Spinner"
import LargeDebateContainer from "components/main/debate/LargeDebateContainer";
import SmallDebateContainer from "components/main/debate/SmallDebateContainer";
import DebateListModal from "components/main/debate/modal/showall/DebateListModal";
import ShowAllModalContainer from "./ShowAllModalContainer";
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
    console.log("render >> ", renderingCounts.current);
    setIsDebatingModalOpen(true);
  }, [])

  const openWaitingModal = useCallback(() => {
    console.log("open waiting modal");
    renderingCounts.current++;
    console.log("render >> ", renderingCounts.current);
    setIsWaitingModalOpen(true);
  }, [])

  const closeModalEvent = useCallback(() => {
    console.log("close modal")
    setIsDebatingModalOpen(false);
    setIsWaitingModalOpen(false);
  }, [])

  return (
      // <Header></Header>
      <Wrapper>
        <LargeDebateContainer url="/api/v1/search/main/hot" position="top" />
        <SmallDebateContainer url="/api/v1/search/main/modal" position="mid" openModalEvent={openDebatingModal}/>
        <SmallDebateContainer url="/api/v1/search/main/modal" position="bottom" openModalEvent={openWaitingModal}/>
        {/* { isDebatingModalOpen || isWaitingModalOpen
          ? <DebateListModal 
          closeModalEvent={closeModalEvent}
          debateState={isDebatingModalOpen ? "debating" : "waiting"} />
          : null} */}
        <ShowAllModalContainer 
          closeModalEvent={closeModalEvent} 
          isDebatingModalOpen={isDebatingModalOpen}
          isWaitingModalOpen={isWaitingModalOpen} 
          renderingCounts={renderingCounts.current} />
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
  min-height: 1224px;

  display: flex;
  flex-direction: column;
`