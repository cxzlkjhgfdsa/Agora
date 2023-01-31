import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { debateRoomsAtomFamily } from "stores/debateRoomStates";
import customAxios from "utils/customAxios";
import style from "styled-components";

function DebateHotContainer(props) {
  const [debateRoomState, setDebateRoomState] = useRecoilState(debateRoomsAtomFamily(props.debateInfo.roomId));

  useEffect(() => {
    async function getHot5() {
      try {
        const axios = customAxios();
        const hot5List = await axios.get(`${process.env.SERVER_BASE_URL}/room/main/hot5`).data.body;
        return hot5List;
      } catch(err) {
        console.warn(err);
      }
    }

    function setDebates(debateList) {
      debateList.map((debate) => {
        
      })
    }

    const hot5List = getHot5();
    console.log("hot5List >> ", hot5List);
    setDebates(hot5List);
  }, [])

  return (
    <>
    </>
  )
}

export default DebateHotContainer;

