import React, { useEffect } from "react";

function GoogleAds() {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (e) {
      console.error("Google Ads Error:", e);
    }
  }, []);

  return (
    <>
      <div className="border border-gray-600">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8226681368050252"
          data-ad-slot="7191414055"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </>
  );
}

export default GoogleAds;
