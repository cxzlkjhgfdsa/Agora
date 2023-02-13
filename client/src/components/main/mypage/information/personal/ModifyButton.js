import styled from "styled-components";

const StyledModifyButton = styled.button`
  // 크기 설정
  min-width: 200px;
  width: 50%;
  max-height: 60px;

  margin: 36px 25% 12px 25%;
  padding: 8px 0;

  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.05rem;

  // 디자인
  border: 1px solid #F6C026;
  border-radius: 20px;
  background-color: #F6C026;

  cursor: pointer;
`;

function ModifyButton({ onClick }) {
  return (
    <StyledModifyButton onClick={onClick}>
      수정하기
    </StyledModifyButton>
  );
}

export default ModifyButton;