import React from "react";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Logo from "../assests/knowhiveLogo.png";

function ChatSkeleton() {
  const textVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 2,
    },
  };

  return (
    <SkeletonTheme baseColor="#ABC2AE" highlightColor="#a6baa8">
      <motion.div
        variants={textVariants}
        initial="hidden"
        exit={{ scaleY: 0 }}
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <div className="flex bot-message">
          <div className="shrink-0 w-8 ml-1 mr-2">
            {/* <Skeleton circle width={26} height={26}/> */}
            <img src={Logo} alt="Logo" className="w-full" />
          </div>
          <div className="chat-bubble">
            <Skeleton count={5} />
          </div>

          <style>
            {`
        .bot-message {
            justify-content: flex-start; 
        }

        .chat-bubble {
            width:60%;
            position: relative;
            background-color: #c8e0cb; /* Bot bubble color */
            border-radius: 15px 15px 15px 15px; /* Border radius for the bot bubble */
            padding: 10px; /* Padding for the bot bubble */
            text-align: left; /* Align text to the left */
        }

        .chat-bubble::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: -15px; /* Adjust the position of the tail */
            border-width: 15px 15px 0; /* Adjust the size of the tail */
            border-style: solid;
            border-color: #c8e0cb transparent transparent transparent; /* Set the tail color to match the bot bubble */
        }

       
    `}
          </style>
        </div>
      </motion.div>
    </SkeletonTheme>
  );
}

export default ChatSkeleton;
