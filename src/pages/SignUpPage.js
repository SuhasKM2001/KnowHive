import React, { useState } from "react";
import Logo from "../assests/knowhiveLogo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const objectVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 2,
      transition: {
        duration: 0.3,
        delay: 0.2,
      },
    },
  };
  return (
    <motion.div
      variants={objectVariants}
      initial="hidden"
      animate="visible"
      className="py-2 font-poppins text-sm text-center"
    >
      <div className="flex flex-col items-center justify-center h-screen bg-primary">
        <div>
          <img src={Logo} alt="KnowHive Logo" width="150" height={200} />
        </div>

        <div className=" bg-[#f8f8f897] px-4 rounded-lg flex flex-col">
          <h5 className="font-poppins text-xl text-center py-4">Signup</h5>
          <div className="flex border border-[#a5a5a597] bg-white mx-4 my-2 rounded ">
            <input
              value = {username} 
              type="text"
              placeholder="User Name"
              onChange={(e) => setUsername(e.target.value) }
              className="w-full h-full box-border rounded px-7 py-2 focus:outline-none"
            />
            {console.log(username)}
          </div>

          <div className="flex border border-[#a5a5a597] bg-white mx-4 my-2 rounded ">
            <input
              value = {password}
              type={visible ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full box-border rounded px-7 py-2 focus:outline-none"
            />
            <div onClick={() => setVisible(!visible)}>
              { visible ?
            <FaEye className="bg-white h-full pr-1 text-lg rounded cursor-pointer" /> :
            <FaEyeSlash className="bg-white h-full pr-1 text-lg  rounded cursor-pointer" />
              }
            </div>
          </div>

          <div className="flex border border-[#a5a5a597] bg-white mx-4 mt-2 mb-3 rounded ">
            <input
              value={confirmPassword}
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-full box-border rounded px-7 py-2 focus:outline-none"
            />
            <div onClick={()=>setConfirmPasswordVisible(!confirmPasswordVisible)}>
              { confirmPasswordVisible ?
            <FaEye className="bg-white h-full pr-1 text-lg rounded cursor-pointer" /> :
            <FaEyeSlash className="bg-white h-full pr-1 text-lg  rounded cursor-pointer" />
              }
              
            </div>
          </div>

          <button className="border font-poppins text-base bg-secondary text-white mb-1 py-1 text-center rounded-full">
            Signup
          </button>
          <h5 className="font-poppins text-xs text-center mb-4">
            Already have account?{" "}
            <Link to="/login" className="text-secondary underline-offset-1">
              Login
            </Link>
          </h5>
        </div>
      </div>
    </motion.div>
  );
}

export default SignUpPage;
