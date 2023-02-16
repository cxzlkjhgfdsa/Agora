import styled from "styled-components"
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import customAxios from "utils/customAxios";

import LargeDebateContainer from "components/main/debate/DebateContainerLarge";
import SmallDebateContainer from "components/main/debate/DebateContainerSmall";
import ModalContainerShowAll from "../../../components/main/debate/ModalContainerShowAll";
import ModalContainerJoin from "components/main/debate/ModalContainerJoin";
import ModalContainerCreate from "components/main/debate/ModalContainerCreate";
import { isRoomState, lastRoomState } from "stores/DebateStates";
import { userInfoState } from "stores/userInfoState";

function DebateList() {

  const [lastRoom, setLastRoom] = useRecoilState(lastRoomState);
  const [isRoom, setIsRoom] = useRecoilState(isRoomState);
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    setIsRoom(false);
  }, []);

  useEffect(() => {
    if (lastRoom !== 0) {
      const axios = customAxios();
        axios
          .post('v2/room/leave', {
            "roomId": lastRoom,
            "userNickname" : userInfo?.userNickname,
          })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })

      setLastRoom(0);
    }
  }, [isRoom, lastRoom])

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