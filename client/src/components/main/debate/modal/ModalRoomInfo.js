import styled from "styled-components";

const ModalRoomInfoWrapper = styled.div`
  // 크기 설정
  width: 100%;
  height: 100%;
`;
const ColoredBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: #222222;
  opacity: 80%;
  position: absolute;
  top: 0;
  left: 0;
`;
const ModalRoomInfoTitleWrapper = styled.div`
  width: 100%;
  height: 23%;
  display: flex;
  alignItems: center;
`;
const ModalRoomInfoTitle = styled.p`
  // 크기 및 마진 설정
  width: calc( 100% - 6% );
  height: calc( 100% - 6% );
  margin: 3%;

  // 글꼴 설정
  color: #FFFFFF;
  font-size: 1.5rem;
  font-weight: 700;
  vertical-align: middle;

  // 글자 초과 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
`;
const IndentedInfoWrapper = styled.div`
  // 크기 설정
  width: 100%;
  height: 19%;
  margin: 0;

  // 수직 가운데 정렬
  display: flex;
  align-items: center;
`;
const ColorBarDiv = styled.div`
  // 크기 및 마진 설정
  width: 1%;
  height: calc( 100% - 16px );
  margin: 8px 0 8px 3%;
  z-index: 1;

  ${({ color }) => color
  ? "background-color: " + color + ";"
  : ""}

  display: inline-block;
`;
const Opinion = styled.p`
  // 크기 및 마진 설정
  max-width: calc( 60% - 16px );
  
  margin: 8px;
  z-index: 1;

  // 글꼴 설정
  color: ${({ color }) => color};
  font-size: 1.2rem;
  letter-spacing: -0.05rem;

  // 글자 초과 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Word = styled.span`
  margin-left: 8px;

  // 글꼴 설정
  color: ${({ color }) => color};
  font-size: 1.2rem;
  letter-spacing: -0.05rem;
  z-index: 1;
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
  font-size: 1rem;

  // 마진 설정
  margin-right: 8px;
  z-index: 1;
`;

function ModalRoomInfo({ content }) {
  const title = content.roomName;

  const leftOpinion = content.roomOpinionLeft;
  const rightOpinion = content.roomOpinionRight;

  const category = content.roomCategory;

  const leftUsersCnt = content.leftUserList.length;
  const rightUsersCnt = content.rightUserList.length;
  
  const hashTags = content.roomHashtags
    ? content.roomHashtags.split(",")
    : [];
  
  return (
    <ModalRoomInfoWrapper>
      <ColoredBackground />
      <ModalRoomInfoTitleWrapper>
        <ModalRoomInfoTitle title={title}>
          {title}
        </ModalRoomInfoTitle>
      </ModalRoomInfoTitleWrapper>
      <IndentedInfoWrapper>
        <ColorBarDiv color="#EF404A" />
        <Opinion color="#EF404A" title={leftOpinion}>{leftOpinion}</Opinion>
        <Word color="#EF404A">-</Word>
        <Word color="#EF404A">{leftUsersCnt}</Word>
        <Word color="#EF404A">명</Word>
      </IndentedInfoWrapper>
      
      <IndentedInfoWrapper>
        <ColorBarDiv color="#27AAE1" />
        <Opinion color="#27AAE1" title={rightOpinion}>{rightOpinion}</Opinion>
        <Word color="#27AAE1">-</Word>
        <Word color="#27AAE1">{rightUsersCnt}</Word>
        <Word color="#27AAE1">명</Word>
      </IndentedInfoWrapper>
      
      <IndentedInfoWrapper>
        <ColorBarDiv />
        <Word color="#FFFFFF">카테고리</Word>
        <Word color="#FFFFFF">-</Word>
        <Word color="#FFFFFF">{category}</Word>
      </IndentedInfoWrapper>

      <HashTags>
        {hashTags.map((item, index) => (
          <HashTag key={item + index}>{item}</HashTag>
        ))}
      </HashTags>
    </ModalRoomInfoWrapper>
  );
}

export default ModalRoomInfo;