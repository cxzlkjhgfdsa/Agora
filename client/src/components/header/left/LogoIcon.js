import styled from "styled-components";

// 로고
import AgoraLogo from "assets/icons/AgoraLogo.png";
import { Link } from "react-router-dom";

// 로고 스타일
const StyledLogoIcon = styled.img`
  // 전체 크기 설정
  width: 150px;
  height: 48px;
`;

function LogoIcon() {
  return (
    <Link to={"/"}>
      <StyledLogoIcon src={AgoraLogo} />
    </Link>
  )
}

export default LogoIcon;