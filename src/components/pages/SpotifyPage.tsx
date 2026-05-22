"use client";

import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faShuffle,
  faBackwardStep,
  faPause,
  faForwardStep,
  faRepeat,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import VinylDisc from "@/components/ui/VinylDisc";
import Equalizer from "@/components/ui/Equalizer";
import { formatTime } from "@/lib/utils";
import { MUSIC_TITLE, MUSIC_ARTIST } from "@/lib/constants";
import styles from "@/styles/SpotifyPage.module.css";

interface SpotifyPageProps {
  onFinish: () => void;
  isPlaying: boolean;
  onToggleAudio: () => void;
}

export default function SpotifyPage({ onFinish, isPlaying, onToggleAudio }: SpotifyPageProps) {
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const SONG_DURATION = 223; // 3m 43s in seconds
  const percent = Math.min((elapsed / SONG_DURATION) * 100, 100);

  return (
    <section className={styles.page}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <VinylDisc spinning={isPlaying} />

      <p className={styles.nowLabel}>
        <FontAwesomeIcon icon={faCirclePlay} /> Sekarang Lagi Memutar
      </p>
      <p className={styles.songTitle}>{MUSIC_TITLE}</p>
      <p className={styles.artist}>{MUSIC_ARTIST}</p>

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.ctrlBtn}>
          <FontAwesomeIcon icon={faShuffle} />
        </button>
        <button className={styles.ctrlBtn}>
          <FontAwesomeIcon icon={faBackwardStep} />
        </button>
        <button className={styles.playBtn} onClick={onToggleAudio}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button className={styles.ctrlBtn}>
          <FontAwesomeIcon icon={faForwardStep} />
        </button>
        <button className={styles.ctrlBtn}>
          <FontAwesomeIcon icon={faRepeat} />
        </button>
      </div>

      {/* Timeline */}
      <div className={styles.timeline}>
        <div className={styles.timeRow}>
          <span>0:00</span>
          <span>{formatTime(elapsed)}</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${percent}%` }} />
        </div>
        <div className={styles.timeRow}>
          <span></span>
          <span>3:43</span>
        </div>
      </div>

      {/* Equalizer */}
      <div className={styles.eqWrap}>
        <Equalizer barCount={10} isPlaying={isPlaying} />
      </div>

      {/* Skip button */}
      <button className={styles.skipBtn} onClick={onFinish}>
        <FontAwesomeIcon icon={faForwardStep} /> Skip ke Kejutan
      </button>
    </section>
  );
}
