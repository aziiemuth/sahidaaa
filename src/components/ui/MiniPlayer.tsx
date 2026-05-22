"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faVolumeXmark,
  faHeadphones,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/MainPage.module.css";
import { MUSIC_TITLE, MUSIC_ARTIST } from "@/lib/constants";

const EQ_DURATIONS = ["0.2s", "0.45s", "0.15s", "0.5s", "0.3s"];

interface MiniPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MiniPlayer({ isPlaying, onToggle }: MiniPlayerProps) {
  return (
    <div className={styles.miniPlayer} onClick={onToggle}>
      <div className={styles.mpInner}>
        <div
          className={`${styles.mpVinyl} ${isPlaying ? styles.mpVinylSpinning : ""}`}
        >
          <div className={styles.mpVinylDot} />
        </div>
        <div className={styles.mpInfo}>
          <div className={styles.mpSong}>{MUSIC_TITLE} — {MUSIC_ARTIST}</div>
          <div className={styles.mpArtist}>
            <FontAwesomeIcon
              icon={faHeadphones}
              style={{ color: "var(--pri-mid)" }}
            />{" "}
            Diputar spesial untukmu{" "}
            <FontAwesomeIcon icon={faHeart} style={{ color: "var(--pri)" }} />
          </div>
        </div>
        <div className={styles.mpControls}>
          <div className={styles.mpEq}>
            {EQ_DURATIONS.map((d, i) => (
              <div
                key={i}
                className={`${styles.mpEqBar} ${isPlaying ? styles.mpEqBarOn : ""}`}
                style={
                  {
                    "--d": d,
                    height: isPlaying ? undefined : "5px",
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <FontAwesomeIcon
            icon={isPlaying ? faVolumeHigh : faVolumeXmark}
            className={styles.mpVol}
          />
        </div>
      </div>
    </div>
  );
}
