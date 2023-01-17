import { useParams } from "react-router-dom";

function DebateRoom() {
  const { roomId } = useParams();

  return (
    <div>
      <h1>This is DebateRoom page.</h1>
      <h2>Room ID : {roomId}</h2>
    </div>
  );
}

export default DebateRoom;