"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faImages,
  faArrowUpRightFromSquare,
  faHeartPulse,
  faPaperPlane,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/MainPage.module.css";

const iconMap: Record<string, typeof faEnvelopeOpenText> = {
  envelope: faEnvelopeOpenText,
  images: faImages,
  "paper-plane": faPaperPlane,
  gamepad: faGamepad,
};

interface NavCardProps {
  icon: string;
  title: string;
  subtitle: string;
  color: "pink" | "purple" | "green" | "orange";
  isFullWidth?: boolean;
  onClick: () => void;
}

export default function NavCard({
  icon,
  title,
  subtitle,
  color,
  isFullWidth = false,
  onClick,
}: NavCardProps) {
  const colorClass =
    color === "pink"
      ? styles.ncLetter
      : color === "purple"
      ? styles.ncGallery
      : color === "orange"
      ? styles.ncGame
      : styles.ncWhatsapp;

  const iconColorClass =
    color === "pink"
      ? styles.ncIconPink
      : color === "purple"
      ? styles.ncIconPurple
      : color === "orange"
      ? styles.ncIconOrange
      : styles.ncIconGreen;

  return (
    <div
      className={`${styles.navCard} ${colorClass} ${
        isFullWidth ? styles.navCardFull : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.ncTop}>
        <div className={`${styles.ncIcon} ${iconColorClass}`}>
          <FontAwesomeIcon icon={iconMap[icon] || faEnvelopeOpenText} />
        </div>
        <div className={styles.ncArrow}>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </div>
      </div>
      <div>
        <div className={styles.ncTitle}>{title}</div>
        <div className={styles.ncSub}>
          <FontAwesomeIcon icon={faHeartPulse} /> {subtitle}
        </div>
      </div>
    </div>
  );
}
