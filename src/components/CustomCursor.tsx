"use client";

import { useEffect, useRef } from "react";
import useMousePosition from "@/hooks/useMousePosition";
import styles from "@/styles/CustomCursor.module.css";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const ringRef = useRef({ x: 0, y: 0 });
  const ringElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    function followRing() {
      ringRef.current.x += (x - ringRef.current.x) * 0.14;
      ringRef.current.y += (y - ringRef.current.y) * 0.14;
      if (ringElRef.current) {
        ringElRef.current.style.left = ringRef.current.x + "px";
        ringElRef.current.style.top = ringRef.current.y + "px";
      }
      animId = requestAnimationFrame(followRing);
    }
    followRing();
    return () => cancelAnimationFrame(animId);
  }, [x, y]);

  return (
    <>
      <div className={styles.cursor} style={{ left: x, top: y }} />
      <div className={styles.ring} ref={ringElRef} />
    </>
  );
}
