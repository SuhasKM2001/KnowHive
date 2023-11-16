import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import StartPage from "./pages/StartPage";
import ChatPage from "./pages/ChatPage";

function App() {
  // const location = useLocation();
  return (
    <AnimatePresence mode='wait'>
      <BrowserRouter>
      <Routes>
        <Route index element= {<StartPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      </BrowserRouter>
      </AnimatePresence>
  );
}

export default App;
