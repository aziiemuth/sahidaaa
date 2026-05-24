"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faMusic } from "@fortawesome/free-solid-svg-icons";
import { RESULT_COMMENTS } from "@/lib/constants";
import styles from "@/styles/QuizPage.module.css";

interface QuizResultProps {
  score: number;
  total: number;
  onContinue: () => void;
}

export default function QuizResult({
  score,
  total,
  onContinue,
}: QuizResultProps) {
  // Menggunakan useState dan useEffect untuk randomisasi di client-side guna menghindari error hidrasi
  const [comment, setComment] = useState(
    RESULT_COMMENTS[score % RESULT_COMMENTS.length]
  );

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * RESULT_COMMENTS.length);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setComment(RESULT_COMMENTS[randomIndex]);
  }, [score]);

  return (
    <div className={styles.resultWrap}>
      <div className={styles.trophyWrap}>
        <FontAwesomeIcon icon={faTrophy} />
      </div>
      <h3 className={styles.resultTitle}>Selesai! ✨</h3>
      <span className={styles.bigScore}>
        {score}/{total} ⭐
      </span>
      <p className={styles.resultComment}>{comment}</p>
      <button className={styles.goBtn} onClick={onContinue}>
        <FontAwesomeIcon icon={faMusic} /> Lanjut ke Musik
      </button>
    </div>
  );
}
