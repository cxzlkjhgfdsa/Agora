import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledWebCam = styled.div`
  // 마진 및 패딩
  margin: 16px 0 0 0;
  padding: 0;

  // 정렬
  display: flex;
  align-items: left;
`;

const StyledVideo = styled.video`
  // 크기 설정
  width: 85%;
  // aspect-ratio: 16 / 9;  
`;

function WebCam(props) {
  let videoRef = useRef(null)

  //사용자 웹캠에 접근
  const getUserCamera = () => {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then((stream) => {
      //비디오 tag에 stream 추가
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();

      props.setVideoRef(videoRef);
    }).catch((error) => {
      console.log(error);
    })
  };

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);
  
  return (
    <StyledWebCam>
      <StyledVideo ref={videoRef} />
    </StyledWebCam>
  );
}

export default WebCam;