import HashTag from "components/common/HashTag";
import styled from "styled-components";

import NoImageAvailable from "assets/icons/No_Image_Available.png";

import { debateUserRoleState } from "stores/joinDebateRoomStates";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import customAxios from "utils/customAxios";
import { useCallback } from "react";

const StyledSearchContent = styled.div`
  width: 26rem;
  height: 4.32rem;

  margin: 8px 0px;

  display: flex;
  align-items: center;

  position: relative;

  cursor: pointer;
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

  // 토론방 참가 시 역할
  const setDebateUserRole = useSetRecoilState(debateUserRoleState);
  const navigate = useNavigate();
  const axios = customAxios();
  const join = useCallback(async () => {
    // 방 참여 Request
    const joinData = await axios.get(`/v2/room/enter/${content.roomId}`, null)
      .then(({ data }) => data.body)
      .catch(error => {
        console.log(error);
      });
    
    if (joinData?.state !== true) {
      alert("방 참여에 실패했습니다.");
      return;
    }

    // Recoil State 설정
    setDebateUserRole("viewer");  // 관전자로 입장

    // 토론방 이동 Request
    navigate(roomUrl);
  }, []);

  return (
    <StyledSearchContent onClick={join}>
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
  );
}

export default SearchContent;