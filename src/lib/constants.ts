export const PIN_CODE = "0306";
export const MUSIC_TITLE = "Tamally Ma'ak";
export const MUSIC_ARTIST = "Amr Diab";

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

export const LETTER_TEXT = `selamat ulang tahun sayang! 🎂✨

hari ini adalah hari yang paling spesial karena di hari ini, dunia dihadiahin orang yang paling berarti buatku — kamu, sahida.

aku nggak pernah bosan bersyukur karena allah mempertemukan kita. setiap hari bersamamu terasa seperti hadiah. kamu adalah alasan senyumku, semangat pagiku, dan bintang di malamku.

terima kasih sudah selalu ada, selalu sabar, selalu jadi tempat pulang yang paling nyaman. kamu tuh luar biasa — lebih dari yang kamu sadari.

di umurmu yang baru ini, aku doakan semua mimpi-mimpimu tercapai, semoga allah selalu menjagamu, memberkahimu, dan membahagiakanmu — lebih dari yang bisa aku berikan.

aku janji akan selalu berusaha jadi yang terbaik untukmu.

selamat ulang tahun, sahida! 🎉
love you more than words can say 💕

— athif, yang selalu sayang kamu ♡`;

export type FrameType = "polaroid" | "ornate" | "glass" | "tape" | "heart";

export interface GalleryPhoto {
  src: string;
  alt: string;
  frame: FrameType;
  rotation: number;
  caption?: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: "/images/gallery/gambar%201.png",
    alt: "Momen 1",
    frame: "polaroid",
    rotation: -2,
    caption: "momen pertama kita ♡",
  },
  {
    src: "/images/gallery/gambar%202.png",
    alt: "Momen 2",
    frame: "ornate",
    rotation: 1.5,
  },
  { src: "/images/gallery/gambar%201.png", alt: "Momen 3", frame: "glass", rotation: 0 },
  { src: "/images/gallery/gambar%202.png", alt: "Momen 4", frame: "tape", rotation: 2 },
  { src: "/images/gallery/gambar%201.png", alt: "Momen 5", frame: "heart", rotation: 0 },
  {
    src: "/images/gallery/gambar%202.png",
    alt: "Momen 6",
    frame: "polaroid",
    rotation: 3,
    caption: "selalu ada tawa ♡",
  },
  {
    src: "/images/gallery/gambar%201.png",
    alt: "Momen 7",
    frame: "ornate",
    rotation: -1,
  },
  { src: "/images/gallery/gambar%202.png", alt: "Momen 8", frame: "glass", rotation: 0 },
  { src: "/images/gallery/gambar%201.png", alt: "Momen 9", frame: "tape", rotation: -2 },
  {
    src: "/images/gallery/gambar%202.png",
    alt: "Momen 10",
    frame: "heart",
    rotation: 0,
  },
];

export const OPTION_LETTERS = ["A", "B", "C", "D"];
