import React, { useState, useEffect, useRef } from "react";
import "./loading.css";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setFadeOut(true);
      setTimeout(() => setIsVisible(false), 600); // Allow fade-out animation to complete
    };

    video.addEventListener("ended", handleVideoEnd);
    return () => video.removeEventListener("ended", handleVideoEnd);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`video-loader-container ${fadeOut ? "fade-out" : ""}`}>
      <video
        ref={videoRef}
        className="loader-video"
        autoPlay
        playsInline
        muted
        src="/CYNET.mp4"
      />
    </div>
  );
};

export default LoadingScreen;
