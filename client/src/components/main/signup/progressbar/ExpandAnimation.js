import { keyframes } from "styled-components";
import { useLocation } from "react-router-dom"

const Expand1 = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 33.3vw;
  }
`

const Expand2 = keyframes`
  from {
    width: 33.3vw;
  }
  to {
    width: 66.6vw;
  }
`

const Expand3 = keyframes`
  from {
    width: 66.6vw;
  }
  to {
    width: 90vw;
  }
`
function Expand() {
  // 사용자의 위치에 따른 애니메이션 출력을 바꿈
  const curpath = useLocation().pathname

  if (curpath.startsWith("/user/signup/SNS")) {
    return Expand1
  }
  else if (curpath.startsWith("/user/signup/input")) {
    return Expand2
  }
  else {
    return Expand3
  }
}

export {Expand}