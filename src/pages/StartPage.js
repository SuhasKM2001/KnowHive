import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Logo from "../assests/knowhiveLogo.png";

function StartPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/chat");
  };

  const textVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 2,
      transition: {
        duration: 0.8,
        delay: 1.2,
      },
    },
  };

  return (
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center h-screen bg-primary">
          {/* <div className="absolute bottom-0 left-0 top-0 right-0 bg-primary"> */}

          <img src={Logo} alt="KnowHive Logo" width="200" height={200} />

          <TypeAnimation
            sequence={["Welcome to KnowHive Assistant", 1000]}
            speed={50}
            className="py-2 font-poppins text-3xl text-center"
            cursor={false}
          />

          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="py-2 font-poppins text-sm text-center"
          >
            🚀Experience KnowHive in Computing
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="py-2 font-poppins text-sm text-center"
          >
            🔮Find the solutions seamlessly
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="py-2 font-poppins text-sm text-center"
          >
            🌐Elevate your Understanding
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="py-2 font-poppins text-sm text-center"
          >
            ⚙️Simple Interface
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <button
              className="border font-poppins text-base bg-secondary text-white my-2 px-5 py-1 text-center rounded-full"
              onClick={handleButtonClick}
            >
              Let's Start
            </button>
          </motion.div>
        </div>
      </motion.div>
  );
}

export default StartPage;
