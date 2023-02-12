import styled from "styled-components";
import Close from "assets/icons/Close.png";

// Modal 창
export const ModalDiv = styled.div`
  // 크기 설정
  min-width: 900px;
  width: calc( 90% - 10% );
  ${({ hasDefaultHeight }) => hasDefaultHeight
    ? "height: calc( 86% - 4% );"
    : ""}
  margin: 0;
  padding: 2% 5%;

  // 위치 설정
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  // 배경 설정
  background-color: #333333;

  // 테두리 설정
  border-radius: 20px;
`;

// 닫기 버튼
const StyledCloseButton = styled.img`
  width: 46px; height: 46px;
  position: absolute;
  top: 15px;
  right: 15px;

  cursor: pointer;
  
  border-radius: 2rem;
`;
export function CloseButton({ onClick }) {
  return (
    <StyledCloseButton src={Close} onClick={onClick} />
  );
};

// 제목 부분
const StyledModalTitle = styled.div`
  // 크기 설정
  width: 100%;
  height: 15%;
  margin: 0;
`;
const TitleWrapper = styled.div`
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
  font-size: ${({ titleSize }) => titleSize ? titleSize : "4rem"};
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.05rem;
`;
const Description = styled.p`
  margin: 0;

  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1.2rem;
  text-align: center;
  letter-spacing: -0.05rem;

  display: block;
`;

export function ModalTitle({ image, text, description, titleSize }) {
  return (
    <StyledModalTitle>
      <TitleWrapper>
        {image ? <TitleIcon src={image} /> : null}
        <Title titleSize={titleSize}>{text}</Title>
      </TitleWrapper>
      {description ? <Description>{description}</Description> : null}
    </StyledModalTitle>
  );
};

// Modal 흰색 세로선
const StyledModalColorBar = styled.div`
  width: 8px;
  height: 70%;
  background-color: #FFFFFF;
`;
export function ModalColorBar() {
  return (
    <StyledModalColorBar />
  );
};