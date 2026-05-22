# 🎂 Implementasi Website Birthday Surprise — Untuk Sahida

> Dokumentasi teknis lengkap untuk membangun website birthday surprise menggunakan **Next.js**.
> Berdasarkan project asli `birthdaysiti`, dengan penyesuaian konteks dan fitur tambahan.

---

## 📌 Informasi Umum

| Aspek             | Detail                                     |
| ----------------- | ------------------------------------------ |
| **Penerima**      | Sahida                                     |
| **Pengirim**      | Athif                                      |
| **Tanggal Lahir** | 3 Juni 2006                                |
| **PIN Login**     | `0306` (dari tanggal lahir)                |
| **Framework**     | Next.js 16                                 |
| **Bahasa**        | TypeScript + React                         |
| **Styling**       | CSS Modules (Vanilla CSS)                  |
| **Font**          | Google Fonts: Syne, DM Sans, Pinyon Script |
| **Icon**          | Font Awesome 6.5.0                         |
| **Audio**         | Sesuai di folder `public/audio/`           |
| **Tema Warna**    | Soft pink & white (romantis)               |
| **Deploy**        | Vercel (recommended) / Static Export       |

---

## 📁 Struktur Project Next.js

```
birthday-sahida/
├── public/
│   ├── audio/
│   │   └── background-music.mp3        ← Musik background (loop)
│   └── images/
│       ├── opening.gif                 ← GIF animasi di halaman login
│       ├── sahida.png                  ← Foto utama Sahida (hero section)
│       └── gallery/(sementara kosong dlu fotonya. isi manual)
│           ├── 1.jpg                   ← Foto galeri 1
│           ├── 2.jpg                   ← Foto galeri 2
│           ├── 3.jpg                   ← Foto galeri 3
│           ├── 4.jpg                   ← Foto galeri 4
│           ├── 5.jpg                   ← Foto galeri 5
│           ├── 6.jpg                   ← Foto galeri 6
│           ├── 7.jpg                   ← Foto galeri 7
│           ├── 8.jpg                   ← Foto galeri 8
│           ├── 9.jpg                   ← Foto galeri 9
│           └── 10.jpg                  ← Foto galeri 10
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                  ← Root layout (font loading, metadata)
│   │   ├── page.tsx                    ← Entry point → render <BirthdayApp />
│   │   └── globals.css                 ← CSS variables, global styles, animations
│   │
│   ├── components/
│   │   ├── BirthdayApp.tsx             ← State machine utama (mengatur halaman aktif)
│   │   ├── CustomCursor.tsx            ← Cursor dot + ring follower
│   │   ├── ParticleCanvas.tsx          ← Background particle effect
│   │   ├── SlideOverlay.tsx            ← Overlay backdrop blur untuk slide pages
│   │   │
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx           ← Halaman PIN login
│   │   │   ├── QuizPage.tsx            ← Halaman quiz 7 soal
│   │   │   ├── SpotifyPage.tsx         ← Halaman spotify player (transisi)
│   │   │   ├── BirthdayPage.tsx        ← Halaman cake animation + confetti
│   │   │   └── MainPage.tsx            ← Dashboard utama (hero, stats, explore)
│   │   │
│   │   ├── slides/
│   │   │   ├── LetterSlide.tsx         ← Slide surat dengan typewriter effect
│   │   │   └── GallerySlide.tsx        ← Slide galeri foto 10 foto + bingkai
│   │   │
│   │   └── ui/
│   │       ├── NumPad.tsx              ← Komponen numpad untuk PIN
│   │       ├── PinDots.tsx             ← 4 dots indikator PIN
│   │       ├── QuizCard.tsx            ← Card soal + opsi jawaban
│   │       ├── QuizResult.tsx          ← Hasil quiz (trophy + score)
│   │       ├── CakeScene.tsx           ← Animasi cake drop
│   │       ├── Confetti.tsx            ← Efek confetti
│   │       ├── VinylDisc.tsx           ← Animasi piringan vinyl
│   │       ├── Equalizer.tsx           ← Equalizer bars
│   │       ├── MiniPlayer.tsx          ← Mini music player di dashboard
│   │       ├── HeroGrid.tsx            ← Grid foto + info di dashboard
│   │       ├── StatsRow.tsx            ← Row statistik (cinta, tahun, happy)
│   │       ├── Countdown.tsx           ← Countdown ke ulang tahun berikutnya
│   │       ├── NavCard.tsx             ← Card navigasi explore
│   │       ├── GalleryItem.tsx         ← Item foto dengan bingkai
│   │       ├── Lightbox.tsx            ← Fullscreen foto preview
│   │       └── LetterCard.tsx          ← Card surat + typewriter
│   │
│   ├── hooks/
│   │   ├── useAudio.ts                 ← Hook untuk kontrol audio play/pause
│   │   ├── useCountdown.ts             ← Hook untuk hitung mundur ke birthday
│   │   ├── useTypewriter.ts            ← Hook untuk efek ketik surat
│   │   └── useMousePosition.ts         ← Hook untuk posisi mouse (cursor + 3D tilt)
│   │
│   ├── lib/
│   │   ├── constants.ts                ← Semua konstanta (PIN, quiz data, surat, dll)
│   │   └── utils.ts                    ← Helper functions (format waktu, hitung umur)
│   │
│   └── styles/
│       ├── LoginPage.module.css
│       ├── QuizPage.module.css
│       ├── SpotifyPage.module.css
│       ├── BirthdayPage.module.css
│       ├── MainPage.module.css
│       ├── LetterSlide.module.css
│       ├── GallerySlide.module.css
│       ├── CustomCursor.module.css
│       └── components.module.css       ← Shared UI component styles
│
├── next.config.js
├── tsconfig.json
├── package.json
└── implementasi.md                     ← File dokumentasi ini
```

