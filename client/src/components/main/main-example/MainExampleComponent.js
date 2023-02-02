// MainExample 페이지에 배치될 컴포넌트를 정의하고 생성합니다.

// props.변수 말고도 중괄호를 사용하여 원하는 변수를 바로 받을 수 있습니다.
function MainExampleComponent({ text }) {
  return (
    <h2>{text}</h2>
  );
}

export default MainExampleComponent;