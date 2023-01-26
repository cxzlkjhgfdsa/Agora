import styled from "styled-components";

// 로고
import AgoraLogo from "assets/icons/AgoraLogo.png";

// 로고 스타일
const StyledLogoIcon = styled.img`
  // 전체 크기 설정
  width: 150px;
  height: 40px;
`;

function LogoIcon() {
  return (
    <StyledLogoIcon src={AgoraLogo} />
  )
}

export default LogoIcon;