import { CloseButton, ModalDiv, ModalTitle } from "../ModalComponents";

/*
  closeModalEvent: Modal 닫는 이벤트
  showType: 열띤 토론중 or 토론 대기중 등 모두보기를 누른 토론방의 상태 (debating, waiting)
*/
function CreateRoomModal({ closeModalEvent }) {

  return (
    <ModalDiv>
      {/* 제목 이미지와 글자 넘겨주기 */}
      <ModalTitle text="토론방 생성하기" titleSize="3rem" />
      {/* Modal 닫는 이벤트 넘겨주기 */}
      <CloseButton onClick={closeModalEvent} />
    </ModalDiv>
  );
}

export default CreateRoomModal;