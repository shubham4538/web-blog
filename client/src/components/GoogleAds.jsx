import React, { useEffect, useState } from "react";

function GoogleAds({ imageClicked }) {
  // const [hover, setHover] = useState(false);

  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (e) {
      console.error("Google Ads Error:", e);
    }
  }, []);

  // useEffect(() => {
  //   const handleBlur = () => {
  //     if (hover) {
  //       console.log("Ad clicked");
  //       imageClicked();
  //     }
  //   };

  //   window.addEventListener("visibilitychange", handleBlur);

  //   return () => {
  //     window.removeEventListener("visibilitychange", handleBlur);
  //   };
  // }, [hover]);

  return (
    <>
      <div
        className="border border-gray-600"
        // onMouseEnter={() => setHover(true)}
        // onMouseLeave={imageClicked}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-8226681368050252"
          data-ad-slot="6251606558"
        ></ins>
      </div>
    </>
  );
}

export default GoogleAds;
