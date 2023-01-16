// 화면의 메인 부분에 들어갈 부분입니다.
// components 폴더의 컴포넌트들을 조합하여 사용자에게 보여지는 페이지를 구성합니다.

// MainExampleComponent 불러오기
import MainExampleComponent from "../../components/main/main-example/MainExampleComponent";

function MainExample() {
  return (
    <div style={{backgroundColor: "orange"}}>
      <MainExampleComponent text="This is Main." />
    </div>
  );
}

export default MainExample;