import styled from "styled-components"

import LargeDebateContainer from "components/main/debate/DebateContainerLarge";
import SmallDebateContainer from "components/main/debate/DebateContainerSmall";
import ModalContainerShowAll from "../../../components/main/debate/ModalContainerShowAll";
import ModalContainerJoin from "components/main/debate/ModalContainerJoin";
import ModalContainerCreate from "components/main/debate/ModalContainerCreate";

function DebateList() {

  return (
      <Wrapper>
        <LargeDebateContainer url="/v2/search/main/hot5" type="hot" />
        <SmallDebateContainer url="/v2/search/main/topInprogress" type="debating" />
        <SmallDebateContainer url="/v2/search/main/topReadystate" type="waiting" />

        <ModalContainerShowAll />
        <ModalContainerJoin />
        <ModalContainerCreate />
      </Wrapper>
  )
}

export default DebateList;

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  background-color: white;
  /* height: 3000px; */
  min-width: 1024px;
  min-height: 1400px;

  display: flex;
  flex-direction: column;
`