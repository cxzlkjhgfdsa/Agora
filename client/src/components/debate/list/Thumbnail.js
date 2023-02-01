import styled from "styled-components";

import People from "assets/icons/People.png";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";

import NoImageAvailable from "assets/icons/No_Image_Available.png";
import RoomInfo from "./RoomInfo";
import { debounce } from "lodash";

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
const ThumbnailInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;

  position: absolute;
  top: 0;
  left: 0;

  ${({ zIndex }) => zIndex
    ? "z-index: 1;"
    : ""}

  // // 좌측 상단 컴포넌트
  // &.hot-left-top:hover, &.left-top:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  // }

  // // 상단 컴포넌트
  // &.hot-center-top:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   left: -112px;
  // }
  // &.center-top:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   left: -200px;
  // }

  // // 우측 상단 컴포넌트
  // &.hot-right-top:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   left: -224px;
  // }
  // &.right-top:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   left: -400px;
  // }

  // // 좌측 컴포넌트
  // &.hot-left-middle:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   top: -63px;
  // }
  // &.left-middle:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   top: -112.5px;
  // }

  // // 중앙 컴포넌트
  // &.hot-center-middle:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   top: -63px;
  //   left: -112px;
  // }
  // &.center-middle:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   top: -112.5px;
  //   left: -200px;
  // }

  // // 우측 컴포넌트
  // &.hot-right-middle:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   top: -63px;
  //   left: -224px;
  // }
  // &.right-middle:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   top: -112.5px;
  //   left: -400px;
  // }

  // // 좌측 하단 컴포넌트
  // &.hot-left-bottom:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   top: -126px;
  // }
  // &.left-bottom:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   top: -225px;
  // }

  // // 중앙 하단 컴포넌트
  // &.hot-center-bottom:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   top: -126px;
  //   left: -112px;
  // }
  // &.center-bottom:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   top: -225px;
  //   left: -200px;
  // }

  // // 우측 하단 컴포넌트
  // &.hot-right-bottom:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   top: -126px;
  //   left: -224px;
  // }
  // &.right-bottom:hover {
  //   width: 800px; height: 450px; transition: 0.5s;
  //   top: -225px;
  //   left: -400px;
  // }

  transition: 0.5s;
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

  // display 설정, 수직 가운데 정렬
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: -0.05rem;

  // 글자 크기 설정
  ${({ type }) => type === "hot-thumbnail"
    ? "font-size: 2rem;"
    : "font-size: 1.5rem;"}

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

  // 글자 초과 처리
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Versus = styled.p`
  margin: 0;

  // 글꼴 설정
  color: #FFFFFF;
  text-align: center;
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

function Thumbnail({ type, content, className }) {
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

  // 호버 체크
  const [isHovered, setIsHovered] = useState(false);
  
  // 토론방 상세정보 부착 및 탈착
  const expand = () => {
    setStyle(getExpandStyle());
    attachZIndex();
    setIsHovered(true);
  };
  const reduce = () => {
    if (type === "hot-thumbnail") {  // 화제의 토픽 썸네일
      setStyle({ width: "576px", height: "324px", top: "0", left: "0" });
    } else {  // 일반 썸네일
      setStyle({ width: "400px", height: "225px", top: "0", left: "0" });
    }
    detachZIndex();
    setIsHovered(false);
  };

  // 토론방 상세정보 탈착 시 z-index가 바로 해제되어 다른 컴포넌트와 겹치는 현상 방지
  const [zIndex, setZIndex] = useState(false);
  const attachZIndex = () => {
    setZIndex(true);
  };
  const detachZIndex = debounce(() => {
    setZIndex(false);
  }, 500);

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

  // 절대좌표를 구해 호버 방향 정하기
  const locRef = useRef();
  const hoverRef = useRef();

  // CSS 설정
  const setStyle = useCallback((style) => {
    if (style.width) {
      hoverRef.current.style.width = style.width;
    }
    if (style.height) {
      hoverRef.current.style.height = style.height;
    }
    if (style.top) {
      hoverRef.current.style.top = style.top;
    }
    if (style.left) {
      hoverRef.current.style.left = style.left;
    }
  }, [hoverRef]);

  // 확장할 방향의 스타일 구하기
  const getExpandStyle = useCallback(() => {
    // 컴포넌트 상하좌우
    const loc = locRef.current.getBoundingClientRect();
    const [top, bottom, left, right] = [
      loc.top,
      loc.top + hoverRef.current.offsetHeight,
      loc.left,
      loc.left + hoverRef.current.offsetWidth
    ];

    // Viewport Max-width, Max-height
    const [minWidth, maxWidth, minHeight, maxHeight] = [
      0, window.innerWidth,
      64, window.innerHeight  // 헤더 높이가 최소
    ];
    
    // 공통 hover 스타일
    const commonStyle = { width: "800px", height: "450px", transition: "0.5s" };
    console.log(top, bottom, left, right);
    console.log(minWidth, maxWidth);
    console.log(minHeight, maxHeight);
    // 화제의 토픽
    if (type === "hot-thumbnail") {
      // 중앙에서 확장 가능 여부 판단
      if (top - 63 >= minHeight && left - 112 >= minWidth && right + 112 <= maxWidth) {
        return { ...commonStyle, top: "-63px", left: "-112px" };
      } else if (left - 112 < minWidth) {
        return { ...commonStyle, top: "-63px" };
      } else if (right + 112 > maxWidth) {
        return { ...commonStyle, top: "-63px", left: "-224px" };
      }
    }
    // 일반 주제
    else {
      // 중앙 확장
      if (top - 112.5 >= minHeight && bottom + 112.5 <= maxHeight
        && left - 200 >= minWidth && right + 200 <= maxWidth) {
        return { ...commonStyle, top: "-112.5px", left: "-200px" };
      }
      // 좌측 상단 확장
      else if (right + 200 <= maxWidth && bottom + 112.5 <= maxHeight
        && left - 200 < minWidth && top - 112.5 < minHeight) {
        return commonStyle;
      }
      // 좌측 하단 확장
      else if (right + 200 <= maxWidth && top - 112.5 >= minHeight
        && left - 200 < minWidth && bottom + 112.5 > maxHeight) {
        return { ...commonStyle, top: "-225px" };
      }
      // 우측 상단 확장
      else if (left - 200 >= minWidth && bottom + 112.5 <= maxHeight
        && right + 200 > maxWidth && top - 112.5 < minHeight) {
        return { ...commonStyle, left: "-400px" };
      }
      // 우측 하단 확장
      else if (left - 200 >= minWidth && top - 112.5 >= minHeight
        && right + 200 > maxWidth && bottom + 112.5 > maxHeight) {
        return { ...commonStyle, top: "-225px", left: "-400px" };
      }
      // 좌측 확장
      else if (right + 200 <= maxWidth && left - 200 < minWidth) {
        return { ...commonStyle, top: "-112.5px" };
      }
      // 상단 확장
      else if (bottom + 112.5 <= maxHeight && top - 112.5 < minHeight) {
        return { ...commonStyle, left: "-200px" };
      }
      // 우측 확장
      else if (left - 200 >= minWidth && right + 200 > maxWidth) {
        return { ...commonStyle, top: "-112.5px", left: "-400px" };
      }
      // 하단 확장
      else if (top - 112.5 >= minWidth && bottom + 112.5 > maxHeight) {
        return { ...commonStyle, top: "-225px", left: "-200px" };
      }
    }

    return {};
  }, [locRef, hoverRef]);

  return (
    <Wrapper type={type} ref={locRef}>
      <StyledLink to={`/debate/room/${roomId}`}>
        <ThumbnailInfoWrapper
          ref={hoverRef}
          isHovered={isHovered}
          zIndex={zIndex}
          onMouseEnter={expand}
          onMouseLeave={reduce}
        >
          <StyledThumbnail>
            {/* 배경 이미지 및 반투명 검은 배경 */}
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
          {isHovered
            ? <RoomInfo content={content} isHovered={isHovered} />
            : null}
        </ThumbnailInfoWrapper>
      </StyledLink>
    </Wrapper>
  );
}

export default Thumbnail;