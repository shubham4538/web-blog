import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import GoogleImage from "../assets/images/googleads.png";
import GenerateLink from "../lib/GenerateLink";
import GoogleAds from "./GoogleAds";

function LinkBlock({ setContinueButton, setNextLink }) {
  const { state } = useLocation();

  const imageCliked = () => {
    console.log(state);
  };

  return (
    <div>
      <a href="/wed">
        <img src={GoogleImage} alt="google-ads" onClick={imageCliked} />
      </a>
      {/* <!-- Timer Ads --> */}
      <GoogleAds data={"data2"} imageCliked={imageCliked} />

      <div className="text-center"></div>
      <a href="/wed" target="_blank">
        <img src={GoogleImage} alt="google-ads" onClick={imageCliked} />
      </a>
    </div>
  );
}

export default LinkBlock;
