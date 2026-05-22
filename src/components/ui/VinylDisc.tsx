import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/SpotifyPage.module.css";

interface VinylDiscProps {
  spinning?: boolean;
}

export default function VinylDisc({ spinning = true }: VinylDiscProps) {
  return (
    <div className={styles.albumWrap}>
      <div
        className={styles.disc}
        style={!spinning ? { animationPlayState: "paused" } : {}}
      >
        <div className={styles.discCenter}>
          <FontAwesomeIcon icon={faMusic} />
        </div>
      </div>
      <div className={styles.needle} />
    </div>
  );
}
