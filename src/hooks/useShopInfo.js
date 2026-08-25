import { useEffect, useState } from "react";
import { fetchShopInfo } from "../features/content/api/contentApi";

/** Shop contact details / story. Used by the footer and every content page. */
export function useShopInfo() {
  const [shopInfo, setShopInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchShopInfo()
      .then(setShopInfo)
      .catch(() => setShopInfo(null))
      .finally(() => setIsLoading(false));
  }, []);

  return { shopInfo, isLoading };
}
