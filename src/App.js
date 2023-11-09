// import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import StartPage from "./pages/StartPage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element= {<StartPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
