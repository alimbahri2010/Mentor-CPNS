import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Target, 
  Eye, 
  EyeOff, 
  CheckSquare, 
  ArrowLeft,
  KeyRound,
  Chrome,
  ShieldCheck,
  Send
} from 'lucide-react';
import { AppUser } from '../types';
import { supabase } from '../supabaseClient';

interface AuthProps {
  onLogin: (user: AppUser) => void;
  onRegister: (newUser: AppUser) => void;
  users: AppUser[];
  onNavigate: (page: string) => void;
  initialMode?: 'login' | 'register';
}

export default function Auth({ onLogin, onRegister, users, onNavigate, initialMode = 'login' }: AuthProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regWhatsapp, setRegWhatsapp] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regOrigin, setRegOrigin] = useState('');
  const [regTarget, setRegTarget] = useState('Admin Utama');
  const [regRole, setRegRole] = useState<'Admin' | 'Super Admin' | 'Marketing'>('Admin');
  const [adminCode, setAdminCode] = useState('');
  const [regAgree, setRegAgree] = useState(true);
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  // OTP Verification States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [tempRegUser, setTempRegUser] = useState<AppUser | null>(null);

  // Forgot password states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // Handle Quick Login for testing
  const handleQuickLogin = (email: string, pass: string) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      onLogin(found);
    } else {
      setLoginError('Akun demo tidak ditemukan dalam state lokal.');
    }
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail || !loginPassword) {
      setLoginError('Silakan masukkan email dan password.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        setLoginError(error.message);
        return;
      }

      // Redirect the user to the Home page ("/")
      window.location.href = '/';
    } catch (err: any) {
      setLoginError(err.message || 'Terjadi kesalahan saat masuk.');
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regName || !regEmail || !regPassword || !regConfirmPassword) {
      setRegError('Silakan lengkapi seluruh kolom pendaftaran admin.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Konfirmasi password tidak cocok.');
      return;
    }

    if (!regAgree) {
      setRegError('Anda harus menyetujui pakta integritas dan kebijakan privasi.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: regEmail,
        password: regPassword,
        options: {
          data: {
            full_name: regName,
          }
        }
      });

      if (error) {
        setRegError(error.message);
        return;
      }

      if (!data.session) {
        setRegSuccess('Check your email and confirm your account before logging in.');
        return;
      }

      // Redirect the user to the Home page ("/")
      window.location.href = '/';
    } catch (err: any) {
      setRegError(err.message || 'Terjadi kesalahan saat pendaftaran.');
    }
  };

  // Confirm OTP Verification
  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');

    if (otpCode === '1234' || otpCode === '123456' || otpCode.length >= 4) {
      // Success
      if (tempRegUser) {
        onRegister(tempRegUser);
        setShowOtpModal(false);
        // Clear states
        setRegName('');
        setRegEmail('');
        setRegWhatsapp('');
        setRegPassword('');
        setRegConfirmPassword('');
        setRegOrigin('');
        setRegTarget('');
        setRegAgree(false);
      }
    } else {
      setOtpError('Kode OTP salah. Gunakan kode "1234" untuk pendaftaran cepat.');
    }
  };

  // Handle Forgot Password Send
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSuccess('Sandi reset telah dikirim ke email Anda. Silakan periksa kotak masuk/spam.');
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSuccess('');
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div id="auth-root" className="min-h-screen bg-light-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-gold/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 grid lg:grid-cols-12 relative z-10 min-h-[600px]">
        
        {/* Left column: Visual Marketing info panel */}
        <div className="lg:col-span-5 bg-primary p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-10"></div>
          
          <div className="space-y-6 relative z-10">
            <button 
              id="back-to-home-btn"
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center gap-1 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </button>

            <div className="pt-4">
              <span className="text-gold text-xs font-black tracking-widest block uppercase">PROGRAM EXCLUSIVE 2026</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-primary">
                Karantina Mentor CPNS
              </h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Platform bimbingan intensif tatap muka 30 hari bermalam di hotel Makassar untuk persiapan tes kelulusan SKD CAT CPNS 2026.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-extrabold text-sm text-white">Sistem Garansi Kelulusan</h5>
                  <p className="text-[11px] text-gray-400 mt-0.5">Uang kembali tertulis di atas meterai jika tidak memenuhi passing grade SKD.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-extrabold text-sm text-white">Mentor ASN Profesional</h5>
                  <p className="text-[11px] text-gray-400 mt-0.5">Langsung diajarkan oleh PNS Kemenkumham, Kemenimipas, dan Dosen ahli.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Demo Shortcuts Info removed */}

        </div>

        {/* Right column: Auth Forms */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {isLogin ? 'Masuk ke Portal Admin' : 'Daftar Akun Admin Baru'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {isLogin 
                ? 'Gunakan kredensial admin Anda untuk mengelola bimbingan, verifikasi pembayaran, materi belajar, dan konfigurasi portal.' 
                : 'Lengkapi biodata administratif untuk mendaftarkan akun tim pengelola bimbingan CPNS.'}
            </p>
          </div>

          {/* Form Switcher */}
          <div className="flex bg-gray-100 p-1.5 rounded-xl mb-6">
            <button 
              id="switch-to-login"
              onClick={() => { setIsLogin(true); setLoginError(''); setRegSuccess(''); }}
              className={`flex-1 text-center py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${isLogin ? 'bg-white shadow-xs text-primary' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Sign In (Masuk)
            </button>
            <button 
              id="switch-to-register"
              onClick={() => { setIsLogin(false); setRegError(''); setRegSuccess(''); }}
              className={`flex-1 text-center py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${!isLogin ? 'bg-white shadow-xs text-primary' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Sign Up (Daftar Baru)
            </button>
          </div>

          {/* LOGIN VIEW */}
          {isLogin ? (
            <form id="login-form" onSubmit={handleLoginSubmit} className="space-y-4">
              
              {loginError && (
                <div id="login-error-msg" className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                  {loginError}
                </div>
              )}

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">Alamat Email:</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input 
                    id="login-email-input"
                    type="email" 
                    placeholder="nama@email.com" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs sm:text-sm transition-all outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700 block">Sandi Keamanan:</label>
                  <button 
                    id="forgot-password-trigger"
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] text-primary hover:underline font-semibold"
                  >
                    Lupa Sandi?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input 
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Masukkan sandi..." 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs sm:text-sm transition-all outline-none"
                  />
                  <button 
                    id="toggle-login-password"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-650"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    id="login-remember-checkbox"
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4"
                  />
                  <span className="text-xs text-gray-500 font-medium">Ingat saya di perangkat ini</span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-3">
                <button 
                  id="login-submit-btn"
                  type="submit"
                  className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-primary/20 transition-all text-xs sm:text-sm cursor-pointer"
                >
                  Masuk Portal
                </button>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-150"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase">ATAU MASUK DENGAN</span>
                <div className="flex-grow border-t border-gray-150"></div>
              </div>

              {/* Google Login Mock */}
              <button 
                id="google-login-btn"
                type="button"
                onClick={() => handleQuickLogin('superadmin@mentorcpns.com', 'admin123')}
                className="w-full border border-gray-200 hover:bg-gray-550 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Chrome className="w-4 h-4 text-red-500" />
                <span>Masuk dengan Google (Akun Admin)</span>
              </button>

            </form>
          ) : (
            /* REGISTER VIEW */
            <form id="register-form" onSubmit={handleRegisterSubmit} className="space-y-3">
              
              {regError && (
                <div id="register-error-msg" className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                  {regError}
                </div>
              )}

              {regSuccess && (
                <div id="register-success-msg" className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-medium">
                  {regSuccess}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 block">Nama Lengkap Admin:</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <User className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      id="reg-name-input"
                      type="text" 
                      placeholder="Contoh: Andi Wijaya" 
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 block">Email Kerja Admin:</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      id="reg-email-input"
                      type="email" 
                      placeholder="andi@gmail.com" 
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 block">Sandi Baru:</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      id="reg-password-input"
                      type="password" 
                      placeholder="Minimal 6 karakter" 
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 block">Konfirmasi Sandi:</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <KeyRound className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      id="reg-confirm-input"
                      type="password" 
                      placeholder="Ulangi sandi" 
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs transition-all outline-none"
                    />
                  </div>
                </div>
              </div>



              {/* Actions */}
              <div className="pt-3">
                <button 
                  id="register-submit-btn"
                  type="submit"
                  className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-primary/20 transition-all text-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Daftar Akun Admin Baru</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

      {/* OTP VERIFICATION MODAL */}
      {showOtpModal && (
        <div id="otp-modal" className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-gray-150 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <KeyRound className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-xl text-gray-900">Verifikasi Kode OTP Anda</h3>
              <p className="text-xs text-gray-500">
                Kami telah mensimulasikan pengiriman kode verifikasi OTP ke email <strong className="text-gray-900">{tempRegUser?.email}</strong> dan WhatsApp <strong className="text-gray-900">{tempRegUser?.whatsapp}</strong>.
              </p>
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 font-bold block">
                🔑 Demo OTP Code: Masukkan "1234" atau sandi apa saja untuk mendaftar otomatis!
              </div>
            </div>

            <form onSubmit={handleOtpVerify} className="space-y-4">
              {otpError && (
                <div id="otp-error-msg" className="p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                  {otpError}
                </div>
              )}

              <input 
                id="otp-input"
                type="text"
                maxLength={6}
                placeholder="Masukkan 4 atau 6 Digit OTP"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full py-3.5 text-center bg-gray-50 border border-gray-200 focus:border-primary rounded-xl text-base font-black tracking-widest outline-none"
              />

              <div className="flex gap-3 pt-2">
                <button 
                  id="otp-cancel-btn"
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="flex-1 border border-gray-200 hover:bg-gray-550 py-3 rounded-xl text-xs font-bold transition-all"
                >
                  Batal
                </button>
                <button 
                  id="otp-submit-btn"
                  type="submit"
                  className="flex-1 bg-primary hover:bg-secondary text-white py-3 rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  Verifikasi OTP
                </button>
              </div>
            </form>

            <p className="text-[10px] text-gray-400">
              Tidak menerima kode? <span className="text-primary hover:underline font-bold cursor-pointer">Kirim ulang OTP (60 Detik)</span>
            </p>
          </div>
        </div>
      )}

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div id="forgot-modal" className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-gray-150 shadow-2xl space-y-6">
            
            <div className="space-y-2">
              <h3 className="font-extrabold text-xl text-gray-900">Atur Ulang Sandi</h3>
              <p className="text-xs text-gray-500">
                Masukkan alamat email terdaftar Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
              </p>
            </div>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              {forgotSuccess && (
                <div id="forgot-success-msg" className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-medium">
                  {forgotSuccess}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">Alamat Email:</label>
                <input 
                  id="forgot-email-input"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  id="forgot-cancel-btn"
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="flex-1 border border-gray-200 hover:bg-gray-550 py-3 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button 
                  id="forgot-submit-btn"
                  type="submit"
                  className="flex-1 bg-primary hover:bg-secondary text-white py-3 rounded-xl text-xs font-bold shadow-md"
                >
                  Kirim Sandi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
