"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components.module.css";

interface NumPadProps {
  onKey: (digit: string) => void;
  onClear: () => void;
  onSubmit: () => void;
}

export default function NumPad({ onKey, onClear, onSubmit }: NumPadProps) {
  return (
    <div className={styles.numpad}>
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
        <button
          key={digit}
          className={styles.numKey}
          onClick={() => onKey(digit)}
        >
          {digit}
        </button>
      ))}
      <button
        className={`${styles.numKey} ${styles.numKeyDel}`}
        onClick={onClear}
      >
        <FontAwesomeIcon icon={faDeleteLeft} />
      </button>
      <button className={styles.numKey} onClick={() => onKey("0")}>
        0
      </button>
      <button
        className={`${styles.numKey} ${styles.numKeyOk}`}
        onClick={onSubmit}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
}
