import { Suspense, lazy } from "react";
import styled from "styled-components";
import Spinner from "components/common/Spinner";
// const DebateContainer = lazy(() => import("./DebateContainer"));
import DebateContainer from "./DebateContainer";

import Icon from "../../../assets/icons/Main_fire.png";

function LargeDebateContainer({ url }) {
  return (
    <Wrapper>
      <TextWrapper>
        <Img src={Icon} alt=""></Img>
        <Text>화제의 토론 TOP 5</Text>
      </TextWrapper>
      <Suspense fallback={<Spinner />}>
        <DebateContainer
        maximumVisibleCounts={3}
        minimumVisibleCounts={2}
        type="hot-thumbnail"
        url={url}
        slidePerClick={1}
        />
      </Suspense>
    </Wrapper>
  )
}

export default LargeDebateContainer;

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 3%;
`

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1% 5% 0.5%;
`

const Img = styled.img`
  width:20px;
`

const Text = styled.span`
color: white;
font-size: 1.5rem;
margin-left: 1%;
`