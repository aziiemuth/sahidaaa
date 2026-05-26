export const PIN_CODE = "0306";

export interface Song {
  title: string;
  artist: string;
  src: string;
  cover: string;
  duration: number; // in seconds
}

export const SONGS: Song[] = [
  {
    title: "Tamally Ma'ak",
    artist: "Amr Diab",
    src: "/audio/background-music.mp3",
    cover: "/images/amr diab.jpg",
    duration: 223,
  },
  {
    title: "Separuh Aku",
    artist: "NOAH",
    src: "/audio/background-music2.mp3",
    cover: "/images/noah.jpg",
    duration: 268,
  },
];

export const MUSIC_TITLE = SONGS[0].title;
export const MUSIC_ARTIST = SONGS[0].artist;

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
    icon: "fa-phone",
    question: "Kalau lagi kangen tapi LDR, biasanya kamu...",
    options: [
      "Spam chat/call sampai diangkat",
      "Nonton ulang video/foto berdua",
      "Ngambek kecil biar dibujuk",
      "Tidur biar kangennya ilang",
    ],
  },
  {
    icon: "fa-utensils",
    question: "Makanan yang paling gabisa kamu tolak?",
    options: [
      "Seblak / Bakso super pedes",
      "Camilan manis / Es krim",
      "Makanan berat nasi padang / mie ayam",
      "Apapun asal dibayarin Athif",
    ],
  },
  {
    icon: "fa-face-smile",
    question: "Apa hal pertama yang kamu perhatikan dari Athif?",
    options: [
      "Senyumnya yang manis",
      "Sifatnya yang ngeselin tapi ngangenin",
      "Cara dia perhatian ke kamu",
      "Suara / cara dia ngomong",
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
  {
    icon: "fa-comments",
    question: "Topik chat paling seru kalau lagi ngobrol berdua?",
    options: [
      "Membahas masa depan kita berdua",
      "Saling kirim meme / video kocak",
      "Ghibah seru tentang hal random",
      "Curhat masalah keseharian masing-masing",
    ],
  },
  {
    icon: "fa-face-smile-wink",
    question: "Sifat Athif yang menurutmu paling ngegemesin?",
    options: [
      "Pas dia lagi manja / kangen",
      "Pas dia berusaha bikin kamu ketawa",
      "Pas dia panik kalau kamu ngambek",
      "Semuanya! Gak ada yang terlewat",
    ],
  },
  {
    icon: "fa-heart-pulse",
    question: "Momen tersweet yang pernah kamu alami sama Athif?",
    options: [
      "Dapat surprise hadiah tak terduga",
      "Ditemenin telfon sampai ketiduran",
      "Kata-kata penyemangat pas lagi capek",
      "Setiap detik waktu yang dihabisin bareng",
    ],
  },
  {
    icon: "fa-gamepad",
    question: "Kegiatan yang paling kamu pengen lakuin bareng pas ketemu?",
    options: [
      "Keliling kota naik motor sore-sore",
      "Masak makanan favorit berdua",
      "Nonton bioskop / Netflix maraton",
      "Deep talk sambil makan es krim",
    ],
  },
  {
    icon: "fa-hourglass-half",
    question: "Seberapa sabar kamu LDR-an sama Athif?",
    options: [
      "Sabar banget dong, demi masa depan",
      "Kadang rewel dikit tapi tetep bertahan",
      "Yang penting telfon terus tiap hari",
      "1000% sabar tiada batas",
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

export const LETTER_TEXT = `happy birthday sayang! 🎂✨

selamat ulang tahun buat pacarku yang paling ngeselin, paling suka bikin gemes, tapi anehnya paling aku sayang setengah mati. iya, siapa lagi kalau bukan kamu, sahida.

berhubung kita lagi LDR-an, kamu hari ini beruntung banget ya karena bebas omelan mautku. tapi tenang, semua itu bakal dirapel pas kita ketemu nanti, awas aja ya! kesel sih karena di hari spesialmu ini aku cuma bisa mandangin kamu lewat layar HP dan website sederhana ini (tapi ini bikinnya pakai cinta, jadi wajib hukumnya buat bilang keren dan aesthetic ya! awas kalau ga dipuji!).

walaupun jarak kita jauh dan rindu ini kadang menyiksa, aku bersyukur banget punya kamu. makasih ya udah sabar banget ngadepin aku yang juga ga kalah nyebelin ini. kamu adalah tempat pulang terbaikku, meskipun sekarang pulangnya masih virtual. semoga jarak di antara kita cepet ditiadakan ya, biar kita ga perlu pacaran sama layar HP terus.

di kejauhan sini, dengarlah lirik ini:
"Dengar laraku
Suara hati ini memanggil namamu
Karena separuh aku
Menyentuh laramu
Semua lukamu telah menjadi lirihku
Karena separuh aku
Dirimu"

Cieee... dibaca ya sayang! Liriknya dalem banget kan? Tapi beneran, karena separuh aku itu emang ada di kamu.

happy birthday, pacarkuhhh yang paling gemesin! 🎉
i love you more than all the kilometers between us 💕



— athif, yang selalu kangen dan sayang kamu setiap detik nyaaa ♡`;

export const REPLY_TEXT = "Halo Babe! Aku udah baca surat spesial dari kamu di website. Makasih banyak yaa atas ucapan dan kejutannya, aku seneng banget! Love you too 💕";

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
