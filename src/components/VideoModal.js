import React from "react";

function VideoModal({ isVideoVisible, onVideoClose }) {
  if (!isVideoVisible) return null;

  const handleVideoClose = (e) => {
    if (e.target.id === "container") {
      onVideoClose();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex justify-center items-center"
      id="container"
      onClick={handleVideoClose}
    >
      <div className="flex flex-col w-3/5">
        <button
          className="text-black text-lg font-semibold place-self-end"
          onClick={() => onVideoClose()}
        >
          X
        </button>
        <div className="relative w-full overflow-hidden pt-[56.25%] ">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/I5eFmRb5bAE?si=-eUv3rBwOy6neylJ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
