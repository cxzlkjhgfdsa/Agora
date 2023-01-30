import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { debateInfoState } from "stores/atoms";
import customAxios from "utils/customAxios";

function DebateList() {
  const setDebateInfo = useSetRecoilState(debateInfoState);

  useEffect(() => {
    async function getHot5() {
      try {
        const axios = customAxios();
        const hot5List = axios.get(`${process.env.SERVER_BASE_URL}/room/main/hot5`).data.body;
        console.log("hot5List ", hot5List);
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
  }, [])

  return (
    <div>
      <h1>This is DebateList page.</h1>
      <Link to={"/debate/room/1"} onClick={() => setDebateInfo({isLeader: true, position: "Speaker"})}>
        <h2>1번 방 들어가기 (방장, 발언자)</h2>
      </Link>
      <Link to={"/debate/room/2"} onClick={() => setDebateInfo({isLeader: false, position: "Speaker"})}>
        <h2>2번 방 들어가기 (발언자)</h2>
      </Link>
      <Link to={"/debate/room/3"} onClick={() => setDebateInfo({isLeader: false, position: "Audience"})}>
        <h2>3번 방 들어가기 (시청자)</h2>
      </Link>
    </div>
  )
}

export default DebateList;