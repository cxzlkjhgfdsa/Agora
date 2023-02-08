import styled from "styled-components";

const StyledChoice = styled.li`
  // 글꼴 설정
  color: #999999;
  font-size: 1rem;
  letter-spacing: -0.05rem;
  text-align: center;

  // 마진 설정
  margin-left: 12px;

  cursor: pointer;

  &.selected {
    color: #F6C026;
    border-bottom: 1px solid;
  }
`;

function Choice(props) {
  return (
    <StyledChoice id={props.id} onClick={props.onClick}>
      {props.text}
    </StyledChoice>
  )
}

export default Choice;