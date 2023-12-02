import React from 'react'
import { useNavigate } from "react-router-dom";


function DropDownList({setShowModal}) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
       };
  return (
    <div className="flex flex-col">
        <ul className= "absolute top-14 right-3 border border-gray-500 bg-[#F8F8F8] rounded-lg flex flex-col gap-4 p-1 items-center dropdownlist">
            <li className="cursor-pointer hover:text-[#83AF8C]" onClick={() => setShowModal(true)}>Chat History</li>
            <li className="cursor-pointer hover:text-[#83AF8C]" onClick={handleLogout}>Logout</li>
        </ul>
    </div>
  )
}

export default DropDownList