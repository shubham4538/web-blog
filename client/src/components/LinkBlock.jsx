import React, { useEffect, useState } from "react";

import GoogleImage from "../assets/images/googleads.png";
import GenerateLink from "../lib/GenerateLink";
import GoogleAds from "./GoogleAds";

function LinkBlock({ setContinueButton, setNextLink }) {
  const [remaining, setRemaining] = useState(null);
  const timer = localStorage.getItem("start-time");

  useEffect(() => {
    if (!timer) return;
    const endTime = parseInt(timer, 10);

    const tick = () => {
      const newRemaining = Math.floor((endTime - Date.now()) / 1000);

      if (newRemaining <= 0) {
        endTimer();
      } else {
        setRemaining(newRemaining);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const imageCliked = () => {
    const startTime = Date.now() + 17000;
    localStorage.setItem("start-time", startTime);
    setRemaining(17);
  };

  const endTimer = () => {
    setContinueButton(true);
    setNextLink(GenerateLink());
    localStorage.removeItem("start-time");
    setRemaining(0);
  };

  return (
    <div>
      <a href="/wed">
        <img src={GoogleImage} alt="google-ads" onClick={imageCliked} />
      </a>
      {/* <!-- Timer Ads --> */}
      <GoogleAds data={"data2"} imageCliked={imageCliked} />
      <div className="text-center">
        {remaining === null && <p>Click the ad and wait 15 seconds</p>}

        {remaining > 0 && <p>Click the button after {remaining} seconds</p>}

        {remaining === 0 && <p>Scroll down to continue</p>}
      </div>

      <div className="text-center"></div>
      <a href="/wed" target="_blank">
        <img src={GoogleImage} alt="google-ads" onClick={imageCliked} />
      </a>
    </div>
  );
}

export default LinkBlock;
