// 기본 요소 import
import React, { Component } from 'react';
import { OpenVidu } from 'openvidu-browser';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';

// 자식 component import
import './VideoComponent.css';
import UserVideoComponent from '../video/UserVideoComponent';
import getToken from './GetToken';
import DebaterBox from './DebaterBox';

import axios from 'axios';


class VideoComponent extends Component {
    constructor(props) {
        super(props);

        // These properties are in the state's component in order to re-render the HTML whenever their values change
        this.state = {
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            session: undefined,
            cons: ['A', 'B', 'C'],
            pros: ['D', 'E', 'F'],
            consOpinion: '라면이지 무슨소리냐',
            prosOpinion: '계란 없으면 라면 무슨 맛?',
            consStreamManager: undefined,  // Will be the one of the cons 'subscribers'
            prosStreamManager: undefined,  // Will be the one of the pros 'subscribers'
            publisher: undefined,
            subscribers: [],
            start: false,
            sessionNum: -1,

            // pros data
            role: this.props.data.role,
            isReady: this.props.data.isReady,
            isStart: this.props.data.isStart,
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.debateStart = this.debateStart.bind(this);
        this.getNicknameTag = this.getNicknameTag.bind(this);
        this.changeDebater = this.changeDebater.bind(this);
        this.joinListnerSession = this.joinListnerSession.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

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

                // --- 4) Connect to the session with a valid user token ---

                // Get a token from the OpenVidu deployment
                getToken(this.state.mySessionId).then((token) => {
                    // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                    mySession.connect(token, { clientData: this.state.myUserName })
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
                });
            },
        );
    }

    leaveSession() {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
            // 나갈 때 api 요청
            // axios({
            //   method: 'get',
            //   url: 'http://70.12.247.157:8080/api/v1/search/mian/hot5',
            // })
            // .then((response) => {
            //   console.log(response)
            // })
            // .catch((error) => {
            //   console.log(error)
            // })
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            consStreamManager: undefined,
            prosStreamManager: undefined,
            sessionNum: -1,
            start: false,
        });
    }
    
    // customization
    // get nickname
    getNicknameTag(streamManager) {
      // Gets the nickName of the user
      return JSON.parse(streamManager.stream.connection.data).clientData;
    }

    // to start debate
    debateStart() {
      this.setState({
        start: true,
      });
    }

    // change the debate person
    changeDebater() {
      const newNum = this.state.sessionNum + 1
      this.setState({
        sessionNum: newNum
      },() => {
        if (this.state.publisher !== undefined) {
          if (this.getNicknameTag(this.state.publisher) === this.state.cons[this.state.sessionNum]) {
            this.setState({
              consStreamManager: this.state.publisher
            }, () => {console.log(this.getNicknameTag(this.state.consStreamManager))});
          } else if (this.getNicknameTag(this.state.publisher) === this.state.pros[this.state.sessionNum]) {
            this.setState({
              prosStreamManager: this.state.publisher
            }, () => {console.log(this.getNicknameTag(this.state.prosStreamManager))});
          }
        }
        this.state.subscribers.map((sub) => {
          if (this.getNicknameTag(sub) === this.state.cons[this.state.sessionNum]) {
            this.setState({
              consStreamManager: sub
            }, () => {console.log(this.getNicknameTag(this.state.consStreamManager))});
          } else if (this.getNicknameTag(sub) === this.state.pros[this.state.sessionNum]) {
            this.setState({
              prosStreamManager: sub
            }, () => {console.log(this.getNicknameTag(this.state.prosStreamManager))});
          }
        })
      })
    }

    // join the listner Session

    joinListnerSession() {
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
              getToken(this.state.mySessionId).then((token) => {
                  // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
                  // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                  mySession.connect(token, { clientData: this.state.myUserName })
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
              });
          },
      );
  }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        const isStart = this.state.isStart

        return (
            <div>
                {this.state.session === undefined ? (
                    <div id="join">
                        <div id="join-dialog" className="jumbotron vertical-center">
                            <h1> Join a video session </h1>
                            <form className="form-group" onSubmit={this.joinSession}>
                                <p>
                                    <label>Participant: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> Session: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </p>
                                <p className="text-center">
                                    <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                                </p>
                            </form>
                            <div>
                              <input type='button' value="listen" onClick={this.joinListnerSession} />
                            </div>
                        </div>
                    </div>
                ) : null}
                  {this.state.session !== undefined ? (
                      <div>
                        <Grid container spacing={3}>
                          {this.state.prosStreamManager !== undefined ? (
                            <Grid item xs={12} md={6}>
                              <OpinionDiv>
                                {this.state.prosOpinion}
                              </OpinionDiv>
                              <UserVideoComponent
                                streamManager={this.state.prosStreamManager}
                                />
                              <DebaterBox data={this.state.pros} sessionNum={this.state.sessionNum} />
                            </Grid>
                          ) : (
                            <Grid item xs={12} md={6}>
                              <OpinionDiv>
                                {this.state.prosOpinion}
                              </OpinionDiv>
                              <EmptyVideoDiv>
                                토론 준비중
                              </EmptyVideoDiv>
                              <DebaterBox data={this.state.pros} sessionNum={this.state.sessionNum} />
                            </Grid>
                          )}
                          {this.state.consStreamManager !== undefined ? (
                            <Grid item xs={12} md={6}>
                              <OpinionDiv>
                                {this.state.consOpinion}
                              </OpinionDiv>
                              <UserVideoComponent
                                streamManager={this.state.consStreamManager} />
                              <DebaterBox data={this.state.cons} sessionNum={this.state.sessionNum} />
                            </Grid>
                          ) : (
                            <Grid item xs={12} md={6}>
                              <OpinionDiv>
                                {this.state.consOpinion}
                              </OpinionDiv>
                              <EmptyVideoDiv>
                                토론 준비중
                              </EmptyVideoDiv>
                              <DebaterBox data={this.state.cons} sessionNum={this.state.sessionNum} />
                            </Grid>
                            )}
                          </Grid>
                          <ButtonDiv>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                  <button
                                      className="btn btn-large btn-danger"
                                      id="buttonLeaveSession"
                                      onClick={this.leaveSession}
                                      >
                                          leave Session
                                      </button>
                                </Grid>
                                <Grid item xs={4}>
                                  <button
                                    type="button"
                                    id="buttonDebateStart"
                                    onClick={this.debateStart}
                                    >
                                      Start Debate
                                    </button>
                                </Grid>
                                <Grid item xs={4}>
                                  <button
                                    id="buttonChangeSession"
                                    onClick={this.changeDebater}
                                    >
                                      Change Debater
                                    </button>
                                </Grid>
                              </Grid>
                          </ButtonDiv>
                      </div>
                  ) : null}
            </div>
        );
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


export default VideoComponent;
