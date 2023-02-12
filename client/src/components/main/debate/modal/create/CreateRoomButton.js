import styled from "styled-components";

const StyledCreateRoomButton = styled.button`
  // 크기 설정
  width: 50%;
  padding: 8px 0px;

  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1.5rem;
  font-weight: 700;

  // 디자인 설정
  background-color: #F6C026;
  border: 0;
  border-radius: 10px;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.25);

  cursor: pointer;
`;

function CreateRoomButton(props) {
  return (
    <StyledCreateRoomButton onClick={props.onClick}>
      방 생성하기
    </StyledCreateRoomButton>
  );
}

export default CreateRoomButton;