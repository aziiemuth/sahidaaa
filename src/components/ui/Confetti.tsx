"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  "#e05a9e",
  "#f08cc8",
  "#fce4f2",
  "#d4a84b",
  "#f0c96a",
  "#c05a3c",
  "#e8857a",
  "#fdf0e0",
];

export default function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const el = document.createElement("div");
      const size = 5 + Math.random() * 7;
      el.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9097;
        width: ${size}px;
        height: ${size * 1.8}px;
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        left: ${Math.random() * 100}vw;
        top: -20px;
        border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      `;
      containerRef.current.appendChild(el);

      el.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          {
            transform: `translateY(105vh) rotate(${Math.random() * 720}deg)`,
            opacity: 0.12,
          },
        ],
        { duration: 1800 + Math.random() * 2000, easing: "ease-in" }
      ).onfinish = () => el.remove();
    }, 90);

    const cleanup = setTimeout(() => clearInterval(interval), 5500);

    return () => {
      clearInterval(interval);
      clearTimeout(cleanup);
    };
  }, []);

  return <div ref={containerRef} />;
}
