import React from "react";
import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/chat");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary">
      <h3 className="py-2 font-poppins text-3xl text-center">
        Welcome to KnowHive Assistant
      </h3>
      <h6 className="py-2 font-poppins text-sm text-center">
        🚀Experience KnowHive in Computing
      </h6>
      <h6 className="py-2 font-poppins text-sm text-center">
        🔮Find the solutions seamlessly
      </h6>
      <h6 className="py-2 font-poppins text-sm text-center">
        🌐Elevate your Understanding
      </h6>
      <h6 className="py-2 font-poppins text-sm text-center">
        ⚙️Simple Interface
      </h6>
      <button
        className="border font-poppins text-base bg-secondary text-white my-2 px-5 py-1 text-center rounded-full"
        onClick={handleButtonClick}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartPage;
