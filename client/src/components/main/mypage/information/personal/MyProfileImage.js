import { useRef } from "react";
import styled from "styled-components";

const StyledMyProfileImage = styled.div`
  // 크기 설정
  width: 100%;
`;

const ImageWrapper = styled.div`
  // 크기 설정
  min-width: 250px;
  width: 50%;
  aspect-ratio: 1 / 1;
`;
const Image = styled.img`
  // 크기 설정
  width: 100%;
  object-fit: contain;
`;
const ChangeButton = styled.button`
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

function MyProfileImage({ src, setSrc, setImgName, setImgFile }) {
  const fileUploaderRef = useRef();

  // CSS를 위해 'display: none' 되어 있는 컴포넌트 클릭을 위한 함수
  const onFileUploaderClick = () => {
    fileUploaderRef.current.click();
  };
  // 파일 선택 시 경로 변경 처리해주는 함수
  const onFileUploaderChange = (event) => {
    setImgName(event.target.files[0].name);
    setImgFile(event.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      setSrc(reader.result);
    };
  };

  return (<>
    <StyledMyProfileImage>
      <ImageWrapper>
        <Image src={src} />
      </ImageWrapper>
      <ChangeButton onClick={onFileUploaderClick}>
        파일 선택
      </ChangeButton>
    </StyledMyProfileImage>
    {/* 실제 Input */}
    <input
      type="file"
      ref={fileUploaderRef}
      onChange={onFileUploaderChange}
      style={{ display: "none" }}
    />
  </>);
}

export default MyProfileImage;