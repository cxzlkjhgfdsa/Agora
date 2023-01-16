import { RecoilRoot } from "recoil";

// Global Style
import GlobalStyle from "GlobalStyle";

// Header
import Header from "./pages/Header";

// Main Pages
import MainExample from "./pages/main/MainExample";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Header />
      <main>
        <MainExample />
      </main>
    </RecoilRoot>
  );
}

export default App;
