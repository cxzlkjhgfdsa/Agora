import { useEffect, useState, useRef, Suspense, lazy } from "react";

import styled from "styled-components"

import Header from "../../Header";
import Spinner from "../../../components/common/Spinner"
const DebateContainerHot = lazy(() => import("../../../components/main/debate/DebateContainerHot"));


function DebateList() {
  const [currXoffset, setCurrXoffset] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(0);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setVisibleSlides(2);
    } else if (window.innerWidth < 1200) {
      setVisibleSlides(3);
    } else {
      setVisibleSlides(4);
    }
    console.log("visibleSlides >> ", visibleSlides);
  }, [visibleSlides]);

  return (
    <MainWrapper>
      <Header></Header>
      <DebateContainerWrapper>
        <h3>화제의 토론 top 5</h3>
        <Suspense fallback={<Spinner />}>
          <DebateContainerHot 
            currXoffset={currXoffset}
          />
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
  height: 35%;
  /* overflow: hidden; */
  background-color: grey;

`