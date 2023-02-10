import styled from "styled-components";
import { useRef } from "react";
import ArrowDownWhite from "assets/icons/Arrow_Down_White.png";

// 콤보박스 컴포넌트
const StyledSection = styled.section`
  // 크기 설정
  width: 25%;
  position: relative;
`;
const MainButton = styled.button`
  // 크기 설정
  width: 100%;
  padding: 12px 8px;

  // Display
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  // 디자인 설정
  border: 1px solid #FFFFFF;
  border-radius: 5px;
  background-color: #333333;
  &.wrong {
    border-color: #EF404A;
  }

  cursor: pointer;
`;
const ButtonText = styled.span`
  // 글꼴 설정
  color: #999999;
  font-size: 1.2rem;
  letter-spacing: -0.05rem;

  &.selected {
    color: #FFFFFF;
  }
`;
const ArrowDownIcon = styled.img`
  // 크기 설정
  width: 25%;
`;
const StyledUl = styled.ul`
  // 높이 및 오버플로우 설정
  max-height: 200px;
  overflow: overlay;

  // 마진 및 패딩
  margin: 0;
  padding: 0;

  // 위치 설정
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;

  border: 1px solid #FFFFFF;

  &.hide {
    display: none;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #666666;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #333333;
    border-radius: 10px;
  }
`;
const StyledLi = styled.li`
  // 크기 설정
  width: 100%;
  list-style: none;
`;
const ItemButton = styled.button`
  // 크기 설정
  width: 100%;
  padding: 12px 8px;

  // 글꼴 설정
  color: #999999;
  font-size: 1.2rem;
  letter-spacing: -0.05rem;
  
  // 디자인 설정
  border: 0;
  background-color: #333333;

  cursor: pointer;
`;

function ComboBox(props) {
  const MainRef = useRef();
  const UlRef = useRef();
  const TextRef = useRef();

  const toggleHide = () => {
    UlRef.current.classList.toggle("hide");
    props?.toggleWrong();
  };
  const addSelected = () => {
    TextRef.current.classList.add("selected");
  };
  const selectOption = (event) => {
    TextRef.current.textContent = event.target.textContent;
    props.setter(event.target.textContent);
    toggleHide();
    addSelected();
  };

  return (
    <StyledSection>
      <MainButton id={props?.contentId} ref={MainRef} onClick={toggleHide}>
        <ButtonText ref={TextRef}>{props?.name}</ButtonText>
        <ArrowDownIcon src={ArrowDownWhite} />
      </MainButton>
      <StyledUl className="hide" ref={UlRef}>
        {props?.items?.map((item) => (
          <StyledLi key={item}>
            <ItemButton onClick={selectOption}>{item}</ItemButton>
          </StyledLi>))}
      </StyledUl>
    </StyledSection>
  );
};

// 콤보박스 설정 부분
const StyledComboBoxSetting = styled.div`
  // 크기 설정
  width: 100%;
  margin: 16px 0 0 0;

  // Display
  display: flex;
  align-items: center;
`;
const StyledDescription = styled.p`
  // 패딩 및 마진 설정
  padding: 0;
  margin: 0 0 0 12px;

  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1rem;
  letter-spacing: -0.05rem;
`;
function SettingComboBox(props) {
  return (
    <StyledComboBoxSetting>
      <ComboBox
        contentId={props?.contentId}
        name={props?.name}
        items={props?.items}
        setter={props?.setter}
        toggleWrong={props?.toggleWrong}
      />
      <StyledDescription>
        {props?.description}
      </StyledDescription>
    </StyledComboBoxSetting>
  )
};

export default SettingComboBox;