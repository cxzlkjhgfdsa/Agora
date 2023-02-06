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
import { useRecoilCallback } from "recoil";
import { debateRoomsAtomFamily } from "stores/debateRoomStates";

const StyledDebateListModal = styled.div`
  // 크기 설정
  min-width: 900px;
  width: calc( 90% - 160px );
  height: calc( 90% - 80px );
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

  // 제목 관련 이미지 및 글자, 아톰 패밀리 업데이트 인덱스 (화제의 토론: 0 ~, 열띤 토론중: 100 ~, 토론 대기중: 200 ~)
  const [titleIcon, setTitleIcon] = useState();
  const [titleText, setTitleText] = useState("");

  // 현재 검색한 방의 상태
  let roomState = null;
  // 아톰 패밀리 시작 키
  let updateBeginIndex = 0;
  // 제목 설정
  if (debateState === "debating") {
    roomState = true;
    updateBeginIndex = 100;
  } else if (debateState === "waiting") {
    roomState = false;
    updateBeginIndex = 200;
  }

  // 무한스크롤을 위해 감지할 변수 생성
  const [page, setPage] = useState(0);  // 페이지
  const [loading, setLoading] = useState(false);  // 로딩 여부
  const [isEnd, setIsEnd] = useState(true);  // 마지막 페이지 여부
  const [inView, setInView] = useState(false);  // 자식 컴포넌트의 무한스크롤 컴포넌트 inView 여부

  // 최신순, 오래된 순, 인기순 등 정렬 방식
  const [orderBy, setOrderBy] = useState("createnew");
  // 전체, 음식, 영화/드라마 등 카테고리
  const [category, setCategory] = useState("전체");
  // 현재 렌더링 되고 있는 데이터
  const [contents, setContents] = useState([]);
  // 아톰 패밀리 setter
  const updateAtom = useRecoilCallback(({ set }) => (roomInfo, newKey) => {
    set(debateRoomsAtomFamily(newKey), roomInfo);
  });

  // State 초기화
  useEffect(() => {
    if (debateState === "debating") {
      setTitleIcon(LightBulb);
      setTitleText("열띤 토론중");
    } else if (debateState === "waiting") {
      setTitleIcon(Clock);
      setTitleText("토론 대기중");
    }
  }, []);

  // 카테고리, 정렬순 변경의 경우 페이징이 아닌 새로운 데이터를 가져와야 하므로 초기화
  useEffect(() => {
    setPage(0);
    setContents([]);
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
      }
    }, {
      withCredentials: false
    }).then(({ data }) => {
      // 새로운 데이터
      const newContents = data.body.content;
      // 저장
      setContents(current => [...current, ...newContents]);

      // 첫 데이터, 즉 상위 데이터를 가져왔을 경우 아톰 패밀리 업데이트
      if (page === 0) {
        // 새로 받아 온 데이터 개수만큼 업데이트
        for (let updateIndex = updateBeginIndex; updateIndex < updateBeginIndex + newContents.length; updateIndex++) {
          updateAtom(newContents[updateIndex - updateBeginIndex], updateIndex);
        }
      }

      // 마지막 페이지 여부 설정
      setIsEnd(data.body.last);
    }).catch(error => {
      alert(error);
    });

    // 로딩 상태 해제
    setLoading(false);
  }, [page, orderBy, category]);
  
  // 페이지, 정렬 방식, 카테고리가 바뀔 때마다
  // 데이터를 가져 와 contents에 저장
  useEffect(() => {
    getContents();
  }, [getContents]);

  // 마지막 요소 도달 시 요청할 페이지 갱신
  useEffect(() => {
    // 마지막 요소가 view에 들어온데다 데이터 대기중도 아니고 마지막 페이지가 아닐 경우 페이지 갱신
    if (inView && !loading && !isEnd) {
      setPage(current => current + 1);
    }
  }, [inView, loading, isEnd]);

  return (
    <StyledDebateListModal>
      {/* 제목 이미지와 글자 넘겨주기 */}
      <ModalTitle image={titleIcon} text={titleText} />
      {/* Modal 닫는 이벤트 넘겨주기 */}
      <CloseButton src={Close} onClick={closeModalEvent} />
      {/* 정렬 방식과 카테고리 setter를 넘겨 데이터 변경 권한 주기 */}
      <ModalOrderBy setOrderBy={setOrderBy} />
      <ModalCategory setCategory={setCategory} />
      {/* 데이터 로딩 현황, 마지막 페이지 여부를 넘겨 InView 컴포넌트를 렌더링 할 수 있게 하기 */}
      <ModalContents contents={contents} setInView={setInView} loading={loading} isEnd={isEnd} />
    </StyledDebateListModal>
  );
}

export default DebateListModal;