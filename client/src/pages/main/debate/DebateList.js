import { Link } from "react-router-dom";

function DebateList() {
  return (
    <div>
      <h1>This is DebateList page.</h1>
      <Link to={"/debate/room/1"}>
        <h2>1번 방 들어가기</h2>
      </Link>
      <Link to={"/debate/room/2"}>
        <h2>2번 방 들어가기</h2>
      </Link>
      <Link to={"/debate/room/3"}>
        <h2>3번 방 들어가기</h2>
      </Link>
    </div>
  )
}

export default DebateList;