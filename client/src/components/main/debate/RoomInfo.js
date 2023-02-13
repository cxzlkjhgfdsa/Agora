import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { debateRoomsAtomFamily } from "stores/debateRoomStates";

const RoomInfoWrapper = styled.div`
  // 크기 설정
  width: 100%;
  height: 75%;

  // 배경색 설정
  background-color: #222222;

  // 위치 설정
  position: absolute;
  top: 100%;
  left: 0;
`;
const RoomInfoTitle = styled.p`
  // 크기 및 마진 설정
  width: calc( 100% - 6% );
  margin: 8px 3%;

  // 글꼴 설정
  color: #FFFFFF;

  font-weight: 700;
  vertical-align: middle;

  // 글자 초과 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ type }) => type === "hot-thumbnail"
  ? "font-size: calc(0.5rem + 0.8vw);"
  : "font-size: calc(0.4rem + 0.6vw)"};

  @media screen and (max-width: 1024px) {
    ${({ type }) => type === "hot-thumbnail"
      ? "font-size: 1.2rem;"
      : "font-size: 0.9rem;"};
  }
`;
const IndentedInfoWrapper = styled.div`
  // 크기 설정
  width: 100%;
  height: 20%;
  margin: 0;

  // 수직 가운데 정렬
  display: flex;
  align-items: center;
`;
const ColorBarDiv = styled.div`
  // 크기 및 마진 설정
  width: 1%;
  height: calc( 100% - 8px );
  margin: 4px 0 4px 3%;

  ${({ color }) => color
  ? "background-color: " + color + ";"
  : ""}

  display: inline-block;
`;
const Opinion = styled.p`
  // 크기 및 마진 설정
  max-width: calc( 60% - 16px );
  
  margin: 8px;

  // 글꼴 설정
  color: ${({ color }) => color};

  // 글자 초과 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ type }) => type === "hot-thumbnail"
  ? "font-size: calc(0.5rem + 0.8vw);"
  : "font-size: calc(0.4rem + 0.6vw)"};

  @media screen and (max-width: 1024px) {
    ${({ type }) => type === "hot-thumbnail"
  ? "font-size: 1.2rem;"
  : "font-size: 0.9rem;"};
  }
  /* font-size: 1.6rem; */
  letter-spacing: -0.05rem;
`;
const Word = styled.span`
  margin-left: 8px;

  // 글꼴 설정
  color: ${({ color }) => color};
  
  ${({ type }) => type === "hot-thumbnail"
  ? "font-size: calc(0.5rem + 0.8vw);"
  : "font-size: calc(0.4rem + 0.6vw)"};

@media screen and (max-width: 1024px) {
  ${({ type }) => type === "hot-thumbnail"
  ? "font-size: 1.2rem;"
  : "font-size: 0.9rem;"};
  }
  
  /* font-size: 1.6rem; */
  letter-spacing: -0.05rem;
`;

const HashTags = styled.div`
  // 글꼴 설정
  color: #FFFFFF;

  // 크기 설정
  width: calc( 100% - 6% );
  height: calc( 20% - 16px );
  margin: 8px 3%;

  // 위치 설정
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
`;
const HashTag = styled.span`
  // 글꼴 설정
  color: #FFFFFF;
  
  // 마진 설정
  margin-right: 8px;

  ${({ type }) => type === "hot-thumbnail"
  ? "font-size: calc(0.25rem + 0.8vw);"
  : "font-size: calc(0.2rem + 0.6vw)"};

  @media screen and (max-width: 1024px) {
    ${({ type }) => type === "hot-thumbnail"
  ? "font-size: 0.9rem;"
  : "font-size: 0.6rem;"};
  }

  /* font-size: 1.2rem; */
`;

function RoomInfo({ roomId, type }) {

  const roomInfo = useRecoilValue(debateRoomsAtomFamily(roomId));
  const {
    roomName: title,
    roomOpinionLeft: leftOpinion,
    roomOpinionRight: rightOpinion,
    roomCategory: category,
    leftUserList: { length: leftUsersCnt },
    rightUserList: { length: rightUsersCnt },
    roomHashtags = "",
  } = roomInfo
  const hashTags = roomHashtags.split(",") || [];

  
  return (
    <RoomInfoWrapper>
      <div style={{width: "100%", height: "20%", display: "flex", alignItems: "center"}}>
        <RoomInfoTitle title={title} type={type}>
          {title}
        </RoomInfoTitle>
      </div>
      <IndentedInfoWrapper>
        <ColorBarDiv color="#EF404A" />
        <Opinion color="#EF404A" type={type} title={leftOpinion}>{leftOpinion}</Opinion>
        <Word type={type} color="#EF404A">-</Word>
        <Word type={type} color="#EF404A">{leftUsersCnt}</Word>
        <Word type={type} color="#EF404A">명</Word>
      </IndentedInfoWrapper>
      
      <IndentedInfoWrapper>
        <ColorBarDiv color="#27AAE1" />
        <Opinion color="#27AAE1" type={type} title={rightOpinion}>{rightOpinion}</Opinion>
        <Word type={type} color="#27AAE1">-</Word>
        <Word type={type} color="#27AAE1">{rightUsersCnt}</Word>
        <Word type={type} color="#27AAE1">명</Word>
      </IndentedInfoWrapper>
      
      <IndentedInfoWrapper>
        <ColorBarDiv />
        <Word type={type} color="#FFFFFF">카테고리</Word>
        <Word type={type} color="#FFFFFF">-</Word>
        <Word type={type} color="#FFFFFF">{category}</Word>
      </IndentedInfoWrapper>
        
      <HashTags>
        {hashTags.map((item, index) => (
          <HashTag type={type} key={item + index}>{item}</HashTag>
        ))}
      </HashTags>
    </RoomInfoWrapper>
  );
}

export default RoomInfo;