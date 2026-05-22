"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/BirthdayPage.module.css";

export default function CakeScene() {
  const [droppedLayers, setDroppedLayers] = useState<number[]>([]);
  const [flameVisible, setFlameVisible] = useState(false);

  useEffect(() => {
    const layers = [0, 1, 2, 3, 4];
    layers.forEach((i) => {
      setTimeout(() => {
        setDroppedLayers((prev) => [...prev, i]);
      }, i * 550);
    });

    // Flame appears after all layers dropped
    setTimeout(() => setFlameVisible(true), layers.length * 550 + 200);
  }, []);

  return (
    <div className={styles.cakeScene}>
      <div
        className={`${styles.ck1} ${droppedLayers.includes(0) ? styles.drop : ""}`}
      />
      <div
        className={`${styles.ck2} ${droppedLayers.includes(1) ? styles.drop : ""}`}
      />
      <div
        className={`${styles.ck3} ${droppedLayers.includes(2) ? styles.drop : ""}`}
      />
      <div
        className={`${styles.ckCream} ${droppedLayers.includes(3) ? styles.drop : ""}`}
      />
      <div
        className={`${styles.ckCandle} ${droppedLayers.includes(4) ? styles.drop : ""}`}
      />
      <div
        className={`${styles.flame} ${flameVisible ? styles.flameVisible : ""}`}
      >
        <div className={styles.flameGlow} />
        <div className={styles.flameInner} />
      </div>
    </div>
  );
}
