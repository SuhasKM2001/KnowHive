import React, { useState, useEffect } from "react";
import Logo from "../assests/knowhiveLogo.png";
import userLogo from "../assests/UserLogo.png";
import axios from "axios";

function ChatHistoryModal({ isVisible, onClose }) {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication

  useEffect(() => {
    // Fetch conversation history when the modal is opened
    // console.log("Fetching conversation history...");

    if (isVisible) {
      // const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      // console.log("Token-", token);
      axios
        .get("http://127.0.0.1:5000/conversation-history", {
          headers: {
            Auth: token,
          },
        })
        .then((response) => {
          // console.log("conversation history response", response);

          // Check if the response contains 'history' key
          if ("history" in response.data) {
            setConversationHistory(response.data.history || []);
          } else {
            setConversationHistory([]); // Set an empty array if 'history' key is missing
          }

          setIsAuthenticated(true); // Set user as authenticated when history is fetched
        })
        .catch((error) => {
          // Handle unauthorized access (redirect to login)
          console.error("conversation history error", error);
          if (error.response && error.response.status === 401) {
            setIsAuthenticated(false);
            console.log(
              "User not authenticated - Redirect to login or show login modal"
            );
            // Redirect to login page or show a login modal
            // Example: history.push("/login") or setShowLoginModal(true)
          }
        });
    }
  }, [isVisible]);

  console.log("Rendering ChatHistoryModal, isAuthenticated:", isAuthenticated);

  if (!isVisible || !isAuthenticated) {
    console.log("Modal not visible or user not authenticated");
    return null;
  }

  console.log(
    "Modal is visible and user is authenticated. Rendering the modal..."
  );

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

        <div className="bg-[#E0EDE4] rounded overflow-y-auto">
          {conversationHistory.map((entry, index) => (
            <div key={`entry-${index}`}>
              <div
                className={`bg-${
                  index % 2 === 0 ? "secondary" : "primary"
                } flex p-2`}
              >
                <div className="shrink-0 w-8 ml-1 mr-2">
                  <img src={userLogo} alt="KnowHive Logo" className="w-full" />
                </div>
                <div>
                  <p className="font-poppins">{entry.question}</p>
                </div>
              </div>

              <div
                className={`bg-${
                  index % 2 === 0 ? "secondary" : "primary"
                } flex p-2`}
              >
                <div className="shrink-0 w-8 ml-1 mr-2">
                  <img src={Logo} alt="KnowHive Logo" className="w-full" />
                </div>
                <div>
                  {/* <pre className="font-poppins">{entry.answer}</pre> */}
                  <p className="font-poppins">
                    {entry.answer
                      .split("\n")
                      .map((line, i) => [
                        line,
                        i < entry.answer.split("\n").length - 1 && (
                          <br key={`br-${i}`} />
                        ),
                      ])}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatHistoryModal;
