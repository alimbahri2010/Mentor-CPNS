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
    name: 'Admin Utama Mentor CPNS',
    email: 'admin@mentorcpns.com',
    password: 'admin123',
    whatsapp: '628123456789',
    origin: 'Makassar',
    targetInstansi: 'Pusat Kendali',
    role: 'Admin',
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
    try {
      const saved = localStorage.getItem('mentorcpns_users');
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch (e) {
      console.error('Error parsing users state:', e);
      return DEFAULT_USERS;
    }
  });

  const [mentors, setMentors] = useState<Mentor[]>(() => {
    try {
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
    } catch (e) {
      console.error('Error parsing mentors state:', e);
    }
    return INITIAL_MENTORS;
  });

  const [materials, setMaterials] = useState<LearningMaterial[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_materials');
      return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
    } catch (e) {
      console.error('Error parsing materials state:', e);
      return INITIAL_MATERIALS;
    }
  });

  const [tryouts, setTryouts] = useState<Tryout[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_tryouts');
      return saved ? JSON.parse(saved) : INITIAL_TRYOUTS;
    } catch (e) {
      console.error('Error parsing tryouts state:', e);
      return INITIAL_TRYOUTS;
    }
  });

  const [tryoutResults, setTryoutResults] = useState<TryoutResult[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_tryout_results');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing tryoutResults state:', e);
      return [];
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_announcements');
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch (e) {
      console.error('Error parsing announcements state:', e);
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
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
    } catch (e) {
      console.error('Error parsing faqs state:', e);
    }
    return INITIAL_FAQS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_testimonials');
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch (e) {
      console.error('Error parsing testimonials state:', e);
      return INITIAL_TESTIMONIALS;
    }
  });

  const [cms, setCms] = useState<LandingPageCMS>(() => {
    try {
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
    } catch (e) {
      console.error('Error parsing cms state:', e);
    }
    return INITIAL_CMS_DATA;
  });

  const [benefits, setBenefits] = useState<Benefit[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_benefits');
      return saved ? JSON.parse(saved) : INITIAL_BENEFITS;
    } catch (e) {
      console.error('Error parsing benefits state:', e);
      return INITIAL_BENEFITS;
    }
  });

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_facilities');
      return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
    } catch (e) {
      console.error('Error parsing facilities state:', e);
      return INITIAL_FACILITIES;
    }
  });

  const [dbErrors, setDbErrors] = useState<{ [table: string]: string }>({});

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

  useEffect(() => {
    const fetchSupabaseData = async () => {
      // 1. Fetch mentors
      try {
        const { data: mentorsData, error: mentorsError } = await supabase.from('mentors').select('*');
        if (!mentorsError) {
          if (mentorsData && mentorsData.length > 0) {
            setMentors(mentorsData);
          }
          setDbErrors(prev => {
            const copy = { ...prev };
            delete copy.mentors;
            return copy;
          });
        } else {
          console.warn('Could not load mentors from Supabase, using local state:', mentorsError);
          setDbErrors(prev => ({
            ...prev,
            mentors: `${mentorsError.message} (Code: ${mentorsError.code})`
          }));
        }
      } catch (err: any) {
        console.error('Exception fetching mentors:', err);
      }

      // 2. Fetch benefits
      try {
        const { data: benefitsData, error: benefitsError } = await supabase.from('benefits').select('*');
        if (!benefitsError) {
          if (benefitsData && benefitsData.length > 0) {
            setBenefits(benefitsData.map((b: any) => ({
              id: b.id,
              title: b.title,
              description: b.description,
              iconName: b.iconName || b.icon_name || 'Clock'
            })));
          }
          setDbErrors(prev => {
            const copy = { ...prev };
            delete copy.benefits;
            return copy;
          });
        } else {
          console.warn('Could not load benefits from Supabase, using local state:', benefitsError);
          setDbErrors(prev => ({
            ...prev,
            benefits: `${benefitsError.message} (Code: ${benefitsError.code})`
          }));
        }
      } catch (err: any) {
        console.error('Exception fetching benefits:', err);
      }

      // 3. Fetch facilities
      try {
        const { data: facilitiesData, error: facilitiesError } = await supabase.from('facilities').select('*');
        if (!facilitiesError) {
          if (facilitiesData && facilitiesData.length > 0) {
            setFacilities(facilitiesData.map((f: any) => ({
              id: f.id,
              title: f.title,
              description: f.description,
              image: f.image,
              badge: f.badge,
              ratingText: f.ratingText || f.rating_text
            })));
          }
          setDbErrors(prev => {
            const copy = { ...prev };
            delete copy.facilities;
            return copy;
          });
        } else {
          console.warn('Could not load facilities from Supabase, using local state:', facilitiesError);
          setDbErrors(prev => ({
            ...prev,
            facilities: `${facilitiesError.message} (Code: ${facilitiesError.code})`
          }));
        }
      } catch (err: any) {
        console.error('Exception fetching facilities:', err);
      }

      // 4. Fetch testimonials
      try {
        const { data: testimonialsData, error: testimonialsError } = await supabase.from('testimonials').select('*');
        if (!testimonialsError) {
          if (testimonialsData && testimonialsData.length > 0) {
            setTestimonials(testimonialsData.map((t: any) => ({
              id: t.id,
              name: t.name,
              role: t.role,
              text: t.text,
              rating: Number(t.rating || 5),
              image: t.image,
              instansi: t.instansi
            })));
          }
          setDbErrors(prev => {
            const copy = { ...prev };
            delete copy.testimonials;
            return copy;
          });
        } else {
          console.warn('Could not load testimonials from Supabase, using local state:', testimonialsError);
          setDbErrors(prev => ({
            ...prev,
            testimonials: `${testimonialsError.message} (Code: ${testimonialsError.code})`
          }));
        }
      } catch (err: any) {
        console.error('Exception fetching testimonials:', err);
      }
    };

    fetchSupabaseData();
  }, []);

  // Load and listen to Supabase session to protect private pages
  useEffect(() => {
    let subscription: any = null;

    const initAuth = async () => {
      try {
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
            role: 'Admin',
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
      } catch (err) {
        console.error('Auth initialization error:', err);
      }
    };

    initAuth();

    try {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session && session.user) {
          const userObj: AppUser = {
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            password: '',
            whatsapp: '-',
            origin: 'Pusat',
            targetInstansi: 'Admin Utama',
            role: 'Admin',
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
      subscription = data?.subscription;
    } catch (err) {
      console.error('Auth state change listener installation error:', err);
    }

    return () => {
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (err) {
          console.error('Error unsubscribing auth listener:', err);
        }
      }
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

  const resilientUpsert = async (tableName: string, payload: any[]) => {
    let cleanPayload = [...payload];
    let { error } = await supabase.from(tableName).upsert(cleanPayload);
    
    if (error) {
      console.warn(`Initial upsert to ${tableName} failed. Starting self-healing:`, error);
      
      let attempt = 0;
      let currentError: any = error;
      
      // If error is 42703 (undefined column), extract column name and strip it!
      while (currentError && currentError.code === '42703' && attempt < 6) {
        attempt++;
        const match = currentError.message.match(/column "([^"]+)"/);
        if (match && match[1]) {
          const missingColumn = match[1];
          console.warn(`[Self-Healing] Column "${missingColumn}" does not exist in ${tableName} table. Stripping it and retrying...`);
          cleanPayload = cleanPayload.map(rec => {
            const copy = { ...rec };
            delete copy[missingColumn];
            return copy;
          });
          const { error: retryErr } = await supabase.from(tableName).upsert(cleanPayload);
          currentError = retryErr;
        } else {
          break;
        }
      }
      
      if (currentError) {
        console.error(`[Self-Healing Failed] Could not save to ${tableName}:`, currentError);
        setDbErrors(prev => ({
          ...prev,
          [tableName]: `${currentError.message || 'Unknown Error'} (Code: ${currentError.code || 'None'})`
        }));
        return false;
      }
    }
    
    // Success (either initially or after healing)
    setDbErrors(prev => {
      const copy = { ...prev };
      delete copy[tableName];
      return copy;
    });
    return true;
  };

  const handleUpdateMentors = async (updatedMentors: Mentor[]) => {
    setMentors(updatedMentors);
    try {
      const deletedIds = mentors.filter(m => !updatedMentors.some(um => um.id === m.id)).map(m => m.id);
      if (deletedIds.length > 0) {
        await supabase.from('mentors').delete().in('id', deletedIds);
      }
      if (updatedMentors.length > 0) {
        const toUpsert = updatedMentors.map(m => ({
          id: m.id,
          name: m.name,
          role: m.role,
          spec: m.spec,
          image: m.image
        }));
        await resilientUpsert('mentors', toUpsert);
      }
    } catch (err) {
      console.error('Error syncing mentors to Supabase:', err);
    }
  };

  const handleUpdateBenefits = async (updatedBenefits: Benefit[]) => {
    setBenefits(updatedBenefits);
    try {
      const deletedIds = benefits.filter(b => !updatedBenefits.some(ub => ub.id === b.id)).map(b => b.id);
      if (deletedIds.length > 0) {
        await supabase.from('benefits').delete().in('id', deletedIds);
      }
      if (updatedBenefits.length > 0) {
        // Try snake_case layout which is default for PG sql script
        const toUpsert = updatedBenefits.map(b => ({
          id: b.id,
          title: b.title,
          description: b.description,
          icon_name: b.iconName
        }));
        await resilientUpsert('benefits', toUpsert);
      }
    } catch (err) {
      console.error('Error syncing benefits to Supabase:', err);
    }
  };

  const handleUpdateFacilities = async (updatedFacilities: Facility[]) => {
    setFacilities(updatedFacilities);
    try {
      const deletedIds = facilities.filter(f => !updatedFacilities.some(uf => uf.id === f.id)).map(f => f.id);
      if (deletedIds.length > 0) {
        await supabase.from('facilities').delete().in('id', deletedIds);
      }
      if (updatedFacilities.length > 0) {
        // Try snake_case layout which is default for PG sql script
        const toUpsert = updatedFacilities.map(f => ({
          id: f.id,
          title: f.title,
          description: f.description,
          image: f.image,
          badge: f.badge,
          rating_text: f.ratingText
        }));
        await resilientUpsert('facilities', toUpsert);
      }
    } catch (err) {
      console.error('Error syncing facilities to Supabase:', err);
    }
  };

  const handleUpdateTestimonials = async (updatedTestimonials: Testimonial[]) => {
    setTestimonials(updatedTestimonials);
    try {
      const deletedIds = testimonials.filter(t => !updatedTestimonials.some(ut => ut.id === t.id)).map(t => t.id);
      if (deletedIds.length > 0) {
        await supabase.from('testimonials').delete().in('id', deletedIds);
      }
      if (updatedTestimonials.length > 0) {
        const toUpsert = updatedTestimonials.map(t => ({
          id: t.id,
          name: t.name,
          role: t.role,
          text: t.text,
          rating: t.rating,
          image: t.image,
          instansi: t.instansi
        }));
        await resilientUpsert('testimonials', toUpsert);
      }
    } catch (err) {
      console.error('Error syncing testimonials to Supabase:', err);
    }
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
          onUpdateBenefits={handleUpdateBenefits}
          facilities={facilities}
          onUpdateFacilities={handleUpdateFacilities}
          onUpdateTestimonials={handleUpdateTestimonials}
          onUpdateCMS={handleUpdateCMS}
          onUpdateUsers={handleUpdateUsers}
          onUpdateMentors={handleUpdateMentors}
          onUpdateMaterials={handleUpdateMaterials}
          onUpdateTryouts={handleUpdateTryouts}
          onLogout={handleLogout}
          dbErrors={dbErrors}
        />
      )}

    </div>
  );
}
