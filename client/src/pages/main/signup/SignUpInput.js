import ProgressBar from "components/main/signup/progressbar/ProgressBar";
import Title from "components/main/signup/title/Title";
import { TextBox } from "components/main/signup/content/ContentBox";
function SignUpInput() {
  
	return (
		<div>
			<ProgressBar />
			<Title />
			<TextBox>
				예시입니다.
			</TextBox>
			<h1>
				This is SignUpInput
			</h1>

		</div>
	)
  }
  
  export default SignUpInput;