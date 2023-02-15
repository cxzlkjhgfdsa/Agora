import styled from "styled-components";
import DebateContainer from "./DebateContainer";

import Lightbulb from "../../../assets/icons/Main_lightbulb.png";
import Clock from "../../../assets/icons/Main_clock.png";
import { useSetRecoilState } from "recoil";
import { showAllModalState } from "stores/ModalStates";

function SmallDebateContainer({ url, type }) {

  const setShowAllModalState = useSetRecoilState(showAllModalState);

  const text = type === "debating" ? "열띤 토론 중" : "토론 준비 중";

  return (
    <Wrapper>
      <TextWrapper>
        <Img src={ type === "debating" ? Lightbulb : Clock} alt=""></Img>
        <Text>{text}</Text>
        <ShowAll onClick={() => {setShowAllModalState({ isModalOpen: true, type, })}}>모두 보기 &gt;</ShowAll>
      </TextWrapper>
      <DebateContainer
        maximumVisibleCounts={4}
        minimumVisibleCounts={3}
        type={type}
        url={url}
        slidePerClick={-1}
        />
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
  width: 20px;
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