import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { supabase } from './supabaseClient';
import { 
  INITIAL_MENTORS, 
  INITIAL_MATERIALS, 
  INITIAL_TRYOUTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_CMS_DATA,
  INITIAL_FAQS,
  INITIAL_TESTIMONIALS,
  INITIAL_BENEFITS,
  INITIAL_FACILITIES
} from './data';
import { AppUser, Mentor, LearningMaterial, Tryout, TryoutResult, Announcement, LandingPageCMS, FAQItem, Testimonial, Benefit, Facility } from './types';

// Default mock accounts pre-configured for live demo and evaluation
const DEFAULT_USERS: AppUser[] = [
  {
    id: 'u_admin',
    name: 'Super Admin Mentor CPNS',
    email: 'superadmin@mentorcpns.com',
    password: 'admin123',
    whatsapp: '628123456789',
    origin: 'Makassar',
    targetInstansi: 'Pusat Kendali',
    role: 'Super Admin',
    status: 'Approved',
    joinedAt: '2026-06-25'
  },
  {
    id: 'u_finance',
    name: 'Sri Mulyati (Finance)',
    email: 'finance@mentorcpns.com',
    password: 'finance123',
    whatsapp: '628123456780',
    origin: 'Makassar',
    targetInstansi: 'Keuangan',
    role: 'Finance',
    status: 'Approved',
    joinedAt: '2026-06-25'
  },
  {
    id: 'u_mentor',
    name: 'Dwi Prasetyo (Dosen Ahli)',
    email: 'mentor@mentorcpns.com',
    password: 'mentor123',
    whatsapp: '628123456781',
    origin: 'Makassar',
    targetInstansi: 'Akademis',
    role: 'Mentor',
    status: 'Approved',
    joinedAt: '2026-06-25'
  },
  {
    id: 'u_peserta1',
    name: 'Andi Wijaya',
    email: 'andi@gmail.com',
    password: 'peserta123',
    whatsapp: '628123456782',
    origin: 'Makassar',
    targetInstansi: 'Kemenkumham (Penjaga Tahanan)',
    role: 'Peserta',
    status: 'Approved',
    joinedAt: '2026-06-25',
    invoiceNo: 'INV-245890',
    quizProgress: {
      'https://www.youtube.com/embed/dQw4w9WgXcQ': 100
    }
  },
  {
    id: 'u_peserta2',
    name: 'Budi Hartono',
    email: 'budi@gmail.com',
    password: 'peserta123',
    whatsapp: '628123456783',
    origin: 'Gowa',
    targetInstansi: 'Kejaksaan Agung (Kawal Tahanan)',
    role: 'Peserta',
    status: 'Waiting Payment',
    joinedAt: '2026-06-26',
    invoiceNo: 'INV-783294'
  }
];

