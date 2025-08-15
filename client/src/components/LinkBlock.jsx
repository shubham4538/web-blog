import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import GoogleImage from "../assets/images/googleads.png";
import GenerateLink from "../lib/GenerateLink";

function LinkBlock({ setContinueButton, setNextLink }) {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [remainingTime, setRemainingTime] = useState(null);
  const { state } = useLocation();

  // Clear state after 5 minutes
  // window.history.replaceState({}, '')

  const endTimer = () => {
    setIsTimeUp(true);
    setContinueButton(true);
    if (state) {
      const link = GenerateLink();
      setNextLink(link);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);

      if (elapsedTime > 20) {
        clearInterval(timer);
        endTimer();
      }
      if (remainingTime !== null) {
        setRemainingTime(16 - elapsedTime);
      }
      if (elapsedTime == 16) {
        endTimer();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [remainingTime]);

  const imageCliked = () => {
    if (remainingTime == null) {
      setRemainingTime(15);
      setStartTime(Date.now());
    }
  };

  return (
    <div>
      {/* <a href="/wed" target="_blank">
        <img src={GoogleImage} alt="google-ads" onClick={imageCliked} />
      </a> */}
      {/* <!-- Timer Ads --> */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8226681368050252"
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8226681368050252"
        data-ad-slot="6251606558"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

      <div className="text-center">
        {!isTimeUp ? (
          remainingTime ? (
            <p>Wait for {remainingTime} seconds...</p>
          ) : (
            <p>Click the ad above or below and wait for 15 seconds...</p>
          )
        ) : (
          <p>scroll down and click continue</p>
        )}
      </div>
      <a href="/wed" target="_blank">
        <img src={GoogleImage} alt="google-ads" onClick={imageCliked} />
      </a>
    </div>
  );
}

export default LinkBlock;
