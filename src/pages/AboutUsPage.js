import React from "react";
import TeamMember from "../components/TeamMember"; // Create this component to display team member details
import soumyadipPhoto from "../assests/Soumyadip.png";
import suhasPhoto from "../assests/suhas.png";
import shriyaPhoto from "../assests/Shriya.png";
import shrinidhiPhoto from "../assests/shrinidhi.png";
import dhanushPhoto from "../assests/dhanush.png";
import sufiyanPhoto from "../assests/Sufiyan.png";

const AboutUsPage = () => {
  const teamMembers = [
    { name: "Soumyadip Roy", photo: soumyadipPhoto, additionalInfo: "I am a passionate learner. My hobbies include playing cricket, and I like to listen to songs." },
    { name: "Suhas K M", photo: suhasPhoto , additionalInfo: "I passionately learn and try to upskill myself with the newest technology. My hobby includes playing cricket." },
    { name: "Shriya B Krishnan", photo: shriyaPhoto , additionalInfo: "I'm a keen listener and avid learner. I spend my free time listening to songs and solving crosswords." },
    { name: "Shrinidhi Hedgekar", photo: shrinidhiPhoto , additionalInfo: "I am a multifaceted individual with a passion for dance, a dedicated sports enthusiast, and consistently strong in academic pursuits." },
    { name: "J Dhanush", photo: dhanushPhoto , additionalInfo: "I am passionate about technology. My hobbies are designing and developing IoT based systems, and gaming."},
    { name: "Sufiyan Pasha K", photo: sufiyanPhoto , additionalInfo: "I am someone who loves learning, embraces challenges, and enjoys both cricket and music." },
  ];

  return (
    <div className="min-h-screen bg-[#E0EDE4] p-8">
      <h1 className="text-3xl font-poppins font-bold mb-4">ABOUT US</h1>
      <div className="flex flex-wrap -mx-4">
        
        
          {teamMembers.map((member, index) => (
            <TeamMember key={index} name={member.name} photo={member.photo} additionalInfo={member.additionalInfo} />
          ))}
        
      </div>
    </div>
  );
};

export default AboutUsPage;