import React from "react";

const TeamMember = ({ name, photo, additionalInfo }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 text-center mb-8 px-4">
      <div className="bg-white rounded-lg inline-block p-5 pt-4 pb-8 max-w-xs">
        <div className="grid grid-rows-4 gap-2 h-64">
          <div className="row-span-3">
            <img src={photo} alt={name} className="w-40 h-40 mb-2 rounded-md mx-auto" />
          </div>
          <div className="row-span-1 text-center">
          <p className="text-lg font-poppins font-semibold mb-2" style={{ marginTop: '-1.5rem' }}>{name}</p> 
            <p className="text-sm font-poppins text-gray-600">{additionalInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TeamMember;