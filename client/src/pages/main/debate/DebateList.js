import { useEffect, useState, useRef, Suspense, lazy } from "react";

import styled from "styled-components"

import customAxios from "utils/customAxios";

import Header from "../../Header";
import Spinner from "../../../components/common/Spinner"
const DebateContainerHot = lazy(() => import("../../../components/main/debate/DebateContainerHot"));


function DebateList() {

  return (
    <MainWrapper>
      <Header></Header>
      <DebateContainerWrapper>
        <h3>화제의 토론 top 5</h3>
        <Suspense fallback={<h1>is Loading.....</h1>}>
          <DebateContainerHot />
        </Suspense>
      </DebateContainerWrapper>



  
    </MainWrapper>
  )
}

export default DebateList;

const MainWrapper = styled.div`

`

const DebateContainerWrapper = styled.div`
width: 100%;
height: 15rem;
overflow: hidden;
background-color: grey;


`