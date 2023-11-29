import React, { useState, useEffect } from "react";
import Logo from "../assests/knowhiveLogo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});

  // Use 'useNavigate' from 'react-router-dom'
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/chat");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    const formData = {
      username,
      password,
    };

    if (!username.trim()) {
      validationErrors.username = "Username is required";
    }
  
    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } 
  
    if (Object.keys(validationErrors).length === 0) {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
         // Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(formData));
        navigate("/chat")
        // Redirect or perform other actions upon successful login
      } else {
        alert(data.error || "Login failed");
        // Handle login failure, show error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }else {
    // Update the errors state with validation errors
    setErrors(validationErrors);
  }
  };

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

        <div className=" bg-[#f8f8f897] px-4 rounded-lg flex flex-col py-2">
          <h5 className="font-poppins text-xl text-center py-4">Login</h5>

          <form onSubmit={handleSubmit}>
            <div className="flex border border-[#a5a5a597] bg-white mx-4 mt-2 rounded ">
              <input
                value={username}
                type="text"
                name="username"
                placeholder="User Name"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-full box-border rounded px-7 py-2 focus:outline-none"
              />
            </div>
            {errors.username && (
              <h6 className="text-left mx-5 text-xs mb-3 text-red-500">
                {errors.username}
              </h6>
            )}

            <div className="flex border border-[#a5a5a597] bg-white mx-4 mt-2  rounded ">
              <input
                value={password}
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-full box-border rounded px-7 py-2 focus:outline-none"
              />

              <div onClick={() => setVisible(!visible)}>
                {visible ? (
                  <FaEye className="bg-white h-full pr-1 text-lg  rounded cursor-pointer" />
                ) : (
                  <FaEyeSlash className="bg-white h-full pr-1 text-lg  rounded cursor-pointer" />
                )}
              </div>
            </div>
            {errors.password && (
              <h6 className="text-left mx-5 text-xs mb-3 text-red-500">
                {errors.password}
              </h6>
            )}
            {/* <h5 className="font-poppins text-xs text-center mb-4">Forgot password ?</h5> */}
            <button className="border font-poppins text-base bg-secondary text-white w-full mt-2 mb-1 py-1 text-center rounded-full">
              Login
            </button>
          </form>
          <h5 className="font-poppins text-xs text-center mb-4">
            Don't have account?{" "}
            <Link to="/signup" className="text-secondary">
              SignUp
            </Link>
          </h5>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginPage;