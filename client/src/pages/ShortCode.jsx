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
        console.log(params);
        const link = GenerateLink();
        navigate(link, { state: { code: params } });
      }
    } else {
      navigate("/");
    }
  }, []);

  return null;
}

export default ShortCode;
