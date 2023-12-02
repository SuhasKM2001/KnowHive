import React from "react";
import Logo from "../assests/knowhiveLogo.png";
import userLogo from "../assests/UserLogo.png";

function ChatHistoryModal({ isVisible, onClose }) {

  if (!isVisible) {
    return null;
  }

  const handleClose = (e) => {
    if (e.target.id === "container") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur flex justify-center items-center"
      id="container"
      onClick={handleClose}
    >
      <div className="w-5/6 h-5/6 flex flex-col">
        <button
          className="text-black text-lg font-semibold place-self-end"
          onClick={onClose}
        >
          X
        </button>

        <div className="bg-[#E0EDE4] rounded overflow-y-auto ">
          {/* <div>
            <h3 className="text-center font-poppins p-1 font-bold">Chat History</h3>
          </div> */}

          <div>
            <div className="bg-[#83AF8C] flex p-2">
              <div className="shrink-0 w-8 ml-1 mr-2">
                <img src={userLogo} alt="KnowHive Logo" className="w-full" />
              </div>
              <div>
                <p className="font-poppins">What is DHCP problem?</p>
              </div>
            </div>

            <div className="bg-[#ABC2AE] flex p-2">
              <div className="shrink-0 w-8 ml-1 mr-2">
                <img src={Logo} alt="KnowHive Logo" className="w-full" />
              </div>
              <div>
                <p className="font-poppins">
                  Answer 
                  Ad velit sit incididunt voluptate consectetur
                  incididunt ex veniam tempor. Sit proident do ullamco pariatur
                  ex pariatur. Dolor commodo pariatur ea magna eiusmod mollit
                  pariatur enim est qui consectetur qui incididunt. Ad consequat
                  nostrud adipisicing et voluptate est. Veniam aliqua enim in
                  ipsum exercitation eu elit pariatur. Est et aliqua adipisicing
                  sit dolore laboris labore ex cillum occaecat consectetur
                  dolor.
                  Ad velit sit incididunt voluptate consectetur
                  incididunt ex veniam tempor. Sit proident do ullamco pariatur
                  ex pariatur. Dolor commodo pariatur ea magna eiusmod mollit
                  pariatur enim est qui consectetur qui incididunt. Ad consequat
                  nostrud adipisicing et voluptate est. Veniam aliqua enim in
                  ipsum exercitation eu elit pariatur. Est et aliqua adipisicing
                  sit dolore laboris labore ex cillum occaecat consectetur
                  dolor.
                  Ad velit sit incididunt voluptate consectetur
                  incididunt ex veniam tempor. Sit proident do ullamco pariatur
                  ex pariatur. Dolor commodo pariatur ea magna eiusmod mollit
                  pariatur enim est qui consectetur qui incididunt. Ad consequat
                  nostrud adipisicing et voluptate est. Veniam aliqua enim in
                  ipsum exercitation eu elit pariatur. Est et aliqua adipisicing
                  sit dolore laboris labore ex cillum occaecat consectetur
                  dolor. Ad velit sit incididunt voluptate consectetur
                  incididunt ex veniam tempor. Sit proident do ullamco pariatur
                  ex pariatur. Dolor commodo pariatur ea magna eiusmod mollit
                  pariatur enim est qui consectetur qui incididunt. Ad consequat
                  nostrud adipisicing et voluptate est. Veniam aliqua enim in
                  ipsum exercitation eu elit pariatur. Est et aliqua adipisicing
                  sit dolore laboris labore ex cillum occaecat consectetur
                  dolor. Ad velit sit incididunt voluptate consectetur
                  incididunt ex veniam tempor. Sit proident do ullamco pariatur
                  ex pariatur. Dolor commodo pariatur ea magna eiusmod mollit
                  pariatur enim est qui consectetur qui incididunt. Ad consequat
                  nostrud adipisicing et voluptate est. Veniam aliqua enim in
                  ipsum exercitation eu elit pariatur. Est et aliqua adipisicing
                  sit dolore laboris labore ex cillum occaecat consectetur
                  dolor. Ad velit sit incididunt voluptate consectetur
                  incididunt ex veniam tempor. Sit proident do ullamco pariatur
                  ex pariatur. Dolor commodo pariatur ea magna eiusmod mollit
                  pariatur enim est qui consectetur qui incididunt. Ad consequat
                  nostrud adipisicing et voluptate est. Veniam aliqua enim in
                  ipsum exercitation eu elit pariatur. Est et aliqua adipisicing
                  sit dolore laboris labore ex cillum occaecat consectetur
                  dolor. Ad velit sit incididunt voluptate consectetur
                  incididunt ex veniam tempor. Sit proident do ullamco pariatur
                  ex pariatur. Dolor commodo pariatur ea magna eiusmod mollit
                  pariatur enim est qui consectetur qui incididunt. Ad consequat
                  nostrud adipisicing et voluptate est. Veniam aliqua enim in
                  ipsum exercitation eu elit pariatur. Est et aliqua adipisicing
                  sit dolore laboris labore ex cillum occaecat consectetur
                  dolor. Ad velit sit incididunt voluptate consectetur
                  incididunt ex veniam tempor. Sit proident do ullamco pariatur
                  ex pariatur. Dolor commodo pariatur ea magna eiusmod mollit
                  pariatur enim est qui consectetur qui incididunt. Ad consequat
                  nostrud adipisicing et voluptate est. Veniam aliqua enim in
                  ipsum exercitation eu elit pariatur. Est et aliqua adipisicing
                  sit dolore laboris labore ex cillum occaecat consectetur
                  dolor. Ad velit sit incididunt voluptate consectetur
                  incididunt ex veniam tempor. Sit proident do ullamco pariatur
                  ex pariatur. Dolor commodo pariatur ea magna eiusmod mollit
                  pariatur enim est qui consectetur qui incididunt. Ad consequat
                  nostrud adipisicing et voluptate est. Veniam aliqua enim in
                  ipsum exercitation eu elit pariatur. Est et aliqua adipisicing
                  sit dolore laboris labore ex cillum occaecat consectetur
                  dolor. Ad velit sit incididunt voluptate consectetur
                  incididunt ex veniam tempor. Sit proident do ullamco pariatur
                  ex pariatur. Dolor commodo pariatur ea magna eiusmod mollit
                  pariatur enim est qui consectetur qui incididunt. Ad consequat
                  nostrud adipisicing et voluptate est. Veniam aliqua enim in
                  ipsum exercitation eu elit pariatur. Est et aliqua adipisicing
                  sit dolore laboris labore ex cillum occaecat consectetur
                  dolor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHistoryModal;