---

## 🛠️ Setup Project

### Dependencies Tambahan

```bash
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/react-fontawesome
```

> **Catatan**: Alternatif bisa menggunakan `react-icons` sebagai pengganti Font Awesome(tetapi utamakan fontawesome):
>
> ```bash
> npm install react-icons
> ```
>
> Lalu import: `import { FaHeart, FaStar } from 'react-icons/fa6'`

---

## 🎨 Tema & Design System

### Global CSS Variables (`globals.css`)

```css
:root {
  --pri: #e05a9e;
  --pri-glow: #f08cc8;
  --pri-soft: #fce4f2;
  --pri-mid: #c75a9e;
  --pri-dim: #b04888;

  --bg-deep: #fff5f8;
  --bg-mid: #fff0f5;
  --bg-light: #ffffff;

  --text: #5e2a4e;
  --text-dim: #965a80;
  --text-faint: rgba(160, 100, 140, 0.6);

  --glass: rgba(255, 255, 255, 0.6);
  --glass-border: rgba(224, 90, 158, 0.15);
  --shadow-soft: 0 20px 60px rgba(224, 90, 158, 0.15);
}
```

### Font Loading (`layout.tsx`)

```tsx
import { Syne, DM_Sans } from "next/font/google";
import localFont from "next/font/local";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500", "600"],
});

// Pinyon Script dari Google Fonts
// Bisa juga pakai next/font/google
```

> **Catatan**: `next/font` mengoptimasi font loading secara otomatis (self-hosted, no layout shift).

### Penggunaan Font

| Font                  | CSS Variable    | Digunakan Untuk                              |
| --------------------- | --------------- | -------------------------------------------- |
| **Syne** (700, 800)   | `--font-syne`   | Heading, judul besar, counter, score         |
| **DM Sans** (300-600) | `--font-dm`     | Body text, tombol, label                     |
| **Pinyon Script**     | `--font-pinyon` | Teks kursif dekoratif (logo, judul romantis) |

### Prinsip Desain

- **Glassmorphism**: Background semi-transparan + `backdrop-filter: blur()` + border tipis
- **Soft color palette**: Semua warna dalam spektrum pink lembut
- **Micro-animations**: Hover effects, transisi halus, floating elements
- **Noise texture overlay**: SVG noise pattern di body `::after` untuk tekstur premium
- **Custom cursor**: Dot cursor + ring follower (hanya desktop, via komponen)
- **CSS Modules**: Setiap komponen/halaman punya file CSS sendiri, tidak ada global class conflict

---

## 🔀 Alur Halaman (State Machine)

```
LOGIN (PIN) → QUIZ (7 soal) → SPOTIFY PLAYER (5 detik) → BIRTHDAY CAKE → MAIN DASHBOARD
                                                                              ├── Surat Untukmu (slide)
                                                                              └── Galeri Foto (slide) ← BARU
```

### State Management (`BirthdayApp.tsx`)

```tsx
"use client";

import { useState } from "react";

type Page = "login" | "quiz" | "spotify" | "birthday" | "main";
type Slide = null | "letter" | "gallery";

export default function BirthdayApp() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [activeSlide, setActiveSlide] = useState<Slide>(null);

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
        <QuizPage onComplete={() => setCurrentPage("spotify")} />
      )}
      {currentPage === "spotify" && (
        <SpotifyPage onFinish={() => setCurrentPage("birthday")} />
      )}
      {currentPage === "birthday" && (
        <BirthdayPage onEnter={() => setCurrentPage("main")} />
      )}
      {currentPage === "main" && (
        <MainPage onOpenSlide={(slide) => setActiveSlide(slide)} />
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
```

> **Penting**: Semua komponen yang menggunakan state, event handlers, atau browser API harus ditandai `"use client"` di baris pertama.

---

## 📄 Detail Implementasi Per Komponen

---

### 1. 📐 Root Layout (`layout.tsx`)

```tsx
import type { Metadata } from "next";
import { Syne, DM_Sans, Pinyon_Script } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "700", "800"],
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500", "600"],
});
const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  variable: "--font-pinyon",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Happy Birthday Sahida ♡",
  description: "A special birthday surprise from Athif to Sahida",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${syne.variable} ${dmSans.variable} ${pinyonScript.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

### Entry Page (`page.tsx`)

```tsx
import BirthdayApp from "@/components/BirthdayApp";

export default function Home() {
  return <BirthdayApp />;
}
```

---

### 2. 🔐 LoginPage Component

**File**: `src/components/pages/LoginPage.tsx`  
**Style**: `src/styles/LoginPage.module.css`

#### Props

```tsx
interface LoginPageProps {
  onSuccess: () => void;
}
```

#### Struktur JSX

```tsx
"use client";

