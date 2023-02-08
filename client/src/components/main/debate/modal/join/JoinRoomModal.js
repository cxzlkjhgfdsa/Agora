import { useState } from "react";
import { CloseButton, ModalDiv, ModalTitle } from "../ModalComponents";
import { CenterDiv, Container, LeftDiv, RightDiv } from "../ModalContainer";
import ModalSetting from "../ModalSetting";
import WebCam from "../WebCam";
import SelectOpinion from "./SelectOpinion";

/*
  closeModalEvent: Modal 닫는 이벤트
  showType: 열띤 토론중 or 토론 대기중 등 모두보기를 누른 토론방의 상태 (debating, waiting)
*/
function JoinRoomModal({ closeModalEvent, roomInfo }) {
  const [videoRef, setVideoRef] = useState();

  return (
    <ModalDiv>
      {/* 제목 이미지와 글자 넘겨주기 */}
      <ModalTitle text={roomInfo?.roomName} titleSize="2.5rem" />
      {/* Modal 닫는 이벤트 넘겨주기 */}
      <CloseButton onClick={closeModalEvent} />

      {/* 컨테이너 생성하여 메인 컴포넌트들 부착 */}
      <Container>
        <CenterDiv>
          {/* 캠 화면 설정, 해시 태그, 썸네일 선택 등 좌측 컴포넌트 */}
          <LeftDiv>
            <ModalSetting name="캠 화면 설정" content={
              <WebCam setVideoRef={setVideoRef} />
            } />
          </LeftDiv>   
          {/* 토론방을 설정하는 우측 컴포넌트 */}
          <RightDiv>
            <ModalSetting name="토론 참여하기" content={<SelectOpinion roomInfo={roomInfo} />} />
            <ModalSetting name="관전하기" content={<h1>456</h1>} />
          </RightDiv>
        </CenterDiv>
      </Container>
    </ModalDiv>
  );
}

export default JoinRoomModal;