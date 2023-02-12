import CreateRoomModal from "components/main/debate/modal/create/CreateRoomModal";
import JoinRoomModal from "components/main/debate/modal/join/JoinRoomModal";
import DebateListModal from "components/main/debate/modal/showall/DebateListModal";
import { useState } from "react";

function TestMoadlPage() {
  const [isOnModal, setIsOnModal] = useState(false);
  const openModal = () => {
    setIsOnModal(true);
  };
  const closeModal = () => {
    setIsOnModal(false);
  };

  const [isOnWaitModal, setIsOnWaitModal] = useState(false);
  const openWaitModal = () => {
    setIsOnWaitModal(true);
  };
  const closeWaitModal = () => {
    setIsOnWaitModal(false);
  };

  const [isOnCreateModal, setIsOnCreateModal] = useState(false);
  const openCreateModal = () => {
    setIsOnCreateModal(true);
  };
  const closeCreateModal = () => {
    setIsOnCreateModal(false);
  };

  const [isOnJoinModal, setIsOnJoinModal] = useState(false);
  const openJoinModal = () => {
    setIsOnJoinModal(true);
  };
  const closeJoinModal = () => {
    setIsOnJoinModal(false);
  };

  return (
    <>
      {isOnModal
        ? <DebateListModal closeModalEvent={closeModal} debateState="debating" />
        : <button onClick={openModal}>열띤 토론중 모달 켜기</button>
      }
      {isOnWaitModal
          ? <DebateListModal closeModalEvent={closeWaitModal} debateState="waiting" />
          : <button onClick={openWaitModal}>토론 대기중 모달 켜기</button>
      }
      {isOnCreateModal
          ? <CreateRoomModal closeModalEvent={closeCreateModal} />
          : <button onClick={openCreateModal}>방 생성 모달 켜기</button>
      }
      {isOnJoinModal
          ? <JoinRoomModal closeModalEvent={closeJoinModal} roomInfo={{roomName: "라면에 하나만 넣는다면?"}} />
          : <button onClick={openJoinModal}>방 참여 모달 켜기</button>
      }
    </>
  );
}

export default TestMoadlPage;