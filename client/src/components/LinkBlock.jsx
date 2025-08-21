import React, { useEffect, useState } from "react";

// import GoogleImage from "../assets/images/googleads.png";
import GenerateLink from "../lib/GenerateLink";
import GoogleAds from "./GoogleAds";

function LinkBlock({ setContinueButton, setNextLink, step }) {
  const [remaining, setRemaining] = useState(null);
  const [timer, setTimer] = useState(localStorage.getItem("start-time"));
  const timerFinished = sessionStorage.getItem("timer-finished");

  useEffect(() => {
    if (timerFinished) {
      setContinueButton(true);
      return;
    }

    const startTime = Date.now() + 17000;
    localStorage.setItem("start-time", startTime);
    setTimer(startTime);
    setRemaining(17);
  }, []);

  useEffect(() => {
    if (!timer) return;

    const endTime = parseInt(timer, 10);
    const tick = () => {
      const newRemaining = Math.floor((endTime - Date.now()) / 1000);

      if (newRemaining == 0) {
        endTimer();
      } else {
        setRemaining(newRemaining);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const endTimer = () => {
    setContinueButton(true);
    setNextLink(GenerateLink());
    localStorage.removeItem("start-time");
    sessionStorage.setItem("timer-finished", true);
    setTimer("");
    setRemaining(0);
  };

  return (
    <div className="mt-2 text-center">
      <div>{step === 1 ? <span>Step 1/2</span> : <span>Step 2/2</span>}</div>
      <GoogleAds />
      {remaining > 0 && <span>Double Tap after {remaining} seconds</span>}
      <GoogleAds />
      {timerFinished && (
        <a href="#continue-button">
          <button className="px-1 mt-1 border text-black border-gray-700 bg-blue-400">
            Double Tap ⬇
          </button>
        </a>
      )}
    </div>
  );
}

export default LinkBlock;
