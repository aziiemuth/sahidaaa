"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function useTypewriter(text: string, speed: number = 22) {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);

  const start = useCallback(() => {
    indexRef.current = 0;
    setDisplayText("");
    setIsDone(false);
  }, []);

  useEffect(() => {
    if (isDone) return;

    const timer = setTimeout(() => {
      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setIsDone(true);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, text, speed, isDone]);

  return { displayText, isDone, start };
}
