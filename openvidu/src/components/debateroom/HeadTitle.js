import styled from "styled-components"
import { useEffect } from "react"


const TitleDiv = styled.div`
  font-weight: bold;
  font-size: 36px;
  color: #333333;

  margin-top: 40px;
  letter-spacing: -1.5px;

  
  // 임시 폰트 적용
  font-family: 'Inter', san-serif !important;

  // // 영역 확인용 border
  // border: 3px black solid;
`

const OnAirDiv = styled.div`
  // 크기 설정
  height: 36px;
  width: 80px;
  
  // font 특징 적용
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0px;

  // 가운데 정렬
  display: flex;
  align-items: center;
  justify-content: center;

  // border
  border-radius : 4px;

  // margin
  margin-bottom: 8px;

  // 임시 폰트 적용
  font-family: 'Inter', san-serif !important;

  // 비활성시
  background-color: #d4d4d4;
  color: white;

  &.isStart-root {
    background-color: #EF404A;
  }
`

function HeadTitle({isStart}) {

  return(
    <TitleDiv>
      <OnAirDiv className={isStart ? "isStart-root": null}>
        {isStart ? "On Air" : "Off Air"}
      </OnAirDiv>
      이것은 주제 제목 부분입니다.
    </TitleDiv> 
  )
}

export default HeadTitle