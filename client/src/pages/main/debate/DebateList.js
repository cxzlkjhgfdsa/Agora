import { useEffect, useState, useRef, Suspense, lazy } from "react";

import styled from "styled-components"

import Header from "../../Header";
import Spinner from "../../../components/common/Spinner"
// import LargeDebateContainer from "components/main/debate/LargeDebateContainer";
import SmallDebateContainer from "components/main/debate/SmallDebateContainer";
const LargeDebateContainer = lazy(() => import("../../../components/main/debate/LargeDebateContainer"));

function DebateList() {

  return (
    <MainWrapper>
      <Header></Header>
      <DebateContainerWrapper>
        <LargeDebateContainer url="/api/v1/search/main/hot5" />
        <LargeDebateContainer url="/api/v1/search/main/hot5" />
        {/* <SmallDebateContainer url="/api/v1/search/main/modal?roomState=true&category=전체&order=createnew&page=0&size=10" /> */}
        {/* <SmallDebateContainer url="/api/v1/search/main/modal?roomState=false&category=전체&order=createnew&page=0&size=10" /> */}
      </DebateContainerWrapper>
    </MainWrapper>
  )
}

export default DebateList;

const MainWrapper = styled.div`
  overflow-y: scroll; 
`

const DebateContainerWrapper = styled.div`
  width: 100%;
  height: 35%;
`