import styled from "styled-components"
import { SelectAnimation, AppearAnimation } from "./SelectAnimation"



const ImageCropping = styled.div`
  position: relative;
  border-radius: 5px;
  max-width: 250px;
  max-height: 125px;
  overflow: hidden;

  &.isActive {
    box-sizing: border-box;
    border: solid 5px #f6c026;
  }
`

const BackgroundImage = styled.img`
  max-width: 100%;
  margin-top: -25%;
`

const DarkBackground = styled.div`
  position: absolute;
  background-color: black;
  opacity: 0.6;
  width: 100%;
  height: 100%;

  &.isActive-DarkBackground-root{
    opacity: 0.35;
  }
}
`

const TextBorderWrapper = styled.div`
  position: absolute;

  // 크기 설정
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
const TextBorder = styled.div`

  // 크기 설정
  width: 150px;
  height: 80px;

  // 테두리 설정
  border: 5px white solid;

  // 초기 테두리 투명도 설정
  opacity: 0;
`

const Wrapper = styled.div`
  &:hover {
    ${DarkBackground} {
      opacity: 0.35;
      animation: ${ SelectAnimation } 0.5s 0s ease 1 forwards;
    }
    ${TextBorder} {
      animation: ${ AppearAnimation } 0.5s 0s ease 1 forwards;
    }
  }
  cursor: pointer;
`


const Typograpy = styled.div`
  position: absolute;
  
  // 크기 설정
  width: 100%;
  height: 100%;

  // 텍스트 중앙 위치
  display: flex;
  align-items: center;
  justify-content: center;

  // 폰트 색상 및 사이즈 설정
  color: white;
  font-size: 24px;
  font-weight: bold;

  // 드래그 방지
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
`

function CategoryButton({image, isActive}) {
  return(
    <div>
      <ImageCropping className={isActive ? "isActive": null}>
        <Wrapper>
          <DarkBackground className={isActive ? "isActive-DarkBackground-root": null} />
          <Typograpy>
            {image.title}
          </Typograpy>
          <TextBorderWrapper>
            <TextBorder className={isActive ? "isActive-TextBorder-root": null} />
          </TextBorderWrapper>
        </Wrapper>
        <BackgroundImage src={image.url}/>
      </ImageCropping>
    </div>
  );
}

export default CategoryButton