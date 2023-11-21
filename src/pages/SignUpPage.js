import React, { useState } from "react";
import Logo from "../assests/knowhiveLogo.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
  
    // Validate form fields...
    if (!username.trim()) {
      validationErrors.username = "Username is required";
    }
  
    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}/.test(password)) {
      validationErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long";
    }
  
    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Make a POST request to the signup endpoint of your Flask backend
        const response = await axios.post(
          "http://127.0.0.1:5000/signup",
          {
            username,
            password,
            confirm_password: confirmPassword,
          }
        );
  
        if (response.status === 200) {
          alert("Account Created Successfully");
          navigate("/login"); // Navigate to the login page upon successful signup
        } else {
          // Handle other response statuses as needed
          console.error("Signup failed");
        }
      } catch (error) {
        // Handle errors
        console.error("Error during signup:", error.response);
  
        // Update the errors state with validation errors if available
        if (error.response && error.response.data && error.response.data.error) {
          // Display the specific error message
          alert(error.response.data.error);
      } else if (error.response && error.response.data && error.response.data.errors) {
          // Update the errors state with validation errors if available
          setErrors(error.response.data.errors);
      }
  }
} else {
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

        <div className=" bg-[#f8f8f897] px-4 rounded-lg flex flex-col">
          <h5 className="font-poppins text-xl text-center py-4">Signup</h5>

          <form onSubmit={handleSubmit}>
            <div className="flex border border-[#a5a5a597] bg-white mx-4 my-2 rounded ">
              <input
                value={username}
                type="text"
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

            <div className="flex border border-[#a5a5a597] bg-white mx-4 my-2 rounded ">
              <input
                value={password}
                type={visible ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-full box-border rounded px-7 py-2 focus:outline-none"
              />
              <div onClick={() => setVisible(!visible)}>
                {visible ? (
                  <FaEye className="bg-white h-full pr-1 text-lg rounded cursor-pointer" />
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

            <div className="flex border border-[#a5a5a597] bg-white mx-4 mt-2 mb-3 rounded ">
              <input
                value={confirmPassword}
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-full box-border rounded px-7 py-2 focus:outline-none"
              />
              <div
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                {confirmPasswordVisible ? (
                  <FaEye className="bg-white h-full pr-1 text-lg rounded cursor-pointer" />
                ) : (
                  <FaEyeSlash className="bg-white h-full pr-1 text-lg  rounded cursor-pointer" />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <h6 className="text-left mx-5 text-xs mb-3 text-red-500">
                {errors.confirmPassword}
              </h6>
            )}

            <button className="border font-poppins text-base bg-secondary text-white w-full mb-1 py-1 text-center rounded-full">
              Signup
            </button>
          </form>
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