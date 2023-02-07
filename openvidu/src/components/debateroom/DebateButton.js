import styled, { keyframes } from "styled-components";

const readyButtonHover = keyframes`
  from {
    background-color: white;
  }

  to {
    background-color: #F6C026;
    color: #FFFFFF;
    border: none;
  }
`

const startButtonHover = keyframes`
  to {
    background-color: #377BC3;
    color: white;
    border: none;
  }
`

const DebateButton = styled.div`
  // size
  width: 80%;
  height: 40px;
  border-radius: 25px;
  
  // font
  color: black;
  font-size: 18px;
  font-weight: bold;

  // positioning
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  margin-top: 5px;

  // prevent drag
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;

  // ready button
  &.readyButton-root {
    background-color: #FFFFFF;
    color: #F6C026;
    cursor: pointer;
    border: 2px solid #F6C026;

    &:hover {
      animation: ${ readyButtonHover } 0.3s 0s ease 1 forwards;
    }
  }

  &.disableButton-root {
    background-color: #f1f1f1;
    color: #bbbbbb;
  }

  &.startButton-root {
    background-color: #ffffff;
    cursor: pointer;
    color: #377BC3;
    border: 2px solid #377BC3;

    &:hover {
      animation: ${ startButtonHover } 0.3s 0s ease 1 forwards;
    }
  }
  
  font-family: 'Inter', san-serif !important;
`

export default DebateButton