import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Award, 
  BookOpen, 
  Users, 
  Calendar, 
  ShieldCheck, 
  HelpCircle, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Percent, 
  MessageCircle, 
  Laptop, 
  Flame, 
  ArrowRight,
  TrendingUp,
  Target,
  FileCheck,
  Zap,
  Instagram,
  Facebook,
  Music,
  HeartHandshake,
  Hotel,
  Dumbbell,
  Menu,
  X
} from 'lucide-react';
import { LandingPageCMS, Mentor, FAQItem, Testimonial, AppUser, Benefit, Facility } from '../types';

interface LandingPageProps {
  cms: LandingPageCMS;
  mentors: Mentor[];
  faqs: FAQItem[];
  testimonials: Testimonial[];
  benefits?: Benefit[];
  facilities?: Facility[];
  user: AppUser | null;
  onNavigate: (page: string) => void;
}

export default function LandingPage({ cms, mentors, faqs, testimonials, benefits = [], facilities = [], user, onNavigate }: LandingPageProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Countdown timer logic
  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(cms.countdownTarget) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [cms.countdownTarget]);

  // Format IDR Price
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
  };

  const remainingQuota = cms.quotaTotal - cms.quotaFilled;
  const quotaPercentage = (cms.quotaFilled / cms.quotaTotal) * 100;

  return (
    <div id="landing-page-root" className="min-h-screen bg-light-bg text-[#1F2937] font-sans antialiased selection:bg-primary selection:text-white">
      
      {/* Main Navbar */}
      <nav id="navbar" className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-white font-extrabold text-xl italic shadow-lg">
                M
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-lg tracking-tighter uppercase text-[#ce0f0f]">Mentor <span className="text-[#ce0f0f]">CPNS</span></span>
                <span className="text-[10px] tracking-[0.2em] font-semibold opacity-60 uppercase text-[#1F2937]">Karantina 2026</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#about" className="text-gray-600 hover:text-primary font-medium transition-colors text-sm">Tentang</a>
              <a href="#benefits" className="text-gray-600 hover:text-primary font-medium transition-colors text-sm">Benefit</a>
              <a href="#facilities" className="text-gray-600 hover:text-primary font-medium transition-colors text-sm">Fasilitas</a>
              <a href="#mentors" className="text-gray-600 hover:text-primary font-medium transition-colors text-sm">Mentor</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary font-medium transition-colors text-sm">Biaya</a>
              <a href="#faq" className="text-gray-600 hover:text-primary font-medium transition-colors text-sm">FAQ</a>
              <a href="#contact" className="text-gray-600 hover:text-primary font-medium transition-colors text-sm">Kontak</a>
            </div>

            {/* Right Buttons - Desktop only */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <button 
                  id="nav-dashboard-btn"
                  onClick={() => onNavigate('dashboard')} 
                  className="bg-primary hover:bg-primary/90 hover:shadow-primary/30 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
                >
                  <Users className="w-4 h-4" />
                  <span>Dashboard ({user.role})</span>
                </button>
              ) : (
                <>
                  <button 
                    id="nav-login-btn"
                    onClick={() => onNavigate('login')} 
                    className="text-gray-600 hover:text-primary font-semibold text-sm px-4 py-2"
                  >
                    Masuk
                  </button>
                  <a 
                    id="nav-register-btn"
                    href={`https://wa.me/${cms.whatsappNumber}?text=Halo%20Admin%20Mentor%20CPNS,%20Saya%20tertarik%20dengan%20Program%20Kelas%20Karantina%20SKD%20CPNS%202026.%20Apakah%20slot%20kuota%20masih%20tersedia?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary hover:bg-secondary/90 hover:shadow-secondary/30 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-1 cursor-pointer"
                  >
                    Daftar Sekarang
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </>
              )}
            </div>

            {/* Hamburger Button for Mobile */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-primary p-2 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full z-45 bg-white/95 backdrop-blur-lg border-b border-gray-200 transition-all duration-300 flex flex-col justify-between py-6 px-6 shadow-xl">
            <div className="space-y-4">
              <span className="text-[10px] tracking-wider uppercase font-bold text-gray-400 block mb-2">Navigasi Program</span>
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-primary py-2 border-b border-gray-50"
              >
                Tentang Program
              </a>
              <a 
                href="#benefits" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-primary py-2 border-b border-gray-50"
              >
                Benefit & Keunggulan
              </a>
              <a 
                href="#facilities" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-primary py-2 border-b border-gray-50"
              >
                Fasilitas Karantina
              </a>
              <a 
                href="#mentors" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-primary py-2 border-b border-gray-50"
              >
                Mentor ASN
              </a>
              <a 
                href="#pricing" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-primary py-2 border-b border-gray-50"
              >
                Biaya & Garansi
              </a>
              <a 
                href="#faq" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-primary py-2 border-b border-gray-50"
              >
                FAQ / Tanya Jawab
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-primary py-2"
              >
                Kontak Kami
              </a>
            </div>

            <div className="pt-6 space-y-3 border-t border-gray-100">
              {user ? (
                <button 
                  id="mob-nav-dashboard-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('dashboard');
                  }} 
                  className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <Users className="w-4 h-4" />
                  <span>Dashboard ({user.role})</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    id="mob-nav-login-btn"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate('login');
                    }} 
                    className="w-full text-gray-700 hover:text-primary font-semibold text-sm border border-gray-200 py-3.5 rounded-xl text-center bg-gray-50"
                  >
                    Masuk
                  </button>
                  <a 
                    id="mob-nav-register-btn"
                    href={`https://wa.me/${cms.whatsappNumber}?text=Halo%20Admin%20Mentor%20CPNS,%20Saya%20tertarik%20dengan%20Program%20Kelas%20Karantina%20SKD%20CPNS%202026.%20Apakah%20slot%20kuota%20masih%20tersedia?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }} 
                    className="w-full bg-secondary hover:bg-secondary/95 text-white font-bold py-3.5 rounded-xl text-sm shadow-md text-center flex items-center justify-center cursor-pointer"
                  >
                    Daftar
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-primary text-white pt-12 pb-24 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
        
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#CE0F0F] rounded-full blur-[120px] opacity-[0.08] pointer-events-none"></div>
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-secondary rounded-full blur-[100px] opacity-[0.06] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              {/* Highlight Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                <span className="bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-white/20 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary" /> Garansi Masuk 3X Formasi*
                </span>
                <span className="bg-[#f2ce62] text-gray-900 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-sm">
                  <Award className="w-3.5 h-3.5" /> Kelas Karantina 2026
                </span>
                <span className="bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider border border-white/20">
                  📍 Hotel Sultan Alauddin Makassar
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[0.95]">
                GARANSI MASUK <br/>
                <span className="text-secondary">
                  SKB CAT CPNS 2026
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                {cms.heroSubtitle}
              </p>

              {/* Bullet highlight points */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0 pt-2">
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex flex-col items-center text-center justify-center space-y-2 group hover:border-primary/40 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#CE0F0F' }}>
                    <HeartHandshake className="w-5 h-5" style={{ color: '#ffffff' }} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-secondary font-bold text-xs sm:text-sm block">Garansi</span>
                    <span className="text-[10px] sm:text-xs text-white block opacity-90">Uang Kembali*</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex flex-col items-center text-center justify-center space-y-2 group hover:border-[#f2ce62]/40 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#f2ce62' }}>
                    <Clock className="w-5 h-5" style={{ color: '#ffffff' }} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[#f2ce62] font-bold text-xs sm:text-sm block">30 Hari</span>
                    <span className="text-[10px] sm:text-xs text-white block opacity-90">Belajar Fulltime</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex flex-col items-center text-center justify-center space-y-2 group hover:border-green-400/40 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#05df72' }}>
                    <Hotel className="w-5 h-5" style={{ color: '#ffffff' }} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-green-400 font-bold text-xs sm:text-sm block">Hotel</span>
                    <span className="text-[10px] sm:text-xs text-white block opacity-90">Bintang 3</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex flex-col items-center text-center justify-center space-y-2 group hover:border-cyan-400/40 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#00d3f3' }}>
                    <Dumbbell className="w-5 h-5" style={{ color: '#ffffff' }} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-cyan-400 font-bold text-xs sm:text-sm block">Lengkap</span>
                    <span className="text-[10px] sm:text-xs text-white block opacity-90">Samapta & Silat</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <a 
                  id="hero-register-cta"
                  href={`https://wa.me/${cms.whatsappNumber}?text=Halo%20Admin%20Mentor%20CPNS,%20Saya%20tertarik%20dengan%20Program%20Kelas%20Karantina%20SKD%20CPNS%202026.%20Apakah%20slot%20kuota%20masih%20tersedia?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-secondary text-white font-bold text-base px-10 py-4 rounded-2xl shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
                  style={{ backgroundColor: '#ce0f0f' }}
                >
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#about"
                  className="bg-white/10 hover:bg-white/15 text-white font-bold text-base px-10 py-4 rounded-2xl border border-white/20 transition-all text-center flex items-center justify-center backdrop-blur-sm"
                >
                  Pelajari Program
                </a>
              </div>
            </div>

            {/* Right Column (Live Countdown & Quota Widget) */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden">
                


                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-xs text-[#f2ce62] uppercase tracking-widest font-black block mb-1">PENDAFTARAN AKAN DITUTUP DALAM</span>
                    <div className="flex justify-center gap-3.5 pt-2">
                      <div className="bg-gray-900/60 p-3 rounded-2xl min-w-[64px] border border-white/10">
                        <span className="text-2xl sm:text-3xl font-black text-white block">{timeLeft.days}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Hari</span>
                      </div>
                      <div className="bg-gray-900/60 p-3 rounded-2xl min-w-[64px] border border-white/10">
                        <span className="text-2xl sm:text-3xl font-black text-white block">{timeLeft.hours}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Jam</span>
                      </div>
                      <div className="bg-gray-900/60 p-3 rounded-2xl min-w-[64px] border border-white/10">
                        <span className="text-2xl sm:text-3xl font-black text-white block">{timeLeft.minutes}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Menit</span>
                      </div>
                      <div className="bg-gray-900/60 p-3 rounded-2xl min-w-[64px] border border-white/10">
                        <span className="text-2xl sm:text-3xl font-black text-secondary animate-pulse block">{timeLeft.seconds}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Detik</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-5">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs text-white font-bold uppercase tracking-widest">Status Kuota Peserta</span>
                      <span className="text-sm font-bold text-[#f2ce62]">Tersisa {remainingQuota} Kursi</span>
                    </div>
                    {/* Progress Bar with frosted theme style */}
                    <div className="w-full h-3 bg-gray-100/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out shadow-inner"
                        style={{ width: `${quotaPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-end items-center text-xs mt-3.5 w-full">
                      <span className="text-white italic text-right">"Pendaftaran akan ditutup otomatis saat kuota penuh."</span>
                    </div>
                  </div>

                  <div className="bg-black/25 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center gap-2.5 text-xs text-gray-300">
                      <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#05df72' }} />
                      <span className="text-white">Belajar Intensif 30 Hari Full Time di Makassar</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-300">
                      <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#05df72' }} />
                      <span className="text-white">Garansi uang kembali sesuai syarat jika tidak lulus</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-300">
                      <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#05df72' }} />
                      <span className="text-white">Sertifikat Resmi Komputer, TOEFL & Beladiri</span>
                    </div>
                  </div>

                  <a 
                    id="hero-register-card-cta"
                    href={`https://wa.me/${cms.whatsappNumber}?text=Halo%20Admin%20Mentor%20CPNS,%20Saya%20tertarik%20dengan%20Program%20Kelas%20Karantina%20SKD%20CPNS%202026.%20Apakah%20slot%20kuota%20masih%20tersedia?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-secondary hover:bg-secondary/90 hover:shadow-secondary/30 text-white font-extrabold text-center py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Daftar Sekarang - Amankan Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Program Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Visual Illustration */}
            <div className="lg:col-span-5 relative">
              <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 relative overflow-hidden flex flex-col justify-between py-10 lg:h-[550px]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -mr-8 -mt-8"></div>
                
                <h3 className="text-2xl font-extrabold text-primary mb-4">Bayangkan Saja...</h3>
                <blockquote className="space-y-4 text-gray-700 italic text-base leading-relaxed">
                  <p>“Selama 30 hari penuh Anda hanya perlu fokus belajar secara menyeluruh.”</p>
                  <p>“Tidak perlu bingung mengatur jadwal belajar yang acak.”</p>
                  <p>“Tidak terganggu pekerjaan rumah atau kebisingan lingkungan sehari-hari.”</p>
                  <p>“Tidak belajar sendirian di kamar dalam kebingungan materi.”</p>
                  <p>“Setiap hari didampingi mentor PNS/ASN Aktif berpengalaman yang mengoreksi langsung kelemahan Anda.”</p>
                </blockquote>
                
                <div className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    GP
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Garansi Resmi Program</h4>
                    <p className="text-xs text-gray-500">Mentor CPNS Karantina 2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Copywriting Description */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-primary font-black uppercase tracking-widest text-sm block">TENTANG PROGRAM KELAS KARANTINA</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Kalau Anda benar-benar serius ingin lolos seleksi SKB CAT CPNS 2026...
              </h2>
              
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Seringkali kegagalan peserta seleksi CPNS bukan karena materinya yang terlalu sulit, melainkan karena ketidakkonsistenan belajar harian, tidak tahu prioritas materi mana yang harus dipelajari terlebih dahulu, serta tidak adanya umpan balik langsung dari pengajar ahli.
                </p>
                <p className="font-semibold text-gray-900">
                  Program Karantina intensif ini dibuat agar Anda tinggal masuk ke dalam sistem menginap hotel bintang 3, belajar full-time, didampingi penuh, dan langsung siap bertarung di CAT sesungguhnya.
                </p>
                <p>
                  Materi diajarkan secara runut dari dasar hingga trik menjawab soal HOTS tercepat oleh mentor-mentor PNS/ASN Aktif dari Kemenkumham, Kemristekdikti, Kemenimipas, dan praktisi psikologi yang sudah berpengalaman meloloskan ratusan alumni.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-amber-800 text-sm">Komitmen Garansi Masuk SKB</h4>
                  <p className="text-xs text-amber-700 mt-1">
                    Jika Anda mematuhi seluruh rangkaian kurikulum, hadir 100% di sesi kelas, namun tidak berhasil masuk 3X formasi SKB CAT CPNS 2026, biaya program akan kami kembalikan sesuai ketentuan tertulis.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href="#pricing"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-secondary font-bold text-base group"
                >
                  <span>Lihat Rincian Biaya dan S&K Garansi</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Section (Problem vs Solution) */}
      <section id="why-choose-us" className="py-20 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-primary font-black uppercase tracking-widest text-sm">KENAPA PILIH KAMI?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Kenapa Banyak Peserta Memilih Program Karantina?
            </h2>
            <p className="text-base text-gray-600">
              Belajar mandiri seringkali gagal bukan karena materinya sulit, melainkan karena rintangan-rintangan berikut:
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* The Hard Problems Column */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-red-100 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                <XCircle className="w-6 h-6 text-secondary shrink-0" />
                <span>Belajar Mandiri (Tanpa Karantina)</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm" style={{ fontSize: '15px' }}>Tidak Konsisten Belajar</h4>
                    <p className="text-xs text-gray-500 mt-1">Mudah terdistraksi media sosial, game, pekerjaan rumah, atau rasa malas karena belajar sendirian.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm" style={{ fontSize: '15px' }}>Tidak Ada Mentor yang Mengoreksi</h4>
                    <p className="text-xs text-gray-500 mt-1">Saat bingung dengan pengerjaan soal matematika TIU atau analisis TWK, tidak tahu harus bertanya ke siapa.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm" style={{ fontSize: '15px' }}>Sulit Menjaga Fokus</h4>
                    <p className="text-xs text-gray-500 mt-1">Lingkungan rumah kurang kondusif untuk konsentrasi belajar berjam-jam secara intensif.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm" style={{ fontSize: '15px' }}>Tidak Tahu Prioritas Materi</h4>
                    <p className="text-xs text-gray-500 mt-1">Menghabiskan waktu menghafal seluruh sejarah atau rumus panjang yang sebenarnya tidak keluar di ujian CPNS.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">5</div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm" style={{ fontSize: '15px' }}>Tidak Terbiasa dengan Sistem CAT Bertekanan</h4>
                    <p className="text-xs text-gray-500 mt-1">Menguasai teori tetapi kehabisan waktu di ujian asli karena panik dengan sistem waktu mundur CAT.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Ultimate Karantina Solution Column */}
            <div className="bg-[#a40000] p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6 relative border border-white/5 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-8 -mt-8 blur-2xl"></div>
              
              <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
                <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
                <span className="text-[#f2ce62]">Solusi Sistematis Kelas Karantina</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#05df72] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm" style={{ fontSize: '15px' }}>Belajar Terstruktur Full Time 30 Hari</h4>
                    <p className="text-xs text-gray-400 mt-1" style={{ color: '#ffffff' }}>Jadwal belajar disiplin dari pagi, siang, hingga malam sudah diatur rapi oleh tim akademis.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#05df72] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm" style={{ fontSize: '15px' }}>Interaksi Langsung dengan Mentor PNS/ASN Aktif</h4>
                    <p className="text-xs text-gray-400 mt-1" style={{ color: '#ffffff' }}>Tanya jawab langsung di kelas tatap muka dengan PNS Kemenkumham, Dosen, & pakar psikologi.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#05df72] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm" style={{ fontSize: '15px', textDecorationLine: 'none' }}>Akomodasi Hotel Nyaman & Bebas Gangguan</h4>
                    <p className="text-xs text-gray-400 mt-1" style={{ color: '#ffffff' }}>Tinggal di hotel bintang 3 dengan konsumsi harian terpenuhi, fokus Anda 100% hanyalah belajar lulus.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#05df72] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm" style={{ fontSize: '15px' }}>Kurikulum Terarah Sesuai Kisi-Kisi FR Terkini</h4>
                    <p className="text-xs text-gray-400 mt-1" style={{ color: '#ffffff' }}>Hanya mempelajari pola-pola soal HOTS terakurat yang benar-benar berpotensi keluar berdasarkan FR 2024-2025.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#05df72] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm" style={{ fontSize: '15px' }}>Simulasi Sistem CAT Harian Terjadwal</h4>
                    <p className="text-xs text-gray-400 mt-1" style={{ color: '#ffffff' }}>Latihan harian di depan komputer dengan perangkap penentu batas kelulusan untuk melatih mental bertarung Anda.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white/30 backdrop-blur-sm border-y border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-primary font-black uppercase tracking-widest text-sm">APA YANG AKAN ANDA DAPATKAN?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Benefit Utama Program Karantina
            </h2>
            <p className="text-base text-gray-600">
              Setiap fasilitas dan sesi bimbingan dirancang secara khusus untuk mendongkrak skor SKB Anda secara signifikan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const IconComp = (() => {
                switch (benefit.iconName) {
                  case 'Clock': return Clock;
                  case 'Users': return Users;
                  case 'Laptop': return Laptop;
                  case 'Calendar': return Calendar;
                  case 'TrendingUp': return TrendingUp;
                  case 'BookOpen': return BookOpen;
                  case 'FileCheck': return FileCheck;
                  case 'Target': return Target;
                  default: return Award;
                }
              })();
              return (
                <div key={benefit.id} className="bg-white/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/40 hover:border-primary/30 hover:bg-white/80 hover:shadow-xl transition-all shadow-sm group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-20 bg-white/20 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-primary font-black uppercase tracking-widest text-sm">SELAMA KARANTINA ANDA TIDAK PERLU MEMIKIRKAN FASILITAS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Fasilitas Lengkap Menginap & Belajar
            </h2>
            <p className="text-base text-gray-600">
              Seluruh urusan akomodasi, makan, dan fasilitas belajar sudah kami siapkan dengan standar terbaik agar Anda cukup fokus pada satu tujuan: Lulus SKB CPNS 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <div key={facility.id} className="bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden border border-white/50 shadow-sm hover:shadow-xl hover:bg-white/80 transition-all">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={facility.image || null} 
                    alt={facility.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {facility.badge && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                      {facility.badge}
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="font-extrabold text-gray-900 text-lg">{facility.title}</h4>
                  <p className="text-xs text-gray-500">
                    {facility.description}
                  </p>
                  {facility.ratingText && (
                    <div className="flex items-center gap-1.5 text-xs text-gold font-bold">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span>{facility.ratingText}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Section with animated feel */}
      <section id="bonus" className="py-20 bg-primary text-white relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#f2ce62] font-black uppercase tracking-widest text-sm block">FASILITAS GRATIS TAMBAHAN UNTUK PESERTA</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Bonus Fasilitas Tambahan (Free)
            </h2>
            <p className="text-base text-red-100">
              Setiap peserta karantina berhak mendapatkan sertifikat penunjang administrasi yang sangat bernilai untuk seleksi instansi tertentu.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Bonus 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all text-center space-y-4 transform hover:-translate-y-1 duration-300">
              <div className="w-14 h-14 bg-[#f2ce62] text-white rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                1
              </div>
              <h3 className="text-xl font-bold">Sertifikat Komputer Resmi</h3>
              <p className="text-xs text-red-50 leading-relaxed">
                Diberikan dari Lembaga Kursus Komputer Resmi berizin dinas pendidikan sebagai bukti keahlian TI yang valid untuk pemberkasan.
              </p>
            </div>

            {/* Bonus 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all text-center space-y-4 transform hover:-translate-y-1 duration-300">
              <div className="w-14 h-14 bg-[#f2ce62] text-white rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                2
              </div>
              <h3 className="text-xl font-bold">Sertifikat Beladiri Silat</h3>
              <p className="text-xs text-red-50 leading-relaxed">
                Sertifikat kelulusan dari Perguruan Silat resmi terdaftar di pemerintah, memberikan poin plus signifikan untuk formasi Kemenkumham.
              </p>
            </div>

            {/* Bonus 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all text-center space-y-4 transform hover:-translate-y-1 duration-300">
              <div className="w-14 h-14 bg-[#f2ce62] text-white rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                3
              </div>
              <h3 className="text-xl font-bold">Sertifikat TOEFL ITP</h3>
              <p className="text-xs text-red-50 leading-relaxed">
                Fasilitas tes kemampuan bahasa Inggris TOEFL untuk syarat wajib instansi seperti Kejaksaan, Kementerian Luar Negeri, dll.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section id="mentors" className="py-20 bg-white/30 backdrop-blur-sm border-t border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-primary font-black uppercase tracking-widest text-sm">DIBIMBING LANGSUNG OLEH AHLINYA</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Mentor Berpengalaman & PNS/ASN Aktif Aktif
            </h2>
            <p className="text-base text-gray-600">
              Materi diajarkan secara aplikatif oleh praktisi PNS/ASN Aktif yang sudah lolos seleksi resmi serta akademisi profesional.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/40 hover:bg-white/80 hover:shadow-xl transition-all text-center flex flex-col items-center">
                <div className="w-full h-64 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={mentor.image || null} 
                    alt={mentor.name} 
                    className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="bg-primary/90 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">
                      {mentor.role}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-1 w-full text-left">
                  <h4 className="font-extrabold text-gray-900 text-base">{mentor.name}</h4>
                  <p className="text-xs text-primary font-semibold">{mentor.spec}</p>
                  <p className="text-[11px] text-gray-500 pt-2 border-t border-white/40 mt-2">
                    Berpengalaman mengupas tuntas kisi-kisi ujian terakurat dan mengajarkan strategi pengerjaan kilat.
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing / Harga Section */}
      <section id="pricing" className="py-20 bg-white/20 backdrop-blur-sm border-t border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-primary font-black uppercase tracking-widest text-sm">HARGA SPESIAL PROGRAM KELAS KARANTINA</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Investasi Terbaik Masa Depan Anda
            </h2>
            <p className="text-base text-gray-600">
              Biaya all-in mencakup tempat tinggal, makan, mentoring, modul belajar cetak, bonus sertifikat resmi, dan jaminan garansi kelulusan.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/60 shadow-xl relative grid lg:grid-cols-12">
            
            {/* Left pricing display */}
            <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
              <div>
                <span className="bg-primary/10 text-primary text-xs font-black uppercase px-3 py-1.5 rounded-full block w-max mb-4">
                  PROMO INTENSIF ALL-IN
                </span>
                <h4 className="font-extrabold text-gray-900 text-2xl">Kelas Karantina Intensif 30 Hari</h4>
                <p className="text-xs text-gray-500 mt-2">
                  Bermalam dan belajar full time di Hotel Sultan Alauddin Makassar.
                </p>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-gray-400 line-through text-sm">
                  <span>Harga Normal:</span>
                  <span>{formatPrice(cms.priceOriginal)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 line-through text-base font-semibold">
                  <span>Harga Promo Awal:</span>
                  <span>{formatPrice(cms.pricePromo)}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 block">Investasi Spesial Sekarang:</span>
                  <span className="text-3xl sm:text-4xl font-black text-primary block">
                    {formatPrice(cms.priceNow)}
                  </span>
                  <span className="text-[10px] text-gray-400 block">*Biaya dapat dicicil 2x sesuai kesepakatan tertulis</span>
                </div>
              </div>

              <a 
                id="pricing-register-cta"
                href={`https://wa.me/${cms.whatsappNumber}?text=Halo%20Admin%20Mentor%20CPNS,%20Saya%20tertarik%20dengan%20Program%20Kelas%20Karantina%20SKD%20CPNS%202026.%20Apakah%20slot%20kuota%20masih%20tersedia?`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary hover:bg-secondary text-white font-black text-sm text-center block py-4 rounded-xl shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer mt-4"
              >
                Amankan Slot - Daftar Sekarang
              </a>
            </div>

            {/* Right facilities checklist */}
            <div className="lg:col-span-5 bg-primary p-8 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="space-y-4">
                <span className="text-[#f2ce62] font-bold text-xs uppercase tracking-wider block">APA SAJA YANG TERMASUK:</span>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Hotel Bintang 3 Nyaman 30 Hari</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>3x Makan & 2x Coffee Break Sehari</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Modul Buku Cetak Lengkap</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Pendampingan Mentor PNS/ASN Aktif Harian</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Simulasi Komputer CAT Harian</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Latihan Samapta & Beladiri Silat</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Sertifikat TOEFL, Komputer, & Silat</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mt-6">
                <div className="flex items-start gap-2 text-amber-400">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-300 leading-relaxed">
                    <strong className="text-white block font-bold">100% GARANSI UANG KEMBALI</strong>
                    Sesuai dengan ketentuan hitam di atas putih, uang dikembalikan jika Anda mengikuti kurikulum namun gagal passing grade.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Garansi premium gold strip */}
          <div id="garansi-gold-section" className="max-w-2xl mx-auto mt-12 bg-gold p-[1.5px] rounded-2xl shadow-lg">
            <div className="bg-gray-950 p-6 rounded-2xl text-center space-y-3">
              <span className="text-[#f2ce62] font-black uppercase tracking-widest text-xs block flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" /> GARANSI MASUK SKB CAT CPNS 2026
              </span>
              <p className="text-xs text-gray-300 leading-relaxed max-w-lg mx-auto">
                Jika peserta tidak lulus ambang batas SKB setelah mengikuti program, biaya bimbingan dikembalikan sesuai S&K perjanjian tertulis saat registrasi. Komitmen kami adalah kesuksesan Anda.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white/30 backdrop-blur-sm border-t border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-primary font-black uppercase tracking-widest text-sm">BUKTI KELULUSAN ALUMNI</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Kisah Sukses Alumni Kelas Karantina
            </h2>
            <p className="text-base text-gray-600">
              Dengarkan langsung dari mereka yang telah merubah impian menjadi kenyataan dan kini telah aktif mengabdi sebagai ASN.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Interactive Review Text Carousel (Centered) */}
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/40 relative min-h-[250px] flex flex-col justify-between shadow-sm">
                <div className="absolute top-6 right-8 text-gray-200 text-6xl font-serif">“</div>
                
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonials[activeTestimonial]?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>

                  <p className="text-gray-700 text-base leading-relaxed italic">
                    "{testimonials[activeTestimonial]?.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-white/40 pt-6 mt-6">
                  <img 
                    src={testimonials[activeTestimonial]?.image || null} 
                    alt={testimonials[activeTestimonial]?.name} 
                    className="w-12 h-12 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="font-extrabold text-gray-900 text-sm">{testimonials[activeTestimonial]?.name}</h5>
                    <p className="text-xs text-primary font-semibold">{testimonials[activeTestimonial]?.instansi}</p>
                  </div>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex gap-2 justify-center">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3.5 h-3.5 rounded-full transition-all ${index === activeTestimonial ? 'bg-primary w-8' : 'bg-gray-300'}`}
                  ></button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white/20 backdrop-blur-sm border-t border-white/20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-primary font-black uppercase tracking-widest text-sm">PERTANYAAN YANG SERING DIAJUKAN</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600">
              Berikut adalah jawaban terperinci atas pertanyaan yang paling sering diajukan calon peserta.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm overflow-hidden">
                <button 
                  id={`faq-btn-${faq.id}`}
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-5 text-left font-bold text-gray-900 flex justify-between items-center hover:bg-white/85 transition-colors text-sm sm:text-base cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    {faq.question}
                  </span>
                  {activeFaq === faq.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                
                {activeFaq === faq.id && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-gray-650 border-t border-white/20 leading-relaxed bg-white/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white/30 backdrop-blur-sm border-t border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-primary font-black uppercase tracking-widest text-sm">HUBUNGI KAMI SEGERA</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Lokasi & Kontak Karantina
            </h2>
            <p className="text-sm text-gray-600">
              Hubungi tim marketing kami untuk berkonsultasi mengenai sisa kuota, sistem cicilan biaya, dan mekanisme penjemputan di bandara.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/40 shadow-sm space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">Alamat Kantor & Lokasi Belajar:</h5>
                  <p className="text-xs text-gray-600 mt-1">{cms.officeAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">WhatsApp Marketing (Konsultasi):</h5>
                  <p className="text-xs text-gray-600 mt-1">+{cms.whatsappNumber} (Mentor Andi Chandra)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">Email Resmi Layanan:</h5>
                  <p className="text-xs text-gray-600 mt-1">{cms.emailContact}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">Jam Operasional Layanan:</h5>
                  <p className="text-xs text-gray-600 mt-1">{cms.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-6 border-t border-white/30 flex flex-col items-center gap-3">
              <h6 className="font-bold text-gray-900 text-xs tracking-wider">IKUTI MEDIA SOSIAL KAMI:</h6>
              <div className="flex gap-3">
                <a href={cms.instagramUrl || null} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#F8F9FA] hover:bg-primary hover:text-white text-gray-600 rounded-xl flex items-center justify-center transition-colors shadow-xs">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={cms.tiktokUrl || null} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#F8F9FA] hover:bg-primary hover:text-white text-gray-600 rounded-xl flex items-center justify-center transition-colors shadow-xs">
                  <Music className="w-5 h-5" />
                </a>
                <a href={cms.facebookUrl || null} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#F8F9FA] hover:bg-primary hover:text-white text-gray-600 rounded-xl flex items-center justify-center transition-colors shadow-xs">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gray-900 py-16 border-t border-white/10 text-blue-100/80" style={{ backgroundColor: '#06257e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg" style={{ backgroundColor: '#ffffff', color: '#06257e' }}>
                M
              </div>
              <span className="font-extrabold tracking-tight text-lg text-white uppercase">MENTOR CPNS</span>
            </div>
            <p className="text-xs text-blue-100/70 leading-relaxed">
              Program bimbingan karantina intensif terbaik di Makassar, didesain khusus untuk mengantarkan Anda meraih NIP ASN 2026.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="font-extrabold text-white text-xs tracking-wider uppercase">Menu Utama</h5>
            <div className="flex flex-col gap-2.5 text-xs text-blue-100/70">
              <a href="#about" className="hover:text-white transition-colors hover:underline">Tentang Program</a>
              <a href="#benefits" className="hover:text-white transition-colors hover:underline">Benefit Utama</a>
              <a href="#facilities" className="hover:text-white transition-colors hover:underline">Fasilitas Hotel</a>
              <a href="#mentors" className="hover:text-white transition-colors hover:underline">Mentor PNS/ASN Aktif</a>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-extrabold text-white text-xs tracking-wider uppercase">Persiapan CAT</h5>
            <div className="flex flex-col gap-2.5 text-xs text-blue-100/70">
              <a href="#pricing" className="hover:text-white transition-colors hover:underline">Biaya Program</a>
              <a href="#faq" className="hover:text-white transition-colors hover:underline">Tanya Jawab (FAQ)</a>
              <a href="#contact" className="hover:text-white transition-colors hover:underline">Kontak & Lokasi</a>
              <button onClick={() => onNavigate('login')} className="text-left hover:text-white transition-colors hover:underline cursor-pointer">Sistem Portal Login</button>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-extrabold text-white text-xs tracking-wider uppercase">Kontak Kantor</h5>
            <p className="text-xs text-blue-100/70 leading-relaxed">
              Hotel Sultan Alauddin Makassar, Jl. Sultan Alauddin No.259, Makassar, Sulawesi Selatan.
            </p>
            <p className="text-xs font-bold text-white">
              WhatsApp: +{cms.whatsappNumber} (Mentor Andi Chandra)
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 mt-12 pt-8 text-center md:flex justify-between items-center text-xs text-blue-200/50">
          <p>© 2026 Mentor CPNS Karantina. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex justify-center gap-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-white hover:underline">Syarat & Ketentuan</span>
            <span className="cursor-pointer hover:text-white hover:underline">Kebijakan Privasi</span>
          </div>
        </div>
      </footer>

      {/* STICKY WHATSAPP BUTTON (Bottom Right) */}
      <a 
        id="whatsapp-sticky-btn"
        href={`https://wa.me/${cms.whatsappNumber}?text=Halo%20Admin%20Mentor%20CPNS,%20Saya%20tertarik%20dengan%20Program%20Kelas%20Karantina%20SKD%20CPNS%202026.%20Apakah%20slot%20kuota%20masih%20tersedia?`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all transform hover:scale-115 flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="absolute right-14 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Konsultasi WhatsApp (Online)
        </span>
      </a>



    </div>
  );
}
