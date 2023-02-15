import { useState } from "react";
import { CloseButton, ModalDiv, ModalTitle } from "../ModalComponents";
import { BottomDiv, CenterDiv, Container, LeftDiv, RightDiv } from "../ModalContainer";
import ModalSetting from "../ModalSetting";
import CreateRoomButton from "./CreateRoomButton";
import { SettingInput } from "./InputComponents";
import FileUploader from "./FileUploader";
import SettingComboBox from "./SettingComboBox";
import WebCam from "../WebCam";
import { tokenize } from "components/common/Tokenizers";
import customAxios from "utils/customAxios";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { debateUserRoleState } from "stores/joinDebateRoomStates";
import { useNavigate } from "react-router-dom";
import { createModalState } from "stores/ModalStates";
import styled from "styled-components";
import { userInfoState } from "stores/userInfoState";

/*
  closeModalEvent: Modal 닫는 이벤트
  showType: 열띤 토론중 or 토론 대기중 등 모두보기를 누른 토론방의 상태 (debating, waiting)
*/
function CreateRoomModal({ closeModalEvent }) {
  const axios = customAxios();

  const userInfo = useRecoilValue(userInfoState);

  const resetCreateModalState = useResetRecoilState(createModalState)

  const [hashTags, setHashTags] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [debateTitle, setDebateTitle] = useState("");
  const [debateType, setDebateType] = useState("");
  const [leftOpinion, setLeftOpinion] = useState("");
  const [rightOpinion, setRightOpinion] = useState("");
  const [selectedOpinion, setSelectedOpinion] = useState("");
  const [category, setCategory] = useState("");

  // 참가자의 역할을 저장할 setter
  const setDebateUserRoleState = useSetRecoilState(debateUserRoleState);
  const navigate = useNavigate();

  const onHashTagsChange = (event) => {
    setHashTags(event.target.value);
  };
  const onTitleChange = (event) => {
    setDebateTitle(event.target.value);
    document.querySelector("#debateTitle").classList.remove("wrong");
  };
  const onLeftOpinionChange = (event) => {
    setLeftOpinion(event.target.value);
    document.querySelector("#leftOpinion").classList.remove("wrong");
  };
  const onRightOpinionChange = (event) => {
    setRightOpinion(event.target.value);
    document.querySelector("#rightOpinion").classList.remove("wrong");
  };
  const toggleWrongDebateType = () => {
    document.querySelector("#debateType").classList.remove("wrong");
  };
  const toggleWrongSelectedOpinion = () => {
    document.querySelector("#selectedOpinion").classList.remove("wrong");
  };
  const toggleWrongCategory = () => {
    document.querySelector("#category").classList.remove("wrong");
  };

  const createRoom = async () => {
    // 유효성 검증
    let isValid = true;
    if (debateTitle === "") {  // 방 제목
      document.querySelector("#debateTitle").classList.add("wrong");
      isValid = false;
    }
    if (debateType === "") {  // 토론 종류
      document.querySelector("#debateType").classList.add("wrong");
      isValid = false;
    }
    if (leftOpinion === "") {  // 주장1
      document.querySelector("#leftOpinion").classList.add("wrong");
      isValid = false;
    }
    if (rightOpinion === "") {  // 주장2
      document.querySelector("#rightOpinion").classList.add("wrong");
      isValid = false;
    }
    if (selectedOpinion === "") {  // 참여 주장
      document.querySelector("#selectedOpinion").classList.add("wrong");
      isValid = false;
    }
    if (category === "") {  // 카테고리
      document.querySelector("#category").classList.add("wrong");
      isValid = false;
    }
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

    if (isValid) {
      // 해시태그 변환
      let hashTagsForSend = "";
      if (hashTags.length > 0) {
        const [_, hashTagsList] = tokenize(hashTags);
        hashTagsForSend = hashTagsList.join(",");
      }

      const formData = new FormData();
      formData.append("files", thumbnailFile);
      
      // 서버에 이미지를 전송해 저장하고, URL 전달받기
      let thumbnailUrl = "https://storage.googleapis.com/agora_real1/static/thumbnail.jpg";
      if (thumbnailFile instanceof File) {
        thumbnailUrl = await axios.post(
          "/v2/file/save/roomthumbnail",
          formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        }).then(({ data }) => data.body[0].fileUrl)
          .catch(error => alert(error));
      }
      
      // 전달받은 URL을 포함한 다른 정보들로 방 생성 처리
      // 데이터 취합
      const sendData = {
        roomName: debateTitle,
        roomCreaterName: "left",
        roomDebateType: (debateType === "정식 토론") ? "FORMAL" : "SHORT",
        roomOpinionLeft: leftOpinion,
        roomOpinionRight: rightOpinion,
        roomHashtags: hashTagsForSend,
        roomThumbnailUrl: thumbnailUrl,
        roomCategory: category
      };

      // 방 생성 Request
      const createData = await axios.post(
        "/v2/room/create",
        sendData,
        null)
        .then(({ data }) => {
          console.log(data);
          return data;
        })
        .catch(error => {
          console.log(error);
        });
      
      if (createData?.state !== true) {
        alert("방 생성에 실패했습니다.");
        return;
      }

      // 방 참여 Request
      let team = null;
      if (selectedOpinion === "주장1") {
        team = "LEFT";
      } else if (selectedOpinion === "주장2") {
        team = "RIGHT";
      }
      const joinData = await axios.post("/v2/room/enter", {
        roomId: createData?.body?.roomId,
        userNickname: userInfo?.userNickname,
        userTeam: team
      }, null)
        .then(({ data }) => data)
        .catch(error => { console.log(error); });
      
      if (joinData?.state !== true) {
        alert("방 참여에 실패했습니다.");
        return;
      }

      // Recoil State 설정
      setDebateUserRoleState("host");  // 방장으로 입장

      // 토론방 이동 Request
      navigate("/debate/room/" + joinData?.body?.roomId);
    }
  };

  return (
    <ScaleWrapper >
      <ModalDiv>
        {/* 제목 이미지와 글자 넘겨주기 */}
        <ModalTitle text="토론방 생성하기" titleSize="2.5rem" />
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
          resetCreateModalState();
        }} />

        {/* 컨테이너 생성하여 메인 컴포넌트들 부착 */}
        <Container>
          <CenterDiv>
            {/* 캠 화면 설정, 해시 태그, 썸네일 선택 등 좌측 컴포넌트 */}
            <LeftDiv>
              <ModalSetting name="캠 화면 설정" content={
                <WebCam />
              } />
              <ModalSetting name="썸네일 선택" content={
                <FileUploader
                  fileSetter={setThumbnailFile}
                />}
              />
            </LeftDiv>
            {/* 토론방을 설정하는 우측 컴포넌트 */}
            <RightDiv>
              <ModalSetting name="토론방 설정하기"
                content={
                  <>
                    <SettingInput
                      id="debateTitle"
                      className="thick"
                      placeholder="방 제목"
                      value={debateTitle}
                      onChange={onTitleChange}
                    />
                    <SettingComboBox
                      contentId="debateType"
                      value={debateType}
                      setter={setDebateType}
                      toggleWrong={toggleWrongDebateType}
                      name="토론 종류"
                      items={["정식 토론", "자유 토론"]}
                      description={
                        debateType === ""
                          ? "정식 토론 (3 vs 3) 및 자유 토론 (1 vs 1)"
                          : (debateType === "정식 토론"
                            ? "여러 차례 주장과 반박을 주고 받는 실제와 유사한 형태의 토론입니다"
                            : "정식 토론보다 짧은 자유로운 1 vs 1 형식의 토론입니다 (10분 내외)")}
                    />
                    <SettingInput
                      id="leftOpinion"
                      className="thick"
                      placeholder="주장1"
                      value={leftOpinion}
                      onChange={onLeftOpinionChange}
                    />
                    <SettingInput
                      id="rightOpinion"
                      className="thick"
                      placeholder="주장2"
                      value={rightOpinion}
                      onChange={onRightOpinionChange}
                    />
                    <SettingComboBox
                      contentId="selectedOpinion"
                      name="참여 주장"
                      setter={setSelectedOpinion}
                      items={["주장1", "주장2"]}
                      description="참여하고자 하는 주장을 선택해 주세요"
                      toggleWrong={toggleWrongSelectedOpinion}
                    />
                    <SettingComboBox
                      contentId="category"
                      name="카테고리"
                      setter={setCategory}
                      items={["일상", "음식", "영화/드라마", "연애",
                        "게임", "IT/전자제품", "스포츠", "패션", "공부", "음악"]}
                      description="카테고리에 맞추어 방을 표시합니다"
                      toggleWrong={toggleWrongCategory}
                    />
                  </>
                } />
              <ModalSetting name="해시 태그 (선택)" content={
                <SettingInput
                  id="hashTags"
                  placeholder="#해시태그1 #해시태그2"
                  value={hashTags}
                  onChange={onHashTagsChange}
                />
              } />
            </RightDiv>
          </CenterDiv>

          {/* 방 생성하기 버튼 */}
          <BottomDiv>
            <CreateRoomButton onClick={createRoom} />
          </BottomDiv>
        </Container>
      </ModalDiv>
    </ScaleWrapper>
  );
}

export default CreateRoomModal;

const ScaleWrapper = styled.div`
  transform: scale(0.7);
`