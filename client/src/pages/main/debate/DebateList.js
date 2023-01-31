import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

import styled from "styled-components"

import customAxios from "utils/customAxios";

import Header from "../../Header";

import { debateRoomsAtomFamily, debateRoomsSelectorFamily } from "stores/debateRoomStates";

function DebateList() {
  const [debateRoom, setDebateRoom] = useRecoilState(debateRoomsAtomFamily);
  const [debateRoomSelector, setDebateRoomSelector] = useRecoilState(debateRoomsSelectorFamily);

  let debateList_hot = [];
  let debateList_inProgress = [];
  let debateList_waiting = [];

  const getDebateList = useCallback(async (url) => {
    const axios = customAxios();
    try {
      const debateList = (await axios.get(`${process.env.SERVER_BASE_URL}`+url)).data.body;
      return debateList;
    } catch(err) {
      console.warn(err);
    }
  }, []);

  const setDebateList = useCallback((debateList) => {
    debateList.map((debate) => {

    })
  }, []);

  useEffect(() => {
    const hot5List = getDebateList("/room/main/hot5");

    function setDebates(debateList) {
      debateList.map((debate) => {

      })
    }

    return (() => {
      // reset all selector
    })
  }, [])

  return (
    <MainWrapper>
      <Header></Header>
      <h1>메인 페이지</h1>
      <DebateContainerHot debateList={debateList_hot}/>

      <DebateContainerInProgress debateList={debateList_inProgress}/>
      
      <DebateContainerWaiting debateList={debateList_waiting}/>
  
    </MainWrapper>
  )
}

export default DebateList;

const MainWrapper = styled.div`

`

const DebateContainerHot = styled.div`

`

const DebateContainerInProgress = styled.div`

`

const DebateContainerWaiting = styled.div`

`