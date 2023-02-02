import DebateListModal from "components/main/debate/modal/DebateListModal";
import { useState } from "react";

function TestMoadlPage() {
  const [isOnModal, setIsOnModal] = useState(false);
  const openModal = () => {
    setIsOnModal(true);
  };

  return (
    <>
      {isOnModal
        ? <DebateListModal />
        : <button onClick={openModal}>모달 켜기</button>}
    </>
  );
}

export default TestMoadlPage;