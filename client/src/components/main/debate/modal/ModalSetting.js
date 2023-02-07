import styled from "styled-components";

const StyledModalSetting = styled.div`
  // 크기 설정
  width: 90%;
  margin: 0 0 4% 0;
  padding: 0;
`;

const SettingTitleWrapper = styled.div`
  // display
  display: flex;
  align-items: center;
`;
const ColorBar = styled.div`
  // 크기 설정
  width: 6px;
  height: 1.5rem;

  // 색상
  background-color: #FFFFFF;

  // Display
  display: inline-block;
`;
const SettingTitle = styled.p`
  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.05rem;

  // 패딩, 마진 설정
  margin: 0 0 0 8px;
  padding: 0;
`;

const SettingContent = styled.div`
  // 마진, 패딩 초기화
  margin: 0;
  padding: 0;
`;

function ModalSetting(props) {
  return (
    <StyledModalSetting>
      {/* 설정명 */}
      <SettingTitleWrapper>
        <ColorBar />
        <SettingTitle>
          {props.name}
        </SettingTitle>
      </SettingTitleWrapper>
      
      {/* 설정 정보 */}
      <SettingContent>
        {props.content}
      </SettingContent>
    </StyledModalSetting>
  );
}

export default ModalSetting;