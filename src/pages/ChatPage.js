import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ChatHistoryModal from "../components/ChatHistoryModal";
import { useState } from "react";

function ChatPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} transition={{ duration: 0.5 }}>
      <div>
        {/* Start the code from here */}
        <h1 className="text-5xl font-bold underline">Chat Page</h1>
        <button
        onClick={handleLogout}
            className="border font-poppins text-base bg-secondary text-white  mt-2 mb-1 p-3 text-center rounded-full"
          >
            Logout
          </button>

          <button
        onClick={() =>setShowModal(true)}
            className="border font-poppins text-base bg-secondary text-white  mt-2 mb-1 p-3 text-center rounded-full"
          >
            Chat History
          </button>

          <ChatHistoryModal isVisible={showModal} onClose={() => setShowModal(false)}/>

      </div>
    </motion.div>
  );
}

export default ChatPage;
