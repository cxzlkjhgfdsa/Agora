import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { debateInfoState } from "stores/atoms";

function DebateList() {
  const setDebateInfo = useSetRecoilState(debateInfoState);

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