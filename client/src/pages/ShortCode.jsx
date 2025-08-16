import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import GenerateLink from "../lib/GenerateLink";

function ShortCode() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (location.search) {
      const params = searchParams.get("lc");
      if (params) {
        localStorage.setItem(
          "short-code",
          JSON.stringify({ step: 1, code: params })
        );
        const link = GenerateLink();
        navigate(link);
      }
    } else {
      navigate("/");
    }
  }, []);

  return null;
}

export default ShortCode;
