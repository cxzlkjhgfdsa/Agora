import { Suspense, lazy } from "react";
import styled from "styled-components";
import Spinner from "components/common/Spinner";
// const DebateContainer = lazy(() => import("./DebateContainer"));
import DebateContainer from "./DebateContainer";

function SmallDebateContainer({ url, position }) {
  const imgSrc = "src/assets/icons/Main_fire.png";
  const text = position === "mid" ? "열띤 토론 중" : "토론 준비 중";
  return (
    <Wrapper>
      <TextWrapper>
        <img src={imgSrc} alt=""></img>
        <Text>{text}</Text>
      </TextWrapper>
      <Suspense fallback={<Spinner />}>
      <DebateContainer
        maximumVisibleCounts={4}
        minimumVisibleCounts={3}
        type="normal"
        url={url}
        slidePerClick={-1}
        />
      </Suspense>
    </Wrapper>
  )
}

export default SmallDebateContainer;

const Wrapper = styled.div`
  background-color: white;
`

const TextWrapper = styled.div`
`

const Text = styled.span`
color: black;
font-size: 2rem;
margin: 3% 7%;
`