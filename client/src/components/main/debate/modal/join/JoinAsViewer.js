import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { debateUserRoleState } from "stores/joinDebateRoomStates";
import { joinModalState } from "stores/ModalStates";
import styled from "styled-components";
import customAxios from "utils/customAxios";

const StyledJoinAsViewer = styled.div`
  // 크기 설정
  width: 100%;
  margin: 16px 0 0 0;
  padding: 0;

  // Display
  display: flex;
  justify-content: center;
`;
const JoinAsViewerButton = styled.button`
  // 크기 설정
  width: 50%;
  aspect-ratio: 3 / 1;

  // 글꼴 설정
  color: #FFFFFF;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.05rem;

  // 디자인
  background-color: #161616;
  border-color: #161616;
  border-radius: 20px;

  cursor: pointer;
`;

function JoinAsViewer({ roomId }) {

  const axios = customAxios();
  const navigate = useNavigate();
  const resetJoinModalState = useResetRecoilState(joinModalState);

  // 다음 페이지로 보내기 위한 사용자의 역할 setter
  const setDebateUserRole = useSetRecoilState(debateUserRoleState);

  const join = useCallback(async () => {
  
    let choice = window.confirm("관전에 참여 하시겠습니까?");
    if (choice === false) return;

    setDebateUserRole("viewer");
    resetJoinModalState();
    navigate("/debate/room/" + roomId);
    
  }, []);

  return (
    <StyledJoinAsViewer>
      {/* 관전하기 버튼 */}
      <JoinAsViewerButton onClick={join}>
        관전하기
      </JoinAsViewerButton>
    </StyledJoinAsViewer>
  );
}

export default JoinAsViewer;