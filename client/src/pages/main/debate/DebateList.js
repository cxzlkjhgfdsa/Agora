import { useEffect, useState, useRef, Suspense, lazy } from "react";

import styled from "styled-components"

import Header from "../../Header";
import Spinner from "../../../components/common/Spinner"
import LargeDebateContainer from "components/main/debate/LargeDebateContainer";
import SmallDebateContainer from "components/main/debate/SmallDebateContainer";
const DebateContainer = lazy(() => import("../../../components/main/debate/DebateContainer"));

function DebateList() {

  return (
    <MainWrapper>
      <Header></Header>
      <DebateContainerWrapper>
        <Text>화제의 토론 top 5</Text>
        <Suspense fallback={<Spinner />}>
          <LargeDebateContainer url="/api/v1/search/main/hot5" />
        </Suspense>
        {/* <Text>열띤 토론 중</Text>
        <Suspense fallback={<Spinner />}>
          <SmallDebateContainer url="bbbbb" />
        </Suspense>
        <Text>토론 준비 중앙</Text>
        <Suspense fallback={<Spinner />}>
          <SmallDebateContainer url="ccccc" />
        </Suspense> */}
      </DebateContainerWrapper>
    </MainWrapper>
  )
}

export default DebateList;

const MainWrapper = styled.div`
  overflow: scroll;
`

const DebateContainerWrapper = styled.div`
  width: 100%;
  height: 35%;
  overflow: hidden;
`

const Text = styled.span`
  color: white;
  font-size: 1rem;
`