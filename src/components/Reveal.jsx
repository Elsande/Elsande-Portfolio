import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !window.IntersectionObserver) return;
    const element = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -32px 0px" },
    );
    setVisible(false);
    observer.observe(element);
    const onMotionChange = (event) => {
      if (event.matches) {
        setVisible(true);
        observer.disconnect();
      }
    };
    media.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-visible={visible}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}