import { useState, useCallback } from "react";
import { PIN_CODE } from "@/lib/constants";
import styles from "@/styles/LoginPage.module.css";

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleKey = useCallback(
    (digit: string) => {
      if (pin.length >= 4) return;
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        setTimeout(() => checkPin(newPin), 300);
      }
    },
    [pin],
  );

  const checkPin = (value: string) => {
    if (value === PIN_CODE) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
        setPin("");
      }, 1800);
    }
  };

  return (
    <section className={styles.page}>
      {/* Orbs dekoratif */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.card}>
        {/* Avatar + ring */}
        <div className={styles.avatar}>
          <img src="/images/opening.gif" alt="" />
          <div className={styles.avatarRing} />
        </div>

        <p className={styles.title}>A Special Day for Sahida</p>

        {/* PIN Dots */}
        <PinDots length={pin.length} error={error} />

        {/* Numpad */}
        <NumPad
          onKey={handleKey}
          onClear={() => setPin("")}
          onSubmit={() => checkPin(pin)}
        />

        {/* Error message */}
        {error && <p className={styles.error}>Salah nih! Coba lagi~</p>}
      </div>
    </section>
  );
}
```

#### Fitur Visual (CSS Module)

- **Orb gradients**: 2 div `position: absolute` + `filter: blur(90px)` + animasi `orb-drift`
- **Avatar ring**: `conic-gradient` berputar (`animation: ring-spin 5s linear infinite`)
- **PIN dots**: Saat diisi → `transform: scale(1.2)` + glow + ripple pseudo-element
- **Card entrance**: `animation: card-pop` (translateY + scale dari atas)
- **Error state**: Shake animation pada card dan dots
- **Background**: `linear-gradient(175deg, #fff 0%, #fff0f5 40%, #fce4f2 100%)`

---

### 3. ❓ QuizPage Component

**File**: `src/components/pages/QuizPage.tsx`  
**Style**: `src/styles/QuizPage.module.css`

#### Props

```tsx
interface QuizPageProps {
  onComplete: () => void;
}
```

#### State

```tsx
const [currentQ, setCurrentQ] = useState(0);
const [score, setScore] = useState(0);
const [showResult, setShowResult] = useState(false);
const [selectedOption, setSelectedOption] = useState<number | null>(null);
```

#### Data Quiz (`lib/constants.ts`)

```tsx
export const PIN_CODE = "0306";

export const QUIZ_QUESTIONS = [
  {
    icon: "fa-star",
    question: "Kamu lebih suka liburan ke mana?",
    options: [
      "Pantai dengan sunset",
      "Gunung dengan udara sejuk",
      "Kota besar dengan cafe aesthetic",
      "Stay di rumah aja yang penting happy",
    ],
  },
  {
    icon: "fa-heart",
    question: "Apa hal yang paling bikin kamu bahagia?",
    options: [
      "Makanan enak",
      "Dipeluk orang tersayang",
      "Dapat hadiah surprise",
      "Waktu quality time sendirian",
    ],
  },
  {
    icon: "fa-music",
    question: "Kalau lagi sedih, kamu biasanya ngapain?",
    options: [
      "Dengerin musik sampai tidur",
      "Makan banyak",
      "Curhat ke temen",
      "Diam dan mikir sendirian",
    ],
  },
  {
    icon: "fa-gift",
    question: "Hadiah ulang tahun yang paling berkesan?",
    options: [
      "Yang dibeli pakai uang sendiri",
      "Yang dibuat dengan tangan",
      "Yang dipikirkan dengan hati-hati",
      "Yang datang tanpa diduga",
    ],
  },
  {
    icon: "fa-moon",
    question: "Kamu lebih suka ngabisin waktu malam minggu dengan?",
    options: [
      "Tidur lebih awal",
      "Netflix dan musik",
      "Jalan-jalan santai",
      "Chat dengan orang spesial",
    ],
  },
  {
    icon: "fa-camera",
    question: "Kalau lagi photo, pose favorit kamu?",
    options: [
      "Senyum natural aja",
      "Pose aesthetic with angle",
      "Candid yang nggak sengaja",
      "Selfie dengan filter lucu",
    ],
  },
  {
    icon: "fa-cake-candles",
    question: "Saat tiup lilin ulang tahun, kamu biasanya...",
    options: [
      "Langsung tiup tanpa pikir panjang",
      "Pikirin wish yang spesial",
      "Tunggu semua nyanyi dulu",
      "Lupa kalau ada lilin (lupa umur)",
    ],
  },
];

export const RESULT_COMMENTS = [
  "Athif bangga banget sama kamu!",
  "Relatable energy 100% certified!",
  "Kamu tuh orangnya caring banget sih!",
  "Selamat! Kamu lulus ujian dengan baik!",
  "Valid semua, kamu menang hidup!",
  "Athif tau kamu jawab dengan jujur nih!",
  "Kamu tuh spesial, jangan lupa itu ya!",
];
```

#### Logika

- Render soal via `<QuizCard question={...} onAnswer={handleAnswer} />`
- Saat pilih → delay 720ms → soal berikutnya
- Progress bar: `width = (currentQ / total) * 100%`
- Setelah soal terakhir → `<QuizResult score={score} total={total} onContinue={onComplete} />`

---

### 4. 🎵 SpotifyPage Component

**File**: `src/components/pages/SpotifyPage.tsx`  
**Style**: `src/styles/SpotifyPage.module.css`

#### Props

```tsx
interface SpotifyPageProps {
  onFinish: () => void;
}
```

#### Logika

```tsx
"use client";

import { useEffect, useState, useRef } from "react";

export default function SpotifyPage({ onFinish }: SpotifyPageProps) {
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Timer detik berjalan
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    // Auto-transition setelah 5 detik
    const autoNext = setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      onFinish();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(autoNext);
    };
  }, [onFinish]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section className={styles.page}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <VinylDisc spinning />
      <p className={styles.nowLabel}>Sekarang Lagi Memutar</p>
      <p className={styles.songTitle}>YOU</p>
      <p className={styles.artist}>LANY</p>

      {/* Controls (dekoratif) */}
      <div className={styles.controls}>...</div>

      {/* Timeline */}
      <div className={styles.timeline}>
        <span>0:00</span>
        <span>{formatTime(elapsed)}</span>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ animation: "sp-progress 5s linear forwards" }}
          />
        </div>
        <span>3:43</span>
      </div>

      <Equalizer barCount={10} />

      <button className={styles.skipBtn} onClick={onFinish}>
        Skip ke Kejutan
      </button>
    </section>
  );
}
```

#### Fitur Visual

- **Vinyl disc**: `conic-gradient` + `animation: spin 4s linear infinite`
- **Needle**: CSS pseudo-element rotated
- **Equalizer**: 10 bar bounce dengan timing berbeda via CSS `--d` variable
- **Progress bar**: Animasi width 0%→100% dalam 5 detik
- **Auto-transition**: `useEffect` dengan `setTimeout(onFinish, 5000)`

---

### 5. 🎂 BirthdayPage Component

**File**: `src/components/pages/BirthdayPage.tsx`  
**Style**: `src/styles/BirthdayPage.module.css`

#### Props

```tsx
interface BirthdayPageProps {
  onEnter: () => void;
}
```

#### Sub-Components

- **`<CakeScene />`** — 5 layer cake yang jatuh dari atas dengan staggered delay
- **`<Confetti />`** — Spawn confetti particles selama 5.5 detik

#### Animasi Cake Drop

```tsx
"use client";

import { useEffect, useState } from "react";

export default function CakeScene() {
  const [droppedLayers, setDroppedLayers] = useState<number[]>([]);
  const [flameVisible, setFlameVisible] = useState(false);

  useEffect(() => {
    const layers = [0, 1, 2, 3, 4]; // 5 layers
    layers.forEach((i) => {
      setTimeout(() => {
        setDroppedLayers((prev) => [...prev, i]);
      }, i * 550);
    });

    // Api lilin muncul setelah semua layer selesai
    setTimeout(() => setFlameVisible(true), layers.length * 550 + 200);
  }, []);

  return (
    <div className={styles.cakeScene}>
      {[1, 2, 3].map((layer, i) => (
        <div
          key={i}
          className={`${styles[`ck${layer}`]} ${droppedLayers.includes(i) ? styles.drop : ""}`}
        />
      ))}
      <div
        className={`${styles.ckCream} ${droppedLayers.includes(3) ? styles.drop : ""}`}
      />
      <div
        className={`${styles.ckCandle} ${droppedLayers.includes(4) ? styles.drop : ""}`}
      />
      {flameVisible && (
        <div className={styles.flame}>
          <div className={styles.flameGlow} />
          <div className={styles.flameInner} />
        </div>
      )}
    </div>
  );
}
```

#### CSS Animasi Cake

```css
.ck1,
.ck2,
.ck3,
.ckCream,
.ckCandle {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-600px);
  opacity: 0;
  border-radius: 10px;
}

.ck1 {
  width: 165px;
  height: 32px;
  bottom: 0;
  background: linear-gradient(90deg, #f8b8e0, #d888c0);
  box-shadow: 0 5px 0 #d066b0;
}
.ck2 {
  width: 145px;
  height: 28px;
  bottom: 36px;
  background: linear-gradient(90deg, #eec8d8, #d8a8c8);
  box-shadow: 0 5px 0 #c898b8;
}
.ck3 {
  width: 125px;
  height: 25px;
  bottom: 68px;
  background: linear-gradient(90deg, #ffd8e8, #f0b8d8);
  box-shadow: 0 4px 0 #e0a8c8;
}

@keyframes dropCk {
  0% {
    transform: translateX(-50%) translateY(-600px);
    opacity: 0;
  }
  65% {
    transform: translateX(-50%) translateY(9px);
    opacity: 1;
  }
  85% {
    transform: translateX(-50%) translateY(-5px);
  }
  100% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

.drop {
  animation: dropCk 0.65s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}
```

#### Confetti Component

```tsx
"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  "#e05a9e",
  "#f08cc8",
  "#fce4f2",
  "#d4a84b",
  "#f0c96a",
  "#c05a3c",
  "#e8857a",
  "#fdf0e0",
];

export default function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const el = document.createElement("div");
      const size = 5 + Math.random() * 7;
      el.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9097;
        width: ${size}px;
        height: ${size * 1.8}px;
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        left: ${Math.random() * 100}vw;
        top: -20px;
        border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      `;
      containerRef.current.appendChild(el);

      el.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          {
            transform: `translateY(105vh) rotate(${Math.random() * 720}deg)`,
            opacity: 0.12,
          },
        ],
        { duration: 1800 + Math.random() * 2000, easing: "ease-in" },
      ).onfinish = () => el.remove();
    }, 90);

    const cleanup = setTimeout(() => clearInterval(interval), 5500);

    return () => {
      clearInterval(interval);
      clearTimeout(cleanup);
    };
  }, []);

  return <div ref={containerRef} />;
}
```

#### Halaman Birthday

```tsx
<section className={styles.page}>
  <p className={styles.eyebrow}>✦ You're Invited To ✦</p>
  <h1 className={styles.heading}>
    Birthday
    <br />
    Party
  </h1>

  <CakeScene />
  <Confetti />

  <p className={styles.name}>Sahida</p>

  <button className={styles.goBtn} onClick={onEnter}>
    Let's Go Inside!
  </button>
