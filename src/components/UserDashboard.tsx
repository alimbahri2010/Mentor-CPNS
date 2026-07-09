import React, { useState, useEffect } from 'react';
import { 
  User, 
  CreditCard, 
  BookOpen, 
  Video, 
  HelpCircle, 
  Clock, 
  Award, 
  Bell, 
  Edit3, 
  Lock, 
  Download, 
  LogOut, 
  Menu, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  Calendar, 
  ArrowRight, 
  Check, 
  RotateCcw,
  BookMarked,
  LayoutDashboard,
  ExternalLink
} from 'lucide-react';
import { AppUser, LearningMaterial, Tryout, TryoutResult, Announcement, LandingPageCMS } from '../types';
import { SupabaseImage } from './SupabaseImage';
import { uploadFile, deleteFile } from '../lib/storage';

interface UserDashboardProps {
  user: AppUser;
  materials: LearningMaterial[];
  tryouts: Tryout[];
  tryoutResults: TryoutResult[];
  announcements: Announcement[];
  cms: LandingPageCMS;
  onUpdateUser: (updatedUser: AppUser) => void;
  onAddTryoutResult: (result: TryoutResult) => void;
  onLogout: () => void;
}

export default function UserDashboard({ 
  user, 
  materials, 
  tryouts, 
  tryoutResults, 
  announcements, 
  cms,
  onUpdateUser,
  onAddTryoutResult,
  onLogout 
}: UserDashboardProps) {
  
  const [activeTab, setActiveTab] = useState<'overview' | 'materials' | 'tryouts' | 'payments' | 'certificates' | 'profile'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Edit Profile States
  const [editName, setEditName] = useState(user.name);
  const [editWhatsapp, setEditWhatsapp] = useState(user.whatsapp);
  const [editOrigin, setEditOrigin] = useState(user.origin);
  const [editTarget, setEditTarget] = useState(user.targetInstansi);
  const [profileSuccess, setProfileSuccess] = useState('');

  // Password States
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Payment State
  const [uploadedProof, setUploadedProof] = useState<string | null>(user.paymentProof || null);
  const [paymentDate, setPaymentDate] = useState<string>(user.paymentDate || '');
  const [paymentSuccess, setPaymentSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Active Video Modal State
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Active Tryout State
  const [activeTryout, setActiveTryout] = useState<Tryout | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
  const [tryoutTimeRemaining, setTryoutTimeRemaining] = useState(0); // in seconds
  const [isTryoutActive, setIsTryoutActive] = useState(false);
  const [tryoutSummary, setTryoutSummary] = useState<TryoutResult | null>(null);

  // Format currency
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
  };

  // Timer logic for CAT Simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTryoutActive && tryoutTimeRemaining > 0) {
      timer = setInterval(() => {
        setTryoutTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTryoutActive(false);
            submitTryout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTryoutActive, tryoutTimeRemaining]);

  // Handle active video click
  const handleWatchVideo = (url: string) => {
    setActiveVideoUrl(url);
    // Auto increment progress progress bar simulation
    const updatedProgress = { ...(user.quizProgress || {}) };
    updatedProgress[url] = 100;
    onUpdateUser({
      ...user,
      quizProgress: updatedProgress
    });
  };

  // Start Tryout Simulator
  const startTryout = (tryout: Tryout) => {
    setActiveTryout(tryout);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTryoutTimeRemaining(tryout.duration * 60);
    setIsTryoutActive(true);
    setTryoutSummary(null);
  };

  // Submit Tryout Answers
  const submitTryout = () => {
    if (!activeTryout) return;

    let correctCount = 0;
    activeTryout.questions.forEach((q, index) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / activeTryout.questions.length) * 100);

    const result: TryoutResult = {
      id: 'res_' + Date.now(),
      userId: user.id,
      userName: user.name,
      tryoutId: activeTryout.id,
      tryoutTitle: activeTryout.title,
      category: activeTryout.category,
      score: finalScore,
      correctCount: correctCount,
      totalQuestions: activeTryout.questions.length,
      answers: selectedAnswers,
      submittedAt: new Date().toISOString()
    };

    onAddTryoutResult(result);
    setTryoutSummary(result);
    setIsTryoutActive(false);
  };

  // Format Time Remaining (e.g. 09:45)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Save profile updates
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess('');

    if (!editName || !editWhatsapp || !editOrigin || !editTarget) {
      return;
    }

    onUpdateUser({
      ...user,
      name: editName,
      whatsapp: editWhatsapp,
      origin: editOrigin,
      targetInstansi: editTarget
    });

    setProfileSuccess('Profil Anda berhasil diperbarui!');
    setTimeout(() => setProfileSuccess(''), 3000);
  };

  // Save password updates
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!oldPassword || !newPassword) {
      setPasswordError('Silakan isi seluruh kolom kata sandi.');
      return;
    }

    if (user.password && oldPassword !== user.password) {
      setPasswordError('Kata sandi lama salah.');
      return;
    }

    onUpdateUser({
      ...user,
      password: newPassword
    });

    setPasswordSuccess('Kata sandi baru Anda berhasil disimpan!');
    setOldPassword('');
    setNewPassword('');
    setTimeout(() => setPasswordSuccess(''), 3000);
  };

  // Handle uploading transfer proof (real file upload)
  const handleUploadProof = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccess('');

    if (!paymentDate) {
      alert('Silakan pilih tanggal transfer.');
      return;
    }

    const proofUrl = uploadedProof || 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500&auto=format&fit=crop&q=80';
    
    onUpdateUser({
      ...user,
      paymentProof: proofUrl,
      paymentDate: paymentDate,
      status: 'Pending' // Updates to pending while admin checks it!
    });

    setUploadedProof(proofUrl);
    setPaymentSuccess('Bukti transfer berhasil diunggah! Mohon tunggu verifikasi admin keuangan kami (Maksimal 1x24 Jam).');
  };

  // Simulated Invoice PDF generation
  const handleDownloadInvoice = () => {
    const text = `INVOICE RESMI MENTOR CPNS 2026\n==================================\nNomor Invoice: ${user.invoiceNo || 'INV-839373'}\nNama Peserta: ${user.name}\nEmail: ${user.email}\nProgram: Kelas Karantina Intensif 30 Hari (Makassar)\nLokasi: Hotel Sultan Alauddin Makassar\nTanggal Daftar: ${user.joinedAt}\n\nBiaya Program: ${formatPrice(cms.priceNow)}\nStatus: ${user.status === 'Approved' ? 'LUNAS' : 'MENUNGGU PEMBAYARAN'}\n==================================\nTerima kasih telah bergabung dengan Mentor CPNS!`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice-${user.name.replace(/\s+/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Get user results for specific tryouts
  const getResultsForTryout = (toId: string) => {
    return tryoutResults.filter(r => r.userId === user.id && r.tryoutId === toId);
  };

  const myResults = tryoutResults.filter(r => r.userId === user.id);
  const totalSolvedTryouts = myResults.length;
  const averageScore = totalSolvedTryouts > 0 
    ? Math.round(myResults.reduce((sum, r) => sum + r.score, 0) / totalSolvedTryouts)
    : 0;

  return (
    <div id="user-dashboard" className="min-h-screen bg-light-bg flex flex-col font-sans">
      
      {/* Dashboard Top Navigation bar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <button 
            id="mobile-sidebar-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 rounded-md text-gray-500 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm">
              M
            </div>
            <span className="font-extrabold text-sm text-primary tracking-tight hidden sm:inline-block">MENTOR CPNS PORTAL</span>
          </div>
        </div>

        {/* User profile brief */}
        <div className="flex items-center gap-3.5">
          <div className="text-right hidden sm:block">
            <span className="font-bold text-xs text-gray-900 block">{user.name}</span>
            <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-semibold">{user.role}</span>
          </div>
          <div className="w-9 h-9 bg-primary/15 text-primary rounded-full flex items-center justify-center font-bold text-sm border border-primary/25">
            {user.name.charAt(0)}
          </div>
          <button 
            id="dash-logout-btn"
            onClick={onLogout} 
            className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-550 transition-colors cursor-pointer"
            title="Keluar Akun"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        
        {/* SIDEBAR NAVIGATION (Desktop) */}
        <aside className={`bg-gray-900 text-gray-300 w-64 lg:w-20 xl:w-64 p-5 lg:p-3 xl:p-5 space-y-6 flex flex-col justify-between fixed lg:sticky top-16 h-[calc(100vh-64px)] z-20 transition-all duration-300 overflow-y-auto ${mobileMenuOpen ? 'left-0' : '-left-64 lg:left-0'}`}>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black block px-3 lg:hidden xl:block truncate">Siswa Portal</span>
              <hr className="border-white/5 my-2 hidden lg:block xl:hidden" />
              
              <nav className="space-y-1">
                {/* Overview tab */}
                <button 
                  id="tab-btn-overview"
                  onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-start lg:justify-center xl:justify-start gap-3 lg:gap-0 xl:gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'overview' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}
                  title="Ikhtisar (Dashboard)"
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span className="lg:hidden xl:inline">Ikhtisar (Dashboard)</span>
                </button>

                {/* Materials tab */}
                <button 
                  id="tab-btn-materials"
                  onClick={() => { setActiveTab('materials'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-start lg:justify-center xl:justify-start gap-3 lg:gap-0 xl:gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'materials' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}
                  title="Modul & Video Materi"
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span className="lg:hidden xl:inline">Modul & Video Materi</span>
                </button>

                {/* Tryout CBT tab */}
                <button 
                  id="tab-btn-tryouts"
                  onClick={() => { setActiveTab('tryouts'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-start lg:justify-center xl:justify-start gap-3 lg:gap-0 xl:gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'tryouts' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}
                  title="Simulasi CAT Tryout"
                >
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span className="lg:hidden xl:inline">Simulasi CAT Tryout</span>
                </button>

                {/* Payments tab */}
                <button 
                  id="tab-btn-payments"
                  onClick={() => { setActiveTab('payments'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-start lg:justify-center xl:justify-start gap-3 lg:gap-0 xl:gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'payments' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}
                  title="Sistem Pembayaran"
                >
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span className="lg:hidden xl:inline">Sistem Pembayaran</span>
                </button>

                {/* Certificates tab */}
                <button 
                  id="tab-btn-certificates"
                  onClick={() => { setActiveTab('certificates'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-start lg:justify-center xl:justify-start gap-3 lg:gap-0 xl:gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'certificates' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}
                  title="Sertifikat Digital"
                >
                  <Award className="w-4 h-4 shrink-0" />
                  <span className="lg:hidden xl:inline">Sertifikat Digital</span>
                </button>

                {/* Profile tab */}
                <button 
                  id="tab-btn-profile"
                  onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-start lg:justify-center xl:justify-start gap-3 lg:gap-0 xl:gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'profile' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}
                  title="Profil & Kata Sandi"
                >
                  <User className="w-4 h-4 shrink-0" />
                  <span className="lg:hidden xl:inline">Profil & Kata Sandi</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Quick status indicator inside sidebar */}
          <div className="bg-white/5 p-4 lg:p-2.5 xl:p-4 rounded-2xl border border-white/5 lg:mx-auto lg:w-12 xl:w-auto text-center lg:flex lg:justify-center xl:block transition-all" title={`Status Anda: ${user.status}`}>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold lg:hidden xl:block text-left">STATUS ANDA:</span>
            <div className="flex items-center gap-2 lg:gap-0 xl:gap-2 mt-1.5 lg:mt-0 xl:mt-1.5 justify-start lg:justify-center xl:justify-start">
              {user.status === 'Approved' ? (
                <>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full shrink-0" title="Approved (Aktif)"></span>
                  <span className="text-xs font-bold text-green-400 lg:hidden xl:inline truncate ml-2 lg:ml-0 xl:ml-2">Approved (Aktif)</span>
                </>
              ) : user.status === 'Pending' ? (
                <>
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse shrink-0" title="Verifikasi Pembayaran"></span>
                  <span className="text-xs font-bold text-amber-400 lg:hidden xl:inline truncate ml-2 lg:ml-0 xl:ml-2">Verifikasi Pembayaran</span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full shrink-0" title="Menunggu Transfer"></span>
                  <span className="text-xs font-bold text-red-400 lg:hidden xl:inline truncate ml-2 lg:ml-0 xl:ml-2">Menunggu Transfer</span>
                </>
              )}
            </div>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT WINDOW */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Header Greeting */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-150 shadow-xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Selamat Datang, {user.name}!</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Berikut adalah kemajuan belajar, invoice pendaftaran, dan informasi jadwal kelas karantina Anda.
                  </p>
                </div>
                
                {/* Status Callout Box */}
                <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${user.status === 'Approved' ? 'bg-green-50 border-green-200 text-green-700' : user.status === 'Pending' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                  {user.status === 'Approved' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span className="text-xs font-black uppercase">
                    {user.status === 'Approved' ? 'AKUN AKTIF (LUNAS)' : user.status === 'Pending' ? 'MENUNGGU VERIFIKASI BUKTI' : 'BELUM BAYAR (MENUNGGU TRANSFER)'}
                  </span>
                </div>
              </div>

              {/* Status Alert for Unapproved */}
              {user.status !== 'Approved' && (
                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-amber-800 text-sm flex items-center gap-1.5">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      Lengkapi Pembayaran untuk Membuka Akses Kelas Penuh
                    </h4>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Akun Anda saat ini belum diverifikasi. Silakan transfer biaya bimbingan untuk mengamankan sisa 10 kursi kosong, lalu unggah bukti transfer di tab Pembayaran.
                    </p>
                  </div>
                  <button 
                    id="goto-payments-btn"
                    onClick={() => setActiveTab('payments')}
                    className="bg-primary hover:bg-secondary text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    Bayar Sekarang
                  </button>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">STATUS PENDAFTARAN</span>
                  <span className="text-base sm:text-lg font-black text-gray-900 mt-1 block">{user.status}</span>
                  <span className="text-[10px] text-gray-500 block mt-2">Daftar sejak {user.joinedAt}</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">TRYOUT DIIKUTI</span>
                  <span className="text-base sm:text-lg font-black text-primary mt-1 block">{totalSolvedTryouts} Kali</span>
                  <span className="text-[10px] text-gray-500 block mt-2">Target instansi: {user.targetInstansi}</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">RATA-RATA SKOR CAT</span>
                  <span className="text-base sm:text-lg font-black text-green-600 mt-1 block">{averageScore} / 100</span>
                  <span className="text-[10px] text-gray-500 block mt-2">Passing Grade TWK: 65, TIU: 80</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">KOTA ASAL PESERTA</span>
                  <span className="text-base sm:text-lg font-black text-gray-900 mt-1 block">{user.origin}</span>
                  <span className="text-[10px] text-gray-500 block mt-2">Kelas Karantina Makassar</span>
                </div>

              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Left side column: Invoice details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 space-y-5">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                      <div>
                        <h4 className="font-extrabold text-gray-900 text-base">Invoice Resmi Pendaftaran</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5">Diterbitkan otomatis saat registrasi berhasil</p>
                      </div>
                      <button 
                        id="download-invoice-btn"
                        onClick={handleDownloadInvoice}
                        className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors cursor-pointer"
                        title="Download Format TXT"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-400 block font-medium">Nomor Invoice:</span>
                        <strong className="text-gray-900 block font-bold mt-0.5">{user.invoiceNo || 'INV-183920'}</strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-medium">Status Akun:</span>
                        <strong className={`block font-bold mt-0.5 ${user.status === 'Approved' ? 'text-green-600' : 'text-amber-600'}`}>
                          {user.status === 'Approved' ? 'LUNAS (Verified)' : 'Menunggu Pembayaran'}
                        </strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-medium">Nama Program:</span>
                        <strong className="text-gray-900 block font-bold mt-0.5">Karantina Intensif 30 Hari CPNS 2026</strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-medium">Tempat Karantina:</span>
                        <strong className="text-gray-900 block font-bold mt-0.5">Hotel Sultan Alauddin Makassar</strong>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-xs">
                      <span className="text-gray-500">Biaya Paket All-In (Nett):</span>
                      <strong className="text-primary text-xl font-black">{formatPrice(cms.priceNow)}</strong>
                    </div>
                  </div>

                  {/* Schedule timelines */}
                  <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 space-y-4">
                    <h4 className="font-extrabold text-gray-900 text-base">Jadwal Harian Karantina Makassar</h4>
                    <p className="text-xs text-gray-500">Berikut simulasi garis waktu aktivitas belajar harian Anda di hotel:</p>
                    
                    <div className="space-y-3.5 pt-2">
                      <div className="flex gap-3 text-xs">
                        <span className="text-primary font-bold min-w-[75px] shrink-0">08:00 - 11:30</span>
                        <div>
                          <strong className="text-gray-900 block">Sesi Materi Pagi (Tatap Muka)</strong>
                          <span className="text-gray-400 text-[11px] block mt-0.5">Pendalaman materi TWK & TIU bersama mentor ASN.</span>
                        </div>
                      </div>

                      <div className="flex gap-3 text-xs">
                        <span className="text-primary font-bold min-w-[75px] shrink-0">14:00 - 16:30</span>
                        <div>
                          <strong className="text-gray-900 block">Sesi Simulasi & Drill Soal</strong>
                          <span className="text-gray-400 text-[11px] block mt-0.5">Latihan mandiri sistem CAT dan pembahasan taktik pengerjaan kilat.</span>
                        </div>
                      </div>

                      <div className="flex gap-3 text-xs">
                        <span className="text-primary font-bold min-w-[75px] shrink-0">16:45 - 18:00</span>
                        <div>
                          <strong className="text-gray-900 block">Latihan Fisik (Samapta & Beladiri)</strong>
                          <span className="text-gray-400 text-[11px] block mt-0.5">Pembinaan ketahanan fisik dan teknik pertahanan dasar silat.</span>
                        </div>
                      </div>

                      <div className="flex gap-3 text-xs">
                        <span className="text-primary font-bold min-w-[75px] shrink-0">19:30 - 21:30</span>
                        <div>
                          <strong className="text-gray-900 block">Sesi Tanya Jawab Interaktif & Evaluasi</strong>
                          <span className="text-gray-400 text-[11px] block mt-0.5">Review hasil skor tryout harian dan konseling personal.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side column: Announcements & quick actions */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Recent announcements list */}
                  <div className="bg-white rounded-3xl border border-gray-150 p-6 space-y-4">
                    <h4 className="font-extrabold text-gray-900 text-base flex items-center gap-1.5">
                      <Bell className="w-5 h-5 text-primary" />
                      <span>Pengumuman Terbaru</span>
                    </h4>
                    
                    <div className="space-y-4 pt-1">
                      {announcements.map((ann) => (
                        <div key={ann.id} className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                          <div className="flex justify-between items-center">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase ${ann.type === 'important' ? 'bg-red-100 text-red-700' : ann.type === 'schedule' ? 'bg-blue-100 text-blue-700' : 'bg-gray-150 text-gray-700'}`}>
                              {ann.type}
                            </span>
                            <span className="text-[9px] text-gray-400 font-medium">{ann.date}</span>
                          </div>
                          <h5 className="font-bold text-gray-900 text-xs">{ann.title}</h5>
                          <p className="text-[10px] text-gray-500 leading-relaxed">{ann.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tryout score history quick view */}
                  <div className="bg-white rounded-3xl border border-gray-150 p-6 space-y-4">
                    <h4 className="font-extrabold text-gray-900 text-base">Riwayat Simulasi Tryout</h4>
                    
                    {myResults.length === 0 ? (
                      <div className="text-center py-6 text-gray-400 text-xs space-y-2">
                        <BookMarked className="w-8 h-8 text-gray-300 mx-auto" />
                        <p>Anda belum mengikuti simulasi CAT Tryout.</p>
                        <button 
                          id="goto-tryouts-from-empty"
                          onClick={() => setActiveTab('tryouts')}
                          className="text-primary hover:underline font-bold"
                        >
                          Mulai Tryout Pertama
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {myResults.map((r) => (
                          <div key={r.id} className="flex justify-between items-center text-xs p-3 bg-gray-50 border border-gray-100 rounded-xl">
                            <div>
                              <strong className="text-gray-900 block">{r.tryoutTitle}</strong>
                              <span className="text-gray-400 text-[10px]">{r.submittedAt.split('T')[0]} - {r.correctCount} benar</span>
                            </div>
                            <span className="bg-primary text-white font-extrabold px-2.5 py-1.5 rounded-lg">
                              {r.score}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: MATERIALS */}
          {activeTab === 'materials' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Bahan Belajar & Video Pembelajaran</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Akses materi premium modul PDF, video taktik cepat menjawab soal, dan tautan mentoring Zoom tatap muka.
                </p>
              </div>

              {/* Status block if not approved */}
              {user.status !== 'Approved' ? (
                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center max-w-xl mx-auto space-y-4">
                  <Lock className="w-12 h-12 text-amber-600 mx-auto" />
                  <h3 className="font-extrabold text-amber-900 text-lg">Materi Terkunci</h3>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Sesi materi video premium, download modul cetak, dan live Zoom mentoring hanya dapat diakses oleh peserta yang telah lunas dan diverifikasi oleh admin. Silakan lakukan pembayaran terlebih dahulu.
                  </p>
                  <button 
                    id="materials-lock-pay-btn"
                    onClick={() => setActiveTab('payments')}
                    className="bg-primary hover:bg-secondary text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Lakukan Pembayaran
                  </button>
                </div>
              ) : (
                /* Approved view for learning resources */
                <div className="grid md:grid-cols-2 gap-6">
                  {materials.map((mat) => (
                    <div key={mat.id} className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                            {mat.category}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">
                            {mat.type === 'pdf' ? '📂 Dokumen PDF' : mat.type === 'video' ? '🎬 Video Belajar' : '💻 Live Mentoring Zoom'}
                          </span>
                        </div>

                        <h4 className="font-extrabold text-gray-900 text-base">{mat.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{mat.description}</p>
                        
                        {mat.duration && (
                          <span className="text-[10px] text-gray-400 font-medium block">Estimasi: {mat.duration}</span>
                        )}
                      </div>

                      <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                        {/* Progress indicator */}
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className={`w-4 h-4 ${(user.quizProgress && user.quizProgress[mat.url]) ? 'text-green-500' : 'text-gray-300'}`} />
                          <span className="text-[10px] text-gray-400 font-semibold">
                            {(user.quizProgress && user.quizProgress[mat.url]) ? 'Selesai dipelajari' : 'Belum selesai'}
                          </span>
                        </div>

                        {/* Action buttons */}
                        {mat.type === 'video' ? (
                          <button 
                            id={`watch-video-${mat.id}`}
                            onClick={() => handleWatchVideo(mat.url)}
                            className="bg-primary hover:bg-secondary text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Tonton Video</span>
                          </button>
                        ) : mat.type === 'pdf' ? (
                          <a 
                            href={mat.url || null}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => {
                              const updatedProgress = { ...(user.quizProgress || {}) };
                              updatedProgress[mat.url] = 100;
                              onUpdateUser({ ...user, quizProgress: updatedProgress });
                            }}
                            className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                          </a>
                        ) : (
                          <a 
                            href={mat.url || null}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => {
                              const updatedProgress = { ...(user.quizProgress || {}) };
                              updatedProgress[mat.url] = 100;
                              onUpdateUser({ ...user, quizProgress: updatedProgress });
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Buka Zoom Kelas</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 3: CAT TRYOUT SIMULATOR */}
          {activeTab === 'tryouts' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-gray-200 pb-5 flex justify-between items-center">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">CAT Simulator Tryout</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Latih kemampuan pengerjaan soal TWK, TIU, dan TKP harian di bawah tekanan waktu mundur riil CAT BKN.
                  </p>
                </div>
              </div>

              {/* Status block if not approved */}
              {user.status !== 'Approved' ? (
                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center max-w-xl mx-auto space-y-4">
                  <Lock className="w-12 h-12 text-amber-600 mx-auto" />
                  <h3 className="font-extrabold text-amber-900 text-lg">Tryout Terkunci</h3>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Sistem CBT CAT Simulator harian lengkap dengan penilaian passing grade dan peringkat hanya dapat diakses setelah bukti transfer pendaftaran Anda diverifikasi admin.
                  </p>
                  <button 
                    id="tryout-lock-pay-btn"
                    onClick={() => setActiveTab('payments')}
                    className="bg-primary hover:bg-secondary text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Lakukan Pembayaran
                  </button>
                </div>
              ) : !isTryoutActive && !tryoutSummary ? (
                /* List of available tryouts */
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {tryouts.map((to) => {
                      const results = getResultsForTryout(to.id);
                      return (
                        <div key={to.id} className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col justify-between space-y-4 shadow-xs">
                          <div className="space-y-2">
                            <span className="text-[10px] font-black bg-primary/10 text-primary px-2.5 py-1 rounded-md block w-max uppercase">
                              {to.category}
                            </span>
                            <h4 className="font-extrabold text-gray-900 text-base">{to.title}</h4>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {to.duration} Menit
                              </span>
                              <span className="flex items-center gap-1">
                                <HelpCircle className="w-3.5 h-3.5" />
                                {to.questions.length} Soal
                              </span>
                            </div>
                          </div>

                          <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="text-xs">
                              {results.length > 0 ? (
                                <span className="text-green-600 font-semibold block">Skor Tertinggi: {Math.max(...results.map(r => r.score))}</span>
                              ) : (
                                <span className="text-gray-400 block">Belum dicoba</span>
                              )}
                            </div>

                            <button 
                              id={`start-tryout-${to.id}`}
                              onClick={() => startTryout(to)}
                              className="bg-primary hover:bg-secondary text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                            >
                              Mulai Simulasi
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : isTryoutActive && activeTryout ? (
                /* CBT TRIAL ACTIVE WORKING CONTAINER */
                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl grid lg:grid-cols-12 min-h-[500px]">
                  
                  {/* Left panel: Active Question */}
                  <div className="lg:col-span-8 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                    
                    {/* Active Question Header */}
                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                      <div>
                        <span className="text-xs text-primary font-bold uppercase tracking-widest block">{activeTryout.title}</span>
                        <h4 className="font-extrabold text-gray-900 mt-1">Soal Nomor {currentQuestionIndex + 1} dari {activeTryout.questions.length}</h4>
                      </div>
                      
                      {/* Timer */}
                      <div className="bg-red-50 text-red-600 font-mono font-black text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 border border-red-100">
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Sisa: {formatTime(tryoutTimeRemaining)}</span>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div className="space-y-6 flex-1 py-4">
                      <p className="text-gray-900 font-medium text-xs sm:text-sm leading-relaxed">
                        {activeTryout.questions[currentQuestionIndex].question}
                      </p>

                      {/* Options List */}
                      <div className="space-y-3">
                        {activeTryout.questions[currentQuestionIndex].options.map((opt, oIndex) => {
                          const optionLetters = ['A', 'B', 'C', 'D', 'E'];
                          const isSelected = selectedAnswers[activeTryout.questions[currentQuestionIndex].id] === oIndex;
                          
                          return (
                            <button 
                              id={`option-btn-${oIndex}`}
                              key={oIndex}
                              onClick={() => {
                                const newAnswers = { ...selectedAnswers };
                                newAnswers[activeTryout.questions[currentQuestionIndex].id] = oIndex;
                                setSelectedAnswers(newAnswers);
                              }}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3.5 transition-all outline-none ${isSelected ? 'border-primary bg-primary/5 font-semibold text-primary' : 'border-gray-200 hover:border-gray-300 bg-[#F8F9FA] text-gray-700'}`}
                            >
                              <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${isSelected ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {optionLetters[oIndex]}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Navigation Buttons footer */}
                    <div className="border-t border-gray-100 pt-5 flex justify-between items-center">
                      <button 
                        id="prev-question-btn"
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                        className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs px-5 py-2.5 rounded-xl disabled:opacity-40 disabled:hover:bg-transparent"
                      >
                        Sebelumnya
                      </button>

                      {currentQuestionIndex < activeTryout.questions.length - 1 ? (
                        <button 
                          id="next-question-btn"
                          onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                          className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
                        >
                          Selanjutnya
                        </button>
                      ) : (
                        <button 
                          id="submit-tryout-btn"
                          onClick={submitTryout}
                          className="bg-green-600 hover:bg-green-700 text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md"
                        >
                          Selesaikan & Kirim Jawaban
                        </button>
                      )}
                    </div>

                  </div>

                  {/* Right panel: Question Status Grid */}
                  <div className="lg:col-span-4 bg-gray-50 p-6 border-t lg:border-t-0 lg:border-l border-gray-250 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h5 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">NAVIGASI NOMOR SOAL</h5>
                      
                      {/* Grid of number buttons */}
                      <div className="grid grid-cols-5 gap-2">
                        {activeTryout.questions.map((q, index) => {
                          const isAnswered = selectedAnswers[q.id] !== undefined;
                          const isActive = currentQuestionIndex === index;
                          return (
                            <button 
                              id={`num-nav-btn-${index}`}
                              key={q.id}
                              onClick={() => setCurrentQuestionIndex(index)}
                              className={`h-10 rounded-lg text-xs font-black flex items-center justify-center border transition-all ${isActive ? 'bg-primary text-white border-primary' : isAnswered ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                            >
                              {index + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-5 mt-5">
                      <div className="text-xs text-gray-500 space-y-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 bg-primary rounded-md inline-block"></span>
                          <span>Soal Aktif saat ini</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 bg-green-100 border border-green-200 rounded-md inline-block"></span>
                          <span>Sudah diisi jawabannya</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 bg-white border border-gray-200 rounded-md inline-block"></span>
                          <span>Belum diisi jawabannya</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              ) : (
                /* TRYOUT COMPLETED SUMMARY REPORT SCREEN */
                <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xl max-w-3xl mx-auto">
                  <div className="text-center space-y-2 border-b border-gray-100 pb-5">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                    <h3 className="font-extrabold text-xl text-gray-900">Tryout Anda Selesai!</h3>
                    <p className="text-xs text-gray-500">Nilai Anda telah tercatat secara permanen di database lokal kami.</p>
                  </div>

                  {/* Score metrics */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">SKOR CAT</span>
                      <strong className="text-2xl sm:text-3xl font-black text-primary block mt-1">{tryoutSummary?.score}</strong>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">BENAR</span>
                      <strong className="text-2xl sm:text-3xl font-black text-green-600 block mt-1">{tryoutSummary?.correctCount} Soal</strong>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">TOTAL SOAL</span>
                      <strong className="text-2xl sm:text-3xl font-black text-gray-900 block mt-1">{tryoutSummary?.totalQuestions} Soal</strong>
                    </div>
                  </div>

                  {/* Review Questions & Explanations */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h4 className="font-extrabold text-gray-900 text-sm">Pembahasan & Analisis Jawaban:</h4>
                    
                    <div className="space-y-6">
                      {activeTryout?.questions.map((q, index) => {
                        const isCorrect = tryoutSummary?.answers[q.id] === q.correctAnswer;
                        const optionLetters = ['A', 'B', 'C', 'D', 'E'];
                        return (
                          <div key={q.id} className="p-4 rounded-2xl border border-gray-100 bg-[#F8F9FA] space-y-2">
                            <h5 className="font-bold text-gray-900 text-xs sm:text-sm">Soal {index + 1}: {q.question}</h5>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                              <div>
                                <span className="text-gray-400 block font-medium">Jawaban Anda:</span>
                                <strong className={`block font-bold mt-0.5 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                  {tryoutSummary?.answers[q.id] !== undefined 
                                    ? `${optionLetters[tryoutSummary.answers[q.id]]}. ${q.options[tryoutSummary.answers[q.id]]}`
                                    : 'Tidak dijawab'}
                                </strong>
                              </div>
                              <div>
                                <span className="text-gray-400 block font-medium">Kunci Jawaban Benar:</span>
                                <strong className="text-green-600 block font-bold mt-0.5">
                                  {optionLetters[q.correctAnswer]}. {q.options[q.correctAnswer]}
                                </strong>
                              </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-200/50 text-[11px] text-gray-600 leading-relaxed bg-white/60 p-2.5 rounded-lg">
                              <strong className="text-primary font-bold block mb-1">💡 Penjelasan / Pembahasan:</strong>
                              {q.explanation}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <button 
                      id="close-summary-btn"
                      onClick={() => setTryoutSummary(null)}
                      className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Kembali ke List Tryout</span>
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 4: FINANCIAL PAYMENT PORTAL */}
          {activeTab === 'payments' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Portal Keuangan & Bukti Transfer</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Lihat rincian invoice bimbingan, petunjuk transfer bank, dan unggah berkas bukti pembayaran untuk aktivasi akun.
                </p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Left side: upload form & guidelines */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Transfer Bank Instructions */}
                  <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 space-y-4">
                    <h4 className="font-extrabold text-gray-900 text-base">Instruksi Transfer Bank</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Silakan lakukan transfer pembayaran bimbingan sesuai nominal invoice Anda ke rekening resmi bendahara program di bawah ini:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                        <strong className="text-xs text-primary block">BANK MANDIRI</strong>
                        <span className="text-sm font-black text-gray-900 block tracking-wider">152-0012-345678</span>
                        <span className="text-[10px] text-gray-400 block">a.n Bendahara Mentor CPNS</span>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                        <strong className="text-xs text-primary block">BANK BRI</strong>
                        <span className="text-sm font-black text-gray-900 block tracking-wider">0012-01-234567-890</span>
                        <span className="text-[10px] text-gray-400 block">a.n Bendahara Mentor CPNS</span>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                        <strong className="text-xs text-primary block">BANK BCA</strong>
                        <span className="text-sm font-black text-gray-900 block tracking-wider">023-456-7890</span>
                        <span className="text-[10px] text-gray-400 block">a.n Bendahara Mentor CPNS</span>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-800 leading-relaxed">
                      💡 <strong>Catatan Cicilan:</strong> Apabila Anda mengambil opsi cicilan, silakan transfer minimal 50% dari total nominal invoice (Rp15.000.000) sebagai DP penguncian sisa kursi karantina.
                    </div>
                  </div>

                  {/* Upload Form */}
                  <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 space-y-4">
                    <h4 className="font-extrabold text-gray-900 text-base">Unggah Bukti Transfer Pembayaran</h4>
                    
                    {paymentSuccess && (
                      <div id="payment-success-msg" className="p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-semibold">
                        {paymentSuccess}
                      </div>
                    )}

                    <form onSubmit={handleUploadProof} className="space-y-4">
                      
                      {/* Date selection */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Tanggal Transfer:</label>
                        <input 
                          id="payment-date-input"
                          type="date"
                          required
                          value={paymentDate}
                          onChange={(e) => setPaymentDate(e.target.value)}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none"
                        />
                      </div>

                      {/* File Upload interactive area */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Unggah Gambar Bukti Transfer:</label>
                        
                        <div className="flex gap-4 items-center">
                          {uploadedProof ? (
                            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-150 bg-white shrink-0 shadow-xs">
                              <SupabaseImage 
                                src={uploadedProof} 
                                alt="Payment Proof Preview" 
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={async () => {
                                  if (uploadedProof) {
                                    await deleteFile(uploadedProof);
                                    setUploadedProof(null);
                                    onUpdateUser({
                                      ...user,
                                      paymentProof: null,
                                      paymentDate: '',
                                      status: 'Waiting Payment'
                                    });
                                  }
                                }}
                                className="absolute inset-0 bg-black/55 hover:bg-black/70 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                                title="Hapus Bukti"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ) : (
                            <div className="w-24 h-24 rounded-2xl border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
                              <Upload className="w-6 h-6 text-gray-400" />
                            </div>
                          )}

                          <label className="flex-1 border-2 border-dashed border-gray-200 hover:border-primary/50 rounded-2xl p-4 text-center bg-gray-50/50 hover:bg-gray-50/80 transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer">
                            <Upload className={`w-5 h-5 text-primary ${isUploading ? 'animate-bounce' : ''}`} />
                            <span className="text-xs font-bold text-primary">
                              {isUploading ? 'Mengunggah...' : 'Pilih Gambar Bukti'}
                            </span>
                            <span className="text-[9px] text-gray-400">PNG, JPG, JPEG (Maks. 5MB)</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              disabled={isUploading}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  try {
                                    setIsUploading(true);
                                    const path = await uploadFile(file, 'paymentProof', user.invoiceNo || 'invoice');
                                    setUploadedProof(path);
                                  } catch (err: any) {
                                    alert('Gagal mengunggah gambar: ' + err.message);
                                  } finally {
                                    setIsUploading(false);
                                  }
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <button 
                        id="payment-submit-btn"
                        type="submit"
                        className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs sm:text-sm cursor-pointer"
                      >
                        Kirim Konfirmasi Keuangan
                      </button>

                    </form>
                  </div>

                </div>

                {/* Right side: invoice summary & history */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Payment Status Box */}
                  <div className="bg-white rounded-3xl border border-gray-150 p-6 space-y-4">
                    <h4 className="font-extrabold text-gray-900 text-base">Riwayat Transaksi Akun</h4>
                    
                    <div className="space-y-3 pt-1">
                      <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center text-xs">
                        <div>
                          <strong className="text-gray-900 block">Biaya Paket Karantina</strong>
                          <span className="text-[10px] text-gray-400">{user.joinedAt} - Invoice #{user.invoiceNo}</span>
                        </div>
                        <span className="font-black text-gray-900">{formatPrice(cms.priceNow)}</span>
                      </div>

                      {uploadedProof && (
                        <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <div>
                              <strong className="text-gray-900 block">Bukti Transfer Dikirim</strong>
                              <span className="text-[10px] text-gray-400">Ditransfer: {user.paymentDate}</span>
                            </div>
                            <span className={`font-bold px-2 py-1 rounded-md text-[9px] uppercase ${user.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                              {user.status === 'Approved' ? 'Approved (Lunas)' : 'Pending Check'}
                            </span>
                          </div>
                          <div className="h-20 w-max border border-gray-200 rounded-lg overflow-hidden">
                            <SupabaseImage src={uploadedProof} alt="Bukti Transfer" className="h-full object-cover" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 5: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Sertifikat Tambahan Digital</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Unduh sertifikat kelulusan penunjang seleksi administrasi berkas instansi CPNS Anda yang telah dirilis.
                </p>
              </div>

              {/* Status block if not approved */}
              {user.status !== 'Approved' ? (
                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center max-w-xl mx-auto space-y-4">
                  <Lock className="w-12 h-12 text-amber-600 mx-auto" />
                  <h3 className="font-extrabold text-amber-900 text-lg">Sertifikat Terkunci</h3>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Sertifikat resmi TOEFL, Komputer, dan Kelulusan Beladiri hanya dapat diterbitkan dan diunduh secara digital oleh peserta resmi bimbingan yang telah dikonfirmasi lunas oleh admin.
                  </p>
                  <button 
                    id="certs-lock-pay-btn"
                    onClick={() => setActiveTab('payments')}
                    className="bg-primary hover:bg-secondary text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Lakukan Pembayaran
                  </button>
                </div>
              ) : (
                /* Approved certificates page */
                <div className="grid md:grid-cols-3 gap-6">
                  
                  {/* Cert 1 */}
                  <div className="bg-white rounded-2xl border border-gray-150 p-6 text-center space-y-4 hover:shadow-md transition-all flex flex-col justify-between min-h-[250px]">
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                        ★
                      </div>
                      <h4 className="font-extrabold text-gray-900 text-sm">Sertifikat Kelulusan Komputer</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Lembaga Kursus Komputer Resmi berizin Dinas Pendidikan RI. Berguna sebagai syarat berkas administrasi TI.
                      </p>
                    </div>
                    <button 
                      id="download-cert-komp"
                      onClick={() => alert('Mengunduh Sertifikat Komputer Digital format PDF...')}
                      className="w-full bg-primary hover:bg-secondary text-white font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>

                  {/* Cert 2 */}
                  <div className="bg-white rounded-2xl border border-gray-150 p-6 text-center space-y-4 hover:shadow-md transition-all flex flex-col justify-between min-h-[250px]">
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                        ★
                      </div>
                      <h4 className="font-extrabold text-gray-900 text-sm">Sertifikat Kelulusan Beladiri</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Sertifikat kelulusan latihan fisik beladiri silat berstempel Perguruan Resmi terdaftar pemerintah.
                      </p>
                    </div>
                    <button 
                      id="download-cert-silat"
                      onClick={() => alert('Mengunduh Sertifikat Beladiri Digital format PDF...')}
                      className="w-full bg-primary hover:bg-secondary text-white font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>

                  {/* Cert 3 */}
                  <div className="bg-white rounded-2xl border border-gray-150 p-6 text-center space-y-4 hover:shadow-md transition-all flex flex-col justify-between min-h-[250px]">
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                        ★
                      </div>
                      <h4 className="font-extrabold text-gray-900 text-sm">Sertifikat TOEFL ITP</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Prediksi skor TOEFL ITP resmi yang divalidasi oleh tim penguji Mentor CPNS untuk seleksi berkas administrasi.
                      </p>
                    </div>
                    <button 
                      id="download-cert-toefl"
                      onClick={() => alert('Mengunduh Sertifikat TOEFL Digital format PDF...')}
                      className="w-full bg-primary hover:bg-secondary text-white font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 6: PROFILE MANAGER */}
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Pengaturan Profil & Kata Sandi</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Atur biodata pendaftaran, nomor WhatsApp aktif, target instansi, dan ubah sandi keamanan akun Anda.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Biodata form */}
                <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 space-y-5">
                  <h4 className="font-extrabold text-gray-900 text-base flex items-center gap-1.5 border-b border-gray-100 pb-4">
                    <Edit3 className="w-5 h-5 text-primary" />
                    <span>Perbarui Informasi Biodata</span>
                  </h4>

                  {profileSuccess && (
                    <div id="profile-success-msg" className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-semibold">
                      {profileSuccess}
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Nama Lengkap:</label>
                      <input 
                        id="profile-name-input"
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs sm:text-sm outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Nomor WhatsApp:</label>
                      <input 
                        id="profile-whatsapp-input"
                        type="text"
                        required
                        value={editWhatsapp}
                        onChange={(e) => setEditWhatsapp(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs sm:text-sm outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Asal Daerah:</label>
                      <input 
                        id="profile-origin-input"
                        type="text"
                        required
                        value={editOrigin}
                        onChange={(e) => setEditOrigin(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs sm:text-sm outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Target Instansi CPNS:</label>
                      <input 
                        id="profile-target-input"
                        type="text"
                        required
                        value={editTarget}
                        onChange={(e) => setEditTarget(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs sm:text-sm outline-none"
                      />
                    </div>

                    <button 
                      id="profile-save-btn"
                      type="submit"
                      className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs cursor-pointer"
                    >
                      Simpan Perubahan Profil
                    </button>
                  </form>
                </div>

                {/* Password update form */}
                <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 space-y-5">
                  <h4 className="font-extrabold text-gray-900 text-base flex items-center gap-1.5 border-b border-gray-100 pb-4">
                    <Lock className="w-5 h-5 text-primary" />
                    <span>Ubah Kata Sandi Keamanan</span>
                  </h4>

                  {passwordSuccess && (
                    <div id="password-success-msg" className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-semibold">
                      {passwordSuccess}
                    </div>
                  )}

                  {passwordError && (
                    <div id="password-error-msg" className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                      {passwordError}
                    </div>
                  )}

                  <form onSubmit={handleSavePassword} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Kata Sandi Lama:</label>
                      <input 
                        id="old-password-input"
                        type="password"
                        placeholder="Masukkan sandi saat ini..."
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs sm:text-sm outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Kata Sandi Baru:</label>
                      <input 
                        id="new-password-input"
                        type="password"
                        placeholder="Minimal 6 karakter"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs sm:text-sm outline-none"
                      />
                    </div>

                    <button 
                      id="password-save-btn"
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs cursor-pointer"
                    >
                      Perbarui Kata Sandi
                    </button>
                  </form>
                </div>

              </div>

            </div>
          )}

        </main>

      </div>

      {/* ACTIVE EMBEDDED MODAL VIDEO PLAYER */}
      {activeVideoUrl && (
        <div id="video-player-modal" className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-gray-950 rounded-3xl max-w-3xl w-full border border-white/10 shadow-2xl overflow-hidden relative">
            <button 
              id="close-video-modal"
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:text-primary p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video">
              <iframe 
                src={activeVideoUrl || null} 
                className="w-full h-full"
                title="Siswa Video Pembelajaran"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="p-4 bg-gray-900 text-white flex justify-between items-center text-xs">
              <span>Sesi Pembelajaran Aktif - Progress Anda Otomatis Tersimpan</span>
              <button 
                id="finish-video-btn"
                onClick={() => setActiveVideoUrl(null)}
                className="bg-primary hover:bg-secondary text-white font-bold px-4 py-1.5 rounded-lg"
              >
                Tandai Selesai & Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
