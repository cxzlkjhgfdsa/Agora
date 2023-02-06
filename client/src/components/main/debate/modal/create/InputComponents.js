import styled from "styled-components";

const StyledSettingInput = styled.input`
  // 크기 설정
  width: 100%;
  margin: 8px 0 0 0;
  padding: 8px;

  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1.2rem;
  &.thick {
    font-size: 1.2rem;
    padding: 12px 8px;
  }

  // placeholder 설정
  &::placeholder {
    color: #999999;
    font-size: 1.2rem;
  }

  // 디자인 설정
  border: 2px solid #FFFFFF;
  border-radius: 5px;
  background-color: #333333;
  &.wrong {
    border-color: #EF404A;
  }
`;
export function SettingInput(props) {
  return (
    <StyledSettingInput
      id={props.id}
      className={props.className}
      placeholder={props.placeholder}
      value={props.value}
    />
  );
};

const StyledComboBoxWrapper = styled.div`
  // 크기 설정
  width: 100%;
  margin: 8px 0 0 0;

  // Display
  display: flex;
  align-items: center;
`;
const StyledComboBox = styled.select`
  // 크기 설정
  width: 30%;
  padding: 12px 8px;

  // 글꼴 설정
  color: #999999;
  font-size: 1.2rem;
  letter-spacing: -0.05rem;
  
  // 디자인 설정
  border: 2px solid #FFFFFF;
  border-radius: 5px;
  background-color: #333333;
  &.wrong {
    border-color: #EF404A;
  }
`;
const StyledOption = styled.option`
  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1rem;
  letter-spacing: -0.05rem;
`;
const StyledDescription = styled.p`
  // 패딩 및 마진 설정
  padding: 0;
  margin: 0 0 0 8px;

  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1rem;
  letter-spacing: -0.05rem;
`;
export function SettingComboBox(props) {
  return (
    <StyledComboBoxWrapper>
      <StyledComboBox onChange={props.onChange} value={props.value}>
        {props.options.map((item) => (
          <StyledOption value={item.value} key={item.value}>
            {item.name}
          </StyledOption>
        ))}
      </StyledComboBox>
      <StyledDescription>
        {props.description}
      </StyledDescription>
    </StyledComboBoxWrapper>
  )
};