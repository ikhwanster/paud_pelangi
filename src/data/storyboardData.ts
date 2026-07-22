import { StoryboardStep } from '../types';

export const PAUD_THEME_INFO = {
  title: 'STORYBOARD PEMBELAJARAN PAUD',
  theme: 'TEMA : DIRI SENDIRI',
  subtheme: 'SUBTEMA : MENGENAL DIRI SENDIRI',
  ageGroup: 'Usia 3–4 Tahun',
  aspekPerkembangan: [
    {
      title: 'Jati Diri',
      desc: 'Anak mengenal identitas dan karakteristik dirinya.'
    },
    {
      title: 'Nilai Agama dan Budi Pekerti',
      desc: 'Anak bersyukur atas tubuh yang dimiliki.'
    },
    {
      title: 'Dasar-Dasar Literasi',
      desc: 'Anak mampu menyampaikan informasi sederhana tentang dirinya.'
    },
    {
      title: 'Fisik Motorik',
      desc: 'Anak mengenal dan menggerakkan anggota tubuh.'
    }
  ],
  mediaPembelajaran: [
    { id: 'cermin', label: 'Cermin', icon: 'Sparkles', color: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
    { id: 'anggota-tubuh', label: 'Gambar Anggota Tubuh', icon: 'User', color: 'bg-amber-100 text-amber-700 border-amber-300' },
    { id: 'lagu', label: 'Lagu', icon: 'Music', color: 'bg-rose-100 text-rose-700 border-rose-300' },
    { id: 'kartu-nama', label: 'Kartu Nama Anak', icon: 'BadgeCheck', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' }
  ]
};

export const STORYBOARD_STEPS: StoryboardStep[] = [
  {
    id: 1,
    title: 'Pembukaan',
    subtitle: 'Salam & Pengenalan Awal',
    dialog: 'Selamat pagi anak-anak. Hari ini kita akan belajar tentang diri kita sendiri.',
    objective: 'Membangun suasana nyaman dan kesiapan belajar.',
    icon: 'Sun',
    bgGradient: 'from-purple-100 to-indigo-50',
    accentColor: 'border-purple-300 text-purple-700 bg-purple-500',
    mediaUsed: ['Kartu Nama Anak'],
    aspects: ['Jati Diri', 'Dasar-Dasar Literasi']
  },
  {
    id: 2,
    title: 'Mengajak Anak Fokus',
    subtitle: 'Bernyanyi & Gerak Tubuh',
    dialog: 'Ayo kita bernyanyi bersama tentang anggota tubuh. Gerakkan tangan, kaki, dan tunjukkan bagian tubuh kita.',
    objective: 'Mengaktifkan perhatian dan mengenalkan anggota tubuh.',
    icon: 'Music',
    bgGradient: 'from-emerald-100 to-green-50',
    accentColor: 'border-emerald-300 text-emerald-700 bg-emerald-500',
    mediaUsed: ['Lagu', 'Gambar Anggota Tubuh'],
    aspects: ['Fisik Motorik', 'Jati Diri'],
    gameType: 'song'
  },
  {
    id: 3,
    title: 'Mengenalkan Konsep Diri',
    subtitle: 'Pegang & Sebut Anggota Tubuh',
    dialog: 'Coba pegang kepala, tangan, dan kaki kalian. Ini semua adalah bagian dari diri kita.',
    objective: 'Anak mulai mengenal tubuh sebagai bagian dari dirinya.',
    icon: 'Hand',
    bgGradient: 'from-amber-100 to-orange-50',
    accentColor: 'border-amber-300 text-amber-700 bg-amber-500',
    mediaUsed: ['Gambar Anggota Tubuh'],
    aspects: ['Fisik Motorik', 'Jati Diri'],
    gameType: 'body-parts'
  },
  {
    id: 4,
    title: 'Mengamati Diri Sendiri',
    subtitle: 'Bercermin & Refleksi Diri',
    dialog: 'Coba lihat di cermin. Siapa yang kalian lihat? Ya, itu adalah diri kalian sendiri.',
    objective: 'Mengembangkan kesadaran identitas diri.',
    icon: 'Sparkles',
    bgGradient: 'from-sky-100 to-blue-50',
    accentColor: 'border-sky-300 text-sky-700 bg-sky-500',
    mediaUsed: ['Cermin', 'Kartu Nama Anak'],
    aspects: ['Jati Diri', 'Nilai Agama dan Budi Pekerti'],
    gameType: 'mirror-avatar'
  },
  {
    id: 5,
    title: 'Mengenal Keunikan Diri',
    subtitle: 'Rambut, Warna & Istimewa',
    dialog: 'Ada teman yang rambutnya panjang, ada yang pendek. Ada yang suka warna merah, ada yang suka warna biru. Semua anak istimewa.',
    objective: 'Menumbuhkan rasa percaya diri dan menghargai perbedaan.',
    icon: 'Heart',
    bgGradient: 'from-rose-100 to-pink-50',
    accentColor: 'border-rose-300 text-rose-700 bg-rose-500',
    mediaUsed: ['Cermin', 'Kartu Nama Anak'],
    aspects: ['Jati Diri', 'Nilai Agama dan Budi Pekerti'],
    gameType: 'mirror-avatar'
  },
  {
    id: 6,
    title: 'Tanya Jawab Sederhana',
    subtitle: 'Nama, Umur & Kesukaan',
    dialog: 'Siapa nama kamu? Berapa umur kamu? Apa warna yang kamu suka?',
    objective: 'Melatih kemampuan komunikasi dan mengenal identitas diri.',
    icon: 'MessageCircle',
    bgGradient: 'from-cyan-100 to-teal-50',
    accentColor: 'border-cyan-300 text-cyan-700 bg-cyan-500',
    mediaUsed: ['Kartu Nama Anak'],
    aspects: ['Dasar-Dasar Literasi', 'Jati Diri'],
    gameType: 'quiz'
  },
  {
    id: 7,
    title: 'Penguatan Nilai Positif',
    subtitle: 'Rawat Tubuh & Kebiasaan Sehat',
    dialog: 'Kita harus menjaga tubuh kita, makan makanan sehat, mandi, dan selalu percaya diri.',
    objective: 'Membentuk sikap mandiri dan peduli diri.',
    icon: 'ShieldCheck',
    bgGradient: 'from-violet-100 to-purple-50',
    accentColor: 'border-violet-300 text-violet-700 bg-violet-500',
    mediaUsed: ['Gambar Anggota Tubuh'],
    aspects: ['Nilai Agama dan Budi Pekerti', 'Fisik Motorik'],
    gameType: 'healthy-habits'
  },
  {
    id: 8,
    title: 'Transisi ke Kegiatan Inti',
    subtitle: 'Ayo Bermain Bersama!',
    dialog: 'Sekarang, mari kita mulai bermain dan belajar mengenal diri kita lebih dekat.',
    objective: 'Menghubungkan kegiatan pembukaan dengan kegiatan inti.',
    icon: 'Rocket',
    bgGradient: 'from-yellow-100 to-amber-50',
    accentColor: 'border-yellow-300 text-yellow-700 bg-yellow-500',
    mediaUsed: ['Semua Media'],
    aspects: ['Jati Diri', 'Dasar-Dasar Literasi', 'Fisik Motorik']
  }
];
