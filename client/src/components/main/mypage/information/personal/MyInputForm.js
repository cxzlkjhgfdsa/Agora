import styled from "styled-components";

const StyledMyInputForm = styled.input`
  // 크기 설정
  width: 100%;
  margin: 0;
  padding: 8px;

  // 글꼴 설정
  font-size: 1.5rem;
  letter-spacing: -0.05rem;
  
  border: 1px solid #DCDCDC;
  border-radius: 10px;
`;

function MyInputForm({ dataId, value, setValue }) {
  const onChange = (event) => {
    setValue(event.target.value);
  }; 
  return (
    <StyledMyInputForm
      type="text"
      id={dataId}
      value={value}
      onChange={onChange}
      disabled
    />
  );
}

export default MyInputForm;