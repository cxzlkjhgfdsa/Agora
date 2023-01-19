import { createGlobalStyle } from "styled-components";

// 여러 페이지에서 사용될 디자인
const GlobalStyle = createGlobalStyle`
  
  // 전체 폰트, Inter 폰트 및 어두운 글자색
  * {
    // 폰트 설정, !important -> 이후에 선언한 CSS 무시
    font-family: 'Inter', san-serif !important;
    color: #4C4556;
  }

  // body 마진 제거
  body {
    margin: 0px;
  }

  // 상단바에 가리지 않게 상단 패딩
  main {
    padding-top: 64px; 
  }

  a {
    text-decoration-line: none;
  }
  
  // 배경색
  .bg-dark {
    background-color: #333333;
  }
  .bg-main {
    background-color: #F6C026;
  }

  // 글자색
  .font-light {
    color: #999999;
  }
  .font-dark {
    color: #4C4556;
  }

  // 테두리 색
  .border-light {
    border-color: #999999;
  }
  .border-dark {
    border-color: #333333;
  }
  .border-main {
    border-color: #F6C026;
  }
`;

export default GlobalStyle;