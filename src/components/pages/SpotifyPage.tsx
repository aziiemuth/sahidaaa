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
import { Song } from "@/lib/constants";
import styles from "@/styles/SpotifyPage.module.css";

interface SpotifyPageProps {
  onFinish: () => void;
  isPlaying: boolean;
  onToggleAudio: () => void;
  currentSong: Song;
  onNextSong: () => void;
  onPrevSong: () => void;
}

export default function SpotifyPage({
  onFinish,
  isPlaying,
  onToggleAudio,
  currentSong,
  onNextSong,
  onPrevSong,
}: SpotifyPageProps) {
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset timer on song switch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setElapsed(0);
  }, [currentSong]);

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

  const percent = Math.min((elapsed / currentSong.duration) * 100, 100);

  return (
    <section className={styles.page}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <VinylDisc spinning={isPlaying} cover={currentSong.cover} />

      <p className={styles.nowLabel}>
        <FontAwesomeIcon icon={faCirclePlay} /> Sekarang Lagi Memutar
      </p>
      <p className={styles.songTitle}>{currentSong.title}</p>
      <p className={styles.artist}>{currentSong.artist}</p>

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.ctrlBtn}>
          <FontAwesomeIcon icon={faShuffle} />
        </button>
        <button className={styles.ctrlBtn} onClick={onPrevSong}>
          <FontAwesomeIcon icon={faBackwardStep} />
        </button>
        <button className={styles.playBtn} onClick={onToggleAudio}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button className={`${styles.ctrlBtn} ${styles.distractingBtn}`} onClick={onNextSong} title="Ganti Lagu">
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
          <span>{formatTime(currentSong.duration)}</span>
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
