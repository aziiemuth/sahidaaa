# 🎂 Website Birthday Surprise Premium (Next.js)

[![Next.js](https://img.shields.io/badge/Framework-Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![CSS Modules](https://img.shields.io/badge/Styling-CSS%20Modules-purple?style=for-the-badge&logo=css3)](https://github.com/css-modules/css-modules)

Website hadiah ulang tahun interaktif dan premium yang dirancang khusus untuk memberikan kejutan spesial. Dibuat menggunakan **Next.js** dan **TypeScript** dengan estetika modern, transisi halus, efek _glassmorphism_, partikel interaktif, serta animasi _3D tilt_.

---

## ✨ Fitur Utama

1. 🔒 **Halaman Login Keamanan (PIN-protected)**
   - Akses masuk menggunakan PIN khusus (numpad interaktif) untuk menjaga kejutan tetap rahasia.
2. 📝 **Kuis Interaktif (7 Pertanyaan)**
   - Pertanyaan kuis seru tentang selera/momen kebersamaan, lengkap dengan perhitungan skor dan komentar apresiatif di akhir kuis.
3. 🎵 **Spotify Transition Player (Realistic Vinyl)**
   - Halaman transisi memutar lagu spesial dengan piringan hitam (_vinyl disc_) berwarna hitam soft yang berputar secara realistis, lengkap dengan jarum pemutar (_stylus needle_), efek pantulan cahaya 3D (_static gloss reflection_), dan equalizer visual yang menari sesuai lagu.
   - _Ditambahkan animasi gerak (distracting motion) gemetar/pulsing premium pada tombol ganti lagu untuk meningkatkan interaksi._
4. 🎂 **Interactive Cake & Candle Blowing**
   - Halaman lilin ulang tahun interaktif. Lilin bisa ditiup (menggunakan klik/interaksi layar) diikuti dengan ledakan efek confetti warna-warni yang meriah.
5. 📊 **Dashboard Utama Kejutan**
   - **Hero Grid**: Menampilkan foto utama penerima kejutan dengan efek _3D floating_ & _mouse-tilt follow_, serta dukungan klik untuk memperbesar foto (_lightbox overlay_).
   - **Countdown Timer**: Hitung mundur presisi menuju hari ulang tahun berikutnya.
   - **Statistik Hubungan**: Menampilkan angka-angka kebersamaan yang menarik.
   - **Mini Music Player**: Pemutar musik melayang yang dapat dikontrol dari halaman dashboard utama.
   - **Explore Menu**: Kartu navigasi interaktif untuk membuka surat cinta, galeri foto, serta kartu pengiriman surat balik (WhatsApp).
6. ✉️ **Surat Cinta dengan Typewriter Effect**
   - Surat tulisan tangan digital yang mengetik sendiri secara dramatis lengkap dengan dekorasi bunga melayang.
7. 🖼️ **Galeri Foto Estetik (Polaroid & Ornate Frame)**
   - Album foto memori dengan rotasi acak dan berbagai variasi bingkai foto (Polaroid, ornate, glass, tape, heart) lengkap dengan fitur pembesar foto (_lightbox overlay_).
8. 💬 **Kirim Surat Balik (Direct WhatsApp)**
   - Tombol khusus di halaman Explore untuk memudahkan penerima mengirimkan surat/pesan balasan langsung ke nomor WhatsApp pengirim dengan teks default yang romantis.
9. ✨ **Aksesoris Visual Premium**
   - Efek partikel gelembung melayang (_Particle Canvas_).
   - Pengikut kursor mouse melingkar kustom (_Custom Follower Cursor_).
10. 🔌 **Database & Real-time Admin Dashboard (`/admin`)**
    - Terintegrasi dengan **Supabase** untuk menyimpan jawaban kuis secara otomatis. Dashboard admin memiliki koneksi realtime persisten menggunakan protokol PostgreSQL changes dari Supabase untuk menampilkan data masuk secara langsung tanpa reload, lengkap dengan pagination sesi dan fitur hapus seluruh riwayat kuis kustom.

---

## 📁 Struktur Folder Project

```text
birthday-project/
├── public/
│   ├── audio/
│   │   └── background-music.mp3        ← File musik background utama (loop)
│   └── images/
│       ├── amr diab.jpg                ← Cover album / foto artis pemutar vinyl
│       ├── opening.gif                 ← GIF animasi di halaman login
│       ├── sahida.png                  ← Foto utama penerima kejutan (Hero section)
│       └── gallery/
│           └── gambar 1.png / 2.png    ← Kumpulan foto album galeri memori
│
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx                ← Dashboard Admin untuk memantau jawaban kuis secara realtime
│   │   ├── layout.tsx                  ← Load fonts, metadata, & global wrappers
│   │   ├── page.tsx                    ← Entry point utama halaman
│   │   └── globals.css                 ← CSS variabel tema utama dan keyframes global
│   ├── components/
│   │   ├── BirthdayApp.tsx             ← Sistem navigasi halaman (state machine)
│   │   ├── pages/                      ← Seluruh tampilan halaman utama
│   │   │   ├── LoginPage.tsx
│   │   │   ├── QuizPage.tsx
│   │   │   ├── SpotifyPage.tsx
│   │   │   ├── BirthdayPage.tsx
│   │   │   └── MainPage.tsx
│   │   ├── slides/                     ← Bagian popup slide (Surat & Galeri)
│   │   │   ├── LetterSlide.tsx
│   │   │   └── GallerySlide.tsx
│   │   └── ui/                         ← Komponen UI reusable kecil
│   │       ├── VinylDisc.tsx           ← Komponen piringan hitam realistis
│   │       ├── MiniPlayer.tsx          ← Mini audio player melayang
│   │       ├── CakeScene.tsx           ← Animasi tiup lilin
│   │       └── ...
│   ├── hooks/                          ← Custom React Hooks (Audio, Countdown, Typewriter)
│   ├── lib/
│   │   ├── constants.ts                ← DATA UTAMA (PIN, Pertanyaan Kuis, Isi Surat, Foto, Balasan WA)
│   │   ├── supabase.ts                 ← Inisialisasi client Supabase
│   │   └── utils.ts
│   └── styles/                         ← CSS Modules unik untuk masing-masing halaman
│
├── .env.local                          ← Kredensial API Supabase (URL & Anon Key)
└── supabase-setup.sql                  ← SQL Setup untuk mendirikan tabel & RLS di Supabase
```

---

## 🚀 Memulai (Setup Lokal)

### 1. Klon Repositori & Instalasi Dependensi

Pastikan Anda sudah menginstal **Node.js** di perangkat Anda, lalu jalankan perintah berikut di terminal:

```bash
npm install
```

### 2. Setup Database & Variabel Lingkungan (Supabase)

Proyek ini menggunakan **Supabase** untuk menyimpan jawaban kuis secara real-time. Ikuti langkah mudah berikut:

1. **Buat Akun & Proyek Baru**: Masuk ke [Supabase](https://supabase.com/) lalu buat proyek baru secara gratis.
2. **Setup Skema Database**:
   - Salin seluruh kueri SQL di dalam file [`supabase-setup.sql`]
   - Masuk ke dashboard proyek Supabase Anda, pilih menu **SQL Editor** di bilah kiri, klik **New Query**, tempelkan kueri tersebut, lalu klik tombol **Run**. Ini akan mendirikan tabel `quiz_answers`, mengaktifkan Row-Level Security (RLS) anonim, serta menyalakan Realtime Publikasi.
3. **Konfigurasi Environment Variables (.env)**:
   - Buat file `.env` atau `.env.local` di folder root proyek Anda.
   - Dapatkan URL & Anon Key di menu **Project Settings > API** proyek Supabase Anda, lalu isikan ke file tersebut:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

### 3. Jalankan Mode Development (Lokal)

Jalankan server pengembangan lokal:

```bash
npm run dev
```

Buka browser Anda dan akses ke [http://localhost:3000](http://localhost:3000). Untuk mengakses halaman Admin Dashboard guna memantau jawaban secara realtime, buka [http://localhost:3000/admin](http://localhost:3000/admin).

### 4. Build untuk Produksi

Sebelum deploy ke platform hosting (seperti Vercel atau Netlify), pastikan tidak ada TypeScript error dan kompilasi proyek berjalan lancar:

```bash
npm run build
```

---

## 🎨 Panduan Kustomisasi (Cara Menggunakan Kembali)

Proyek ini dibuat agar **sangat mudah dikustomisasi** ulang untuk orang lain. Anda hampir tidak perlu menyentuh logika kode, cukup ubah file data di:

### ⚙️ 1. Mengubah Data Teks, PIN, Kuis, & Surat

Buka file `src/lib/constants.ts` dan ubah konstanta berikut:

- **PIN Login**: Ubah nilai `PIN_CODE` (default: `"0306"`).
- **Detail Musik**: Ubah nama judul `MUSIC_TITLE` dan penyanyi `MUSIC_ARTIST` untuk mempersonalisasi pemutar lagu Spotify.
- **Pertanyaan Kuis**: Ubah array `QUIZ_QUESTIONS` untuk membuat kuis kustom Anda sendiri.
- **Isi Surat Cinta**: Ubah string `LETTER_TEXT` (mendukung spasi baru dan emoji) yang akan diketik otomatis.
- **Pesan Surat Balik (WhatsApp)**: Ubah string `REPLY_TEXT` (default: `"Halo Babe! Aku udah baca surat spesial dari kamu di website..."`) yang dikirim kembali ketika pasangan membalas via WhatsApp.
- **Album Galeri**: Ubah array `GALLERY_PHOTOS` untuk menyesuaikan path gambar (`src`), deskripsi foto (`caption`), rotasi sudut, dan jenis bingkai (`frame`).

### 📅 2. Mengubah Target Tanggal Lahir (Countdown & Umur)

Buka file `src/components/pages/MainPage.tsx` dan ubah tanggal lahir target di baris:

```tsx
const { days, hours, minutes, seconds, age, isBirthday } =
  useCountdown("2006-06-03"); // Ganti tanggal lahir di sini!
```

_Sistem secara otomatis akan menghitung umur penerima sekarang secara berkala, serta melakukan hitung mundur hari ulang tahun berikutnya secara real-time._

### 💬 3. Mengubah Nomor WhatsApp Tujuan Balasan

Buka file `src/components/pages/MainPage.tsx` dan ubah nomor tujuan WhatsApp di bagian tombol `Kirim Surat Balik` (baris `onClick`):

```tsx
const url = `https://wa.me/62816234185?text=${encodeURIComponent(REPLY_TEXT)}`; // Ganti 62816234185 dengan nomor WhatsApp Anda!
```

_Pastikan format nomor telepon diawali dengan kode negara tanpa tanda `+` atau karakter lainnya (misal: `628123456789`)._

### 🎵 4. Mengganti Musik Background

- Masukkan file audio baru Anda ke dalam folder `public/audio/`.
- Pastikan file tersebut dinamai `background-music.mp3` atau Anda bisa mengganti referensi jalurnya di file `src/components/BirthdayApp.tsx` bagian pemanggilan hook `useAudio`.

### 🖼️ 5. Mengganti Aset Foto & Cover Album

- **Foto Utama**: Ganti file `public/images/sahida.png` dengan foto pasangan/teman Anda yang ingin diberi kejutan.
- **Cover Piringan Vinyl**: Ganti `public/images/amr diab.jpg` dengan foto cover lagu pilihan Anda.
- **Foto Album Galeri**: Letakkan foto-foto Anda di folder `public/images/gallery/` dan hubungkan nama fotonya di `src/lib/constants.ts`.

---

## 🛠️ Tech Stack & Dependensi

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Database & Realtime**: [Supabase](https://supabase.com/)
- **Icon Pack**: [@fortawesome/react-fontawesome](https://github.com/FortAwesome/react-fontawesome)
- **Efek Ledakan**: Canvas Confetti (kustom dalam komponen UI)
- **Partikel Background**: HTML5 Canvas rendering engine

---

## 🎁 Kontribusi & Lisensi

Proyek ini bebas digunakan, dimodifikasi, dan didistribusikan secara gratis sebagai hadiah kejutan untuk orang-orang tersayang Anda. Jika proyek ini membantumu membuat seseorang tersenyum, silakan beri tanda ⭐ di proyek ini!
