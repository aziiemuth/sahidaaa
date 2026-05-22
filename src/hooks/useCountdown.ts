"use client";

import { useState, useEffect } from "react";

export default function useCountdown(birthDateStr: string) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [age, setAge] = useState(0);
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const birthDate = new Date(birthDateStr);

    function calculate() {
      const now = new Date();

      // Calculate age
      let currentAge = now.getFullYear() - birthDate.getFullYear();
      const monthDiff = now.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && now.getDate() < birthDate.getDate())
      ) {
        currentAge--;
      }
      setAge(Math.max(0, currentAge));

      // Calculate next birthday
      let targetYear = now.getFullYear();
      let nextBday = new Date(
        targetYear,
        birthDate.getMonth(),
        birthDate.getDate()
      );
      if (nextBday <= now) {
        targetYear++;
        nextBday = new Date(
          targetYear,
          birthDate.getMonth(),
          birthDate.getDate()
        );
      }

      const diff = nextBday.getTime() - now.getTime();
      if (diff < 0) {
        setIsBirthday(true);
        return;
      }

      // Check if today is birthday
      if (
        now.getMonth() === birthDate.getMonth() &&
        now.getDate() === birthDate.getDate()
      ) {
        setIsBirthday(true);
      }

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [birthDateStr]);

  return { ...timeLeft, age, isBirthday };
}
