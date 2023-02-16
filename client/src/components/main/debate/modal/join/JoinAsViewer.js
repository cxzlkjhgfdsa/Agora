import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { debateUserRoleState } from "stores/joinDebateRoomStates";
import { joinModalState, showAllModalState } from "stores/ModalStates";
import { userInfoState } from "stores/userInfoState";
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
  const userInfo = useRecoilValue(userInfoState);

  const navigate = useNavigate();
  const resetJoinModalState = useResetRecoilState(joinModalState);
  const resetShowAllModalState = useResetRecoilState(showAllModalState);

  // 다음 페이지로 보내기 위한 사용자의 역할 setter
  const setDebateUserRole = useSetRecoilState(debateUserRoleState);

  const join = useCallback(async () => {
    // 로그인 여부 확인
    if (userInfo?.isLoggedIn !== true) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
  
    let choice = window.confirm("관전에 참여 하시겠습니까?");
    if (choice === false) return;

    setDebateUserRole("viewer");
    resetJoinModalState();
    resetShowAllModalState();
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