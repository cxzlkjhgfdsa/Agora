import { useRecoilState } from "recoil";
import { debateRoomState } from "stores/debateRoomStates";

function debate(props) {
    const [debateRoom, setDebateRoom] = useRecoilState(debateRoomState(props));

    return (
        <div></div>
    )
}

export default debate;