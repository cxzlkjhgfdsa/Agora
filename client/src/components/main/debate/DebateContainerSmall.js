import { Suspense, lazy } from "react";
import styled from "styled-components";
import Spinner from "components/common/Spinner";
// const DebateContainer = lazy(() => import("./DebateContainer"));
import NewDebateContainer from "./NewDebateContainer";

import Lightbulb from "../../../assets/icons/Main_lightbulb.png";
import Clock from "../../../assets/icons/Main_clock.png";

function SmallDebateContainer({ url, position, openModalEvent }) {

  const text = position === "mid" ? "열띤 토론 중" : "토론 준비 중";
  return (
    <Wrapper>
      <TextWrapper>
        <Img src={ position === "mid" ? Lightbulb : Clock} alt=""></Img>
        <Text>{text}</Text>
        <ShowAll onClick={openModalEvent}>모두 보기 &gt;</ShowAll>
      </TextWrapper>
      <Suspense fallback={<Spinner />}>
      <NewDebateContainer
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
  /* padding-bottom: 1%; */
`

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5% 5% 1%;
`

const Img = styled.img`
  width:20px;
`

const Text = styled.span`
color: black;
font-size: 1.3rem;
font-weight: 700;
margin-left: 1%;
`

const ShowAll = styled.span`
  color: #F6C026;
  margin-left: 2%;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`