import styled from "styled-components";

// READY, START 버튼
import ReadyButton from "./ReadyButton";
import StartButton from "./StartButton";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { DebateInfoAtom } from "stores/atoms";
import LogoIcon from "./LogoIcon";

const Wrapper = styled.div`
  height: 70px;
  padding: 12px;
`;

function LeftComponents() {
  // 현재 페이지 파악
  const curPath = useLocation().pathname;

  // 사용자 정보 및 토론방 정보 가져오기
  const [debateInfo, setDebateInfo] = useRecoilState(DebateInfoAtom);

  // READY 이벤트
  const ready = () => {
    alert("준비 버튼을 눌렀습니다.");
    const copiedDebateInfo = { ...debateInfo, isReady: true };
    setDebateInfo(copiedDebateInfo);
  };

  // 토론방
  if (curPath.startsWith("/debate/room")) {
    // 방장일 경우 비활성화 START 표시
    if (debateInfo.isLeader) {
      return (
        <Wrapper>
          <StartButton enabled={false} />
        </Wrapper>
      );
    }
    // 발언자일 경우 활성화 READY 표시
    else if (debateInfo.position === "Speaker") {
      return (
        <Wrapper>
          {!debateInfo.isReady
            ? <ReadyButton onClick={ready} enabled={true} />
            : <ReadyButton enabled={false} />}
        </Wrapper>
      );
    }
  }

  // 그 이외의 페이지는 모두 로고 표시
  return (
    <Wrapper>
      <Link to={"/"}>
        <LogoIcon />
      </Link>
    </Wrapper>
  );
}

export default LeftComponents;