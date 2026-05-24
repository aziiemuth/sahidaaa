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

export const LETTER_TEXT = `happy birthday sayang! 🎂✨

selamat ulang tahun buat orang yang paling ngeselin, paling keras kepala, paling suka bikin gemes, tapi anehnya juga orang yang paling aku sayang setengah mati. iya, siapa lagi kalau bukan pacar aku satu-satunya ini, sahida.

berhubung kita lagi LDR-an, kamu hari ini beruntung banget ya karena bebas dari cubitan maut di pipi chubbymu itu dan pelukan eratku yang bikin kamu protes pengap. tapi jangan senang dulu! catat baik-baik ya, semua itu bakal diakumulasikan dan langsung dirapel tanpa ampun pas kita ketemu nanti, pokoknya awas aja sampai kabur! agak menyebalkan emang kalau dipikir-pikir, di hari spesialmu ini aku cuma bisa mandangin kamu lewat layar HP, ngirim chat panjang lebar, dan bikin website sederhana ini (tapi ini bikinnya pakai cinta lho, jadi wajib hukumnya buat bilang keren dan aesthetic ya! awas kalau ga dipuji!).

jujur, LDR itu ga mudah sama sekali. kadang ada masanya aku ngerasa kesel sendiri karena ga bisa ada di samping kamu pas kamu lagi capek, pas kamu butuh temen jalan, atau pas kamu lagi pengen dimanjain. rasanya pengen banget tiba-tiba teleport ke tempatmu terus ngajak kamu kulineran sampai kenyang. tapi di balik semua jarak yang menyiksa ini, aku ga pernah menyesal sedikit pun. karena sejauh apa pun jarak kita sekarang, perasaan aku ke kamu ga berkurang semili pun. malah makin hari makin bertambah (kayak tagihan listrik, tapi ini versi sayangnya).

makasih ya, sayang. makasih udah sabar banget ngadepin aku yang kadang juga ga kalah nyebelin, suka overthink, atau kadang kurang peka. makasih udah selalu jadi penyemangat terbaikku, jadi orang pertama yang aku cari pas lagi seneng maupun susah, dan tetap bertahan sejauh ini meskipun kita cuma bisa pacaran lewat sinyal internet. setiap kali denger ketawa kamu di telepon, atau ngeliat muka kamu pas video call (terutama pas kamu lagi cemberut atau ngantuk-ngantuk gemes), rasanya semua rasa capek aku langsung ilang gitu aja. kamu itu tempat pulang terbaikku, meskipun sekarang pulangnya masih harus lewat ketikan layar dan suara.

di umurmu yang baru ini, doaku ga pernah putus untukmu. semoga kamu selalu diberikan kesehatan, dilindungi di setiap langkahmu, dilancarkan segala urusan dan cita-citamu, serta didekatkan dengan segala hal yang baik. dan yang paling penting: semoga tingkat kesabaranmu ngadepin sifat absurdku bertambah 1000% ya! hehe. satu lagi, semoga rencana-rencana kita ke depan dilancarkan allah swt, biar jarak di antara kita cepet ditiadakan, dan kita ga perlu lagi pacaran virtual kayak gini.

aku janji akan terus berjuang, belajar jadi orang yang lebih baik lagi buat kamu, dan berusaha semaksimal mungkin biar masa depan yang sering kita obrolin bareng-bareng itu bisa cepet terwujud. tetep jadi sahida yang aku kenal yaa—yang meskipun kadang suka ngambek ga jelas, tapi hatinya luar biasa baik dan tulus banget.

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
