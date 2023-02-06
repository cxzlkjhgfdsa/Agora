import Debate from "./Debate"

import styled from "styled-components";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import customAxios from "utils/customAxios";

function DebateContainer( {maximumVisibleCounts, minimumVisibleCounts, type, url, bgColor, slidePerClick, } ) {
  const [debateList, setDebateList] = useState([]);
  const [currSlideIdx, setCurrSlideIdx] = useState(0);
  const [visibleCounts, setVisibleCounts] = useState(0);

  const isBigScreen = useMediaQuery({ query: '(min-width: 1023px)'})

  const SLIDE_PER_CLICK = slidePerClick === 1 ? 1 : visibleCounts;

  useEffect(() => {
    isBigScreen ? setVisibleCounts(maximumVisibleCounts) : setVisibleCounts(minimumVisibleCounts);
  }, [isBigScreen, maximumVisibleCounts, minimumVisibleCounts])

  const prevSlide = () => {
    if (currSlideIdx > 0) setCurrSlideIdx(currSlideIdx - SLIDE_PER_CLICK);
  }

  const nextSlide = () => {
    if (currSlideIdx + visibleCounts < debateList.length) setCurrSlideIdx(currSlideIdx + SLIDE_PER_CLICK);
  } 

  useEffect(() => {
    async function get() {
      const axios = customAxios();
      axios.get(`${url}`).then(res => {
      if (res.data.body.hasOwnProperty("content")) {
        console.log(res.data.body.content)
        setDebateList(res.data.body.content)
      } else {
        setDebateList(res.data.body);
      }
      }).catch(err => console.warn(err));
    }
    get();
  }, [])

  console.log("re-render")

  return (
    <Container>
      <LeftButton direction="left" onClick={prevSlide} currSlideIdx={currSlideIdx}><Text>&#8249;</Text></LeftButton>
        <DebateWrapper currSlideIdx={currSlideIdx} visibleCounts={visibleCounts} slidePerClick={SLIDE_PER_CLICK}>
          {debateList.map((debate, idx) => {
            return <Debate 
            key={debate.roomId} 
            currSlideIdx={currSlideIdx} 
            itemIdx={idx} 
            visibleCounts={visibleCounts}
            type={type} 
            roomInfo={debate} 
            />
          })}
        </DebateWrapper>
      <RightButton direction="right" onClick={nextSlide} currSlideIdx={currSlideIdx} visibleCounts={visibleCounts} numOfSlides={debateList.length}><Text>&#8250;</Text></RightButton>
    </Container>
  )
} 

export default DebateContainer;

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 200px;
`

const DebateWrapper = styled.div`
  --current-index: ${props => props.currSlideIdx};
  --visible-counts: ${props => props.visibleCounts};
  --slide-per-click: ${props => props.slidePerClick};
  transform: translateX(calc(-100% / var(--visible-counts) * var(--current-index) * var(--slide-per-click)));
  transition: transform 150ms ease-in-out;

  display: flex;
  flex-grow: 1;
  margin: 0 .25rem;
`

const Text = styled.div`
  transition: transform 150ms ease-in-out;
`

const Button = styled.button`
  flex-grow: 0;
  width: 5%;
  margin: .25rem 0;
  border-radius: 1rem;
  opacity: 0.5;
  transition: background-color 150ms ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, .5);
    ${Text} {
      transform: scale(2);
    }
  }
  cursor: pointer;
  z-index: 10; 

  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 3rem;
  line-height: 0;
`

const LeftButton = styled(Button)`
  border-top-left-radius: 0; border-bottom-left-radius: 0;
  /* visibility: ${props => props.currSlideIdx === 0 ? "hidden" : "visible"}; */
`

const RightButton = styled(Button)`
  border-top-right-radius: 0; border-bottom-right-radius: 0;
  /* visibility: ${props => props.currSlideIdx + props.visibleCounts >= props.numOfSlides ? "hidden" : "visible"}; */
`

