import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global Style
import GlobalStyle from "GlobalStyle";

import Header from "./pages/Header";
import Footer from "./pages/Footer";

// Main Pages
import Login from "pages/main/Login";
import SignUpInput from "pages/main/signup/SignUpInput";
import SignUpCategory from "pages/main/signup/SignUpCategory";
import SignUpComplete from "pages/main/signup/SignUpComplete";
import Welcome from "pages/main/Welcome";
import DebateList from "pages/main/debate/DebateList";
import DebateRoom from "pages/main/debate/DebateRoom";
import MyPage from "pages/main/MyPage";
import ScrollToTop from "components/common/ScrollToTop";
import LoginRedirectHandler from "components/login/LoginRedirectHandler";
import SearchRoom from "pages/main/debate/SearchRoom";
import TestMoadlPage from "pages/TestModalPage";


function App() {

  return (
      <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
        <GlobalStyle />
        <div style={{flex: 1}}>
          <BrowserRouter>
            <ScrollToTop />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/user/login/redirect-handler" element={<LoginRedirectHandler />} />
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/signup/SNS" element={<Login />} />
                <Route path="/user/signup/input" element={<SignUpInput />} />
                <Route path="/user/signup/category" element={<SignUpCategory />} />
                <Route path="/user/signup/complete" element={<SignUpComplete />} />
                <Route path="/user/mypage" element={<MyPage />} />
                <Route path="/debate/list" element={<DebateList />} />
                <Route path="/debate/room/:roomId" element={<DebateRoom />} />
                <Route path="/debate/search" element={<SearchRoom />} />
                <Route path="/test-page" element={<TestMoadlPage />} />
              </Routes>
            </main>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
  );
}

export default App;
