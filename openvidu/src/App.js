import { BrowserRouter, Routes, Route } from "react-router-dom";

import DebateRoom from "./pages/DebateRoom";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<DebateRoom />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
