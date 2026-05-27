"use client";

import { useState, useEffect } from "react";
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
import Lightbox from "@/components/ui/Lightbox";

interface HeroGridProps {
  name: string;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isBirthday: boolean;
  };
}

const HERO_IMAGES = [
  "/images/sahida.png",
  "/images/sahida2.png",
  "/images/sahida3.png",
  "/images/sahida4.jpg",
];

export default function HeroGrid({
  name,
  countdown,
}: HeroGridProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000); // Ganti foto setiap 4 detik
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className={styles.heroGrid}>
        <div className={styles.heroMedia}>
          <div className={styles.heroMediaInner} onClick={() => setShowLightbox(true)}>
            {HERO_IMAGES.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`Foto ${name} ${index + 1}`}
                width={220}
                height={220}
                className={`${styles.heroImage} ${index === currentImageIndex ? styles.activeImage : ""}`}
                priority={index === 0}
              />
            ))}
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
    {showLightbox && (
      <Lightbox src={HERO_IMAGES[currentImageIndex]} onClose={() => setShowLightbox(false)} />
    )}
    </>
  );
}
