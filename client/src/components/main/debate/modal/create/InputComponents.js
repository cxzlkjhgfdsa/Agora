import styled from "styled-components";

// Text Input Field
const StyledSettingInput = styled.input`
  // 크기 설정
  width: 100%;
  margin: 16px 0 0 0;
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

  &:focus {
    outline: none;
  }
`;
export function SettingInput(props) {
  return (
    <StyledSettingInput
      id={props.id}
      className={props.className}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
};