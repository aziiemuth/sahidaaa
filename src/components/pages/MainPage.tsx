"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import useCountdown from "@/hooks/useCountdown";
import HeroGrid from "@/components/ui/HeroGrid";
import StatsRow from "@/components/ui/StatsRow";
import MiniPlayer from "@/components/ui/MiniPlayer";
import NavCard from "@/components/ui/NavCard";
import styles from "@/styles/MainPage.module.css";

interface MainPageProps {
  onOpenSlide: (slide: "letter" | "gallery") => void;
  isPlaying: boolean;
  onToggleAudio: () => void;
}

export default function MainPage({ onOpenSlide, isPlaying, onToggleAudio }: MainPageProps) {
  const { days, hours, minutes, seconds, age, isBirthday } =
    useCountdown("2006-06-03");

  return (
    <section className={styles.page}>
      <div className={styles.wrap}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <span className={styles.logo}>Sahida</span>
          <span className={styles.date}>
            <FontAwesomeIcon icon={faCalendar} /> 3 Juni 2006
          </span>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faCakeCandles} />
          </div>
        </div>

        {/* Hero Grid */}
        <HeroGrid
          imageSrc="/images/sahida.png"
          name="Sahida"
          countdown={{ days, hours, minutes, seconds, isBirthday }}
        />

        {/* Stats */}
        <StatsRow age={age} />

        {/* Mini Player */}
        <MiniPlayer isPlaying={isPlaying} onToggle={onToggleAudio} />

        {/* Explore */}
        <div>
          <p className={styles.sectionLabel}>🧭 Explore</p>
          <div className={styles.navGrid}>
            <NavCard
              icon="envelope"
              title="Surat Untukmu"
              subtitle="Dari hati Athif yang paling dalam"
              color="pink"
              onClick={() => onOpenSlide("letter")}
            />
            <NavCard
              icon="images"
              title="Galeri Foto"
              subtitle="Momen indah kita berdua"
              color="purple"
              onClick={() => onOpenSlide("gallery")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
