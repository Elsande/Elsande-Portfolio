import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "../hooks/usePreferences";

export default function Loader() {
  const [visible, setVisible] = useState(
    () =>
      !readStorage("portfolio-visited", true) &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!visible) return;
    writeStorage("portfolio-visited", "1", true);
    const timer = window.setTimeout(() => setVisible(false), 2000);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (event) => {
      if (event.matches) setVisible(false);
    };
    media.addEventListener("change", onMotionChange);
    return () => {
      window.clearTimeout(timer);
      media.removeEventListener("change", onMotionChange);
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div
      id="loader"
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setVisible(false);
      }}
    >
      <div className="loader-top">
        <span>IFFO ELSANDE</span>
        <span>PORTFOLIO / {new Date().getFullYear()}</span>
      </div>
      <div className="loader-center">
        <span className="loader-monogram">
          ie<span>.</span>
        </span>
        <span className="loader-rule" />
        <span className="loader-caption">AI &amp; DATA PROFESSIONAL</span>
      </div>
      <div className="loader-bottom">
        <span>Surabaya, Indonesia</span>
        <span>Welcome in.</span>
      </div>
    </div>
  );
}
