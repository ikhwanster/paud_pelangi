import { StudentProfile } from '../types';

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'student-1',
    name: 'Budi Santoso',
    age: '3.5 Tahun',
    avatar: '👦',
    gender: 'male',
    favoriteColor: '#3B82F6', // Blue
    hairStyle: 'Rambut Pendek Rapi',
    stars: 24,
    completedModules: [1, 2, 3, 4, 6],
    aspectScores: {
      jatiDiri: 88,
      nilaiAgama: 90,
      literasi: 82,
      fisikMotorik: 95
    },
    dailyLogs: [
      {
        id: 'log-1',
        date: '2026-07-22',
        attendance: 'Hadir',
        activitiesDone: ['Pengenalan Anggota Tubuh (Drag & Drop)', 'Lagu Kepala Pundak Lutut Kaki', 'Cermin & Kartu Nama'],
        starsEarned: 8,
        teacherNote: 'Budi sangat aktif menunjukkan bagian tubuh kepala dan tangan. Sangat percaya diri bernyanyi.',
        aspectObservation: {
          jatiDiri: 'Mampu menyebutkan nama lengkap dan warna kesukaannya dengan bangga.',
          nilaiAgama: 'Mengucapkan rasa syukur saat diajak mengenali anggota tubuh pemberian Tuhan.',
          literasi: 'Menjawab pertanyaan guru dengan nada jernih dan kalimat sederhana.',
          fisikMotorik: 'Dapat menirukan gerakan menunjuk kepala, pundak, dan lutut dengan tepat.'
        }
      },
      {
        id: 'log-2',
        date: '2026-07-21',
        attendance: 'Hadir',
        activitiesDone: ['Mengenal Keunikan Diri', 'Kuis Warna Sederhana'],
        starsEarned: 6,
        teacherNote: 'Budi menyukai warna biru dan membantu teman saat mencocokkan gambar.',
        aspectObservation: {
          jatiDiri: 'Mengetahui perbedaan gaya rambut pendek dan panjang.',
          nilaiAgama: 'Menunjukkan rasa menghargai kepada teman sekelas.',
          literasi: 'Mengenal simbol dan warna dengan baik.',
          fisikMotorik: 'Kemampuan motorik halus drag & drop sudah baik.'
        }
      }
    ]
  },
  {
    id: 'student-2',
    name: 'Ani Lestari',
    age: '3 Tahun',
    avatar: '👧',
    gender: 'female',
    favoriteColor: '#EC4899', // Pink
    hairStyle: 'Rambut Panjang Kuncir Dua',
    stars: 30,
    completedModules: [1, 2, 3, 4, 5, 6, 7],
    aspectScores: {
      jatiDiri: 92,
      nilaiAgama: 94,
      literasi: 90,
      fisikMotorik: 86
    },
    dailyLogs: [
      {
        id: 'log-3',
        date: '2026-07-22',
        attendance: 'Hadir',
        activitiesDone: ['Kartu Nama Unikku', 'Game Kebiasaan Sehat', 'Mengenal Keunikan Diri'],
        starsEarned: 10,
        teacherNote: 'Ani sangat senang menghias kartu namanya dan tahu pentingnya mandi serta cuci tangan.',
        aspectObservation: {
          jatiDiri: 'Gembira melihat bayangan dirinya di cermin interaktif.',
          nilaiAgama: 'Paham kebiasaan mandi dan makan makanan sehat sebagai bentuk menjaga tubuh.',
          literasi: 'Kosa kata tentang kebiasaan sehari-hari sangat berkembang.',
          fisikMotorik: 'Kordinasi jari tangan saat menarik gambar ke tempatnya sangat lincah.'
        }
      }
    ]
  },
  {
    id: 'student-3',
    name: 'Siti Rahma',
    age: '3.8 Tahun',
    avatar: '👧',
    gender: 'female',
    favoriteColor: '#10B981', // Green
    hairStyle: 'Rambut Keriting Manis',
    stars: 18,
    completedModules: [1, 2, 3],
    aspectScores: {
      jatiDiri: 78,
      nilaiAgama: 85,
      literasi: 75,
      fisikMotorik: 88
    },
    dailyLogs: [
      {
        id: 'log-4',
        date: '2026-07-22',
        attendance: 'Hadir',
        activitiesDone: ['Lagu & Gerak Tubuh', 'Mengenalkan Konsep Diri'],
        starsEarned: 5,
        teacherNote: 'Siti sedikit pemalu di awal, tetapi bersemangat ketika menyanyikan lagu anggota tubuh.',
        aspectObservation: {
          jatiDiri: 'Mulai berani tampil dan menyebutkan usianya di depan teman-teman.',
          nilaiAgama: 'Bersikap lembut dan mau mendengarkan petunjuk guru.',
          literasi: 'Mengikuti irama lagu dan mengucapkan kosa kata sederhana.',
          fisikMotorik: 'Dapat melompat kecil dan menggerakkan kaki mengikuti lagu.'
        }
      }
    ]
  },
  {
    id: 'student-4',
    name: 'Doni Pratama',
    age: '4 Tahun',
    avatar: '👦',
    gender: 'male',
    favoriteColor: '#F59E0B', // Yellow
    hairStyle: 'Rambut Pendek Jabrik',
    stars: 22,
    completedModules: [1, 2, 3, 4, 7],
    aspectScores: {
      jatiDiri: 85,
      nilaiAgama: 88,
      literasi: 80,
      fisikMotorik: 92
    },
    dailyLogs: [
      {
        id: 'log-5',
        date: '2026-07-22',
        attendance: 'Hadir',
        activitiesDone: ['Game Kebiasaan Sehat', 'Drag & Drop Anggota Tubuh'],
        starsEarned: 7,
        teacherNote: 'Doni dapat mengelompokkan makanan sehat seperti buah & sayur dengan tepat.',
        aspectObservation: {
          jatiDiri: 'Sangat mandiri dan bersemangat mencoba tantangan game interaktif.',
          nilaiAgama: 'Belajar mencuci tangan sebelum dan sesudah makan.',
          literasi: 'Mampu membedakan gambar makanan sehat dan tidak sehat.',
          fisikMotorik: 'Refleks motorik cepat dan tepat.'
        }
      }
    ]
  }
];
