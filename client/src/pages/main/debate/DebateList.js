import { useEffect, useState, useRef, Suspense, lazy } from "react";

import styled from "styled-components"

import Header from "../../Header";
import Spinner from "../../../components/common/Spinner"
import LargeDebateContainer from "components/main/debate/LargeDebateContainer";
import SmallDebateContainer from "components/main/debate/SmallDebateContainer";
// const SmallDebateContainer = lazy(() => import("../../../components/main/debate/SmallDebateContainer"));
// const LargeDebateContainer = lazy(() => import("../../../components/main/debate/LargeDebateContainer"));

function DebateList() {

  return (
    // <MainWrapper>
      // <Header></Header>
      <Wrapper>
        <LargeDebateContainer url="/api/v1/search/main/hot" position="top" />
        <SmallDebateContainer url="/api/v1/search/main/modal" position="mid"/>
        <SmallDebateContainer url="/api/v1/search/main/modal" position="bottom" />
      </Wrapper>
    // </MainWrapper>
  )
}

export default DebateList;

// const MainWrapper = styled.div`
//   overflow-y: visible;
//   overflow-x: hidden;
//   background-color: grey;
//   height: 100%;
// `

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  background-color: white;
  /* height: 3000px; */
  min-width: 1024px;

  display: flex;
  flex-direction: column;
`