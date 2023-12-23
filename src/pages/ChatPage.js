import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Eng from "../assests/engineer-removebg-preview.png";
import Logo from "../assests/knowhiveLogo.png";
import userLogo from "../assests/UserLogo.png";
import { motion } from "framer-motion";
import axios from "axios";
import ChatHistoryModal from "../components/ChatHistoryModal";
import { IoMdSend } from "react-icons/io";
import { IoMdMic } from "react-icons/io";
import { PiSpeakerHighFill } from "react-icons/pi";
import backgroundImage from "../assests/chatBackground.jpg";
import VideoModal from "../components/VideoModal";
import ChatSkeleton from "../components/ChatSkeleton";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  imageRendering: "smooth",
};

function ChatPage() {
  const msgEnd = useRef(null);
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, Welcome to KnowHive. How can I help you today?",
      isBot: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  // const [showDropdown, setShowDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();
  const [botResponse, setBotResponse] = useState(null);
  const [utterance, setUtterance] = useState(null);
  // const [speakOutAnswer, setSpeakOutAnswer] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleReaction = (message, reactionType) => {
    const updatedMessages = messages.map((msg) => {
      if (msg === message) {
        const updatedReactions = { ...msg.reactions };

        if (reactionType === "thumbsUp") {
          updatedReactions.thumbsUp = updatedReactions.thumbsUp === 1 ? 0 : 1;
          updatedReactions.thumbsDown =
            updatedReactions.thumbsDown === 1 ? 0 : 0;
        } else if (reactionType === "thumbsDown") {
          updatedReactions.thumbsDown =
            updatedReactions.thumbsDown === 1 ? 0 : 1;
          updatedReactions.thumbsUp = updatedReactions.thumbsUp === 1 ? 0 : 0;
        }

        return { ...msg, reactions: updatedReactions };
      }
      return msg;
    });

    setMessages(updatedMessages);
  };

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const question = event.results[last][0].transcript;
      setQuestion(question);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  });

  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const question = event.results[last][0].transcript;
      setQuestion(question);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.start();
  };

  const handleSend = async () => {
    const text = question;
    setQuestion("");
    setisLoading(true);
    // const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const userMessage = {
      text: text,
      isBot: false,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/ask",
        {
          question: text,
        },
        {
          headers: {
            Auth: token,
          },
        }
      );

      const answer = response.data.message;
      // setSpeakOutAnswer(answer);

      const botResponse = {
        text: answer,
        isBot: true,
        reactions: { thumbsUp: 0, thumbsDown: 0 },
      };

      setBotResponse(botResponse);
    } catch (error) {
      console.error(error);
    }
    setisLoading(false);

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };
  useEffect(() => {
    if (
      botResponse &&
      !messages.some((msg) => msg.text === botResponse.text && msg.isBot)
    ) {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }
  }, [botResponse, messages]);

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const handleAboutus = () => {
    navigate("/about-us");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  const handleNarrationClick = (message) => {
    const synth = window.speechSynthesis;

    if (isSpeaking) {
      if (synth.speaking) {
        synth.cancel();
        setIsSpeaking(false);
      }
    } else {
      const newUtterance = new SpeechSynthesisUtterance(message.text);
      setUtterance(newUtterance);
      synth.speak(newUtterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    const handleEnd = () => {
      setIsSpeaking(false);
    };

    if (utterance) {
      utterance.addEventListener("end", handleEnd);
    }

    return () => {
      if (utterance) {
        utterance.removeEventListener("end", handleEnd);
      }
    };
  }, [utterance]);

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <div className="absolute right-6 top-1">
          <img
            src={Eng}
            alt="User Icon"
            width="42"
            height={100}
            onClick={() => {
              setOpenDropdown((prev) => !prev);
            }}
            className="cursor-pointer"
          />
          {openDropdown && (
            <div className="absolute top-14 right-0 bg-[#FFFFFF] border border-gray-400 rounded-md shadow-md p-2 w-32 z-10">
              <ul className="flex flex-col items-center dropdownlist">
                <li
                  onClick={() => {
                    setShowModal(true);
                    closeDropdown();
                  }}
                  className="font-poppins font-bold text-sm text-black p-2 cursor-pointer"
                >
                  Chat History
                </li>
                <li
                  onClick={() => {
                    setShowVideoModal(true);
                    closeDropdown();
                  }}
                  className="font-poppins font-bold text-sm text-black p-2 cursor-pointer"
                >
                  Video Demo
                </li>
                <li
                  onClick={() => {
                    handleAboutus();
                    closeDropdown();
                  }}
                  className="font-poppins font-bold text-sm text-black p-2 cursor-pointer"
                >
                  About Us
                </li>
                <li
                  onClick={() => {
                    handleLogout();
                    closeDropdown();
                  }}
                  className="font-poppins font-bold text-sm text-black p-2 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Chat prompt */}
        <div
          className="min-h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] m-12 flex flex-col bg-[#F8F8F8] rounded-2xl p-2 border-gray-300"
          style={{ ...backgroundStyle, zIndex: 9 }}
        >
          <div className="flex flex-col overflow-y-auto scroll-smooth custom-scrollbar pl-12 pr-12">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex p-2 ${
                  message.isBot ? "bot-message" : "user-message"
                }`}
              >
                <div className="shrink-0 w-8 ml-1 mr-2">
                  <img
                    src={message.isBot ? Logo : userLogo}
                    alt="Logo"
                    className="w-full"
                  />
                </div>

                <div
                  className={`text-justify ${
                    message.isBot ? "bot-bubble" : "user-bubble"
                  }`}
                >
                  {message.isBot && message.reactions && (
                    <div className="flex justify-end">
                      <PiSpeakerHighFill
                        className={`text-lg cursor-pointer ${
                          isSpeaking ? "active" : ""
                        }`}
                        onClick={() => {
                          handleNarrationClick(message);
                        }}
                      />
                    </div>
                  )}
                  {message.text.split("\n").map((line, index) => (
                    <p key={index} className="font-poppins">
                      {line}
                    </p>
                  ))}

                  {
                    <div className="flex mt-2">
                      {message.isBot && message.reactions && (
                        <>
                          <button
                            onClick={() => handleReaction(message, "thumbsUp")}
                            className="text-lg mr-2"
                          >
                            👍 {message.reactions.thumbsUp}
                          </button>
                          <button
                            onClick={() =>
                              handleReaction(message, "thumbsDown")
                            }
                            className="text-lg mr-2"
                          >
                            👎 {message.reactions.thumbsDown}
                          </button>
                        </>
                      )}
                    </div>
                  }
                </div>
              </div>
            ))}
            <div ref={msgEnd} />
            {isLoading && <ChatSkeleton />}
          </div>

          <div className="mt-auto w-full flex flex-col items-center">
            <div className="flex w-4/6 items-center pt-2">
              <div className="flex w-full items-center border border-gray-500 bg-white rounded-xl p-1 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                <input
                  type="text"
                  className="w-full p-2 resize-none outline-none"
                  placeholder="Enter your question here"
                  value={question}
                  onKeyDown={handleEnter}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <IoMdMic
                  className={`text-2xl text-black hover:text-[#83AF8C] cursor-pointer ml-1 ${
                    isListening ? "text-red-500" : ""
                  }`}
                  onClick={startListening}
                />
              </div>
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
        <VideoModal
          isVideoVisible={showVideoModal}
          onVideoClose={() => setShowVideoModal(false)}
        />
      </div>

      <style>
        {`
        .user-message {
            justify-content: flex-end; /* Updated to flex-end to align user messages to the right */
        }

        .user-bubble {
            position: relative;
            background-color: #83AF8C; /* User bubble color */
            color: white; /* Text color for user messages */
            border-radius: 15px 15px 15px 4px; /* Border radius for the user bubble */
            padding: 10px; /* Padding for the user bubble */
            text-align: right; /* Align text to the right */
        }

        .user-bubble::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: -18px; /* Adjust the position of the tail */
            border-width: 20px 20px 0; /* Adjust the size of the tail */
            border-style: solid;
            border-color: #83AF8C transparent transparent transparent; /* Set the tail color to match the user bubble */
        }

        .bot-message {
            justify-content: flex-start; /* Updated to flex-start to align bot messages to the left */
        }

        .bot-bubble {
            position: relative;
            background-color: #ABC2AE; /* Bot bubble color */
            color: black; /* Text color for bot messages */
            border-radius: 15px 15px 15px 15px; /* Border radius for the bot bubble */
            padding: 10px; /* Padding for the bot bubble */
            text-align: left; /* Align text to the left */
        }

        .bot-bubble::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: -15px; /* Adjust the position of the tail */
            border-width: 15px 15px 0; /* Adjust the size of the tail */
            border-style: solid;
            border-color: #ABC2AE transparent transparent transparent; /* Set the tail color to match the bot bubble */
        }
    `}
      </style>
    </motion.div>
  );
}

export default ChatPage;
