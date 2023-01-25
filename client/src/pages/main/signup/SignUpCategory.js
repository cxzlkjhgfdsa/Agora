// 자식 컴포넌트 import
import ProgressBar from "components/main/signup/progressbar/ProgressBar";
import Title from "components/main/signup/title/Title";
import CategoryItem from "components/main/signup/category/CategoryItem";
import { SubText } from "components/main/signup/content/ContentBox";

// style component import
import styled from "styled-components";

const SubTextWrapper = styled.div`
	display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`

function SignUpCategory() {

  
	return (
		<div>
			<ProgressBar />
			<Title />
      <SubTextWrapper>
        <SubText>
          여러분의 취향에 맞추어 컨텐츠를 제공합니다
        </SubText>
      </SubTextWrapper>
			<CategoryItem />
		</div>
	)
  }
  
  export default SignUpCategory;