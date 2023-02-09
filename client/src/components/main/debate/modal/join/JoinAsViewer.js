import styled from "styled-components";

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

function JoinAsViewer() {
  const join = (event) => {
    let choice = window.confirm("관전에 참여 하시겠습니까?");
    if (choice === true) {
      alert("고고씽");
    }
  };

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