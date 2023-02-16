import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { debateUserRoleState } from "stores/joinDebateRoomStates";
import { userInfoState } from "stores/userInfoState";
import { joinModalState, showAllModalState } from "stores/ModalStates";
import styled from "styled-components";
import customAxios from "utils/customAxios";

const StyledJoinAsSpeaker = styled.div`
  // 크기 설정
  width: calc( 100% - 10% );
  margin: 16px 0 0 0;
  padding: 0 5%;

  // Display
  display: flex;
  justify-content: space-between;
`;
const OpinionButton = styled.button`
  // 크기 설정
  width: 40%;
  margin: 0 5%;
  aspect-ratio: 7 / 5;

  // 디자인
  color: #FFFFFF;
  border-radius: 20px;

  &.selectLeftOpinion {
    border-color: #F6C026;
    ${({ disabled }) => disabled
      ? "background-color: #D4D4D4; border-color: #D4d4d4;"
      : "background-color: #F6C026; border-color: #377BC3; cursor: pointer;"}
  }
  &.selectRightOpinion {
    ${({ disabled }) => disabled
      ? "background-color: #D4D4D4; border-color: #D4D4D4;"
      : "background-color: #377BC3; border-color: #377BC3; cursor: pointer;"}
  }
`;
const OpinionText = styled.p`
  // 마진 및 패딩 초기화
  margin: 0;
  padding: 0;

  // 글꼴 설정
  color: #FFFFFF;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.05rem;

  // 글자수 초과 처리
  overflow: hidden;
  text-overflow: ellipsis;
`;

function JoinAsSpeaker({ roomInfo }) {

  const navigate = useNavigate();

  // 다음 페이지로 전달하기 위한 참가자의 역할 setter
  const setDebateUserRole = useSetRecoilState(debateUserRoleState);
  const resetJoinModalState = useResetRecoilState(joinModalState);
  const resetShowAllModalState = useResetRecoilState(showAllModalState);

  const { roomId, roomOpinionLeft, roomOpinionRight, leftUserList, rightUserList } = roomInfo;

  // opinion: 의견, team: LEFT or RIGHT
  const join = useCallback(async (opinion, team) => {
    let isValid = true;

    const choice = window.confirm(`'${opinion}' 측 발언자로 참여 하시겠습니까?`);
    if (choice === true) {
      // 카메라, 오디오 확인
      const srcObject = document.querySelector("video").srcObject;
      let onCameraTrack = false;
      let onAudioTrack = false;
      if (srcObject) {
        const tracks = srcObject.getTracks();
        tracks.forEach(track => {
          if (track.kind === "video") {
            onCameraTrack = true;
          } else if (track.kind === "audio") {
            onAudioTrack = true;
          }
        });
      }
      if (!onCameraTrack || !onAudioTrack) {
        document.querySelector("#deviceSetting").classList.add("wrong");
        isValid = false;
      }
      
      if (!isValid) {
        window.alert("설정에서 카메라와 오디오를 켜주세요.");
        return;
      }

      setDebateUserRole("speaker");
      resetJoinModalState();
      resetShowAllModalState();
      navigate("/debate/room/" + roomId);
    }
  }, []);

  return (
    <StyledJoinAsSpeaker>
      {/* 왼쪽 의견 */}
      <OpinionButton
        className="selectLeftOpinion"
        disabled={leftUserList.length === 3}
        onClick={() => { join(roomOpinionLeft, "LEFT"); }}
      >
        <OpinionText title={roomOpinionLeft}>{roomOpinionLeft}</OpinionText>
        <OpinionText>({leftUserList.length} / 3)</OpinionText>
      </OpinionButton>
      
      {/* 오른쪽 의견 */}
      <OpinionButton
        className="selectRightOpinion"
        disabled={rightUserList.length === 3}
        onClick={() => { join(roomOpinionRight, "RIGHT"); }}
      >
        <OpinionText title={roomOpinionRight}>{roomOpinionRight}</OpinionText>
        <OpinionText>({rightUserList.length} / 3)</OpinionText>
      </OpinionButton>
    </StyledJoinAsSpeaker>
  );
}

export default JoinAsSpeaker;