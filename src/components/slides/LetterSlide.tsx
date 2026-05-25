"use client";

import { useEffect, useRef } from "react";
import useTypewriter from "@/hooks/useTypewriter";
import { LETTER_TEXT } from "@/lib/constants";
import styles from "@/styles/LetterSlide.module.css";

interface LetterSlideProps {
  onClose: () => void;
}

export default function LetterSlide({ onClose }: LetterSlideProps) {
  const { displayText, isDone, start } = useTypewriter(LETTER_TEXT, 22);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [displayText]);

  return (
    <section className={styles.slide}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onClose}>
          ←
        </button>
        <div className={styles.heading}>
          <h2 className={styles.title}>✉️ Surat Untukmu</h2>
          <p className={styles.subtitle}>♡ Dari hati Athif yang paling dalam</p>
        </div>
        <div className={styles.spacer} />
      </div>

      {/* Letter card */}
      <div className={styles.letterWrap}>
        <div className={styles.letterCard}>
          <div className={styles.letterHeader}>
            <div className={styles.envelope}>✉️</div>
            <div>
              <p className={styles.letterTo}>Kepada Yth.</p>
              <p className={styles.letterName}>Sahida ♡</p>
            </div>
          </div>
          <p className={styles.typedText}>
            {displayText}{!isDone && <span className={styles.blinkCursor} />}
          </p>
        </div>
      </div>
      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </section>
  );
}
