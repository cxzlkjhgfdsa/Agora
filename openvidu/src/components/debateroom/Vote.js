import { useState, useEffect } from "react";

// recoil
import { useRecoilValue } from "recoil";
import { phaseNumState } from "../stores/DebateRoomStates";

function Vote() {
  const [isVote, setIsVote] = useState(false);
  const [timer, setTimer] = useState(60);
  const phaseNum = useRecoilValue(phaseNumState);

  useEffect(() => {
    const counter = setInterval(() => {
      setTimer(timer => (timer - 1) > 0 ? (timer - 1) : 0)
    }, 1000);

    return () => {
      clearInterval(counter)
    }
  }, [])

  useEffect(() => {
    const newTimer = phaseNum === 3 ? 60 : 10;
    setTimer(newTimer);
  }, [phaseNum]);
  
  return(
    <div>
      {timer}
    </div>
  )
}

export default Vote