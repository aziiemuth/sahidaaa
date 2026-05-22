import styles from "@/styles/components.module.css";

interface EqualizerProps {
  barCount: number;
}

const DURATIONS = [
  "0.25s",
  "0.5s",
  "0.18s",
  "0.65s",
  "0.38s",
  "0.55s",
  "0.32s",
  "0.45s",
  "0.2s",
  "0.6s",
];

export default function Equalizer({ barCount }: EqualizerProps) {
  return (
    <>
      {Array.from({ length: barCount }, (_, i) => (
        <div
          key={i}
          className={styles.eqBar}
          style={
            {
              "--d": DURATIONS[i % DURATIONS.length],
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}
