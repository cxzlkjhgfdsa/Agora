import styled from "styled-components"
import people from "../../assets/icons/WatchNum.png"

function HeadTitle({isStart, title, watchNum}) {

  return(
    <TitleDiv>
      <IconDiv>
        <OnAirDiv className={isStart ? "isStart-root": null}>
          {isStart ? "On Air" : "Off Air"}
        </OnAirDiv>
        <WatcherDiv>
          <WatchImg src={people} />
            {watchNum}명
        </WatcherDiv>
      </IconDiv>
      {title}
    </TitleDiv> 
  )
}

export default HeadTitle

const IconDiv = styled.div`
  display: flex;
  flex-direction: row;
`

const TitleDiv = styled.div`
  font-weight: bold;
  font-size: 36px;
  color: #333333;

  margin-top: 10px;
  letter-spacing: -1.5px;
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

  // 비활성시
  background-color: #d4d4d4;
  color: white;

  &.isStart-root {
    background-color: #EF404A;
  }
`
const WatchImg = styled.img`
  // 크기 설정 
  height: 15px;
  width: auto;

  // margin
  margin-right: 3px;
  padding-top: 3px;
`

// 시청자 수 버튼
const WatcherDiv = styled.div`
  // 크기 설정
  height: 36px;
  width: 80px;

  // font 특징 적용
  font-weight: bold;
  font-size: 20px;
  color: white;
  letter-spacing: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 10px;
  border-radius: 5px;

  background-color: #d4d4d4;
`