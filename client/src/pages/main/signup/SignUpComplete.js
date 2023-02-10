// 자식 컴포넌트 import
import ProgressBar from "components/main/signup/progressbar/ProgressBar";
import Title from "components/main/signup/title/Title";
import CompleteButton from "components/main/signup/complete/CompleteButton";
import CompleteSubTitle from "components/main/signup/complete/CompleteSubTitle";

import styled from "styled-components";

const TitleWrapper = styled.div`
  margin-top: 200px;
`



function SignUpComplete() {
  
	return (
		<div>
			<ProgressBar />
      <TitleWrapper>
        <Title />

      </TitleWrapper>
      <CompleteSubTitle />
      <CompleteButton />
		</div>
	)
  }
  
  export default SignUpComplete;