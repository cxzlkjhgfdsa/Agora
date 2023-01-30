import HashTag from "components/common/HashTag";
import { Link } from "react-router-dom";
import styled from "styled-components";

import NoImageAvailable from "assets/icons/No_Image_Available.png";

const StyledAllSearchContent = styled.div`
  width: 100%;
  height: 225px;

  // 상단 요소와 간격
  margin-top: 30px;
  
  display: flex;
  align-items: center;

  position: relative;
`;

const Thumbnail = styled.img`
  // 16:9
  width: 400px;
  height: 225px;

  // 위치 설정
  position: absolute;
  top: 0;
  left: 0;

  object-fit: scale-down;
`;

const InfoWrapper = styled.div`
  // 최대 너비 (- 썸네일 너비 - 마진)
  max-width: calc( 100% - 400px - 20px );

  // 썸네일과의 가로 거리
  margin-left: 20px;

  // 위치 설정
  position: absolute;
  top: 0;
  left: 400px;

  // 줄바꿈 방지
  white-space: nowrap;
`;

const Title = styled.p`
  // 글자수 초과 시 생략 처리
  overflow: hidden;
  text-overflow: ellipsis;

  // 마진 초기화
  margin: 0px;

  // 글꼴 설정
  font-size: 2rem;
  letter-spacing: -0.05rem;
`;

const EtcInfoWrapper = styled.p`
  // 글자수 초과 시 생략 처리
  overflow: hidden;
  text-overflow: ellipsis;
`;
const EtcInfo = styled.span`
  font-size: 1rem;
  line-height: 1rem;
  margin-right: 8px;
`;

function AllSearchContent({ content }) {
  const roomUrl = content.room_id ? "/debate/room" + content.room_id : "/no-page";
  const title = content.room_name ? content.room_name : "토론방 정보 로딩 실패";
  const creator = content.room_creater_name;
  const viewers = content.room_watch_cnt;
  const hashTags = content.room_hashtags ? content.room_hashtags.split(",") : [];
  const category = content.room_category;
  const imageUrl = content.room_thumbnail_url ? content.room_thumbnail_url : NoImageAvailable;

  return (
    <Link to={roomUrl}>
      <StyledAllSearchContent>
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
          
          {/* 카테고리 */}
          <EtcInfoWrapper>
            <EtcInfo>카테고리</EtcInfo>
            <EtcInfo>:</EtcInfo>
            <EtcInfo>{category}</EtcInfo>
          </EtcInfoWrapper>
          
          {/* 해시태그 */}
          <div>
            {hashTags.map((item, index) => (
              <HashTag key={item + index} tag={item} />
            ))}
          </div>
        </InfoWrapper>
      </StyledAllSearchContent>
    </Link>
  );
}

export default AllSearchContent;