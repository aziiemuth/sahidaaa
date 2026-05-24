import Image from "next/image";
import styles from "@/styles/SpotifyPage.module.css";

interface VinylDiscProps {
  spinning?: boolean;
  cover?: string;
}

export default function VinylDisc({ spinning = true, cover = "/images/amr diab.jpg" }: VinylDiscProps) {
  return (
    <div className={styles.albumWrap}>
      <div
        className={styles.disc}
        style={!spinning ? { animationPlayState: "paused" } : {}}
      >
        <div className={styles.discCenter}>
          <Image
            src={cover}
            alt="Cover Art"
            width={60}
            height={60}
            className={styles.discCenterImage}
            priority
          />
        </div>
      </div>
      <div className={styles.discShine} />
      <div className={`${styles.needle} ${spinning ? styles.needlePlaying : ""}`} />
    </div>
  );
}

