import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router does client-side navigation, which - unlike a normal page
 * load - does not reset scroll position. Without this, clicking a link
 * while scrolled down (e.g. the category banners on Home) lands you on the
 * new page still scrolled down. Runs on every route change, site-wide.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
