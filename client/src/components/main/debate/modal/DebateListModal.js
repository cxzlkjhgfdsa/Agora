import styled from "styled-components";
import ModalCategory from "./ModalCategory";
import ModalContents from "./ModalContents";
import ModalOrderBy from "./ModalOrderBy";
import ModalTitle from "./ModalTitle";

import Close from "assets/icons/Close.png";
import { useCallback, useEffect, useState } from "react";
import customAxios from "utils/customAxios";

// Title
import LightBulb from "assets/icons/Light_Bulb.png";
import Clock from "assets/icons/Clock.png";
import { useInView } from "react-intersection-observer";

const StyledDebateListModal = styled.div`
  // 크기 설정
  min-width: 900px;
  width: calc( 90% - 160px );
  height: calc( 900px - 80px );
  margin: 0;
  padding: 40px 80px;

  // 위치 설정
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  // 배경 설정
  background-color: #333333;

  // 테두리 설정
  border-radius: 20px;
`;

const CloseButton = styled.img`
  width: 46px; height: 46px;
  position: absolute;
  top: 15px;
  right: 15px;

  cursor: pointer;

  background-color: #000000;
  border-radius: 2rem;
`;

/*
  closeModalEvent: Modal 닫는 이벤트
  showType: 열띤 토론중 or 토론 대기중 등 모두보기를 누른 토론방의 상태 (debating, waiting)
*/
function DebateListModal({ closeModalEvent, debateState }) {
  const axios = customAxios();

  // 제목 설정
  let titleIcon = null;
  let titleText = "";
  if (debateState === "debating") {
    titleIcon = LightBulb;
    titleText = "열띤 토론중";
  } else if (debateState === "waiting") {
    titleIcon = Clock;
    titleText = "토론 대기중";
  }

  const [orderBy, setOrderBy] = useState("createnew");
  const [category, setCategory] = useState("all");
  const [contents, setContents] = useState([]);

  // 정렬순이나 카테고리가 바뀔 때마다,
  // 1. 서버에서 데이터 받아오기
  // 2. 아톰 패밀리 업데이트
  useEffect(() => {
    // 0. 모두보기 기준 설정 (열띤 토론중 또는 토론 대기중)
    // roomState, true: 진행중, false: 대기중
    let roomState = null;
    // 아톰 패밀리 업데이트 시작 인덱스 설정 (열띤 토론중: 100 ~, 토론 대기중 200 ~)
    let updateBeginIdx = 0;
    if (debateState === "debating") {
      roomState = true;
      updateBeginIdx = 100;
    } else if (debateState === "waiting") {
      roomState = false;
      updateBeginIdx = 200;
    }
    
    // 1. 서버에서 데이터 받아오기 (최신순, 전체)
    
  }, [orderBy, category]);                                                                                                                                                                                      

  // 페이지가 변경되면 데이터를 가져오는 함수
  const getContents = useCallback(async () => {
    // 로딩 상태 설정
    setLoading(true);

    await axios.get("/api/v1/search/main/modal", {
      params: {
        roomState: roomState,
        order: orderBy,
        category: category,
        page: page,
        size: 10
      },
      withCredentials: false
    }).then(({ data }) => {
      // 데이터 저장
      setContents(current => [...current, ...data.body.content]);

      // 마지막 페이지 여부 설정
      setIsEnd(data.body.last);

      // 맨 첫 API 호출의 경우 아톰 패밀리 업데이트 (상위 10개)
      if (page === 0) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 아톰 패밀리 업데이트 해야 합니다!");
      }
      // 페이지 
    }).catch(error => {
      alert(error);
    });

    // 로딩 상태 해제
    setLoading(false);
  }, [page]);

  // 페이지가 바뀌면 함수 실행
  useEffect(() => {
    getContents();
  }, [getContents]);

  // 마지막 요소 도달 시 요청할 페이지 갱신
  useEffect(() => {
    // 마지막 요소가 view에 들어온데다 데이터 대기중도 아니고 마지막 페이지가 아닐 경우 페이지 갱신
    if (inView && !loading && !isEnd) {
      setPage(current => current + 1);
    }
  }, [inView, loading]);
  
  // 무한스크롤을 위해 감지할 변수 생성
  const [page, setPage] = useState(0);  // 페이지
  const [loading, setLoading] = useState(false);  // 로딩 여부
  const [isEnd, setIsEnd] = useState(true);  // 마지막 페이지 여부
  const { ref, inView } = useInView();  // 감시할 컴포넌트, 뷰포트에 들어왔는지

  return (
    <StyledDebateListModal>
      <ModalTitle image={titleIcon} text={titleText} />
      <CloseButton src={Close} onClick={closeModalEvent} />
      <ModalOrderBy setOrderBy={setOrderBy} />
      <ModalCategory setCategory={setCategory} />
      <ModalContents contents={contents} ref={ref} loading={loading} isEnd={isEnd} />
    </StyledDebateListModal>
  );
}

export default DebateListModal;