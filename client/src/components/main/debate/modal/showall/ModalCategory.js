import styled from "styled-components";
import { ModalColorBar } from "../ModalComponents";
import SelectedWord from "./Choice";
import { useEffect } from "react";

const StyledModalCategory = styled.ul`
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

function ModalCategory({ setCategory }) {
  const categories = ["전체", "일상", "음식", "영화/드라마", "연애",
    "게임", "IT/전자제품", "스포츠", "패션", "공부", "음악"];

  // 첫 번째 원소를 기본 선택자로 설정
  useEffect(() => {
    document
      .getElementById("category0")
      .classList
      .toggle("selected");
  }, []);

  // 원소 선택 이벤트
  const selectChoice = (e) => {
    // 기존 선택자 해제
    document
      .querySelector("#category > .selected")
      .classList
      .toggle("selected");
    // 새로운 선택자 설정 및 기존 선택자 정보 갱신
    e.target.classList.toggle("selected");

    // 검색조건 변경
    setCategory(e.target.innerHTML);
  };
  
  return (
    <StyledModalCategory id="category">
      <ModalColorBar />
      {categories.map((item, index) => (
        <SelectedWord
          key={item + index}
          id={"category" + index}
          text={item}
          onClick={selectChoice}
        />
      ))}
    </StyledModalCategory>
  )
}

export default ModalCategory;