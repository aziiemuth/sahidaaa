"use client";

import { useState, useRef, useEffect } from "react";
import { SONGS, Song } from "@/lib/constants";

export default function useAudio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = SONGS[currentIndex];

  useEffect(() => {
    const wasPlaying = isPlaying;
    
    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(currentSong.src);
    audioRef.current.loop = true;

    if (wasPlaying) {
      audioRef.current.play().catch(() => {});
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [currentIndex]);

  const play = () => {
    audioRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => (isPlaying ? pause() : play());

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % SONGS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
  };

  return {
    currentSong,
    currentIndex,
    isPlaying,
    play,
    pause,
    toggle,
    next,
    prev,
    audioRef,
  };
}
