import styled from "styled-components";

const StyledAllSearchContent = styled.div`
  width: 100%;
  
  margin-top: 30px;

  position: relative;
`;

const Thumbnail = styled.img`
  width: 480px;
  height: 270px;

  display: inline-block;
`;

const EtcInfo = styled.div`
  width: calc( 100% - 480px );
  background-color: blue;

  display: inline-block;
  position: absolute;
  left: 480px;

  // 자동 줄바꿈 방지
  white-space: nowrap;
`;

const Title = styled.p`
  font-size: 2.5rem;
  line-height: 2.5rem;

  // 글자수 초과 처리
  overflow: hidden;
  text-overflow: ellipsis;
`;

function AllSearchContent({ content }) {
  return (
    <StyledAllSearchContent>
      <Thumbnail src="https://picsum.photos/480/270" />
      <EtcInfo>
        <Title title={"ㅇㄹ날"}>감튀 vs 111111111111111111111111111111111111고구마튀김 어느 쪽이 주류?</Title>
        <p>2</p>
        <p>3</p>
        <p>4</p>
      </EtcInfo>
    </StyledAllSearchContent>
  )
}

export default AllSearchContent;