import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute";
import StartPage from "./pages/StartPage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <AnimatePresence mode='wait'>
      <BrowserRouter>
      <Routes>
        <Route index element= {<StartPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
      </BrowserRouter>
      </AnimatePresence>
  );
}

export default App;
