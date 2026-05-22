import Image from "next/image";
import styles from "@/styles/GallerySlide.module.css";
import { GalleryPhoto } from "@/lib/constants";

interface GalleryItemProps {
  photo: GalleryPhoto;
  delay: number;
  onClick: () => void;
}

export default function GalleryItem({
  photo,
  delay,
  onClick,
}: GalleryItemProps) {
  const frameClass = styles[`frame_${photo.frame}`];

  return (
    <div
      className={`${styles.galItem} ${frameClass || ""}`}
      style={{
        transform: `rotate(${photo.rotation}deg)`,
        animationDelay: `${delay}s`,
      }}
      onClick={onClick}
    >
      <div className={styles.galInner}>
        <Image
          src={photo.src}
          alt={photo.alt}
          width={400}
          height={300}
          className={styles.galImage}
        />
      </div>
      {photo.caption && <p className={styles.galCaption}>{photo.caption}</p>}
    </div>
  );
}
