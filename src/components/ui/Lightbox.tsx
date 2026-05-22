"use client";

import Image from "next/image";
import styles from "@/styles/GallerySlide.module.css";

interface LightboxProps {
  src: string;
  onClose: () => void;
}

export default function Lightbox({ src, onClose }: LightboxProps) {
  return (
    <div className={styles.lightbox} onClick={onClose}>
      <button className={styles.lightboxClose}>✕</button>
      <Image
        src={src}
        alt="Preview"
        width={1200}
        height={900}
        className={styles.lightboxImg}
      />
    </div>
  );
}
