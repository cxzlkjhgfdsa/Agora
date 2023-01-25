import styled from "styled-components";

const StyledSearchContent = styled.div`
  width: 26rem;
  height: 4.32rem;

  margin: 8px 0px;

  display: flex;
  align-items: center;

  position: relative;
`;

const Thumbnail = styled.img`
  width: 7.68rem;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
`;

const InfoWrapper = styled.div`
  width: 18rem;
  height: 100%;

  position: absolute;
  top: 0;
  left: calc( 7.68rem + 8px );
`;

const Title = styled.p`
  // 글자수 초과 시 생략 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  color: #000000;
  font-size: 1.2rem;
  line-height: 1.44rem;
  letter-spacing: -0.05rem;
  margin: 0px;
`;

const EtcInfoWrapper = styled.div`
  // margin-top: 0px;
`;
const EtcInfo = styled.span`
  color: #000;
  font-size: 0.8rem;
  line-height: 0.96rem;
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