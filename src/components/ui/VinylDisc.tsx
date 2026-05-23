import Image from "next/image";
import styles from "@/styles/SpotifyPage.module.css";

interface VinylDiscProps {
  spinning?: boolean;
}

export default function VinylDisc({ spinning = true }: VinylDiscProps) {
  return (
    <div className={styles.albumWrap}>
      <div
        className={styles.disc}
        style={!spinning ? { animationPlayState: "paused" } : {}}
      >
        <div className={styles.discCenter}>
          <Image
            src="/images/amr diab.jpg"
            alt="Amr Diab"
            width={60}
            height={60}
            className={styles.discCenterImage}
            priority
          />
        </div>
        <div className={styles.discDot} />
      </div>
      <div className={styles.discShine} />
      <div className={`${styles.needle} ${spinning ? styles.needlePlaying : ""}`} />
    </div>
  );
}

