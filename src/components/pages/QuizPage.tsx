"use client";

import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faFaceSmileWink } from "@fortawesome/free-solid-svg-icons";
import { QUIZ_QUESTIONS } from "@/lib/constants";
import QuizCard from "@/components/ui/QuizCard";
import QuizResult from "@/components/ui/QuizResult";
import styles from "@/styles/QuizPage.module.css";

interface QuizPageProps {
  onComplete: () => void;
}

export default function QuizPage({ onComplete }: QuizPageProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleAnswer = useCallback(
    (index: number) => {
      setSelectedOption(index);
      setScore((prev) => prev + 1);
      
      // Wait for user to see the picked option (600ms)
      setTimeout(() => {
        setIsExiting(true);
        
        // Wait for exit slide animation to complete (300ms)
        setTimeout(() => {
          setSelectedOption(null);
          setIsExiting(false);
          if (currentQ + 1 >= QUIZ_QUESTIONS.length) {
            setShowResult(true);
          } else {
            setCurrentQ((prev) => prev + 1);
          }
        }, 300);
      }, 600);
    },
    [currentQ]
  );

  const total = QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[currentQ];

  return (
    <section className={styles.page}>
      <div className={styles.shell}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <FontAwesomeIcon icon={faHeart} /> Quiz Spesial
          </div>
          <span className={styles.counter}>
            {currentQ + 1} / {total}
          </span>
        </div>

        {/* Progress bar */}
        <div className={styles.progress}>
          <div
            className={styles.progressFill}
            style={{
              width: `${showResult ? 100 : (currentQ / total) * 100}%`,
            }}
          />
        </div>

        {/* Quiz card */}
        <div
          className={`${styles.quizCard} ${isExiting ? styles.slideOut : styles.slideIn}`}
          key={showResult ? "result" : currentQ}
        >
          {!showResult ? (
            <QuizCard
              icon={q.icon}
              question={`Q${currentQ + 1}. ${q.question}`}
              options={q.options}
              selectedOption={selectedOption}
              onAnswer={handleAnswer}
            />
          ) : (
            <QuizResult
              score={score}
              total={total}
              onContinue={onComplete}
            />
          )}
        </div>

        {/* Hint */}
        {!showResult && (
          <p className={styles.hint}>
            <FontAwesomeIcon icon={faFaceSmileWink} /> Jawab jujur ya!
          </p>
        )}
      </div>
    </section>
  );
}
