import { keyframes } from "styled-components";

const SelectAnimation = keyframes`
  from {
    opacity: 0.6;
  }
  to {
    opacity: 0.35;
  }
`
const AppearAnimation = keyframes`
  from{
    opacity: 0;
  }
  to {
    opacity: 1;
  }

`


export { SelectAnimation, AppearAnimation }