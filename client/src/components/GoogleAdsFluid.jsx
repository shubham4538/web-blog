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
          class="adsbygoogle"
          style={{ display: "block" }}
          data-ad-format="fluid"
          data-ad-layout-key="-5v+br-d-1o+ll"
          data-ad-client="ca-pub-8226681368050252"
          data-ad-slot="2291932829"
        ></ins>
      </div>
    </>
  );
}

export default GoogleAds;
