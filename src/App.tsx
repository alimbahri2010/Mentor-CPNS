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
const DEFAULT_USERS: AppUser[] = [];

const isMockUser = (user: AppUser | null): boolean => {
  if (!user) return false;
  return user.id.startsWith('u_') || user.password !== '' || DEFAULT_USERS.some(u => u.id === user.id);
};

export default function App() {
  
  // Navigation State
  const [page, setPage] = useState<string>('landing');
  
  // Session State
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error parsing currentUser from localStorage:', e);
      return null;
    }
  });

  // Analytics Tracking State
  const [analytics, setAnalytics] = useState(() => {
    const defaultAnalytics = {
      visitorsTotal: 1834,
      visitorsUnique: 1205,
      pageViews: 4290,
      visitorsMobile: 862,
      visitorsDesktop: 972,
      visitorsToday: 145,
      visitorsThisWeek: 874,
      visitorsThisMonth: 3120,
      ctaClicksTotal: 342,
      ctaClicksToday: 28,
      ctaClicksThisWeek: 164,
      ctaClicksThisMonth: 298
    };
    try {
      const saved = localStorage.getItem('mentorcpns_analytics_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error parsing analytics state:', e);
    }
    return defaultAnalytics;
  });

  useEffect(() => {
    localStorage.setItem('mentorcpns_analytics_v1', JSON.stringify(analytics));
  }, [analytics]);

  // Track Page view and Unique visitors
  useEffect(() => {
    if (page === 'landing') {
      const hasVisitedThisSession = sessionStorage.getItem('mentorcpns_session_visited');
      const isMobile = window.innerWidth < 768;

      setAnalytics(prev => {
        const next = { ...prev };
        next.pageViews += 1;
        
        if (!hasVisitedThisSession) {
          sessionStorage.setItem('mentorcpns_session_visited', 'true');
          next.visitorsTotal += 1;
          next.visitorsToday += 1;
          next.visitorsThisWeek += 1;
          next.visitorsThisMonth += 1;
          
          if (isMobile) {
            next.visitorsMobile += 1;
          } else {
            next.visitorsDesktop += 1;
          }
        }

        const hasVisitedEver = localStorage.getItem('mentorcpns_ever_visited');
        if (!hasVisitedEver) {
          localStorage.setItem('mentorcpns_ever_visited', 'true');
          next.visitorsUnique += 1;
        }

        return next;
      });
    }
  }, [page]);

  // Track CTA Click
  const handleTrackCTA = () => {
    setAnalytics(prev => {
      const next = { ...prev };
      next.ctaClicksTotal += 1;
      next.ctaClicksToday += 1;
      next.ctaClicksThisWeek += 1;
      next.ctaClicksThisMonth += 1;
      return next;
    });
  };

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hasDaftarText = target.innerText?.toLowerCase().includes('daftar sekarang') || 
                            target.closest('a')?.innerText?.toLowerCase().includes('daftar sekarang') ||
                            target.closest('button')?.innerText?.toLowerCase().includes('daftar sekarang') ||
                            target.closest('a')?.href?.includes('wa.me') ||
                            target.closest('a')?.id?.includes('cta');
      
      if (hasDaftarText) {
        handleTrackCTA();
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Core App states synchronizing from localStorage (or falling back to initial mock lists)
  const [users, setUsers] = useState<AppUser[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error parsing users state:', e);
    }
    return DEFAULT_USERS;
  });

  const [mentors, setMentors] = useState<Mentor[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_mentors');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error parsing mentors state:', e);
    }
    return INITIAL_MENTORS;
  });

  const [materials, setMaterials] = useState<LearningMaterial[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_materials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error parsing materials state:', e);
    }
    return INITIAL_MATERIALS;
  });

  const [tryouts, setTryouts] = useState<Tryout[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_tryouts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error parsing tryouts state:', e);
    }
    return INITIAL_TRYOUTS;
  });

  const [tryoutResults, setTryoutResults] = useState<TryoutResult[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_tryout_results');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error parsing tryoutResults state:', e);
    }
    return [];
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_announcements');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error parsing announcements state:', e);
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_faqs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
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
      }
    } catch (e) {
      console.error('Error parsing faqs state:', e);
    }
    return INITIAL_FAQS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_testimonials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error parsing testimonials state:', e);
    }
    return INITIAL_TESTIMONIALS;
  });

  const [cms, setCms] = useState<LandingPageCMS>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_cms');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
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
      }
    } catch (e) {
      console.error('Error parsing cms state:', e);
    }
    return INITIAL_CMS_DATA;
  });

  const [benefits, setBenefits] = useState<Benefit[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_benefits');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error parsing benefits state:', e);
    }
    return INITIAL_BENEFITS;
  });

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    try {
      const saved = localStorage.getItem('mentorcpns_facilities');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error parsing facilities state:', e);
    }
    return INITIAL_FACILITIES;
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
    if (currentUser) {
      localStorage.setItem('mentorcpns_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('mentorcpns_current_user');
    }
  }, [currentUser]);

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
          // If no Supabase session, check if we have a saved mock user in localStorage
          const savedUserStr = localStorage.getItem('mentorcpns_current_user');
          if (savedUserStr) {
            try {
              const savedUser = JSON.parse(savedUserStr);
              if (savedUser && isMockUser(savedUser)) {
                // Keep the mock user logged in!
                setCurrentUser(savedUser);
                return;
              }
            } catch (e) {
              console.error('Error parsing saved mock user:', e);
            }
          }
          
          setCurrentUser(null);
          setPage(current => {
            if (current === 'user-dashboard' || current === 'admin-dashboard') {
              return 'landing';
            }
            return current;
          });
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
          // If no Supabase session, check if we have a saved mock user in localStorage
          const savedUserStr = localStorage.getItem('mentorcpns_current_user');
          if (savedUserStr) {
            try {
              const savedUser = JSON.parse(savedUserStr);
              if (savedUser && isMockUser(savedUser)) {
                // Keep the mock user logged in!
                setCurrentUser(savedUser);
                return;
              }
            } catch (e) {
              console.error('Error parsing saved mock user in onAuthStateChange:', e);
            }
          }
          
          setCurrentUser(null);
          setPage(current => {
            if (current === 'user-dashboard' || current === 'admin-dashboard') {
              return 'landing';
            }
            return current;
          });
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
  }, []);

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
          onNavigate={handleNavigation}
          dbErrors={dbErrors}
          analytics={analytics}
          onUpdateAnalytics={setAnalytics}
        />
      )}

    </div>
  );
}
