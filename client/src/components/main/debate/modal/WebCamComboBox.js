import styled from "styled-components";
import { useRef, useState } from "react";
import ArrowDownWhite from "assets/icons/Arrow_Down_White.png";

// 콤보박스 컴포넌트
const StyledSection = styled.section`
  // 크기 설정
  position: relative;
  display: inline-block;
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
  border: 1px solid #161616;
  border-radius: 10px;
  background-color: #161616;
  &.wrong {
    border-color: #EF404A;
  }

  cursor: pointer;
`;
const ButtonText = styled.p`
  // 크기 설정
  max-width: calc( 100% - 60px - 16px );
  margin: 0;
  padding: 0;

  // 글꼴 설정
  color: #999999;
  font-size: 1.2rem;
  letter-spacing: -0.05rem;

  // 글자수 초과 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.selected {
    color: #FFFFFF;
  }
`;
const Icon = styled.img`
  // 크기 설정
  width: 30px;
  height: 30px;
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

  border: 1px solid #161616;

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
  background-color: #161616;

  cursor: pointer;
`;

function WebCamComboBox(props) {
  const MainRef = useRef();
  const UlRef = useRef();
  const TextRef = useRef();

  // 선택된 장치 라벨 (p 태그에서 title 옵션 설정용)
  const [selectedLabel, setSelectedLabel] = useState("");

  const toggleHide = () => {
    if (UlRef) {
      UlRef?.current?.classList?.toggle("hide");
    }
    if (props?.toggleWrong) {
      props.toggleWrong();
    }
  };
  const addSelected = () => {
    TextRef?.current?.classList?.add("selected");
  };
  const selectOption = (event) => {
    if (props?.isDevice) {
      TextRef.current.textContent = event.target.textContent;
      addSelected();
      setSelectedLabel(event.target.textContent);
    } else {
      document.querySelector("#deviceSetting").classList.remove("wrong");
    }
    toggleHide();
  };
  
  return (
    <StyledSection style={{ width: props?.width }}>
      <MainButton id={props?.contentId} ref={MainRef} onClick={toggleHide}>
        <Icon src={props?.icon} />
        <ButtonText ref={TextRef} title={selectedLabel}>{props?.name}</ButtonText>
        <Icon src={ArrowDownWhite} />
      </MainButton>
      {props?.items?.length > 0
        ? <StyledUl className="hide" ref={UlRef}>
            {props?.items?.map((item, index) => (
              <StyledLi key={props.isDevice ? item.deviceId : item}>
                <ItemButton
                  onClick={(event) => {
                    selectOption(event);
                    if (props?.customEvents) {
                      props.customEvents[index](current => !current);
                    }
                    if (props?.setter) {
                      props.setter(item.deviceId);
                    }
                  }}>
                  {props.isDevice ? item.label : item}
                </ItemButton>
              </StyledLi>))}
        </StyledUl>
        : null}
    </StyledSection>
  );
};
export default WebCamComboBox;