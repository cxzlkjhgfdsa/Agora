import { useCallback, useEffect, useRef, useState } from "react";
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
`;

const ComboBoxDiv = styled.div`
  // 크기 설정
  width: 100%;

  // Display
  display: flex;
  justify-content: space-between;
`;

function WebCam() {
  // 비디오 장치
  const [curVideoDevice, setCurVideoDevice] = useState(undefined);
  const [videoDevices, setVideoDevices] = useState([]);
  const [onVideo, setOnVideo] = useState(false);
  // 오디오 장치
  const [curAudioDevice, setCurAudioDevice] = useState(undefined);
  const [audioDevices, setAudioDevices] = useState([]);
  const [onAudio, setOnAudio] = useState(false);

  // 비디오 컴포넌트 Ref
  let videoRef = useRef(null);

  // 비디오 및 오디오 종료
  const terminateStream = useCallback(() => {
    // 기존 스트림 삭제
    const srcObject = videoRef?.current?.srcObject;
    if (srcObject) {
      srcObject.getTracks().forEach(track => {
        track.stop();
        srcObject.removeTrack(track);
      });
    }
  }, []);

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

  useEffect(() => {
    // 기존 스트림 삭제
    terminateStream();

    // 비디오나 오디오가 켜져 있다면 새로운 스트림으로 교체
    if (onVideo || onAudio) {
      let userMediaParams = {};
      if (onVideo) {
        userMediaParams = { ...userMediaParams, video: { deviceId: curVideoDevice } };
      }
      if (onAudio) {
        userMediaParams = { ...userMediaParams, audio: { deviceId: curAudioDevice } };
      }

      navigator.mediaDevices.getUserMedia(userMediaParams)
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [curVideoDevice, curAudioDevice, onVideo, onAudio]);

  return (
    <StyledWebCam>
      <StyledVideo id="webCam" ref={videoRef} />
      <ComboBoxDiv>
        <WebCamComboBox
          isDevice={true}
          contentId="cameraSelection"
          name="카메라"
          icon={CameraIcon}
          width="35%"
          items={videoDevices}
          setter={setCurVideoDevice}
        />
        <WebCamComboBox
          isDevice={true}
          contentId="microphoneSelection"
          name="마이크"
          icon={MicrophoneIcon}
          width="35%"
          items={audioDevices}
          setter={setCurAudioDevice}
        />
        <WebCamComboBox
          isDevice={false}
          contentId="deviceSetting"
          name="설정"
          icon={SawToothIcon}
          width="25%"
          items={[
            onVideo ? "카메라 끄기" : "카메라 켜기",
            onAudio ? "마이크 끄기" : "마이크 켜기"
          ]}
          customEvents={[
            setOnVideo,
            setOnAudio
          ]}
        />
      </ComboBoxDiv>
    </StyledWebCam>
  );
}

export default WebCam;