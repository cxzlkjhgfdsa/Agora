import styled from "styled-components";

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
  font-size: 1.6rem;
  font-weight: 700;
  vertical-align: middle;

  // 글자 초과 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  font-size: 1.6rem;
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
  font-size: 1.6rem;
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
  font-size: 1.2rem;

  // 마진 설정
  margin-right: 8px;
`;

function RoomInfo({ content }) {
  const title = content.room_name;

  const leftOpinion = content.room_opinion_left;
  const rightOpinion = content.room_opinion_right;

  const category = content.room_category;

  const leftUsersCnt = content.left_user_list.length;
  const rightUsersCnt = content.right_user_list.length;
  
  const hashTags = content.room_hashtags
    ? content.room_hashtags.split(",")
    : [];
  
  return (
    <RoomInfoWrapper>
      <div style={{width: "100%", height: "20%", display: "flex", alignItems: "center"}}>
        <RoomInfoTitle title={title}>
          {title}
        </RoomInfoTitle>
      </div>
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
    </RoomInfoWrapper>
  );
}

export default RoomInfo;