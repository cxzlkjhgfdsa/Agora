import { RecoilRoot } from "recoil";

// Header
import Header from "./pages/Header";

// Main Pages
import MainExample from "./pages/main/MainExample";

function App() {
  return (
    <RecoilRoot>
      <Header />
      <main>
        <MainExample />
      </main>
    </RecoilRoot>
  );
}

export default App;
