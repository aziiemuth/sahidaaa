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
import { REPLY_TEXT, Song } from "@/lib/constants";

interface MainPageProps {
  onOpenSlide: (slide: "letter" | "gallery" | "game") => void;
  isPlaying: boolean;
  onToggleAudio: () => void;
  currentSong: Song;
}

export default function MainPage({
  onOpenSlide,
  isPlaying,
  onToggleAudio,
  currentSong,
}: MainPageProps) {
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
        <MiniPlayer
          isPlaying={isPlaying}
          onToggle={onToggleAudio}
          currentSong={currentSong}
        />

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
            <NavCard
              icon="paper-plane"
              title="Kirim Surat Balik"
              subtitle="Kirim pesan langsung ke WhatsApp Athif"
              color="green"
              onClick={() => {
                const url = `https://wa.me/62816234185?text=${encodeURIComponent(REPLY_TEXT)}`;
                window.open(url, "_blank");
              }}
            />
            <NavCard
              icon="gamepad"
              title="Tangkap Cinta"
              subtitle="Main game seru yuk! 🎮"
              color="orange"
              onClick={() => onOpenSlide("game")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
