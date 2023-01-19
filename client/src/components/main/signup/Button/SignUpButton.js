// 스타일 컴포넌트 
import styled from "styled-components";

// SignUp 버튼 디자인
const SignUpButton = styled.div`
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
`


export default SignUpButton