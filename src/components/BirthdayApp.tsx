"use client";

import { useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import ParticleCanvas from "@/components/ParticleCanvas";
import SlideOverlay from "@/components/SlideOverlay";
import LoginPage from "@/components/pages/LoginPage";
import QuizPage from "@/components/pages/QuizPage";
import SpotifyPage from "@/components/pages/SpotifyPage";
import BirthdayPage from "@/components/pages/BirthdayPage";
import MainPage from "@/components/pages/MainPage";
import LetterSlide from "@/components/slides/LetterSlide";
import GallerySlide from "@/components/slides/GallerySlide";
import useAudio from "@/hooks/useAudio";

type Page = "login" | "quiz" | "spotify" | "birthday" | "main";
type Slide = null | "letter" | "gallery";

export default function BirthdayApp() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [activeSlide, setActiveSlide] = useState<Slide>(null);
  
  // Lift audio state up so it can start exactly when SpotifyPage is shown
  const { currentSong, isPlaying, toggle, play, next, prev } = useAudio();

  const handleQuizComplete = () => {
    play(); // Start audio immediately on click interaction
    setCurrentPage("spotify");
  };

  return (
    <>
      <CustomCursor />
      <ParticleCanvas />
      <SlideOverlay
        visible={activeSlide !== null}
        onClose={() => setActiveSlide(null)}
      />

      {currentPage === "login" && (
        <LoginPage onSuccess={() => setCurrentPage("quiz")} />
      )}
      {currentPage === "quiz" && (
        <QuizPage onComplete={handleQuizComplete} />
      )}
      {currentPage === "spotify" && (
        <SpotifyPage
          onFinish={() => setCurrentPage("birthday")}
          isPlaying={isPlaying}
          onToggleAudio={toggle}
          currentSong={currentSong}
          onNextSong={next}
          onPrevSong={prev}
        />
      )}
      {currentPage === "birthday" && (
        <BirthdayPage onEnter={() => setCurrentPage("main")} />
      )}
      {currentPage === "main" && (
        <MainPage 
          onOpenSlide={(slide) => setActiveSlide(slide)} 
          isPlaying={isPlaying}
          onToggleAudio={toggle}
          currentSong={currentSong}
        />
      )}

      {activeSlide === "letter" && (
        <LetterSlide onClose={() => setActiveSlide(null)} />
      )}
      {activeSlide === "gallery" && (
        <GallerySlide onClose={() => setActiveSlide(null)} />
      )}
    </>
  );
}
