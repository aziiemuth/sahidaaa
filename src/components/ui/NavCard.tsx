"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faImages,
  faArrowUpRightFromSquare,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/MainPage.module.css";

const iconMap: Record<string, typeof faEnvelopeOpenText> = {
  envelope: faEnvelopeOpenText,
  images: faImages,
};

interface NavCardProps {
  icon: string;
  title: string;
  subtitle: string;
  color: "pink" | "purple";
  onClick: () => void;
}

export default function NavCard({
  icon,
  title,
  subtitle,
  color,
  onClick,
}: NavCardProps) {
  return (
    <div
      className={`${styles.navCard} ${color === "pink" ? styles.ncLetter : styles.ncGallery}`}
      onClick={onClick}
    >
      <div className={styles.ncTop}>
        <div
          className={`${styles.ncIcon} ${color === "pink" ? styles.ncIconPink : styles.ncIconPurple}`}
        >
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
