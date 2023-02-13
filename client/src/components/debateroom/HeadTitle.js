import styled from "styled-components"

function HeadTitle({isStart, title}) {

  return(
    <TitleDiv>
      <OnAirDiv className={isStart ? "isStart-root": null}>
        {isStart ? "On Air" : "Off Air"}
      </OnAirDiv>
      {title}
    </TitleDiv> 
  )
}

export default HeadTitle



const TitleDiv = styled.div`
  font-weight: bold;
  font-size: 36px;
  color: #333333;

  margin-top: 10px;
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
const Title = styled.div`
`

// 스킵 버튼
const SkipButton = styled.div`
  color: #F6C026;
  width: 120px;

  font-size: 20px;

  border-radius: 8px;
  border: 2px solid #F6C026;


  cursor: pointer;

  // 드래그 방지
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
`