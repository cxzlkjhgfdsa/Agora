import { RecoilRoot } from "recoil";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global Style
import GlobalStyle from "GlobalStyle";

// Header
import Header from "./pages/Header";

// Main Pages
import Login from "pages/main/Login";
import SignUp from "pages/main/SignUp";
import Welcome from "pages/main/Welcome";
import DebateList from "pages/main/debate/DebateList";
import DebateRoom from "pages/main/debate/DebateRoom";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/debate/list" element={<DebateList />} />
            <Route path="/debate/room/:roomId" element={<DebateRoom />} />
          </Routes>
        </main>
      </BrowserRouter>
      </RecoilRoot>
  );
}

export default App;
