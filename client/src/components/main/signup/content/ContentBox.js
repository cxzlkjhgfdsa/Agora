import styled from "styled-components";

// 글자만 작성하는 경우
const SubText = styled.div`
  color: #999999;
  font-size: 15px;
`

// 기본 사이즈 입력칸 
const TextBox = styled(SubText)`
  // 입력칸 크기
  width: 700px;
  height: 90px;

  // 입력칸 외곽선 
  border: 3px solid #D9D9D9;
  border-radius: 5px;

  // 텍스트 정렬
  display: flex;
  align-items: center;
  padding-inline-start: 17px;
`

const MiddleTextBox = styled(TextBox)`
  // 입력칸 크기
  width: 550px;
`

const SmallTextBox = styled(TextBox)`
  // 입력칸 크기
  width: 220px;
`

const FileTextBox = styled(TextBox)`
  // 입력칸 크기
  width: 429px;
  height: 58px;
`

export {SubText, TextBox, MiddleTextBox, SmallTextBox, FileTextBox}