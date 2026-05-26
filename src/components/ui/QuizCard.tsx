"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faMusic,
  faGift,
  faMoon,
  faCamera,
  faCakeCandles,
  faQuestion,
  faFaceSmile,
  faUtensils,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { OPTION_LETTERS } from "@/lib/constants";
import styles from "@/styles/QuizPage.module.css";

const iconMap: Record<string, typeof faStar> = {
  "fa-star": faStar,
  "fa-heart": faHeart,
  "fa-music": faMusic,
  "fa-gift": faGift,
  "fa-moon": faMoon,
  "fa-camera": faCamera,
  "fa-cake-candles": faCakeCandles,
  "fa-face-smile": faFaceSmile,
  "fa-utensils": faUtensils,
  "fa-phone": faPhone,
};

interface QuizCardProps {
  icon: string;
  question: string;
  options: string[];
  selectedOption: number | null;
  onAnswer: (index: number) => void;
}

export default function QuizCard({
  icon,
  question,
  options,
  selectedOption,
  onAnswer,
}: QuizCardProps) {
  return (
    <>
      <div className={styles.qIcon}>
        <FontAwesomeIcon icon={iconMap[icon] || faQuestion} />
      </div>
      <p className={styles.qText}>{question}</p>
      <div className={styles.qOptions}>
        {options.map((opt, i) => (
          <button
            key={i}
            className={`${styles.qOption} ${selectedOption === i ? styles.picked : ""}`}
            onClick={() => onAnswer(i)}
            disabled={selectedOption !== null}
          >
            <span className={styles.qOptionLetter}>{OPTION_LETTERS[i]}</span>
            {opt}
          </button>
        ))}
      </div>
    </>
  );
}
