import React from "react";
import { motion } from "framer-motion";

function ChatPage() {
  return (
    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} transition={{ duration: 0.5 }}>
      <div>
        {/* Start the code from here */}
        <h1 className="text-5xl font-bold underline">Chat Page</h1>
      </div>
    </motion.div>
  );
}

export default ChatPage;
