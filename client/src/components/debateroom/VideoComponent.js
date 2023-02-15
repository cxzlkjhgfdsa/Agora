// 기본 요소 import
import React, { Component } from 'react';
import { OpenVidu } from 'openvidu-browser';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import customAxios from 'utils/customAxios';

// 자식 component import
import './VideoComponent.css';
import SkipButton from './SkipButton';
import UserVideoComponent from 'components/video/UserVideoComponent';

class VideoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: undefined,
      roomToken: this.props.data.roomToken,
      role: this.props.data.role,
      nickname: this.props.data.nickname,
      leftUser: this.props.data.leftUser,
      rightUser: this.props.data.rightUser,
      leftOpinion: this.props.data.leftOpinion,
      rightOpinion: this.props.data.rightOpinion,
      leftStreamManager: undefined,
      rightStreamManager: undefined,
      phaseNum: this.props.data.phaseNum,
      phaseDetail: this.props.data.phaseDetail,
      publisher: undefined,
      subscribers: [],
      roomId: this.props.data.roomId,

      // SSE
      listening: false,
      meventSource: undefined,
    };

    this.leaveSession = this.leaveSession.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.joinListenerSession = this.joinListenerSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.getNicknameTag =this.getNicknameTag.bind(this);
    this.onLeftSpeaker = this.onLeftSpeaker.bind(this);
    this.onRightSpeaker = this.onRightSpeaker.bind(this);

    // phase toggle function
    this.changePhaseNum = this.changePhaseNum.bind(this);
    this.changePhaseDetail = this.changePhaseDetail.bind(this);
    this.handleSpeaker = this.handleSpeaker.bind(this);
    this.toggleSpeaker = this.toggleSpeaker.bind(this);

  }

  // 토론이 시작할 때,
  componentDidMount() {
    // 1. session 초기화
    window.addEventListener('beforeunload', this.onbeforeunload);

    // 2. SSE 연결
    let eventSource = undefined;

    if (!this.state.listening) {
      // listnening 연결 시작
      const baseURL = process.env.REACT_APP_SERVER_BASE_URL
      console.log("listening", this.state.listening);

      eventSource = new EventSource(`/v2/room/subscribe/${this.state.roomId}`)
      this.setState({
        meventSource: eventSource,
      }, () => {
        console.log("eventSource", eventSource)
      });
      // SSE 연결 완료 시,
      eventSource.onopen = event => {
        console.log("video component 연결 완료");
      };
      // SSE 데이터 수신 시,
      eventSource.onmessage = event => {
        console.log("onmessage");

        const SSEData = JSON.parse(event.data)
        
        // 이하 SSE 데이터 control
        console.log(SSEData)
        // 1. phase 신호 처리
        if (SSEData.event === "startDebate") {
          this.setState({
            phaseNum: SSEData.roomPhase,
            phaseDetail: SSEData.roomPhaseDetail,
          }, () => {
            this.toggleSpeaker();
            this.handleSpeaker();
          })
        }
        if (SSEData.event === "startSpeakPhase") {
          this.setState({
            phaseNum: SSEData.roomPhase,
            phaseDetail: SSEData.roomPhaseDetail,
          }, () => {
            this.toggleSpeaker();
            this.handleSpeaker();
          })
        }
        if (SSEData.event === "startVotePhase") {
          this.setState({
            phaseNum: SSEData.roomPhase,
            phaseDetail: SSEData.roomPhaseDetail,
          }, () => {
            this.toggleSpeaker();
            this.handleSpeaker();
          })
        }
        if (SSEData.event === "startVoteResultPhase") {
          this.setState({
            phaseNum: SSEData.roomPhase,
            phaseDetail: SSEData.roomPhaseDetail,
          }, () => {
            this.toggleSpeaker();
            this.handleSpeaker();
          })
        }
        // if (SSEData.event === "")
      };
      // SSE 에러 수신 시,
      eventSource.onerror = event => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };
      // listening 처리
      this.setState({
        listening: true,
      });
    }

    // 3. Openvidu connect
    // host & speaker;
    if (this.state.role === "host" | this.state.role === "speaker") {
      this.joinSession();
    }
    else {
      this.joinListenerSession();
    }
    // 4. Set speaker camera
    setTimeout(() => {
      this.handleSpeaker();
      this.toggleSpeaker();
    }, 500);
  };

  // 토론이 끝날 때,
  componentWillUnmount() {
    // 1. Session 초기화
    window.removeEventListener('beforeunload', this.onbeforeunload);
    // 2. SSE 종료
    if (this.meventSource !== undefined) {
      this.meventSource.close();
      console.log("eventsource closed")
    }
  }
  
  // 초기화 코드
  onbeforeunload(event) {
    this.leaveSession();
  }

  // 방송이 종료된 subscriber 제거
  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
        subscribers.splice(index, 1);
        this.setState({
            subscribers: subscribers,
        });
    }
  }

  // 토론 참여(host, speaker)
  joinSession() {
    // --- 1) Get an OpenVidu object ---
    this.OV = new OpenVidu();

    // --- 2) Init a session ---
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
              subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {
            // Remove the stream from 'subscribers' array
            this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
            console.warn(exception);
        });

        // reconnection events
        // Signaling plane breaks
        mySession.on('reconnecting', () => console.warn('Oops! Trying to reconnect to the session'));
        mySession.on('reconnected', () => console.log('Hurray! You successfully reconnected to the session'));
        mySession.on('sessionDisconnected', (event) => {
            if (event.reason === 'networkDisconnect') {
                console.warn('Dang-it... You lost your connection to the session');
            } else {
                // Disconnected from the session for other reason than a network drop
            }
        });
        // Media plane breaks
        mySession.on('exception', (event) => {
          if (event.name === 'ICE_CONNECTION_FAILED') {
            var stream = event.origin;
            console.warn('Stream ' + stream.streamId + ' broke!');
            console.warn('Reconnection process automatically started');
          }
          if (event.name === 'ICE_CONNECTION_DISCONNECTED') {
            var stream = event.origin;
            console.warn('Stream ' + stream.streamId + ' disconnected!');
            console.warn('Giving it some time to be restored. If not possible, reconnection process will start');
          }
        });      

        // --- 4) Connect to the session with a valid user token ---
        // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        mySession.connect(this.state.roomToken, { clientData: this.state.nickname })
          .then(async () => {

            // --- 5) Get your own camera stream ---
            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            let publisher = await this.OV.initPublisherAsync(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: '640x480', // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
              mirror: true, // Whether to mirror your local video or not
            });

            // --- 6) Publish your stream ---

            mySession.publish(publisher);

            // Obtain the current video device in use
            var devices = await this.OV.getDevices();
            var videoDevices = devices.filter(device => device.kind === 'videoinput');
            var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
            var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

            // Set the main video in the page to display our webcam and store our Publisher
            this.setState({
                currentVideoDevice: currentVideoDevice,
                publisher: publisher,
            });
          })
          .catch((error) => {
              console.log('There was an error connecting to the session:', error.code, error.message);
          });
      },
    );
  };
  
  // 토론 참여(viewer)
  joinListenerSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
          session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
              subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {

          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
          
        // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        mySession.connect(this.state.roomToken, { clientData: this.state.nickname })
          .then(async () => {

            // --- 5) Get your own camera stream ---
            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            let listner = await this.OV.initPublisherAsync(undefined, {
              audioSource: false, // The source of audio. If undefined default microphone
              videoSource: false, // The source of video. If undefined default webcam
              publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: false, // Whether you want to start publishing with your video enabled or not
              resolution: '640x480', // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });
            
            mySession.publish(listner);
          })
          .catch((error) => {
            console.log('There was an error connecting to the session:', error.code, error.message);
          });
      },
    );
  };

  // 토론 세션 종료
  leaveSession() {

    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      leftStreamManager: undefined,
      rightStreamManager: undefined,
      phaseNum: 0,
      phaseDetail: 0,
    });
  }

  // 닉네임 확인
  getNicknameTag(streamManager) {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }
  
  // pahse Detail에 따른 발언자 마이크 조정
  onLeftSpeaker(bool) {
    if (this.getNicknameTag(this.state.leftStreamManager) === this.state.nickname) {
      this.state.leftStreamManager.publishAudio(bool);
      // this.state.leftStreamManager.publishVideo(bool);
    }
    else {
      this.state.leftStreamManager.subscribeToAudio(bool);
      // this.state.leftStreamManager.subscribeToVideo(bool);
    }
  };

  onRightSpeaker(bool) {
    if (this.getNicknameTag(this.state.rightStreamManager) === this.state.nickname) {
      this.state.rightStreamManager.publishAudio(bool);
      // this.state.rightStreamManager.publishVideo(bool);
    }
    else {
      this.state.rightStreamManager.subscribeToAudio(bool);
      // this.state.rightStreamManager.subscribeToVideo(bool);
    }
  }

  toggleSpeaker() {
    if (this.state.rightStreamManager !== undefined & this.state.leftStreamManager !== undefined) {
      if (this.state.phaseDetail === 1) {
        this.onLeftSpeaker(true);
        this.onRightSpeaker(false);
      }
      else if (this.state.phaseDetail === 2) {
        this.onLeftSpeaker(false);
        this.onRightSpeaker(true);
      }
      else {
        this.onLeftSpeaker(false);
        this.onRightSpeaker(false);
      }
    }
  };
  
  // temp function to change phase;
  changePhaseNum() {
    this.setState({
      phaseNum: this.state.phaseNum === 3 ? 1 : this.state.phaseNum + 1
    }, () => {
      this.handleSpeaker();
    })
  }

  changePhaseDetail() {
    this.setState({
      phaseDetail: this.state.phaseDetail === 4 ? 1 : this.state.phaseDetail + 1
    }, () => {
      this.toggleSpeaker();
    })
  }

  handleSpeaker() {
    const index = this.state.phaseNum - 1
    if (this.state.publisher !== undefined) {
      if (this.getNicknameTag(this.state.publisher) === this.state.leftUser[index]) {
        console.log(this.getNicknameTag(this.state.publisher))
        this.setState({
          leftStreamManager: this.state.publisher
        })
      }
      else if (this.getNicknameTag(this.state.publisher) === this.state.rightUser[index]) {
        console.log(this.getNicknameTag(this.state.publisher))
        this.setState({
          rightStreamManager: this.state.publisher
        })
      }
    }
    this.state.subscribers.map((sub) => {
      if (this.getNicknameTag(sub) === this.state.leftUser[this.state.phaseNum - 1]) {
        console.log(this.getNicknameTag(sub))
        this.setState({
          leftStreamManager: sub
        })
      }
      else if (this.getNicknameTag(sub) === this.state.rightUser[this.state.phaseNum - 1]) {
        console.log(this.getNicknameTag(sub))
        this.setState({
          rightStreamManager: sub
        })
      }
    })
  }


  render() {
    return (
      <div>
        {this.state.session !== undefined ? (
          <div>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <OpinionDiv>
                  {this.state.leftOpinion}
                </OpinionDiv>
                {this.state.leftStreamManager !== undefined ? (
                  <VideoWrapper>
                    {this.state.phaseDetail === 1 
                      ? (
                        <div>
                          <SpeakingDiv>발언중</SpeakingDiv>
                          <SpeakingWrapper/>
                          {this.state.nickname === this.getNicknameTag(this.state.leftStreamManager)
                            ? (
                              <SkipButton roomId={this.state.roomId} />
                            ) 
                            : null}
                        </div>
                      )
                      : null
                    }
                    <UserVideoComponent streamManager={this.state.leftStreamManager} />
                  </VideoWrapper>
                ) : (
                  <EmptyVideoDiv>
                    토론 준비중
                  </EmptyVideoDiv>
                )}
              </Grid>
              <Grid item xs={6}>
                <OpinionDiv>
                  {this.state.rightOpinion}
                </OpinionDiv>
                {this.state.rightStreamManager !== undefined ? (
                  <VideoWrapper>
                    {this.state.phaseDetail === 2 
                      ? (
                        <div>
                          <SpeakingDiv>발언중</SpeakingDiv>
                          <SpeakingWrapper/>
                          {this.state.nickname === this.getNicknameTag(this.state.rightStreamManager)
                            ? (
                              <SkipButton roomId={this.state.roomId} />
                            ) 
                            : null}
                        </div>
                      )
                      : null
                    }
                    <UserVideoComponent streamManager={this.state.rightStreamManager} />
                  </VideoWrapper>
                ) : (
                  <EmptyVideoDiv>
                    토론 준비중
                  </EmptyVideoDiv>
                )}
              </Grid>
            </Grid>
          </div>
        ) : null}
        <Tempbutton onClick={this.changePhaseNum}>
          phaseNum:{this.state.phaseNum}
        </Tempbutton>
        <Tempbutton onClick={this.changePhaseDetail}>
          phaseDetail:{this.state.phaseDetail}
        </Tempbutton>
      </div>
    )
  }
}
// 대기 상태 박스
const EmptyVideoDiv = styled.div`
  // 박스 크기
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  border-radius: 18px;
  letter-spacing: -2px;
  
  // 배경 색상
  background-color: #f1f1f1;
  
  // font
  font-size: 36px;
  font-weight: bold;
  color: #bbbbbb;

  // 중앙배치
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  // 드래그 방지
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
`

const OpinionDiv = styled.div`
  // font
  font-size: 24px;
  font-weight: bold;
  color: #555555;
  // letter-spacing: -1px;

  // 문자 정렬
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px; 
`

const ButtonDiv = styled.div`
  margin-top: 30px;
`

const VideoWrapper = styled.div`
 position: relative;
`

const SpeakingWrapper = styled.div`
  position: absolute;
  z-index: 1;

  width: 98%;
  height: 99%;

  border: 5px solid #F6C026;
  border-radius: 12px;
`

const SpeakingDiv = styled.div`
  position: absolute;
  z-index: 2;

  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;

  background-color: #F6C026;
  color: white;

  font-size: 18px;
  font-weight: bold;
`

const Tempbutton = styled.button`
  margin-bottom: 100px;
`

export default VideoComponent