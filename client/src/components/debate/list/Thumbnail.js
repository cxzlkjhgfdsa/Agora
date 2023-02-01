import styled from "styled-components";

import People from "assets/icons/People.png";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import NoImageAvailable from "assets/icons/No_Image_Available.png";
import RoomInfo from "./RoomInfo";

// a 태그 그림에 딱 맞게
const StyledLink = styled(Link)`
  width: 0; height: 0;
`;
const Wrapper = styled.div`
  ${({ type }) => type === "hot-thumbnail"
    ? "width: 576px; height: 324px;"
    : "width: 400px; height: 225px;"}
  position: relative;
`;
const FakeDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;

  position: absolute;
  top: 0;
  left: 0;
`;
const StyledThumbnail = styled.div`
  // 크기 설정
  width: 100%;
  height: 100%;

  // 위치 설정
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;

  &:hover {
    top: -75px;
    width: 800px;
    height: 450px;
    z-index: 1;
    transition: 0.5s;
    transition-delay: 500ms;
  }
  transition: 0.5s;
`;

const StyledBackgroundImage = styled.img`
  // 크기 설정
  width: 100%;
  height: 100%;

  // 위치 설정
  position: absolute;
  top: 0;
  left: 0;

  // fit
  object-fit: contain;                                                                                                                                                                               ;
`;
const HalfClearBlack = styled.div`
  // 크기 설정
  width: 100%;
  height: 100%;
    
  // 검은색 배경에 투명도 50%
  background-color: #000000;
  opacity: 50%;

  // 위치 설정
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.p`
  // 크기 설정
  width: 90%;
  
  // 마진 설정
  margin: 8px 5%;

  // 글꼴 설정
  color: #FFFFFF;
  text-align: center;
  ${({ type }) => type === "hot-thumbnail"
  ? "font-size: 2.4rem;"
  : "font-size: 1.8rem;"};
  font-weight: 700;
  letter-spacing: -0.05rem;

  // 초과 글자 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  // 위치 설정
  position: absolute;
  top: 0;
  left: 0;
`;

const Center = styled.div`
  // 크기 설정
  width: 100%;
  ${({ type }) => type === "hot-thumbnail"
  ? "height: calc( 100% - 69px - 37px ); margin: 69px 0 37px 0;"
  : "height: calc( 100% - 54px - 32px ); margin: 54px 0 32px 0;"}

  // display 설정
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: -0.05rem;

  // 위치 설정
  position: absolute;
  left: 0;
  bottom: 0;
`;
const Opinion = styled.p`
  width: calc( 45% - 16px );
  margin: 0;
  padding: 0 8px;

  // 글꼴 설정
  color: #FFFFFF;
  text-align: center;
  ${({ type }) => type === "hot-thumbnail"
  ? "font-size: 2rem;"
  : "font-size: 1.5rem;"}

  // 글자 초과 처리
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Versus = styled.p`
  margin: 0;

  // 글꼴 설정
  color: #FFFFFF;
  text-align: center;
  ${({ type }) => type === "hot-thumbnail"
  ? "font-size: 2rem;"
  : "font-size: 1.25rem;"}
  font-weight: 700;
`;

// 하단부 Wrapper, 시청자수 및 페이즈 정보
const Footer = styled.div`
  // 크기 설정
  width: calc( 100% - 16px );

  // 패딩 설정
  padding: 8px;

  // display 설정
  display: flex;
  justify-content: space-between;
  align-items: center;

  // 위치 설정
  position: absolute;
  left: 0;
  bottom: 0;
`;
// Wrapper에 들어갈 정보 (시청자수 또는 페이즈 정보)
const FooterInfo = styled.div`
  // 수직 가운데 정렬
  display: flex;
  align-items: center;
`;
// 시청자 아이콘
const ViewersIcon = styled.img`
  ${({ type }) => type === "hot-thumbnail"
    ? "width: 20px; height: 20px;"
    : "width: 15px; height: 15px;"}
`;
// Footer에 들어갈 정보의 글꼴
const StyledFont = styled.span`
  // 글꼴 설정
  color: #FFFFFF;
  ${({ type }) => type === "hot-thumbnail"
    ? "font-size: 1rem;"
    : "font-size: 0.75rem;"}
`;

function Thumbnail({ type, content }) {
  const roomId = content.room_id;

  const title = content.room_name;

  const leftOpinion = content.room_opinion_left;
  const rightOpinion = content.room_opinion_right;

  const viewers = content.room_watch_cnt;
  const phases = content.room_phase;
  const minutes = content.room_phase_current_time_minute;
  const seconds = content.room_phase_current_time_second;

  const imageUrl = content.room_thumbnail_url
    ? content.room_thumbnail_url
    : NoImageAvailable;

  const to_02d = (value) => value < 10 ? "0" + value : value;

  // 타이머
  const interval = useRef(null);
  const [secondsState, setSecondsState] = useState(seconds);
  const [minutesState, setMinutesState] = useState(minutes);
  useEffect(() => {
    interval.current = setInterval(() => {
      if (secondsState === 59) {
        setMinutesState(current => current + 1);
        setSecondsState(0);
      } else {
        setSecondsState(current => current + 1);
      }
    }, 1000);
    return () => clearInterval(interval.current);
  }, [secondsState]);

  return (
    <Wrapper type={type}>
      <StyledLink to={`/debate/room/${roomId}`}>
        <StyledThumbnail>
          {/* 배경 이미지 및 반투명 검은 배경 */}
          <FakeDiv />
          <StyledBackgroundImage src={imageUrl} />
          <HalfClearBlack />
        
          {/* 방제 */}
          <Title type={type} title={title}>
            {title}
          </Title>

          {/* 중앙부 대립 의견 */}
          <Center type={type}>
            {/* 왼쪽 의견 */}
            <Opinion type={type} title={leftOpinion}>{leftOpinion}</Opinion>

            {/* VS */}
            <Versus type={type}>VS</Versus>

            {/* 오른쪽 의견 */}
            <Opinion type={type} title={rightOpinion}>{rightOpinion}</Opinion>
          </Center>
      
          {/* 하단부 시청자 및 페이즈 정보 */}
          <Footer>
            {/* 시청자 */}
            <FooterInfo>
              <ViewersIcon type={type} src={People} />
              <StyledFont type={type}>{viewers}</StyledFont>
              <StyledFont type={type}>명</StyledFont>
            </FooterInfo>

            {/* 페이즈 */}
            <FooterInfo>
              <StyledFont type={type}>{phases}</StyledFont>
              <StyledFont type={type}>&nbsp;페이즈&nbsp;</StyledFont>
              <StyledFont type={type}>{to_02d(minutesState)}</StyledFont>
              <StyledFont type={type}>&nbsp;:&nbsp;</StyledFont>
              <StyledFont type={type}>{to_02d(secondsState)}</StyledFont>
            </FooterInfo>
          </Footer>
        </StyledThumbnail>
        <RoomInfo content={content} />
      </StyledLink>
    </Wrapper>
  );
}

export default Thumbnail;