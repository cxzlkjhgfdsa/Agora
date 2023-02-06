import DebateListModal from "components/main/debate/modal/DebateListModal";
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
    </>
  );
}

export default TestMoadlPage;