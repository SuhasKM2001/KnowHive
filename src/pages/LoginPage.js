import React from "react";
import Logo from "../assests/knowhiveLogo.png";
import { Link } from "react-router-dom";

function LoginPage() {
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary">
      <div>
      <img src={Logo} alt="KnowHive Logo" width="150" height={200} />
      </div>

      <div className=" bg-[#f8f8f897] px-4 rounded-lg flex flex-col">
        <h5 className="font-poppins text-xl text-center py-4">Login</h5>
          <div>
            <input
              type="text"
              className="border border-[#a5a5a597] rounded px-7 py-2 mx-4 my-2"
              placeholder="User Name"

            />
          </div>
          <div>
            <input
              type="password"
              className="border border-[#a5a5a597] rounded px-7 py-2 mx-4 mt-2 mb-3"
              placeholder="Password"
            />
          </div>
        {/* <h5 className="font-poppins text-xs text-center mb-4">Forgot password ?</h5> */}
        <button className="border font-poppins text-base bg-secondary text-white mb-1 py-1 text-center rounded-full">Login</button>
        <h5 className="font-poppins text-xs text-center mb-4">Don't have account? <Link to="/signup" className="text-secondary underline-offset-1">SignUp</Link></h5>
      </div>
    </div>
  );
}

export default LoginPage;
