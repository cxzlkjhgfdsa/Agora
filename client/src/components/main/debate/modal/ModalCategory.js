import styled from "styled-components";
import ModalColorBar from "./ModalColorBar";
import SelectedWord from "./Choice";
import { useEffect, useRef } from "react";

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

function ModalCategory() {
  const categories = ["전체", "일상", "음식", "영화/드라마", "연애",
    "게임", "IT/전자제품", "스포츠", "패션", "공부", "음악"];

  // 첫 번째 원소를 기본 선택자로 설정
  let selectedId = "category0";
  useEffect(() => {
    document
      .getElementById(selectedId)
      .classList
      .toggle("selected");
  }, []);

  const selectChoice = (e) => {
    document
      .getElementById(selectedId)
      .classList
      .toggle("selected");
    e.target.classList.toggle("selected");
    console.log(e.target.id);
    selectedId = e.target.id;
  };
  
  return (
    <StyledModalCategory>
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