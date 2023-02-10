import HashTag from "components/common/HashTag";
import { Link } from "react-router-dom";
import styled from "styled-components";

import NoImageAvailable from "assets/icons/No_Image_Available.png";

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

  object-fit: scale-down;
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
  
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.44rem;
  letter-spacing: -0.05rem;
  margin: 0px;
`;

const EtcInfoWrapper = styled.div`
  // margin-top: 0px;
`;
const EtcInfo = styled.span`
  font-size: 0.8rem;
  line-height: 0.96rem;
  margin-right: 8px;
`;

function SearchContent({ content }) {
  const roomUrl = content.roomId ? "/debate/room/" + content.roomId : "/no-page";
  const title = content.roomName ? content.roomName : "토론방 정보 로딩 실패";
  const creator = content.roomCreaterName;
  const viewers = content.roomWatchCnt;
  const hashTags = content.roomHashtags ? content.roomHashtags.split(",") : [];
  const imageUrl = content.roomThumbnailUrl ? content.roomThumbnailUrl : NoImageAvailable;

  return (
    <Link to={roomUrl}>
      <StyledSearchContent>
        <Thumbnail src={imageUrl} />
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
            {hashTags.map((item, index) => (
              <HashTag key={item + index} tag={item} color={"#CFCFCF"} />
            ))}
          </EtcInfoWrapper>
        </InfoWrapper>
      </StyledSearchContent>
    </Link>
  );
}

export default SearchContent;