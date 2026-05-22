"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandSparkles,
  faHeart,
  faClock,
  faCakeCandles,
} from "@fortawesome/free-solid-svg-icons";
import { faHourglass } from "@fortawesome/free-regular-svg-icons";
import styles from "@/styles/MainPage.module.css";

interface HeroGridProps {
  imageSrc: string;
  name: string;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isBirthday: boolean;
  };
}

export default function HeroGrid({
  imageSrc,
  name,
  countdown,
}: HeroGridProps) {
  return (
    <div className={styles.heroGrid}>
      <div className={styles.heroMedia}>
        <div className={styles.heroMediaInner}>
          <Image
            src={imageSrc}
            alt={`Foto ${name}`}
            width={220}
            height={220}
            className={styles.heroImage}
            priority
          />
        </div>
      </div>
      <div className={styles.heroInfo}>
        <p className={styles.heroGreeting}>
          <FontAwesomeIcon icon={faWandSparkles} /> Happy Birthday
        </p>
        <h2 className={styles.heroName}>
          <span className={styles.heroNameHighlight}>Selamat Ulang Tahun,</span>
          <br />
          {name}!{" "}
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: "var(--pri-mid)" }}
          />
        </h2>
        <div className={styles.cdCard}>
          <div className={styles.cdIcon}>
            <FontAwesomeIcon icon={faHourglass} />
          </div>
          <div className={styles.cdInfo}>
            <div className={styles.cdLabel}>
              <FontAwesomeIcon icon={faClock} /> Countdown
            </div>
            <div className={styles.cdValue}>
              {countdown.isBirthday ? (
                <>
                  <FontAwesomeIcon icon={faCakeCandles} /> Happy Birthday!
                </>
              ) : (
                <>
                  <b>{countdown.days}</b>d <b>{countdown.hours}</b>h{" "}
                  <b>{countdown.minutes}</b>m <b>{countdown.seconds}</b>s
                </>
              )}
            </div>
          </div>
        </div>
        <p className={styles.dobTag}>📅 3 Juni 2006</p>
      </div>
    </div>
  );
}
