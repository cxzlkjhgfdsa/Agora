import styled from "styled-components";

const StyledSearchContent = styled.div`
  width: 100%;
  height: 108px;

  margin: 10px 0px;

  display: flex;
  align-items: center;

  position: relative;
`;

const Thumbnail = styled.img`
  width: 192px;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
`;

const InfoWrapper = styled.div`
  width: 450px;
  height: 100%;

  position: absolute;
  top: 0;
  left: 200px;
`;

const Title = styled.p`
  // 글자수 초과 시 생략 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  color: #000000;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: -0.05em;
  margin: 0px;
`;

const EtcInfoWrapper = styled.div`
  margin-top: 8px;
`;
const EtcInfo = styled.span`
  color: #000000;
  font-size: 20px;
  line-height: 24px;
  margin-right: 8px;
`;

function SearchContent({ content }) {
  const title = content.title;
  const creator = content.creator;
  const viewers = content.viewers;
  const hashTags = content.hashTags;

  return (
    <StyledSearchContent>
      <Thumbnail src="https://picsum.photos/192/108" />
      <InfoWrapper>
        {/* 방 제목 */}
        <Title title={title}>{title}</Title>
        
        {/* 작성자 / 시청자 수 */}
        <EtcInfoWrapper>
          <EtcInfo>@{creator}</EtcInfo>
          <EtcInfo>/</EtcInfo>
          <EtcInfo>시청자 {viewers}명</EtcInfo>
        </EtcInfoWrapper>
        
        {/* 해시태그 */}
        <EtcInfoWrapper>
          {hashTags.map((item) => (
            <EtcInfo key={item}>#{ item }</EtcInfo>
          ))}
        </EtcInfoWrapper>
      </InfoWrapper>
    </StyledSearchContent>
  );
}

export default SearchContent;