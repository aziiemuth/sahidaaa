import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faCakeCandles,
  faFaceSmileBeam,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/MainPage.module.css";

interface StatsRowProps {
  age: number;
}

export default function StatsRow({ age }: StatsRowProps) {
  return (
    <div className={styles.statsRow}>
      <div className={styles.statChip}>
        <div className={styles.statIcon} style={{ color: "var(--pri-mid)" }}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className={styles.statVal}>∞</div>
        <div className={styles.statLabel}>Cinta</div>
      </div>
      <div className={styles.statChip}>
        <div className={styles.statIcon} style={{ color: "var(--pri-glow)" }}>
          <FontAwesomeIcon icon={faStar} />
        </div>
        <div className={styles.statVal}>{age}</div>
        <div className={styles.statLabel}>Tahun</div>
      </div>
      <div className={styles.statChip}>
        <div className={styles.statIcon} style={{ color: "var(--pri)" }}>
          <FontAwesomeIcon icon={faCakeCandles} />
        </div>
        <div className={styles.statVal}>
          <FontAwesomeIcon
            icon={faFaceSmileBeam}
            style={{ color: "var(--pri)", fontSize: "1rem" }}
          />
        </div>
        <div className={styles.statLabel}>Happy</div>
      </div>
    </div>
  );
}
