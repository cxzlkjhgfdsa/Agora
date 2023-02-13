import styled from "styled-components";

const StyledMyInfoData = styled.div`
  // 크기 설정
  min-width: 400px;
  width: 100%;
  margin: 24px 0 0 0;

  // Display
  display: flex;
  align-items: center;
`;

const LabelWrapper = styled.div`
  // 크기 설정
  width: 25%;
  margin-right: 24px;

  text-align: left;

  // Display
  display: inline-block;
`;
const Label = styled.label`
  // 글꼴 설정
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.05rem;
`;

const MyDataFormWrapper = styled.div`
  // 크기 설정
  width: calc( 75% - 24px );

  // Display
  display: inline-block;
  align-items: center;
`;

function MyInfoData({ dataName, content }) {
  return (
    <StyledMyInfoData>
      <LabelWrapper>
        <Label>{dataName}</Label>
      </LabelWrapper>
      <MyDataFormWrapper>
        {content}
      </MyDataFormWrapper>
    </StyledMyInfoData>
  );
}

export default MyInfoData;