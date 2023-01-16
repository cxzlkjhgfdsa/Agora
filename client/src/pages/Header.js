// 화면의 상단 부분에 들어갈 헤더입니다.
// components 폴더의 컴포넌트들을 조합하여 사용자에게 보여지는 페이지를 구성합니다.

// 헤더 컴포넌트를 불러 와 페이지에 배치합니다.
import HeaderComponentExample from "../components/header/HeaderComponentExample";

function Header() {
  return (
    <div style={{ backgroundColor: "red" }}>
      <HeaderComponentExample text="This is Header." />
    </div>
  );
}

export default Header;