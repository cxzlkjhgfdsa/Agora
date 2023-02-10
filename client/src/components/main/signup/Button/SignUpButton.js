// 스타일 컴포넌트 
import styled from "styled-components";

// SignUp 버튼 디자인
const ButtonBox = styled.div`
  // 글자 크기 및 자간 설정
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: -0.05rem;
  
  // 중앙 정렬
  margin: auto;
  
  // 내부 글자 중앙 정렬
  display: flex;
  align-items: center;
  justify-content: center;
  
  

  // 둥근 테두리
  border-radius: 10px;

  // 호버링 시 커서 모양
  cursor: pointer;

  // 버튼 크기:
  width: 700px;
  height: 90px;

  // 버튼 색상
  background-color: #F6C026;
  border-color: #F6C026;
  color: #FFFFFF;

  // 그림자 설정
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.25)
`


export const ProgressButton = styled(ButtonBox)`
`

export const CheckButton = styled(ButtonBox)`
  // 버튼 크기
  width: 130px;
  height: 90px;

  // 글자 크기
  font-size: 25px;
`

export const UploadButton = styled(ButtonBox)`
  // 버튼 크기
  width: 130px;
  height: 58px;

  // 글자 크기
  font-size: 25px;
  font-weight: normal;
`