</section>
```

---

### 6. 🏠 MainPage Component

**File**: `src/components/pages/MainPage.tsx`  
**Style**: `src/styles/MainPage.module.css`

#### Props

```tsx
interface MainPageProps {
  onOpenSlide: (slide: "letter" | "gallery") => void;
}
```

#### Sub-Components yang Digunakan

| Component        | Deskripsi                           |
| ---------------- | ----------------------------------- |
| `<HeroGrid />`   | Foto 3D tilt + greeting + countdown |
| `<StatsRow />`   | 3 stat chips (Cinta ∞, Umur, Happy) |
| `<MiniPlayer />` | Mini music player dengan vinyl + EQ |
| `<NavCard />`    | Card explore (Surat, Gallery)       |
| `<Countdown />`  | Countdown ke ulang tahun berikutnya |

#### Struktur JSX

```tsx
"use client";

import { useRef } from "react";
import useAudio from "@/hooks/useAudio";
import useCountdown from "@/hooks/useCountdown";

export default function MainPage({ onOpenSlide }: MainPageProps) {
  const { isPlaying, toggle } = useAudio("/audio/background-music.mp3");
  const { days, hours, minutes, seconds, age, isBirthday } =
    useCountdown("2006-06-03");

  return (
    <section className={styles.page}>
      <div className={styles.wrap}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <span className={styles.logo}>Sahida</span>
          <span className={styles.date}>📅 3 Juni 2006</span>
          <div className={styles.icon}>🎂</div>
        </div>

        {/* Hero Grid */}
        <HeroGrid
          imageSrc="/images/sahida.jpeg"
          name="Sahida"
          countdown={{ days, hours, minutes, seconds, isBirthday }}
        />

        {/* Stats */}
        <StatsRow age={age} />

        {/* Mini Player */}
        <MiniPlayer isPlaying={isPlaying} onToggle={toggle} />

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
```

---

### 7. Custom Hooks

#### `useAudio.ts`

```tsx
"use client";

import { useState, useRef, useEffect } from "react";

export default function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [src]);

  const play = () => {
    audioRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => (isPlaying ? pause() : play());

  return { isPlaying, play, pause, toggle, audioRef };
}
```

#### `useCountdown.ts`

```tsx
"use client";

import { useState, useEffect } from "react";

export default function useCountdown(birthDateStr: string) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [age, setAge] = useState(0);
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const birthDate = new Date(birthDateStr);

    function calculate() {
      const now = new Date();

      // Hitung umur
      let currentAge = now.getFullYear() - birthDate.getFullYear();
      const monthDiff = now.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && now.getDate() < birthDate.getDate())
      ) {
        currentAge--;
      }
      setAge(Math.max(0, currentAge));

      // Hitung target ulang tahun berikutnya
      let targetYear = now.getFullYear();
      let nextBday = new Date(
        targetYear,
        birthDate.getMonth(),
        birthDate.getDate(),
      );
      if (nextBday <= now) {
        targetYear++;
        nextBday = new Date(
          targetYear,
          birthDate.getMonth(),
          birthDate.getDate(),
        );
      }

      const diff = nextBday.getTime() - now.getTime();
      if (diff < 0) {
        setIsBirthday(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [birthDateStr]);

  return { ...timeLeft, age, isBirthday };
}
```

#### `useTypewriter.ts`

```tsx
"use client";

