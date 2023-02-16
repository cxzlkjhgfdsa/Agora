import { useEffect } from "react";
import styled from "styled-components";

const StyledMyCategoryForm = styled.div`
  // 크기 설정
  width: 100%;

  // Display
  // display: flex;
`;

const Category = styled.div`
  // 패딩 및 마진
  margin: 4px;
  padding: 4px 12px;

  // 글꼴 설정
  font-size: 1.5rem;
  letter-spacing: -0.05rem;

  // 디자인 설정
  border: 1px solid #000000;
  border-radius: 10px;

  // Display
  display: inline-block;

  cursor: pointer;
  
  &.selectedCategory {
    color: #FFFFFF;
    border-color: #F6C026;
    background-color: #F6C026;
  }

  &:hover {
    color: #FFFFFF;
    border-color: #999999;
    background-color: #999999;
    transition: 0.3s;
  }
  transition: 0.3s;
`;

function MyCategoryForm({ myCategory, setMyCategory }) {
  const categories = ["일상", "음식", "영화/드라마", "연애",
    "게임", "IT/전자제품", "스포츠", "패션", "공부", "음악"];
  
  // 기존에 선택되어 있던 카테고리 활성화
  useEffect(() => {
    if (myCategory !== undefined) {
      const children = document.querySelector("#categoryForm").children;
      for (let child of children) {
        if (myCategory.includes(child.textContent)) {
          child.classList.add("selectedCategory");
        }
      }
    }
  }, [myCategory]);

  // 카테고리 활성화 및 비활성화 함수
  const selectCategory = (event) => {
    const categoryName = event.target.textContent;
    
    // 이미 선택되어 있던 카테고리라면 해제
    if (event.target.classList.contains("selectedCategory")) {
      setMyCategory(current => current.filter((item) => item !== categoryName));
      event.target.classList.remove("selectedCategory");  // 클래스 제거
    }
    // 새 카테고리며, 선택한 개수가 최대에 도달하지 않았다면 선택
    else if (myCategory.length < 3) {
      setMyCategory(current => [...current, categoryName]);  // 카테고리 추가
      event.target.classList.add("selectedCategory");  // 클래스 부착
    }
  };
  
  return (
    <StyledMyCategoryForm id="categoryForm">
      {categories.map((item) => (
        <Category key={item} onClick={selectCategory}>
          {item}
        </Category>
      ))}
    </StyledMyCategoryForm>
  );
}

export default MyCategoryForm;