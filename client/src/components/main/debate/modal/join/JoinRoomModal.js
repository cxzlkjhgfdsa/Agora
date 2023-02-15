import { CloseButton, ModalDiv, ModalTitle } from "../ModalComponents";
import { CenterDiv, Container, LeftDiv, RightDiv } from "../ModalContainer";
import ModalSetting from "../ModalSetting";
import WebCam from "../WebCam";
import JoinAsViewer from "./JoinAsViewer";
import JoinAsSpeaker from "./JoinAsSpeaker";
import { debateRoomsAtomFamily } from "stores/debateRoomStates";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled, { css, keyframes } from "styled-components";
import { joinModalState } from "stores/ModalStates";

/*
  closeModalEvent: Modal 닫는 이벤트
  showType: 열띤 토론중 or 토론 대기중 등 모두보기를 누른 토론방의 상태 (debating, waiting)
*/
function JoinRoomModal({ roomId, isModalOpen }) {
  const roomInfo = useRecoilValue(debateRoomsAtomFamily(roomId))
  const resetJoinModalState = useResetRecoilState(joinModalState);

  return (
    <StyleWrapper isModalOpen={isModalOpen}>
    <ModalDiv>
      {/* 제목 이미지와 글자 넘겨주기 */}
      <ModalTitle text={roomInfo?.roomName} titleSize="2.5rem" />
      {/* Modal 닫는 이벤트 넘겨주기 */}
      <CloseButton onClick={() => {
        // 기존 스트림 삭제
        const srcObject = document.querySelector("video")?.srcObject;
        if (srcObject) {
          srcObject.getTracks().forEach(track => {
            track.stop();
            srcObject.removeTrack(track);
          });
        }
        // Modal 종료
        resetJoinModalState();
      }} />

      {/* 컨테이너 생성하여 메인 컴포넌트들 부착 */}
      <Container>
        <CenterDiv>
          {/* 캠 화면 설정, 해시 태그, 썸네일 선택 등 좌측 컴포넌트 */}
          <LeftDiv>
            <ModalSetting name="캠 화면 설정" content={
              <WebCam />
            } />
          </LeftDiv>   
          {/* 토론방을 설정하는 우측 컴포넌트 */}
          <RightDiv>
            <ModalSetting className="full" name="토론 참여하기" content={
              <JoinAsSpeaker
                roomInfo={roomInfo} />} />
            <ModalSetting className="full" name="관전하기" content={
              <JoinAsViewer />
            } />
          </RightDiv>
        </CenterDiv>
      </Container>
    </ModalDiv>
    </StyleWrapper>
  );
}

export default JoinRoomModal;

const StyleWrapper = styled.div`  
  width: 100%;
  height: 100%;

  ${props => props.isModalOpen
  ? css`
    opacity: 0;
    animation: ${scaleUp} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  `
  : css`
    animation: ${scaleDown} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  `
  }
`

const scaleUp = keyframes`
  0% {
    transform: scale(.5) translateY(1000px);
    opacity: 0;
  }
  100% {
    transform: scale(.7) translateY(0);
    opacity: 1;
  }
`

const scaleDown = keyframes`
  0% {
    transform: scale(.7) translateY(0);
    opacity: 1;
  }
  100% {
    transform: scale(.5) translateY(1000px);
    opacity: 0;
  }
`