import { useState, useEffect, useRef } from "react";

export default function useTypewriter(text: string, speed: number = 22) {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);

  const start = () => {
    indexRef.current = 0;
    setDisplayText("");
    setIsDone(false);
  };

  useEffect(() => {
    if (isDone) return;

    const timer = setTimeout(() => {
      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setIsDone(true);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, text, speed, isDone]);

  return { displayText, isDone, start };
}
```

#### `useMousePosition.ts`

```tsx
"use client";

import { useState, useEffect } from "react";

export default function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return position;
}
```

---

### 8. 💌 LetterSlide Component

**File**: `src/components/slides/LetterSlide.tsx`  
**Style**: `src/styles/LetterSlide.module.css`

#### Props

```tsx
interface LetterSlideProps {
  onClose: () => void;
}
```

#### Isi Surat (`lib/constants.ts`)

```tsx
export const LETTER_TEXT = `selamat ulang tahun sayang! 🎂✨

hari ini adalah hari yang paling spesial karena di hari ini, dunia dihadiahin orang yang paling berarti buatku — kamu, sahida.

aku nggak pernah bosan bersyukur karena allah mempertemukan kita. setiap hari bersamamu terasa seperti hadiah. kamu adalah alasan senyumku, semangat pagiku, dan bintang di malamku.

terima kasih sudah selalu ada, selalu sabar, selalu jadi tempat pulang yang paling nyaman. kamu tuh luar biasa — lebih dari yang kamu sadari.

di umurmu yang baru ini, aku doakan semua mimpi-mimpimu tercapai, semoga allah selalu menjagamu, memberkahimu, dan membahagiakanmu — lebih dari yang bisa aku berikan.

aku janji akan selalu berusaha jadi yang terbaik untukmu.

selamat ulang tahun, sahida! 🎉
love you more than words can say 💕

— athif, yang selalu sayang kamu ♡`;
```

#### Implementasi

```tsx
"use client";

