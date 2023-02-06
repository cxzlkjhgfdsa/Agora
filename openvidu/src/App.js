import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import DebateRoom from "./pages/DebateRoom";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <main>
          <Routes>
            <Route path="/" element={<DebateRoom />} />
          </Routes>
        </main>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
