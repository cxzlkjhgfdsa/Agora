import { useState } from "react";
import { CloseButton, ModalDiv, ModalTitle } from "../ModalComponents";
import { BottomDiv, CenterDiv, Container, LeftDiv, RightDiv } from "../ModalContainer";
import ModalSetting from "../ModalSetting";
import CreateRoomButton from "./CreateRoomButton";
import { SettingComboBox, SettingInput } from "./InputComponents";

/*
  closeModalEvent: Modal 닫는 이벤트
  showType: 열띤 토론중 or 토론 대기중 등 모두보기를 누른 토론방의 상태 (debating, waiting)
*/
function CreateRoomModal({ closeModalEvent }) {
  const [debateType, setDebateType] = useState("none");
  const onChange = (event) => {
    setDebateType(event.target.value);
  };

  return (
    <ModalDiv>
      {/* 제목 이미지와 글자 넘겨주기 */}
      <ModalTitle text="토론방 생성하기" titleSize="2.5rem" />
      {/* Modal 닫는 이벤트 넘겨주기 */}
      <CloseButton onClick={closeModalEvent} />

      {/* 컨테이너 생성하여 메인 컴포넌트들 부착 */}
      <Container>
        <CenterDiv>
          {/* 캠 화면 설정, 해시 태그, 썸네일 선택 등 좌측 컴포넌트 */}
          <LeftDiv>
            <ModalSetting name="해시 태그 (선택)" content={
              <SettingInput placeholder="#해시태그1 #해시태그2" />
            } />
          </LeftDiv>
          {/* 토론방을 설정하는 우측 컴포넌트 */}
          <RightDiv>
            <ModalSetting name="토론방 설정하기" content={
              <>
                <SettingInput id="debateRoomTitle" className="thick" placeholder="방 제목" />
                <SettingComboBox id="debateType" value={debateType} onChange={onChange}
                  options={[
                    { value: "none", name: "토론 종류" },
                    { value: "formal", name: "정규 토론" },
                    { value: "short", name: "자유 토론" }
                  ]}
                  description="정규 토론 (3 vs 3) 및 자유 토론 (1 vs 1)"
                />
                <SettingInput id="leftOpinion" className="thick" placeholder="주장1" />
                <SettingInput id="rightOpinion" className="thick" placeholder="주장2" />
              </>
            } />
          </RightDiv>
        </CenterDiv>

        {/* 방 생성하기 버튼 */}
        <BottomDiv>
          <CreateRoomButton onClick={() => { console.log(123); }} />
        </BottomDiv>
      </Container>
    </ModalDiv>
  );
}

export default CreateRoomModal;