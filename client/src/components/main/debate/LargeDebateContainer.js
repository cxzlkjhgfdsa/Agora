import { Suspense, lazy } from "react";
import styled from "styled-components";
import Spinner from "components/common/Spinner";
// const DebateContainer = lazy(() => import("./DebateContainer"));
import DebateContainer from "./DebateContainer";

function LargeDebateContainer({ url }) {
  return (
    <Wrapper>
      <TextWrapper>
        <img src="../../../assets/icons/Main_fire.png" alt=""></img>
        <Text>화제의 토론 !!!</Text>
      </TextWrapper>
      {/* <Suspense fallback={<Spinner />}> */}
        <DebateContainer
        maximumVisibleCounts={3}
        minimumVisibleCounts={2}
        type="hot-thumbnail"
        url={url}
        bgColor="black"
        slidePerClick={1}
        />
      {/* </Suspense> */}
    </Wrapper>
  )
}

export default LargeDebateContainer;

const Wrapper = styled.div`
  background-color: black;
`

const TextWrapper = styled.div`
`

const Text = styled.span`
color: white;
font-size: 3rem;
`