import React, { useEffect, useRef, useState } from "react";
import Eng from "../assests/engineer-removebg-preview.png";
import Logo from "../assests/knowhiveLogo.png";
import userLogo from "../assests/UserLogo.png";
import { motion } from "framer-motion";
import axios from "axios";
import ChatHistoryModal from "../components/ChatHistoryModal";
import { IoMdSend } from "react-icons/io";
import DropDownList from "../components/DropDownList";

function ChatPage() {
  const msgEnd = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, Welcome to KnowHive. How can I help you today?",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = () => {
    const text = question;
    setQuestion("");
    setMessages([...messages, { text, isBot: false }]);
    console.log("Axios is working");
    console.log("Question:", text);
    axios
      .post(`http://127.0.0.1:5000/ask`, {
        question: question,
      })
      .then((response) => {
        console.log("Response recieved:", response);
        const answer = response.data.Answer;
        setMessages([
          ...messages,
          { text, isBot: false },
          { text: answer, isBot: true },
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        {
          openDropDown && <DropDownList setShowModal={setShowModal}/>
        }

        <div className="absolute right-6 top-1" onClick={() => setOpenDropDown((prev)=> !prev)}>
          <img
            src={Eng}
            alt="User Icon"
            width="42"
            height={100}
          />
        </div>

        {/* Chat prompt */}
        <div className="min-h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] m-12 flex flex-col bg-[#F8F8F8] rounded-2xl p-2 border-gray-300">
          <div className="flex flex-col overflow-y-auto scroll-smooth custom-scrollbar pl-12 pr-12">
            {messages.map((message, i) => (
              <div key={i} className="flex p-2 ">
                <div className="shrink-0 w-8 ml-1 mr-2">
                  <img
                    src={message.isBot ? Logo : userLogo}
                    alt="Logo"
                    className="w-full"
                  />
                </div>
                <div
                  className={
                    message.isBot
                      ? "text-justify w-full border bg-[#ABC2AE] rounded-lg p-2"
                      : "text-justify w-full border bg-[#83AF8C] rounded-lg p-2"
                  }
                >
                  {message.text.split("\n").map((line, index) => (
                    <p key={index} className="font-poppins">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <div ref={msgEnd} />
          </div>

          <div className="mt-auto w-full flex flex-col items-center">
            <div className="flex w-4/6 items-center pt-2">
              <textarea
                className="w-full resize-none border border-gray-500 rounded-xl p-1 "
                placeholder="Enter your question here"
                value={question}
                onKeyDown={handleEnter}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <IoMdSend
                className="text-3xl text-[#ABC2AE] hover:text-[#83AF8C] cursor-pointer ml-1"
                onClick={handleSend}
              />
            </div>
          </div>
        </div>

        <ChatHistoryModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        />

        
      </div>
    </motion.div>
  );
}

export default ChatPage;
