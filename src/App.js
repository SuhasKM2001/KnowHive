import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import StartPage from "./pages/StartPage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  // const location = useLocation();
  return (
    <AnimatePresence mode='wait'>
      <BrowserRouter>
      <Routes>
        <Route index element= {<StartPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
      </BrowserRouter>
      </AnimatePresence>
  );
}

export default App;
