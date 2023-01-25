import styled from "styled-components";
import ArrowDownIcon from "assets/icons/Arrow_Down_White.png";
import ArrowUpIcon from "assets/icons/Arrow_Up_White.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "stores/atoms";

const Wrapper = styled.div`
  // 좌측 모서리, 우측 모서리 둥글게
  border-radius: 35px 10px ${({expanded}) => expanded ? "0px" : "10px"} 35px;
  
  // 크기 설정
  width: 246px;
  height: 70px;

  position: relative;

  display: inline-block;
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

  // 크기 설정
  width: 212px;

  // 마진 및 패딩
  margin: 0px;
  padding: 0px 0px 5px 0px;

  // 상단 직각, 하단 둥글게
  border-radius: 0px 0px 10px 10px;

  // 위치 설정 : 사용자 프로필 바로 아래
  position: absolute;
  top: 70px;
  right: 0;

  // 구분점 없애기
  list-style: none;
`;
// 확장 프로필 리스트
const ExpandedElement = styled.li`
  background-color: transparent;

  text-align: center;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: -0.05em;

  margin: 12px 0px;

  cursor: pointer;
`
const ExpandedWhiteElement = styled(ExpandedElement)`
  color: #FFFFFF;
`;
const ExpandedRedElement = styled(ExpandedElement)`
  color: #EF404A;
`;

function UserProfileIcon({ nickname }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandProfile = () => {
    setIsExpanded(current => !current);
  };

  const setUserInfo = useSetRecoilState(userInfoState);
  const navigate = useNavigate();
  const logout = () => {
    alert("로그아웃 처리");
    setUserInfo({});
    navigate("/");
  };

  return (
    <Wrapper className="bg-dark border-dark" expanded={isExpanded}>
      <Round className="bg-main border-main" />
      <IDLabel>{nickname}</IDLabel>
      <Icon src={isExpanded ? ArrowUpIcon : ArrowDownIcon} onClick={expandProfile} />
      {isExpanded &&
        <ExpandedProfile>
          <Link to={"/user/mypage"}>
            <ExpandedWhiteElement>My Page</ExpandedWhiteElement>
          </Link>
          <ExpandedRedElement onClick={logout}>Logout</ExpandedRedElement>
        </ExpandedProfile>
      }
    </Wrapper>
  );
}

export default UserProfileIcon;