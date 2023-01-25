import styled from "styled-components";

// 진행바
import ProgressBar from "components/main/signup/progressbar/ProgressBar";

// SNS 이동 버튼
import SignUpButton from "components/main/signup/Button/SignUpButton";

// 라우터 이동을 위한 Link
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
`;
function SignUpSNS() {
  // 다음 SNS 페이지 이동을 위한 컴포넌트 반환 함수

  const navigate = useNavigate();

  const moveToInput = () => {
    navigate("/user/signup/input")
  }

  return (
    <Wrapper>
      <ProgressBar />
      <h1>This is Sign Up SNS page</h1>
        <SignUpButton onClick={moveToInput}>
          완료 후 계속
        </SignUpButton>
    </Wrapper>
  )
}

export default SignUpSNS;