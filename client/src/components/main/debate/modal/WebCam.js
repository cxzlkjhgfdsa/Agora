import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import CameraIcon from "assets/icons/Camera.png";
import MicrophoneIcon from "assets/icons/Microphone.png";
import SawToothIcon from "assets/icons/SawTooth.png";
import WebCamComboBox from "./WebCamComboBox";

const StyledWebCam = styled.div`
  // 마진 및 패딩
  margin: 16px 0 0 0;
  padding: 0;
`;

const StyledVideo = styled.video`
  // 크기 설정
  width: 100%;
  aspect-ratio: 16 / 9;

  border: 2px solid #FFFFFF;
  border-radius: 10px;

  &.wrong {
    border: 2px solid #EF404A;
  }
`;

const ComboBoxDiv = styled.div`
  // 크기 설정
  width: 100%;
`;

function WebCam(props) {
  // 비디오 장치
  const [videoDevices, setVideoDevices] = useState([]);
  // 오디오 장치
  const [audioDevices, setAudioDevices] = useState([]);
  // 비디오 및 오디오 장치 가져오기
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        const localVideoDevices = [];
        const localAudioDevices = [];

        devices.forEach(item => {
          // 비디오
          if (item.kind === "videoinput" && item.deviceId !== "") {
            localVideoDevices.push(item);
          }
          // 오디오
          else if (item.kind === "audioinput" && item.deviceId !== "") {
            localAudioDevices.push(item);
          }
        });
        
        setVideoDevices(localVideoDevices);
        setAudioDevices(localAudioDevices);
      }).catch(error => {
        console.log(error);
      });
  }, []);

  let videoRef = useRef(null)

  //사용자 웹캠을 켜는 함수
  const cameraOn = (deviceId) => {
    navigator.mediaDevices.getUserMedia({
      video: { deviceId: deviceId },
      audio: true
    }).then((stream) => {
      //비디오 tag에 stream 추가
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();

      // 카메라 On 처리
      props.setOnCamera(true);
      videoRef?.current?.classList?.remove("wrong");
    }).catch((error) => {
      console.log(error);
    })
  };
  // 사용자 웹캠을 끄는 함수
  const cameraOff = () => {
    const srcObject = videoRef?.current?.srcObject;
    console.log(srcObject.getTracks());
    if (srcObject) {
      srcObject.getTracks().forEach(track => {
        track.stop();
      });
      console.log(srcObject.getTracks());

      // 카메라 Off 처리
      props.setOnCamera(false);
    }
  };

  const switchCam = () => {
    const s = videoRef?.current?.srcObject;
    if (!s || !s.active) {
      cameraOn();
    } else {
      cameraOff();
    }
  };

  return (
    <StyledWebCam>
      <button onClick={switchCam}>TEST</button>
      <StyledVideo id="webCam" ref={videoRef} />
      <ComboBoxDiv>
        <WebCamComboBox
          isDevice={true}
          contentId="cameraSelection"
          name="카메라"
          icon={CameraIcon}
          width="40%"
          items={videoDevices}
        />
        <WebCamComboBox
          isDevice={true}
          contentId="microphoneSelection"
          name="마이크"
          icon={MicrophoneIcon}
          width="40%"
          items={audioDevices}
        />
        <WebCamComboBox
          isDevice={false}
          contentId="deviceSetting"
          name="설정"
          icon={SawToothIcon}
          width="20%"
          items={[
            "카메라 On/Off",
            "마이크 On/Off"
          ]}
        />
      </ComboBoxDiv>
    </StyledWebCam>
  );
}

export default WebCam;