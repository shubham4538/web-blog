import React, { useEffect, useState } from "react";

import GoogleImage from "../assets/images/googleads.png";
import GenerateLink from "../lib/GenerateLink";
import GoogleAds from "./GoogleAds";

function LinkBlock({ setContinueButton, setNextLink }) {
  const [remaining, setRemaining] = useState(17);
  const timer = localStorage.getItem("start-time");

  useEffect(() => {
    if (!timer) return;

    const elapsed = Math.floor((timer - Date.now()) / 1000);
    const newRemaining = remaining - elapsed;

    if (newRemaining <= 0) {
      endTimer();
    } else {
      setRemaining(newRemaining);
    }

    const tick = () => {};
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  const imageCliked = () => {
    const startTime = Date.now() + 17000;
    localStorage.setItem("start-time", startTime);
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
        {timer ? (
          <p className="text-gray-500 text-sm">
            You can continue in {remaining} seconds
          </p>
        ) : (
          <p className="text-gray-500 text-sm">
            Click the ad to and wait 15 seconds
          </p>
        )}
      </div>

      <div className="text-center"></div>
      <a href="/wed" target="_blank">
        <img src={GoogleImage} alt="google-ads" onClick={imageCliked} />
      </a>
    </div>
  );
}

export default LinkBlock;