import { useEffect } from "react";
import useTypewriter from "@/hooks/useTypewriter";
import { LETTER_TEXT } from "@/lib/constants";

export default function LetterSlide({ onClose }: LetterSlideProps) {
  const { displayText, isDone, start } = useTypewriter(LETTER_TEXT, 22);

  useEffect(() => {
    start();
  }, []);

  return (
    <section className={styles.slide}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onClose}>
          ←
        </button>
        <div>
          <h2 className={styles.title}>✉️ Surat Untukmu</h2>
          <p className={styles.subtitle}>♡ Dari hati Athif yang paling dalam</p>
        </div>
        <div className={styles.spacer} />
      </div>

      {/* Letter card */}
      <div className={styles.letterWrap}>
        <div className={styles.letterCard}>
          <div className={styles.letterHeader}>
            <div className={styles.envelope}>✉️</div>
            <div>
              <p className={styles.letterTo}>Kepada Yth.</p>
              <p className={styles.letterName}>Sahida ♡</p>
            </div>
          </div>
          <p className={styles.typedText}>{displayText}</p>
          {!isDone && <span className={styles.blinkCursor} />}
        </div>
      </div>
    </section>
  );
}
```

---

### 9. 📸 GallerySlide Component (FITUR BARU)

**File**: `src/components/slides/GallerySlide.tsx`  
**Style**: `src/styles/GallerySlide.module.css`

#### Props

```tsx
interface GallerySlideProps {
  onClose: () => void;
}
```

#### Data Gallery (`lib/constants.ts`)

```tsx
export type FrameType = "polaroid" | "ornate" | "glass" | "tape" | "heart";

export interface GalleryPhoto {
  src: string;
  alt: string;
  frame: FrameType;
  rotation: number; // derajat
  caption?: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: "/images/gallery/1.jpg",
    alt: "Momen 1",
    frame: "polaroid",
    rotation: -2,
    caption: "momen pertama kita ♡",
  },
  {
    src: "/images/gallery/2.jpg",
    alt: "Momen 2",
    frame: "ornate",
    rotation: 1.5,
  },
  { src: "/images/gallery/3.jpg", alt: "Momen 3", frame: "glass", rotation: 0 },
  { src: "/images/gallery/4.jpg", alt: "Momen 4", frame: "tape", rotation: 2 },
  { src: "/images/gallery/5.jpg", alt: "Momen 5", frame: "heart", rotation: 0 },
  {
    src: "/images/gallery/6.jpg",
    alt: "Momen 6",
    frame: "polaroid",
    rotation: 3,
    caption: "selalu ada tawa ♡",
  },
  {
    src: "/images/gallery/7.jpg",
    alt: "Momen 7",
    frame: "ornate",
    rotation: -1,
  },
  { src: "/images/gallery/8.jpg", alt: "Momen 8", frame: "glass", rotation: 0 },
  { src: "/images/gallery/9.jpg", alt: "Momen 9", frame: "tape", rotation: -2 },
  {
    src: "/images/gallery/10.jpg",
    alt: "Momen 10",
    frame: "heart",
    rotation: 0,
  },
];
```

#### Implementasi

```tsx
"use client";

import { useState } from "react";
import { GALLERY_PHOTOS } from "@/lib/constants";
import GalleryItem from "@/components/ui/GalleryItem";
import Lightbox from "@/components/ui/Lightbox";
import styles from "@/styles/GallerySlide.module.css";

export default function GallerySlide({ onClose }: GallerySlideProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section className={styles.slide}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onClose}>
          ←
        </button>
        <div>
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
```

#### GalleryItem Component

```tsx
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
      className={`${styles.galItem} ${frameClass}`}
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
```

#### 5 Jenis Bingkai (CSS Module)

```css
/* ── FRAME 1: Polaroid ── */
.frame_polaroid {
  background: white;
  padding: 12px 12px 40px;
  border-radius: 4px;
  box-shadow:
    0 8px 30px rgba(200, 100, 150, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.08);
}
.frame_polaroid .galInner {
  border-radius: 2px;
}
.frame_polaroid .galCaption {
  font-family: var(--font-pinyon), cursive;
  text-align: center;
  color: var(--text-dim);
  font-size: 0.95rem;
  margin-top: 8px;
}

