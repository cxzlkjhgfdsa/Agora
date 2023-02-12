import styled from "styled-components";
import { useRef, useState } from "react";

// 파일 업로드 컴포넌트
const StyledFileUploader = styled.div`
  // 마진 및 패딩
  margin: 16px 0 0 0;
  padding: 0;
`;
const SelectFileButton = styled.button`
  // 마진 및 패딩
  margin: 0;
  padding: 4px 12px;

  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.05rem;

  // 디자인 설정
  border: 1px solid #F6C026;
  border-radius: 10px;
  background-color: #F6C026;

  cursor: pointer;
`;
const StyledDescription = styled.p`
  // 패딩 및 마진 설정
  max-width: 80%;
  padding: 0;
  margin: 0 0 0 12px;

  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1rem;
  letter-spacing: -0.05rem;

  // 글자수 초과 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: rtl;

  display: inline-block;
`;

function FileUploader(props) {
  const fileUploaderRef = useRef();
  const onFileUploaderClick = () => {
    fileUploaderRef.current.click();
  };
  const onFileUploaderChange = (event) => {
    if (props) {
      setImgPath(event.target.value);
      props.fileSetter(event.target.files);
    }
  };

  const [imgPath, setImgPath] = useState("");
  
  return (
    <>
      {/* input 태그 디자인 */}
      <StyledFileUploader>
        <SelectFileButton onClick={onFileUploaderClick}>
          파일 선택
        </SelectFileButton>
        <StyledDescription title={imgPath}>
          {imgPath === ""
            ? "토론방의 배경 이미지를 선택합니다"
            : imgPath}
        </StyledDescription>
      </StyledFileUploader>

      {/* 실제 Input */}
      <input
        type="file"
        ref={fileUploaderRef}
        onChange={onFileUploaderChange}
        style={{ display: "none" }}
      />
    </>
  );
}

export default FileUploader;