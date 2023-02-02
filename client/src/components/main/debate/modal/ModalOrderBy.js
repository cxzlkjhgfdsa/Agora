import styled from "styled-components";
import ModalColorBar from "./ModalColorBar";
import Choice from "./Choice";
import { useEffect } from "react";

const StyledModalOrderBy = styled.ul`
  // 크기 설정
  width: 100%;
  height: 5%;
  margin: 0;
  padding: 0;

  // display
  display: flex;
  align-items: center;

  list-style: none;
`;

function ModalOrderBy() {
  const sortTypes = ["최신순", "오래된 순", "인기순"];

  // 첫 번째 원소를 기본 선택자로 설정
  let selectedId = "orderBy0";
  useEffect(() => {
    document
      .getElementById(selectedId)
      .classList
      .toggle("selected");
  }, []);

  // 원소 선택 이벤트
  const selectChoice = (e) => {
    // 기존 선택자 해제
    document
      .getElementById(selectedId)
      .classList
      .toggle("selected");
    // 새로운 선택자 설정 및 기존 선택자 정보 갱신
    e.target.classList.toggle("selected");
    selectedId = e.target.id;
  };

  return (
    <StyledModalOrderBy>
      <ModalColorBar />
      {sortTypes.map((item, index) => (
        <Choice
          key={item + index}
          id={"orderBy" + index}
          text={item}
          onClick={selectChoice}
        />
      ))}
    </StyledModalOrderBy>
  )
}

export default ModalOrderBy;