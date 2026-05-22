import styles from "@/styles/components.module.css";

interface PinDotsProps {
  length: number;
  error: boolean;
}

export default function PinDots({ length, error }: PinDotsProps) {
  return (
    <div
      className={`${styles.pinDots} ${error ? styles.pinDotsError : ""}`}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`${styles.pinDot} ${i < length ? styles.pinDotFilled : ""}`}
        />
      ))}
    </div>
  );
}