export default function App() {
  
  // Navigation State
  const [page, setPage] = useState<string>('landing');
  
  // Session State
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);

  // Core App states synchronizing from localStorage (or falling back to initial mock lists)
  const [users, setUsers] = useState<AppUser[]>(() => {
    const saved = localStorage.getItem('mentorcpns_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  const [mentors, setMentors] = useState<Mentor[]>(() => {
    const saved = localStorage.getItem('mentorcpns_mentors');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((item: any) => {
        if (item.id === 'm1') {
          return {
            ...item,
            image: '/assets/images/regenerated_image_1782965951292.png'
          };
        }
        if (item.id === 'm2') {
          return {
            ...item,
            image: '/assets/images/regenerated_image_1782966185611.png'
          };
        }
        if (item.id === 'm3') {
          return {
            ...item,
            image: '/assets/images/regenerated_image_1782966747706.png'
          };
        }
        if (item.id === 'm4') {
          return {
            ...item,
            image: '/assets/images/regenerated_image_1782966744893.png'
          };
        }
        if (item.id === 'm5') {
          return {
            ...item,
            image: '/assets/images/regenerated_image_1782966741727.png'
          };
        }
        if (item.id === 'm6') {
          return {
            ...item,
            image: '/assets/images/regenerated_image_1782966739196.png'
          };
        }
        if (item.id === 'm7') {
          return {
            ...item,
            image: '/assets/images/regenerated_image_1782966903383.png'
          };
        }
        if (item.id === 'm8') {
          return {
            ...item,
            image: '/assets/images/regenerated_image_1782966736522.png'
          };
        }
        return item;
      });
    }
    return INITIAL_MENTORS;
  });

  const [materials, setMaterials] = useState<LearningMaterial[]>(() => {
    const saved = localStorage.getItem('mentorcpns_materials');
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });

  const [tryouts, setTryouts] = useState<Tryout[]>(() => {
    const saved = localStorage.getItem('mentorcpns_tryouts');
    return saved ? JSON.parse(saved) : INITIAL_TRYOUTS;
  });

  const [tryoutResults, setTryoutResults] = useState<TryoutResult[]>(() => {
    const saved = localStorage.getItem('mentorcpns_tryout_results');
    return saved ? JSON.parse(saved) : [];
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('mentorcpns_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('mentorcpns_faqs');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((item: any) => {
        if (item.id === 'faq4' && item.question.includes('30.000.000')) {
          return {
            ...item,
            question: item.question.replace('30.000.000', '40.000.000')
          };
        }
        if (item.id === 'faq1' && (item.question.includes('SKD') || !item.answer.includes('Agustus'))) {
          return {
            ...item,
            question: 'Kapan program karantina SKB CAT CPNS 2026 dimulai?',
            answer: 'Program bimbingan karantina intensif akan dimulai pada bulan Agustus 2026, dilaksanakan selama 30 hari penuh secara tatap muka menjelang pelaksanaan ujian resmi SKB CPNS 2026.'
          };
        }
        return item;
      });
    }
    return INITIAL_FAQS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('mentorcpns_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [cms, setCms] = useState<LandingPageCMS>(() => {
    const saved = localStorage.getItem('mentorcpns_cms');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.priceNow === 30000000) {
        parsed.priceNow = 40000000;
        parsed.priceOriginal = 55000000;
        parsed.pricePromo = 48000000;
      }
      if (parsed.whatsappNumber === '6281234567890' || !parsed.whatsappNumber) {
        parsed.whatsappNumber = '6285242308996';
      }
      return parsed;
    }
    return INITIAL_CMS_DATA;
  });

  const [benefits, setBenefits] = useState<Benefit[]>(() => {
    const saved = localStorage.getItem('mentorcpns_benefits');
    return saved ? JSON.parse(saved) : INITIAL_BENEFITS;
  });

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    const saved = localStorage.getItem('mentorcpns_facilities');
    return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
  });

  // Keep state synchronized in local storage
  useEffect(() => {
    localStorage.setItem('mentorcpns_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('mentorcpns_mentors', JSON.stringify(mentors));
  }, [mentors]);

  useEffect(() => {
    localStorage.setItem('mentorcpns_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('mentorcpns_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('mentorcpns_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('mentorcpns_tryouts', JSON.stringify(tryouts));
  }, [tryouts]);

  useEffect(() => {
    localStorage.setItem('mentorcpns_tryout_results', JSON.stringify(tryoutResults));
  }, [tryoutResults]);

  useEffect(() => {
    localStorage.setItem('mentorcpns_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('mentorcpns_cms', JSON.stringify(cms));
  }, [cms]);

  useEffect(() => {
    localStorage.setItem('mentorcpns_benefits', JSON.stringify(benefits));
  }, [benefits]);

  useEffect(() => {
    localStorage.setItem('mentorcpns_facilities', JSON.stringify(facilities));
  }, [facilities]);

  // Load and listen to Supabase session to protect private pages
  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        const userObj: AppUser = {
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          password: '',
          whatsapp: '-',
          origin: 'Pusat',
          targetInstansi: 'Admin Utama',
          role: session.user.email === 'superadmin@mentorcpns.com' ? 'Super Admin' : 'Admin',
          status: 'Approved',
          joinedAt: session.user.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        };
        setCurrentUser(userObj);
      } else {
        setCurrentUser(null);
        if (page === 'user-dashboard' || page === 'admin-dashboard') {
          setPage('auth');
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user) {
        const userObj: AppUser = {
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          password: '',
          whatsapp: '-',
          origin: 'Pusat',
          targetInstansi: 'Admin Utama',
          role: session.user.email === 'superadmin@mentorcpns.com' ? 'Super Admin' : 'Admin',
          status: 'Approved',
          joinedAt: session.user.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        };
        setCurrentUser(userObj);
      } else {
        setCurrentUser(null);
        if (page === 'user-dashboard' || page === 'admin-dashboard') {
          setPage('auth');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [page]);

  // Navigation controller
  const handleNavigation = (targetPage: string) => {
    if (targetPage === 'dashboard' || targetPage === 'user-dashboard' || targetPage === 'admin-dashboard') {
      if (!currentUser) {
        setPage('auth');
      } else if (currentUser.role === 'Peserta') {
        setPage('user-dashboard');
      } else {
        setPage('admin-dashboard');
      }
    } else {
      setPage(targetPage);
    }
    // Smooth scroll top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Handler: Login
  const handleLogin = (user: AppUser) => {
    setCurrentUser(user);
    if (user.role === 'Peserta') {
      setPage('user-dashboard');
    } else {
      setPage('admin-dashboard');
    }
  };

  // Auth Handler: Register new user
  const handleRegister = (newUser: AppUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    setPage('user-dashboard');
  };

  // User updates (profile, uploads, progresses)
  const handleUpdateUser = (updatedUser: AppUser) => {
    const updated = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    setUsers(updated);
  };

  // Tryout submit
  const handleAddTryoutResult = (result: TryoutResult) => {
    setTryoutResults([result, ...tryoutResults]);
  };

  // Admin: Update CMS
  const handleUpdateCMS = (updatedCMS: LandingPageCMS) => {
    setCms(updatedCMS);
  };

  // Admin: Update general tables
  const handleUpdateUsers = (updatedUsers: AppUser[]) => {
    setUsers(updatedUsers);
  };

  const handleUpdateMentors = (updatedMentors: Mentor[]) => {
    setMentors(updatedMentors);
  };

  const handleUpdateMaterials = (updatedMaterials: LearningMaterial[]) => {
    setMaterials(updatedMaterials);
  };

  const handleUpdateTryouts = (updatedTryouts: Tryout[]) => {
    setTryouts(updatedTryouts);
  };

  // Logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setCurrentUser(null);
    setPage('landing');
  };

  return (
    <div id="app-root" className="min-h-screen bg-light-bg text-gray-900 font-sans antialiased selection:bg-primary selection:text-white relative overflow-hidden">
      
      {/* Frosted Glass Background Orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary rounded-full blur-[140px] opacity-[0.07] pointer-events-none z-0"></div>
      <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-gold rounded-full blur-[120px] opacity-[0.06] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-secondary rounded-full blur-[130px] opacity-[0.05] pointer-events-none z-0"></div>
      
      {/* Dynamic Header promo bar if enabled */}
      {cms.showPromoBanner && page === 'landing' && (
        <div id="top-promo-banner" className="bg-secondary text-white text-[11px] sm:text-xs font-black py-2.5 px-4 text-center sticky top-0 z-40 shadow-md flex items-center justify-center gap-2">
          <span className="bg-white text-primary px-2 py-0.5 rounded-full font-black text-[9px] uppercase tracking-wider animate-pulse">PENTING!</span>
          <span>{cms.promoText}</span>
        </div>
      )}

      {/* Main routing rendering switch */}
      {page === 'landing' && (
        <LandingPage 
          cms={cms}
          mentors={mentors}
          faqs={faqs}
          testimonials={testimonials}
          benefits={benefits}
          facilities={facilities}
          user={currentUser}
          onNavigate={handleNavigation}
        />
      )}

      {(page === 'auth' || page === 'login' || page === 'register') && (
        <Auth 
          onLogin={handleLogin}
          onRegister={handleRegister}
          users={users}
          onNavigate={handleNavigation}
          initialMode={page === 'register' ? 'register' : 'login'}
        />
      )}

      {page === 'user-dashboard' && currentUser && (
        <UserDashboard 
          user={currentUser}
          materials={materials}
          tryouts={tryouts}
          tryoutResults={tryoutResults}
          announcements={announcements}
          cms={cms}
          onUpdateUser={handleUpdateUser}
          onAddTryoutResult={handleAddTryoutResult}
          onLogout={handleLogout}
        />
      )}

      {page === 'admin-dashboard' && currentUser && (
        <AdminDashboard 
          currentUser={currentUser}
          users={users}
          mentors={mentors}
          faqs={faqs}
          testimonials={testimonials}
          materials={materials}
          tryouts={tryouts}
          cms={cms}
          benefits={benefits}
          onUpdateBenefits={setBenefits}
          facilities={facilities}
          onUpdateFacilities={setFacilities}
          onUpdateTestimonials={setTestimonials}
          onUpdateCMS={handleUpdateCMS}
          onUpdateUsers={handleUpdateUsers}
          onUpdateMentors={handleUpdateMentors}
          onUpdateMaterials={handleUpdateMaterials}
          onUpdateTryouts={handleUpdateTryouts}
          onLogout={handleLogout}
        />
      )}

    </div>
  );
}
