"use client";

import { useState } from "react";
import { GALLERY_PHOTOS } from "@/lib/constants";
import GalleryItem from "@/components/ui/GalleryItem";
import Lightbox from "@/components/ui/Lightbox";
import styles from "@/styles/GallerySlide.module.css";

interface GallerySlideProps {
  onClose: () => void;
}

export default function GallerySlide({ onClose }: GallerySlideProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section className={styles.slide}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onClose}>
          ←
        </button>
        <div className={styles.heading}>
          <h2 className={styles.title}>🖼️ Galeri Foto</h2>
          <p className={styles.subtitle}>♡ Momen indah kita berdua</p>
        </div>
        <div className={styles.spacer} />
      </div>

      {/* Gallery grid */}
      <div className={styles.galleryWrap}>
        <div className={styles.galleryGrid}>
          {GALLERY_PHOTOS.map((photo, index) => (
            <GalleryItem
              key={index}
              photo={photo}
              delay={index * 0.1}
              onClick={() => setLightboxSrc(photo.src)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </section>
  );
}