/* ── FRAME 2: Ornate (Bingkai emas) ── */
.frame_ornate {
  padding: 10px;
  background: linear-gradient(
    135deg,
    #f0d8a0,
    #e8c878,
    #d4a84b,
    #e8c878,
    #f0d8a0
  );
  border-radius: 6px;
  box-shadow:
    0 10px 35px rgba(180, 120, 60, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
.frame_ornate .galInner {
  border: 3px solid rgba(212, 168, 75, 0.4);
  border-radius: 4px;
}

/* ── FRAME 3: Glassmorphism ── */
.frame_glass {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 8px;
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow-soft);
}

/* ── FRAME 4: Washi Tape ── */
.frame_tape {
  background: white;
  padding: 8px;
  border-radius: 3px;
  box-shadow: 0 4px 20px rgba(200, 100, 150, 0.15);
}
.frame_tape::before,
.frame_tape::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 22px;
  background: rgba(240, 140, 200, 0.25);
  border: 1px solid rgba(224, 90, 158, 0.1);
  z-index: 2;
}
.frame_tape::before {
  top: -8px;
  left: 20%;
  transform: rotate(-5deg);
}
.frame_tape::after {
  bottom: -8px;
  right: 20%;
  transform: rotate(3deg);
}

/* ── FRAME 5: Heart Border ── */
.frame_heart {
  background: white;
  padding: 12px;
  border-radius: 20px;
  border: 3px solid var(--pri-soft);
  box-shadow:
    0 0 0 6px rgba(224, 90, 158, 0.08),
    0 10px 30px rgba(200, 100, 150, 0.2);
}
.frame_heart .galInner {
  border-radius: 14px;
}
```

#### Lightbox Component

```tsx
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
```

#### Pola Bingkai per Foto

| No  | Frame Class      | Rotasi | Caption                   |
| --- | ---------------- | ------ | ------------------------- |
| 1   | `frame-polaroid` | -2deg  | ✅ "momen pertama kita ♡" |
| 2   | `frame-ornate`   | 1.5deg | —                         |
| 3   | `frame-glass`    | 0deg   | —                         |
| 4   | `frame-tape`     | 2deg   | —                         |
| 5   | `frame-heart`    | 0deg   | —                         |
| 6   | `frame-polaroid` | 3deg   | ✅ "selalu ada tawa ♡"    |
| 7   | `frame-ornate`   | -1deg  | —                         |
| 8   | `frame-glass`    | 0deg   | —                         |
| 9   | `frame-tape`     | -2deg  | —                         |
| 10  | `frame-heart`    | 0deg   | —                         |

---

## 🔧 Komponen Global (Shared)

### CustomCursor Component

```tsx
"use client";

import { useEffect, useRef } from "react";
import useMousePosition from "@/hooks/useMousePosition";
import styles from "@/styles/CustomCursor.module.css";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const ringRef = useRef({ x: 0, y: 0 });
  const ringElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    function followRing() {
      ringRef.current.x += (x - ringRef.current.x) * 0.14;
      ringRef.current.y += (y - ringRef.current.y) * 0.14;
      if (ringElRef.current) {
        ringElRef.current.style.left = ringRef.current.x + "px";
        ringElRef.current.style.top = ringRef.current.y + "px";
      }
      animId = requestAnimationFrame(followRing);
    }
    followRing();
    return () => cancelAnimationFrame(animId);
  }, [x, y]);

  return (
    <>
      <div className={styles.cursor} style={{ left: x, top: y }} />
      <div className={styles.ring} ref={ringElRef} />
    </>
  );
}
```

### ParticleCanvas Component

```tsx
"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  "rgba(224,90,158,",
  "rgba(240,140,200,",
  "rgba(200,100,180,",
  "rgba(216,120,190,",
  "rgba(247,184,239,",
];

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  a: number;
  c: string;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    function makeParticle(): Particle {
      return {
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        r: 0.3 + Math.random() * 1.6,
        dx: (Math.random() - 0.5) * 0.28,
        dy: -0.1 - Math.random() * 0.32,
        a: Math.random() * 0.4 + 0.08,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    }

    const particles: Particle[] = Array.from({ length: 70 }, makeParticle);

    let animId: number;
    function loop() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((p, i) => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.c + p.a + ")";
        ctx!.fill();
        p.x += p.dx;
        p.y += p.dy;
        p.a -= 0.00075;
        if (p.a <= 0 || p.y < -5) particles[i] = makeParticle();
      });
      animId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}
    />
  );
}
```

---

## ⚙️ Next.js Configuration

### `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Untuk static export (optional, jika deploy tanpa server)
  // output: 'export',

  images: {
    // Jika menggunakan static export, perlu unoptimized
    // unoptimized: true,
  },
};

module.exports = nextConfig;
```

> **Catatan**: Jika mau deploy sebagai static site (tanpa server Node.js), uncomment `output: 'export'` dan `unoptimized: true`.

### `globals.css` — Global Animations

```css
/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html {
  scroll-behavior: smooth;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: var(--font-dm), "DM Sans", sans-serif;
  background: var(--bg-deep);
  color: var(--text);
}

/* Noise texture overlay */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise */
  pointer-events: none;
  z-index: 9998;
  opacity: 0.4;
  mix-blend-mode: multiply;
}

