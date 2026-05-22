"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faStar } from "@fortawesome/free-solid-svg-icons";
import CakeScene from "@/components/ui/CakeScene";
import Confetti from "@/components/ui/Confetti";
import styles from "@/styles/BirthdayPage.module.css";

interface BirthdayPageProps {
  onEnter: () => void;
}

export default function BirthdayPage({ onEnter }: BirthdayPageProps) {
  return (
    <section className={styles.page}>
      <p className={styles.eyebrow}>
        <FontAwesomeIcon icon={faStar} /> &nbsp;You&apos;re Invited To&nbsp;{" "}
        <FontAwesomeIcon icon={faStar} />
      </p>
      <h1 className={styles.heading}>
        Birthday
        <br />
        Party
      </h1>

      <CakeScene />
      <Confetti />

      <p className={styles.name}>Sahida</p>

      <button className={styles.goBtn} onClick={onEnter}>
        <FontAwesomeIcon icon={faDoorOpen} /> Let&apos;s Go Inside!
      </button>
    </section>
  );
}
