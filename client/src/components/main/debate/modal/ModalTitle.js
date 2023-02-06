import styled from "styled-components";

const StyledModalTitle = styled.div`
  // 크기 설정
  width: 100%;
  height: 15%;
  margin: 0;

  // display
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TitleIcon = styled.img`
  // 크기 설정
  width: 50px;
  height: 70px;
  margin-right: 16px;

  object-fit: contain;
`;
const Title = styled.span`
  // 글꼴 설정
  color: #FFFFFF;
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.05rem;
`;

function ModalTitle({ image, text }) {
  return (
    <StyledModalTitle>
      <TitleIcon src={image} />
      <Title>{text}</Title>
    </StyledModalTitle>
  );
}

export default ModalTitle;