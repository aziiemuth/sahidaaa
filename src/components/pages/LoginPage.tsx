"use client";

import { useState, useCallback } from "react";
import { PIN_CODE } from "@/lib/constants";
import NumPad from "@/components/ui/NumPad";
import PinDots from "@/components/ui/PinDots";
import styles from "@/styles/LoginPage.module.css";

interface LoginPageProps {
  onSuccess: () => void;
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const checkPin = useCallback(
    (value: string) => {
      if (value === PIN_CODE) {
        onSuccess();
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          setPin("");
        }, 1800);
      }
    },
    [onSuccess]
  );

  const handleKey = useCallback(
    (digit: string) => {
      if (pin.length >= 4) return;
      setPin(pin + digit);
    },
    [pin]
  );

  return (
    <section className={styles.page}>
      {/* Orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={`${styles.card} ${error ? styles.doShake : ""}`}>
        {/* Avatar + ring */}
        <div className={styles.avatar}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/opening.gif" alt="" />
          <div className={styles.avatarRing} />
        </div>

        <p className={styles.title}>A Special Day for Sahida</p>

        {/* PIN Dots */}
        <PinDots length={pin.length} error={error} />

        {/* Numpad */}
        <NumPad
          onKey={handleKey}
          onClear={() => setPin("")}
          onSubmit={() => checkPin(pin)}
        />

        {/* Error message */}
        {error && <p className={styles.error}>Salah nih! Coba lagi~</p>}
      </div>
    </section>
  );
}
