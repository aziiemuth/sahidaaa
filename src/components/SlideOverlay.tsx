import styles from "@/styles/components.module.css";

interface SlideOverlayProps {
  visible: boolean;
  onClose: () => void;
}

export default function SlideOverlay({ visible, onClose }: SlideOverlayProps) {
  return (
    <div
      className={`${styles.slideOverlay} ${visible ? styles.slideOverlayVisible : ""}`}
      onClick={onClose}
    />
  );
}
