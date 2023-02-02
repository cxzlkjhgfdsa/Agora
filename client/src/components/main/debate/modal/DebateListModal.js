import styled from "styled-components";
import CloseButton from "./CloseButton";
import ModalCategory from "./ModalCategory";
import ModalContents from "./ModalContents";
import ModalOrderBy from "./ModalOrderBy";
import ModalTitle from "./ModalTitle";

const StyledDebateListModal = styled.div`
  // 크기 설정
  min-width: 900px;
  width: calc( 90% - 160px );
  height: calc( 900px - 80px );
  margin: 0;
  padding: 40px 80px;

  // 위치 설정
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  // 배경 설정
  background-color: #333333;

  // 테두리 설정
  border-radius: 20px;
`;

function DebateListModal() {
  return (
    <StyledDebateListModal>
      <ModalTitle />
      <ModalOrderBy />
      <ModalCategory />
      <ModalContents />
    </StyledDebateListModal>
  );
}

export default DebateListModal;