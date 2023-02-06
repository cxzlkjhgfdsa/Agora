import { Suspense, lazy } from "react";
import styled from "styled-components";
import Spinner from "components/common/Spinner";
// const DebateContainer = lazy(() => import("./DebateContainer"));
import DebateContainer from "./DebateContainer";

function SmallDebateContainer({ url }) {
  return (
    <Wrapper>
      <TextWrapper>
        <img src="../../../assets/icons/Main_fire.png" alt=""></img>
        <Text>SmallDebateContainer</Text>
      </TextWrapper>
      {/* <Suspense fallback={<Spinner />}> */}
      <DebateContainer
        maximumVisibleCounts={4}
        minimumVisibleCounts={3}
        type="normal"
        url={url}
        bgColor="white"
        slidePerClick={3}
      />
      {/* </Suspense> */}
    </Wrapper>
  )
}

export default SmallDebateContainer;

const Wrapper = styled.div`
  background-color: #FFFFFF;
`

const TextWrapper = styled.div`
`

const Text = styled.span`
color: black;
font-size: 3rem;
`