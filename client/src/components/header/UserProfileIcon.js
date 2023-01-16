import styled from "styled-components";
import ArrowDownIcon from "assets/icons/Arrow_Down_White.png";

const Wrapper = styled.div`
  // 좌측 모서리, 우측 모서리 둥글게
  border-radius: 35px 10px 10px 35px;
  
  // 크기 설정
  width: 246px;
  height: 70px;

  position: relative;
`;

// 사용자 프로필 이미지
const Round = styled.div`
  // 둥근 모서리
  border-radius: 35px;

  // 크기 설정
  width: 50px;
  height: 50px;

  // 위치 설정
  position: absolute;
  top: 10px;
  left: 10px;
`;

// 사용자 닉네임 라벨
const IDLabel = styled.span`
  // 배경색
  background-color: transparent;

  // 글꼴 설정
  line-height: 30px;
  font-size: 1.5rem;
  color: #FFFFFF;
  
  // 글자수 초과 시 생략 처리
  overflow: hidden;
  text-overflow: ellipsis;

  // 글자 정렬
  text-align: center;

  // 크기 설정
  width: 120px;

  // 위치 설정
  position: absolute;
  top: 20px;
  left: 70px;
`;

// 아래 화살표 아이콘
const Icon = styled.img`
  // 크기 설정
  width: 40px;
  height: 40px;

  // 위치 설정
  position: absolute;
  top: 15px;
  right: 10px;

  // 호버 시 커서 모양 변경
  cursor: pointer;
`;

// 확장 프로필
const ExpandedProfile = styled.ul`
  // 배경색
  background-color: #222222;

  width: 212px;
  height: 85px;

  margin: 0px;
  padding: 15px 0px 0px 0px;

  border-radius: 10px;

  position: absolute;
  top: 55px;
  right: 0;
`;
// 확장 프로필 리스트
const ExpandedElement = styled.li`
  background-color: transparent;
  text-align: center;
  
`
const ExpandedWhiteElement = styled(ExpandedElement)`
  color: #FFFFFF;
`;
const ExpandedRedElement = styled(ExpandedElement)`
  color: #EF404A;
`;

function UserProfileIcon({ nickname }) {
  const expandProfile = () => {
    alert("사용자 프로필 아이콘을 눌렀습니다.");
  };

  return (
    <Wrapper className="bg-dark border-dark">
      <Round className="bg-main border-main" />
      <IDLabel>{nickname}</IDLabel>
      <Icon src={ArrowDownIcon} onClick={expandProfile} />
      <ExpandedProfile>
        <ExpandedWhiteElement>My Page</ExpandedWhiteElement>
        <ExpandedRedElement>Log out</ExpandedRedElement>
      </ExpandedProfile>
    </Wrapper>
  );
}

export default UserProfileIcon;