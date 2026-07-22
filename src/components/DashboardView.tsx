import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentProfile, DailyLog } from '../types';
import { INITIAL_STUDENTS } from '../data/studentsData';
import { playSound } from '../utils/soundEffects';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import {
  User, Plus, Star, Award, Calendar, CheckCircle2, FileText, Printer,
  Sparkles, Heart, Brain, Activity, Edit3, Save, Check
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const [students, setStudents] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(INITIAL_STUDENTS[0].id);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentAge, setNewStudentAge] = useState('3.5 Tahun');
  const [newStudentGender, setNewStudentGender] = useState<'male' | 'female'>('male');
  const [isEditingNote, setIsEditingNote] = useState(false);

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const latestLog = currentStudent.dailyLogs[0] || {
    id: 'default',
    date: '2026-07-22',
    attendance: 'Hadir',
    activitiesDone: ['Pengenalan Anggota Tubuh'],
    starsEarned: 5,
    teacherNote: 'Anak sangat aktif berpartisipasi.',
    aspectObservation: {
      jatiDiri: 'Sangat baik dalam mengenali nama dan keunikan dirinya.',
      nilaiAgama: 'Mulai terbiasa berdo\'a dan bersyukur.',
      literasi: 'Mampu berkomunikasi dengan kalimat sederhana.',
      fisikMotorik: 'Motorik halus dan kasar berkembang optimal.'
    }
  };

  const [editableNote, setEditableNote] = useState(latestLog.teacherNote);

  // Radar chart data for 4 PAUD developmental aspects
  const aspectData = [
    { subject: 'Jati Diri', A: currentStudent.aspectScores.jatiDiri, fullMark: 100 },
    { subject: 'Nilai Agama', A: currentStudent.aspectScores.nilaiAgama, fullMark: 100 },
    { subject: 'Literasi', A: currentStudent.aspectScores.literasi, fullMark: 100 },
    { subject: 'Fisik Motorik', A: currentStudent.aspectScores.fisikMotorik, fullMark: 100 }
  ];

  // Bar chart data for daily logs history
  const logChartData = currentStudent.dailyLogs.map(log => ({
    date: log.date,
    bintang: log.starsEarned
  }));

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const newStudent: StudentProfile = {
      id: `student-${Date.now()}`,
      name: newStudentName,
      age: newStudentAge,
      avatar: newStudentGender === 'male' ? '👦' : '👧',
      gender: newStudentGender,
      favoriteColor: '#3B82F6',
      hairStyle: 'Pendek Rapi',
      stars: 10,
      completedModules: [1, 2],
      aspectScores: {
        jatiDiri: 80,
        nilaiAgama: 82,
        literasi: 78,
        fisikMotorik: 85
      },
      dailyLogs: [
        {
          id: `log-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          attendance: 'Hadir',
          activitiesDone: ['Pengenalan Diri Sendiri'],
          starsEarned: 5,
          teacherNote: `${newStudentName} baru bergabung dan menunjukkan antusiasme yang sangat baik.`,
          aspectObservation: {
            jatiDiri: 'Mulai beradaptasi dengan teman kelas.',
            nilaiAgama: 'Bersikap santun.',
            literasi: 'Mendengarkan cerita guru dengan fokus.',
            fisikMotorik: 'Dapat bergerak mengikuti lagu.'
          }
        }
      ]
    };

    setStudents([...students, newStudent]);
    setSelectedStudentId(newStudent.id);
    setNewStudentName('');
    setShowAddStudentModal(false);
    playSound('correct');
  };

  const handleSaveNote = () => {
    setIsEditingNote(false);
    playSound('correct');
    // Update local state
    setStudents(prev => prev.map(s => {
      if (s.id === currentStudent.id && s.dailyLogs.length > 0) {
        const updatedLogs = [...s.dailyLogs];
        updatedLogs[0] = { ...updatedLogs[0], teacherNote: editableNote };
        return { ...s, dailyLogs: updatedLogs };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-8">
      {/* Student Profile Selector Bar */}
      <div className="bg-white rounded-3xl p-5 border-4 border-amber-200 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">👧👦</span>
          <div>
            <h2 className="text-xl font-black text-amber-950">
              Pilih Profil Murid PAUD:
            </h2>
            <p className="text-xs text-amber-800 font-medium">
              Pantau statistik dan laporan perkembangan harian anak.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {students.map((student) => (
            <button
              key={student.id}
              onClick={() => {
                setSelectedStudentId(student.id);
                setEditableNote(student.dailyLogs[0]?.teacherNote || '');
                playSound('click');
              }}
              className={`px-4 py-2 rounded-2xl font-black text-sm transition-all flex items-center gap-2 border-2 ${
                selectedStudentId === student.id
                  ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-md scale-102 ring-2 ring-amber-300'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <span className="text-xl">{student.avatar}</span>
              <span>{student.name.split(' ')[0]}</span>
            </button>
          ))}

          <button
            onClick={() => {
              setShowAddStudentModal(true);
              playSound('pop');
            }}
            className="px-3 py-2 bg-emerald-500 text-white rounded-2xl font-bold text-xs hover:bg-emerald-600 transition-all flex items-center gap-1 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Anak</span>
          </button>
        </div>
      </div>

      {/* Selected Student Banner Stats */}
      <div className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 rounded-3xl p-6 text-white shadow-xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-white text-4xl flex items-center justify-center shadow-inner border-4 border-sky-200">
            {currentStudent.avatar}
          </div>
          <div>
            <span className="px-3 py-0.5 bg-white/20 text-white text-xs font-bold rounded-full backdrop-blur-xs">
              Usia {currentStudent.age} • Kelas PAUD Ceria
            </span>
            <h3 className="text-3xl font-black mt-1 drop-shadow-sm">{currentStudent.name}</h3>
            <p className="text-xs text-sky-100 font-medium mt-1">
              Modul Selesai: {currentStudent.completedModules.length} dari 8 Modul Pembelajaran
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl text-center border border-white/30">
            <span className="block text-2xl font-black text-yellow-300 flex items-center justify-center gap-1">
              ⭐ {currentStudent.stars}
            </span>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-sky-100">
              Bintang Terkumpul
            </span>
          </div>

          <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl text-center border border-white/30">
            <span className="block text-2xl font-black text-emerald-300">
              {Math.round(
                (currentStudent.aspectScores.jatiDiri +
                  currentStudent.aspectScores.nilaiAgama +
                  currentStudent.aspectScores.literasi +
                  currentStudent.aspectScores.fisikMotorik) / 4
              )}%
            </span>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-sky-100">
              Capaian Perkembangan
            </span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart: 4 PAUD Aspects */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border-4 border-sky-200 shadow-md">
          <h3 className="font-black text-sky-950 text-base mb-1 flex items-center gap-2">
            <Brain className="w-5 h-5 text-sky-600" />
            Analisis 4 Aspek Perkembangan PAUD
          </h3>
          <p className="text-xs text-gray-600 mb-4 font-medium">
            Nilai indikator pencapaian perkembangan anak usia 3–4 tahun.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={aspectData}>
                <PolarGrid stroke="#e0f2fe" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#0369a1', fontSize: 12, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name={currentStudent.name} dataKey="A" stroke="#0284c7" fill="#38bdf8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Daily Stars Collected */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border-4 border-amber-200 shadow-md">
          <h3 className="font-black text-amber-950 text-base mb-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-600" />
            Riwayat Aktivitas & Perolehan Bintang
          </h3>
          <p className="text-xs text-gray-600 mb-4 font-medium">
            Perkembangan keaktifan anak dari hari ke hari.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={logChartData}>
                <XAxis dataKey="date" tick={{ fill: '#78350f', fontSize: 11, fontWeight: 600 }} />
                <YAxis domain={[0, 15]} tick={{ fill: '#78350f', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fffbe3', borderRadius: '12px', borderColor: '#fde047', fontWeight: 'bold' }}
                />
                <Bar dataKey="bintang" fill="#f59e0b" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Rapor Harian PAUD Printable Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
          <div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
              📄 Dokumen Resmi Pendidik & Orang Tua
            </span>
            <h3 className="text-2xl font-black text-emerald-950 mt-1 flex items-center gap-2">
              Laporan Perkembangan Harian (Rapor PAUD)
            </h3>
            <p className="text-xs text-gray-600 font-medium">
              Tanggal: {latestLog.date} • Status Kehadiran: <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300">{latestLog.attendance}</span>
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-md transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Cetak / Download Rapor Harian
          </button>
        </div>

        {/* Aspect Assessment Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50/70 rounded-2xl border-2 border-emerald-200">
            <h4 className="font-extrabold text-emerald-950 text-sm mb-1 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-emerald-600" />
              1. Jati Diri & Keunikan
            </h4>
            <p className="text-xs text-gray-800 font-medium leading-relaxed">
              {latestLog.aspectObservation.jatiDiri}
            </p>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-2xl border-2 border-emerald-200">
            <h4 className="font-extrabold text-emerald-950 text-sm mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              2. Nilai Agama & Budi Pekerti
            </h4>
            <p className="text-xs text-gray-800 font-medium leading-relaxed">
              {latestLog.aspectObservation.nilaiAgama}
            </p>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-2xl border-2 border-emerald-200">
            <h4 className="font-extrabold text-emerald-950 text-sm mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" />
              3. Dasar-Dasar Literasi
            </h4>
            <p className="text-xs text-gray-800 font-medium leading-relaxed">
              {latestLog.aspectObservation.literasi}
            </p>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-2xl border-2 border-emerald-200">
            <h4 className="font-extrabold text-emerald-950 text-sm mb-1 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-600" />
              4. Fisik Motorik
            </h4>
            <p className="text-xs text-gray-800 font-medium leading-relaxed">
              {latestLog.aspectObservation.fisikMotorik}
            </p>
          </div>
        </div>

        {/* Teacher Note & Recommendations Box */}
        <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-300">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-black text-amber-950 text-sm flex items-center gap-2">
              💬 Catatan Pendidik / Saran untuk Orang Tua:
            </h4>
            {!isEditingNote ? (
              <button
                onClick={() => setIsEditingNote(true)}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Catatan
              </button>
            ) : (
              <button
                onClick={handleSaveNote}
                className="px-3 py-1 bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs"
              >
                <Save className="w-3.5 h-3.5" /> Simpan
              </button>
            )}
          </div>

          {isEditingNote ? (
            <textarea
              value={editableNote}
              onChange={(e) => setEditableNote(e.target.value)}
              className="w-full p-3 bg-white border-2 border-amber-300 rounded-xl font-medium text-xs text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-400"
              rows={3}
            />
          ) : (
            <p className="text-xs text-amber-900 font-medium italic leading-relaxed">
              "{latestLog.teacherNote}"
            </p>
          )}
        </div>
      </div>

      {/* Add New Student Modal */}
      <AnimatePresence>
        {showAddStudentModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-amber-300 shadow-2xl space-y-4"
            >
              <h3 className="text-2xl font-black text-amber-950">
                👶 Tambah Murid PAUD Baru
              </h3>

              <form onSubmit={handleAddStudent} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap Anak:</label>
                  <input
                    type="text"
                    required
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Contoh: Siti Aisyah"
                    className="w-full px-3 py-2 border-2 border-amber-300 rounded-xl font-bold text-sm text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Usia:</label>
                  <select
                    value={newStudentAge}
                    onChange={(e) => setNewStudentAge(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-amber-300 rounded-xl font-bold text-sm text-gray-900"
                  >
                    <option value="3 Tahun">3 Tahun</option>
                    <option value="3.5 Tahun">3.5 Tahun</option>
                    <option value="4 Tahun">4 Tahun</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Jenis Kelamin:</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setNewStudentGender('male')}
                      className={`flex-1 py-2 rounded-xl font-bold text-xs border-2 ${
                        newStudentGender === 'male' ? 'bg-blue-500 text-white border-blue-600' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      👦 Laki-Laki
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewStudentGender('female')}
                      className={`flex-1 py-2 rounded-xl font-bold text-xs border-2 ${
                        newStudentGender === 'female' ? 'bg-pink-500 text-white border-pink-600' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      👧 Perempuan
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddStudentModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-xl text-xs"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-500 text-white font-black rounded-xl text-xs shadow-md"
                  >
                    Simpan Profil
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