/* Shared animations */
@keyframes fadeUp {
  from {
    transform: translateY(22px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

@keyframes pageIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 🔑 Perbedaan Utama dari Versi HTML ke Next.js

| Aspek                | HTML (Lama)                 | Next.js (Baru)                  |
| -------------------- | --------------------------- | ------------------------------- |
| **Arsitektur**       | Single file HTML            | Component-based React           |
| **Styling**          | `<style>` tag inline        | CSS Modules per komponen        |
| **State**            | Global variables            | React `useState` + props        |
| **DOM Manipulation** | `document.getElementById()` | React refs + state              |
| **Page Switching**   | Toggle CSS class `.on`      | Conditional rendering via state |
| **Font Loading**     | `<link>` tag                | `next/font` (optimized)         |
| **Images**           | `<img>` tag                 | `next/image` (optimized)        |
| **Effects**          | Inline `<script>`           | `useEffect` hooks               |
| **Audio**            | `<audio>` element           | Custom `useAudio` hook          |
| **Countdown**        | `setInterval` manual        | Custom `useCountdown` hook      |
| **Typewriter**       | `setTimeout` recursive      | Custom `useTypewriter` hook     |
| **Deploy**           | Buka file langsung          | `npm run dev` / Vercel          |

---

## ✅ Checklist Implementasi

### Setup

- [ ] Inisialisasi project Next.js (`create-next-app`)
- [ ] Install dependencies (font-awesome / react-icons)
- [ ] Setup font loading di `layout.tsx`
- [ ] Buat `globals.css` dengan CSS variables dan global animations
- [ ] Siapkan aset di folder `public/` (foto, audio, gif)

### Components — Core

- [ ] `BirthdayApp.tsx` — State machine utama
- [ ] `CustomCursor.tsx` — Dot + ring cursor
- [ ] `ParticleCanvas.tsx` — Background particles
- [ ] `SlideOverlay.tsx` — Backdrop blur overlay

### Components — Pages

- [ ] `LoginPage.tsx` + `NumPad.tsx` + `PinDots.tsx`
- [ ] `QuizPage.tsx` + `QuizCard.tsx` + `QuizResult.tsx`
- [ ] `SpotifyPage.tsx` + `VinylDisc.tsx` + `Equalizer.tsx`
- [ ] `BirthdayPage.tsx` + `CakeScene.tsx` + `Confetti.tsx`
- [ ] `MainPage.tsx` + `HeroGrid.tsx` + `StatsRow.tsx` + `MiniPlayer.tsx`

### Components — Slides

- [ ] `LetterSlide.tsx` + `LetterCard.tsx`
- [ ] `GallerySlide.tsx` + `GalleryItem.tsx` + `Lightbox.tsx`

### Hooks

- [ ] `useAudio.ts`
- [ ] `useCountdown.ts`
- [ ] `useTypewriter.ts`
- [ ] `useMousePosition.ts`

### Constants & Utils

- [ ] `constants.ts` — PIN, quiz data, letter text, gallery photos
- [ ] `utils.ts` — Format waktu, hitung umur

### Styles (CSS Modules)

- [ ] `LoginPage.module.css`
- [ ] `QuizPage.module.css`
- [ ] `SpotifyPage.module.css`
- [ ] `BirthdayPage.module.css`
- [ ] `MainPage.module.css`
- [ ] `LetterSlide.module.css`
- [ ] `GallerySlide.module.css`
- [ ] `CustomCursor.module.css`

### Verifikasi

- [ ] Semua nama "Sahida" dan "Athif" sudah benar
- [ ] Tanggal "3 Juni 2006" sudah benar di semua tempat
- [ ] PIN `0306` berfungsi
- [ ] Countdown menghitung ke 3 Juni berikutnya (dinamis)
- [ ] Gallery 10 foto dengan 5 jenis bingkai berfungsi
- [ ] Lightbox fullscreen berfungsi
- [ ] Typewriter surat berfungsi
- [ ] Musik play/pause berfungsi
- [ ] Semua animasi berjalan halus
- [ ] Responsive di mobile desktop+mobile modern
- [ ] Build sukses (`npm run build`)

---

## 📝 Catatan Penting

1. **"use client" directive**: Semua komponen yang menggunakan `useState`, `useEffect`, event handlers, atau browser API **wajib** ditandai `"use client"` di baris pertama file.

2. **next/image**: Gunakan `<Image>` dari `next/image` untuk optimasi gambar otomatis (lazy loading, responsive sizing, WebP conversion). Jika static export, set `unoptimized: true`.

3. **Audio di browser**: Browser modern memblokir autoplay audio. Music baru diplay setelah user interaction (klik "Let's Go Inside").

4. **CSS Modules naming**: Gunakan `camelCase` untuk class names di CSS Modules (contoh: `.galItem`, `.letterCard`). Hindari kebab-case karena perlu bracket notation di JS.

5. **Responsive**: Semua layout sudah responsive. Grid 2 kolom → 1 kolom di layar < 520px. Font menggunakan `clamp()` untuk scaling otomatis.

6. **Deploy ke Vercel**: Cukup push ke GitHub → connect di Vercel → auto deploy. Atau gunakan `npx vercel` dari terminal.

7. **Static Export Alternative**: Jika tidak mau pakai server, set `output: 'export'` di `next.config.js` lalu `npm run build`. Output ada di folder `out/`.
