import React, { useEffect } from "react";

function GoogleAds({ data }) {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      if (window.adsbygoogle.loaded === false) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("Google Ads Error:", e);
    }
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8226681368050252"
        data-ad-slot="6251606558"
      ></ins>
    </div>
  );
}

export default GoogleAds;
