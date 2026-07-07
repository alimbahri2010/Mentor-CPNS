import React, { useState, useEffect } from 'react';
import { 
  Users, 
  User,
  CreditCard, 
  BookOpen, 
  HelpCircle, 
  Settings, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  TrendingUp, 
  DollarSign, 
  BarChart2, 
  Flame, 
  Edit3, 
  FileText, 
  LogOut,
  MapPin,
  Bell,
  Search,
  RefreshCw,
  LayoutDashboard,
  Menu,
  Award,
  Star,
  Sparkles,
  Upload,
  Smartphone,
  Laptop,
  Globe,
  Eye,
  Zap,
  UserCheck,
  Calendar,
  Activity,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { AppUser, Mentor, FAQItem, Testimonial, LearningMaterial, Tryout, LandingPageCMS, TryoutQuestion, Benefit, Facility } from '../types';

interface AdminDashboardProps {
  currentUser: AppUser;
  users: AppUser[];
  mentors: Mentor[];
  faqs: FAQItem[];
  testimonials: Testimonial[];
  materials: LearningMaterial[];
  tryouts: Tryout[];
  cms: LandingPageCMS;
  benefits: Benefit[];
  onUpdateBenefits: (updatedBenefits: Benefit[]) => void;
  facilities: Facility[];
  onUpdateFacilities: (updatedFacilities: Facility[]) => void;
  onUpdateTestimonials: (updatedTestimonials: Testimonial[]) => void;
  onUpdateCMS: (updatedCMS: LandingPageCMS) => void;
  onUpdateUsers: (updatedUsers: AppUser[]) => void;
  onUpdateMentors: (updatedMentors: Mentor[]) => void;
  onUpdateMaterials: (updatedMaterials: LearningMaterial[]) => void;
  onUpdateTryouts: (updatedTryouts: Tryout[]) => void;
  onLogout: () => void;
  onNavigate?: (page: string) => void;
  dbErrors?: { [table: string]: string };
  analytics?: any;
  onUpdateAnalytics?: (updated: any) => void;
}

export default function AdminDashboard({
  currentUser,
  users,
  mentors,
  faqs,
  testimonials,
  materials,
  tryouts,
  cms,
  benefits,
  onUpdateBenefits,
  facilities,
  onUpdateFacilities,
  onUpdateTestimonials,
  onUpdateCMS,
  onUpdateUsers,
  onUpdateMentors,
  onUpdateMaterials,
  onUpdateTryouts,
  onLogout,
  onNavigate,
  dbErrors = {},
  analytics = {
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
  },
  onUpdateAnalytics
}: AdminDashboardProps) {

  // Current role for dashboard view filtering
  const [currentRole, setCurrentRole] = useState<'Admin' | 'Finance' | 'Mentor'>(
    (currentUser.role as any) === 'Super Admin' || (currentUser.role as any) === 'Marketing' ? 'Admin' : (currentUser.role as any) || 'Admin'
  );

  const [activeTab, setActiveTab] = useState<'analytics' | 'registrations' | 'mentors' | 'materials' | 'tryouts' | 'cms' | 'settings' | 'benefits' | 'facilities' | 'reviews'>('analytics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // CRUD Benefit states
  const [newBenefitTitle, setNewBenefitTitle] = useState('');
  const [newBenefitDesc, setNewBenefitDesc] = useState('');
  const [newBenefitIcon, setNewBenefitIcon] = useState('Clock');
  const [editingBenefitId, setEditingBenefitId] = useState<string | null>(null);

  // CRUD Facility states
  const [newFacilityTitle, setNewFacilityTitle] = useState('');
  const [newFacilityDesc, setNewFacilityDesc] = useState('');
  const [newFacilityImage, setNewFacilityImage] = useState('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80');
  const [newFacilityBadge, setNewFacilityBadge] = useState('Premium');
  const [newFacilityRating, setNewFacilityRating] = useState('Hotel Bintang 3');
  const [editingFacilityId, setEditingFacilityId] = useState<string | null>(null);

  // CRUD Review/Testimonial states
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRole, setNewReviewRole] = useState('Alumni Karantina 2026');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewImage, setNewReviewImage] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80');
  const [newReviewInstansi, setNewReviewInstansi] = useState('Kemenkumham (Penjaga Tahanan)');
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  
  // CRUD Mentor states
  const [newMentorName, setNewMentorName] = useState('');
  const [newMentorRole, setNewMentorRole] = useState('');
  const [newMentorSpec, setNewMentorSpec] = useState('');
  const [newMentorImage, setNewMentorImage] = useState('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80');
  const [editingMentorId, setEditingMentorId] = useState<string | null>(null);

  // CRUD Material states
  const [newMatTitle, setNewMatTitle] = useState('');
  const [newMatCategory, setNewMatCategory] = useState<'TWK' | 'TIU' | 'TKP'>('TWK');
  const [newMatType, setNewMatType] = useState<'pdf' | 'video' | 'zoom'>('pdf');
  const [newMatUrl, setNewMatUrl] = useState('');
  const [newMatDuration, setNewMatDuration] = useState('');
  const [newMatDesc, setNewMatDesc] = useState('');
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);

  // CRUD Tryout states
  const [newToTitle, setNewToTitle] = useState('');
  const [newToCategory, setNewToCategory] = useState<'TWK' | 'TIU' | 'TKP'>('TWK');
  const [newToDuration, setNewToDuration] = useState(15);
  const [editingTryoutId, setEditingTryoutId] = useState<string | null>(null);

  // Dynamic CMS Editing states
  const [cmsHeroTitle, setCmsHeroTitle] = useState(cms.heroTitle);
  const [cmsHeroSubtitle, setCmsHeroSubtitle] = useState(cms.heroSubtitle);
  const [cmsPriceOriginal, setCmsPriceOriginal] = useState(cms.priceOriginal);
  const [cmsPriceNow, setCmsPriceNow] = useState(cms.priceNow);
  const [cmsQuotaTotal, setCmsQuotaTotal] = useState(cms.quotaTotal);
  const [cmsQuotaFilled, setCmsQuotaFilled] = useState(cms.quotaFilled);
  const [cmsPromoText, setCmsPromoText] = useState(cms.promoText);
  const [cmsSuccess, setCmsSuccess] = useState('');

  // Count calculations
  const totalRegistrants = users.filter(u => u.role === 'Peserta').length;
  const approvedUsers = users.filter(u => u.role === 'Peserta' && u.status === 'Approved');
  const totalApproved = approvedUsers.length;
  const totalRevenue = totalApproved * cms.priceNow;
  const pendingPayments = users.filter(u => u.role === 'Peserta' && u.status === 'Pending').length;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
  };

  // Approve a user's payment proof
  const handleApprovePayment = (userId: string) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        return { ...u, status: 'Approved' as const };
      }
      return u;
    });
    onUpdateUsers(updated);
    
    // Auto update CMS quotaFilled to sync with approved users!
    const updatedApprovedCount = updated.filter(u => u.role === 'Peserta' && u.status === 'Approved').length;
    onUpdateCMS({
      ...cms,
      quotaFilled: Math.min(cms.quotaTotal, 20 + updatedApprovedCount) // Simulated offset starting at 20
    });
  };

  // Reject payment proof
  const handleRejectPayment = (userId: string) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        return { ...u, status: 'Waiting Payment' as const, paymentProof: undefined };
      }
      return u;
    });
    onUpdateUsers(updated);
  };

  // Delete a registrant user
  const handleDeleteUser = (userId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus peserta ini secara permanen dari sistem?')) {
      const updated = users.filter(u => u.id !== userId);
      onUpdateUsers(updated);
    }
  };

  // Add / Edit Mentor
  const handleAddMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMentorName || !newMentorRole || !newMentorSpec) return;

    if (editingMentorId) {
      const updated = mentors.map(m => {
        if (m.id === editingMentorId) {
          return {
            ...m,
            name: newMentorName,
            role: newMentorRole,
            spec: newMentorSpec,
            image: newMentorImage
          };
        }
        return m;
      });
      onUpdateMentors(updated);
      setEditingMentorId(null);
    } else {
      const newMentor: Mentor = {
        id: 'm_' + Date.now(),
        name: newMentorName,
        role: newMentorRole,
        spec: newMentorSpec,
        image: newMentorImage
      };
      onUpdateMentors([newMentor, ...mentors]);
    }

    setNewMentorName('');
    setNewMentorRole('');
    setNewMentorSpec('');
    setNewMentorImage('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80');
  };

  const handleStartEditMentor = (mentor: Mentor) => {
    setEditingMentorId(mentor.id);
    setNewMentorName(mentor.name);
    setNewMentorRole(mentor.role);
    setNewMentorSpec(mentor.spec);
    setNewMentorImage(mentor.image);
  };

  const handleCancelEditMentor = () => {
    setEditingMentorId(null);
    setNewMentorName('');
    setNewMentorRole('');
    setNewMentorSpec('');
    setNewMentorImage('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80');
  };

  // Delete Mentor
  const handleDeleteMentor = (id: string) => {
    if (confirm('Hapus mentor ini?')) {
      onUpdateMentors(mentors.filter(m => m.id !== id));
      if (editingMentorId === id) {
        handleCancelEditMentor();
      }
    }
  };

  // Add / Edit Learning Material
  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatTitle || !newMatUrl) return;

    if (editingMaterialId) {
      const updated = materials.map(m => {
        if (m.id === editingMaterialId) {
          return {
            ...m,
            title: newMatTitle,
            category: newMatCategory,
            type: newMatType,
            url: newMatUrl,
            duration: newMatDuration || undefined,
            description: newMatDesc || undefined
          };
        }
        return m;
      });
      onUpdateMaterials(updated);
      setEditingMaterialId(null);
    } else {
      const newMat: LearningMaterial = {
        id: 'mat_' + Date.now(),
        title: newMatTitle,
        category: newMatCategory,
        type: newMatType,
        url: newMatUrl,
        duration: newMatDuration || undefined,
        description: newMatDesc || undefined
      };
      onUpdateMaterials([newMat, ...materials]);
    }

    setNewMatTitle('');
    setNewMatUrl('');
    setNewMatDuration('');
    setNewMatDesc('');
  };

  const handleStartEditMaterial = (mat: LearningMaterial) => {
    setEditingMaterialId(mat.id);
    setNewMatTitle(mat.title);
    setNewMatCategory(mat.category);
    setNewMatType(mat.type);
    setNewMatUrl(mat.url);
    setNewMatDuration(mat.duration || '');
    setNewMatDesc(mat.description || '');
  };

  const handleCancelEditMaterial = () => {
    setEditingMaterialId(null);
    setNewMatTitle('');
    setNewMatUrl('');
    setNewMatDuration('');
    setNewMatDesc('');
  };

  // Delete Learning Material
  const handleDeleteMaterial = (id: string) => {
    if (confirm('Hapus bahan belajar ini?')) {
      onUpdateMaterials(materials.filter(m => m.id !== id));
      if (editingMaterialId === id) {
        handleCancelEditMaterial();
      }
    }
  };

  // Add / Edit Tryout Exam
  const handleAddTryout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToTitle) return;

    if (editingTryoutId) {
      const updated = tryouts.map(t => {
        if (t.id === editingTryoutId) {
          return {
            ...t,
            title: newToTitle,
            category: newToCategory,
            duration: newToDuration
          };
        }
        return t;
      });
      onUpdateTryouts(updated);
      setEditingTryoutId(null);
    } else {
      // We'll create a Tryout with empty questions, ready to be edited or filled
      const newTo: Tryout = {
        id: 'to_' + Date.now(),
        title: newToTitle,
        category: newToCategory,
        duration: newToDuration,
        questions: [
          {
            id: 'q_' + Date.now() + '_1',
            question: 'Pertanyaan pertama dari tryout baru. Isi soal di sini.',
            options: ['Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D', 'Pilihan E'],
            correctAnswer: 0,
            explanation: 'Pembahasan materi dasar.'
          }
        ]
      };
      onUpdateTryouts([newTo, ...tryouts]);
    }

    setNewToTitle('');
    setNewToDuration(15);
  };

  const handleStartEditTryout = (to: Tryout) => {
    setEditingTryoutId(to.id);
    setNewToTitle(to.title);
    setNewToCategory(to.category);
    setNewToDuration(to.duration);
  };

  const handleCancelEditTryout = () => {
    setEditingTryoutId(null);
    setNewToTitle('');
    setNewToDuration(15);
  };

  // Delete Tryout Exam
  const handleDeleteTryout = (id: string) => {
    if (confirm('Hapus tryout ini beserta seluruh soalnya?')) {
      onUpdateTryouts(tryouts.filter(t => t.id !== id));
      if (editingTryoutId === id) {
        handleCancelEditTryout();
      }
    }
  };

  // Save Landing Page CMS edits
  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    setCmsSuccess('');

    onUpdateCMS({
      ...cms,
      heroTitle: cmsHeroTitle,
      heroSubtitle: cmsHeroSubtitle,
      priceOriginal: Number(cmsPriceOriginal),
      priceNow: Number(cmsPriceNow),
      quotaTotal: Number(cmsQuotaTotal),
      quotaFilled: Number(cmsQuotaFilled),
      promoText: cmsPromoText
    });

    setCmsSuccess('Semua perubahan konten CMS berhasil disimpan hulu dan langsung tampil di landing page!');
    setTimeout(() => setCmsSuccess(''), 3000);
  };

  // Add / Edit Benefit
  const handleAddBenefit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBenefitTitle || !newBenefitDesc) return;

    if (editingBenefitId) {
      const updated = benefits.map(b => {
        if (b.id === editingBenefitId) {
          return {
            ...b,
            title: newBenefitTitle,
            description: newBenefitDesc,
            iconName: newBenefitIcon
          };
        }
        return b;
      });
      onUpdateBenefits(updated);
      setEditingBenefitId(null);
    } else {
      const newBenefit: Benefit = {
        id: 'b_' + Date.now(),
        title: newBenefitTitle,
        description: newBenefitDesc,
        iconName: newBenefitIcon
      };
      onUpdateBenefits([newBenefit, ...benefits]);
    }

    setNewBenefitTitle('');
    setNewBenefitDesc('');
    setNewBenefitIcon('Clock');
  };

  const handleStartEditBenefit = (b: Benefit) => {
    setEditingBenefitId(b.id);
    setNewBenefitTitle(b.title);
    setNewBenefitDesc(b.description);
    setNewBenefitIcon(b.iconName);
  };

  const handleCancelEditBenefit = () => {
    setEditingBenefitId(null);
    setNewBenefitTitle('');
    setNewBenefitDesc('');
    setNewBenefitIcon('Clock');
  };

  // Delete Benefit
  const handleDeleteBenefit = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus benefit ini?')) {
      onUpdateBenefits(benefits.filter(b => b.id !== id));
      if (editingBenefitId === id) {
        handleCancelEditBenefit();
      }
    }
  };

  // Add / Edit Facility
  const handleAddFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacilityTitle || !newFacilityDesc || !newFacilityImage) return;

    if (editingFacilityId) {
      const updated = facilities.map(f => {
        if (f.id === editingFacilityId) {
          return {
            ...f,
            title: newFacilityTitle,
            description: newFacilityDesc,
            image: newFacilityImage,
            badge: newFacilityBadge || undefined,
            ratingText: newFacilityRating || undefined
          };
        }
        return f;
      });
      onUpdateFacilities(updated);
      setEditingFacilityId(null);
    } else {
      const newFacility: Facility = {
        id: 'f_' + Date.now(),
        title: newFacilityTitle,
        description: newFacilityDesc,
        image: newFacilityImage,
        badge: newFacilityBadge || undefined,
        ratingText: newFacilityRating || undefined
      };
      onUpdateFacilities([newFacility, ...facilities]);
    }

    setNewFacilityTitle('');
    setNewFacilityDesc('');
    setNewFacilityBadge('Premium');
    setNewFacilityRating('Hotel Bintang 3');
    setNewFacilityImage('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80');
  };

  const handleStartEditFacility = (facility: Facility) => {
    setEditingFacilityId(facility.id);
    setNewFacilityTitle(facility.title);
    setNewFacilityDesc(facility.description);
    setNewFacilityImage(facility.image);
    setNewFacilityBadge(facility.badge || '');
    setNewFacilityRating(facility.ratingText || '');
  };

  const handleCancelEditFacility = () => {
    setEditingFacilityId(null);
    setNewFacilityTitle('');
    setNewFacilityDesc('');
    setNewFacilityBadge('Premium');
    setNewFacilityRating('Hotel Bintang 3');
    setNewFacilityImage('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80');
  };

  // Delete Facility
  const handleDeleteFacility = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus fasilitas ini?')) {
      onUpdateFacilities(facilities.filter(f => f.id !== id));
      if (editingFacilityId === id) {
        handleCancelEditFacility();
      }
    }
  };

  // Add / Edit Review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewText) return;

    if (editingReviewId) {
      const updated = testimonials.map(t => {
        if (t.id === editingReviewId) {
          return {
            ...t,
            name: newReviewName,
            role: newReviewRole,
            text: newReviewText,
            rating: Number(newReviewRating),
            image: newReviewImage,
            instansi: newReviewInstansi
          };
        }
        return t;
      });
      onUpdateTestimonials(updated);
      setEditingReviewId(null);
    } else {
      const newReview: Testimonial = {
        id: 't_' + Date.now(),
        name: newReviewName,
        role: newReviewRole,
        text: newReviewText,
        rating: Number(newReviewRating),
        image: newReviewImage,
        instansi: newReviewInstansi
      };
      onUpdateTestimonials([newReview, ...testimonials]);
    }

    setNewReviewName('');
    setNewReviewText('');
    setNewReviewInstansi('Kemenkumham (Penjaga Tahanan)');
    setNewReviewRole('Alumni Karantina 2026');
    setNewReviewRating(5);
    setNewReviewImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80');
  };

  const handleStartEditReview = (testimonial: Testimonial) => {
    setEditingReviewId(testimonial.id);
    setNewReviewName(testimonial.name);
    setNewReviewText(testimonial.text);
    setNewReviewInstansi(testimonial.instansi);
    setNewReviewRole(testimonial.role || 'Alumni Karantina 2026');
    setNewReviewRating(testimonial.rating);
    setNewReviewImage(testimonial.image);
  };

  const handleCancelEditReview = () => {
    setEditingReviewId(null);
    setNewReviewName('');
    setNewReviewText('');
    setNewReviewInstansi('Kemenkumham (Penjaga Tahanan)');
    setNewReviewRole('Alumni Karantina 2026');
    setNewReviewRating(5);
    setNewReviewImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80');
  };

  // Delete Review
  const handleDeleteReview = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) {
      onUpdateTestimonials(testimonials.filter(t => t.id !== id));
      if (editingReviewId === id) {
        handleCancelEditReview();
      }
    }
  };

  // Filtered list of registered students
  const filteredStudents = users.filter(u => 
    u.role === 'Peserta' && 
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.origin.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div id="admin-dashboard" className="min-h-screen bg-light-bg flex flex-col font-sans">
      
      {/* Admin Top Navbar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-35 shadow-xs">
        
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl md:hidden shrink-0"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center text-white font-extrabold italic shadow-xs shrink-0">
            M
          </div>
          <div>
            <span className="font-extrabold text-xs sm:text-sm text-secondary block leading-none">MENTOR CPNS ADMIN</span>
            <span className="text-[10px] text-[#06257E] font-bold tracking-widest block uppercase mt-0.5">Control Center</span>
          </div>
        </div>

        {/* Role Switcher Selector for live testing */}
        <div className="flex items-center gap-4">

          <div className="flex items-center gap-3">
            {onNavigate && (
              <button 
                id="admin-view-website-btn"
                onClick={() => onNavigate('landing')}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <span className="hidden sm:inline">Lihat Landing Page</span>
              </button>
            )}
            <button 
              id="admin-logout-btn"
              onClick={onLogout}
              className="bg-secondary hover:bg-secondary/90 hover:shadow-secondary/30 text-white font-bold text-xs px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Keluar Admin</span>
            </button>
          </div>
        </div>

      </header>

      <div className="flex flex-1 relative">
        
        {/* Backdrop for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 top-16 bg-black/50 backdrop-blur-xs z-15"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar for Admin */}
        <aside className={`bg-primary text-blue-100 ${isSidebarMinimized ? 'w-64 md:w-20 p-5 md:p-3' : 'w-64 p-5'} space-y-6 flex flex-col justify-between h-[calc(100vh-64px)] fixed md:sticky top-16 z-20 transition-all duration-300 overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className={`flex items-center ${isSidebarMinimized ? 'md:justify-center justify-between' : 'justify-between'} px-1`}>
                <span className={`text-[10px] text-blue-200/60 uppercase tracking-widest font-black ${isSidebarMinimized ? 'md:hidden' : 'block'} block px-2 truncate`}>Divisi Akses: {currentRole}</span>
                {/* Minimize Button */}
                <button
                  id="sidebar-minimize-toggle"
                  onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
                  className="hidden md:flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white transition-all duration-200 cursor-pointer shrink-0"
                  title={isSidebarMinimized ? "Expand Sidebar" : "Minimize Sidebar"}
                >
                  {isSidebarMinimized ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                </button>
              </div>
              <hr className="border-white/10 my-2 hidden md:block" />
              
              <nav className="space-y-1">
                {/* Analytics available to Admin */}
                {(currentRole === 'Admin') && (
                  <button 
                    id="admin-tab-analytics"
                    onClick={() => selectTab('analytics')}
                    className={`w-full flex items-center ${isSidebarMinimized ? 'md:justify-center justify-start' : 'justify-start'} gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'analytics' ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-blue-100/70 hover:bg-white/10 hover:text-white'}`}
                    title="Statistik Platform"
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span className={isSidebarMinimized ? 'md:hidden' : ''}>Statistik Platform</span>
                  </button>
                )}

                {/* Mentors available to Admin */}
                {(currentRole === 'Admin') && (
                  <button 
                    id="admin-tab-mentors"
                    onClick={() => selectTab('mentors')}
                    className={`w-full flex items-center ${isSidebarMinimized ? 'md:justify-center justify-start' : 'justify-start'} gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'mentors' ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-blue-100/70 hover:bg-white/10 hover:text-white'}`}
                    title="Kelola Pengajar (Mentors)"
                  >
                    <Users className="w-4 h-4 shrink-0" />
                    <span className={isSidebarMinimized ? 'md:hidden' : ''}>Kelola Pengajar (Mentors)</span>
                  </button>
                )}

                {/* Benefits available to Admin */}
                {(currentRole === 'Admin') && (
                  <button 
                    id="admin-tab-benefits"
                    onClick={() => selectTab('benefits')}
                    className={`w-full flex items-center ${isSidebarMinimized ? 'md:justify-center justify-start' : 'justify-start'} gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'benefits' ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-blue-100/70 hover:bg-white/10 hover:text-white'}`}
                    title="Kelola Benefit"
                  >
                    <Award className="w-4 h-4 shrink-0" />
                    <span className={isSidebarMinimized ? 'md:hidden' : ''}>Kelola Benefit</span>
                  </button>
                )}

                {/* Facilities available to Admin */}
                {(currentRole === 'Admin') && (
                  <button 
                    id="admin-tab-facilities"
                    onClick={() => selectTab('facilities')}
                    className={`w-full flex items-center ${isSidebarMinimized ? 'md:justify-center justify-start' : 'justify-start'} gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'facilities' ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-blue-100/70 hover:bg-white/10 hover:text-white'}`}
                    title="Kelola Fasilitas"
                  >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span className={isSidebarMinimized ? 'md:hidden' : ''}>Kelola Fasilitas</span>
                  </button>
                )}

                {/* Reviews/Testimonials available to Admin */}
                {(currentRole === 'Admin') && (
                  <button 
                    id="admin-tab-reviews"
                    onClick={() => selectTab('reviews')}
                    className={`w-full flex items-center ${isSidebarMinimized ? 'md:justify-center justify-start' : 'justify-start'} gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'reviews' ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-blue-100/70 hover:bg-white/10 hover:text-white'}`}
                    title="Kelola Review"
                  >
                    <Star className="w-4 h-4 shrink-0" />
                    <span className={isSidebarMinimized ? 'md:hidden' : ''}>Kelola Review</span>
                  </button>
                )}

                {/* CMS available to Admin */}
                {(currentRole === 'Admin') && (
                  <button 
                    id="admin-tab-cms"
                    onClick={() => selectTab('cms')}
                    className={`w-full flex items-center ${isSidebarMinimized ? 'md:justify-center justify-start' : 'justify-start'} gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'cms' ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-blue-100/70 hover:bg-white/10 hover:text-white'}`}
                    title="Landing Page CMS"
                  >
                    <Settings className="w-4 h-4 shrink-0" />
                    <span className={isSidebarMinimized ? 'md:hidden' : ''}>Landing Page CMS</span>
                  </button>
                )}
              </nav>
            </div>
          </div>

          <div className={`bg-white/10 p-4 rounded-2xl text-xs border border-white/10 space-y-1 text-center transition-all ${isSidebarMinimized ? 'md:p-1.5 md:mx-auto md:w-12' : 'md:p-4'}`}>
            <span className={`text-blue-200/80 font-semibold ${isSidebarMinimized ? 'md:hidden' : 'block'} block`}>Logged in as:</span>
            <strong className={`text-white truncate ${isSidebarMinimized ? 'md:hidden' : 'block'} block`}>{currentUser.name}</strong>
            <div className={`${isSidebarMinimized ? 'md:flex' : 'md:hidden'} hidden w-7 h-7 rounded-full bg-secondary text-white items-center justify-center font-black mx-auto text-xs`} title={`Logged in as: ${currentUser.name}`}>
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </aside>

        {/* Admin Dashboard Active Panel */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto w-full max-w-7xl mx-auto">
          
          {Object.keys(dbErrors).length > 0 && (
            <div id="supabase-error-banner" className="bg-amber-50 border border-amber-200 rounded-3xl p-5 sm:p-6 mb-8 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-extrabold text-gray-900 text-sm">⚠️ Terdeteksi Masalah Sinkronisasi Database Supabase</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Hanya data <strong>testimonials</strong> yang tersimpan di Supabase. Tabel berikut belum siap menerima sinkronisasi data dari aplikasi karena skema kolom belum cocok atau terbentur kebijakan akses RLS (Row Level Security): 
                    <span className="inline-block bg-white border border-amber-200 rounded px-1.5 py-0.5 ml-1 font-mono text-[10px] text-amber-800 font-bold">
                      {Object.keys(dbErrors).join(', ')}
                    </span>.
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl p-4 text-xs text-gray-300 font-mono space-y-2 overflow-x-auto border border-gray-800">
                <span className="text-green-400 block font-bold"># Solusi Cepat: Salin & Jalankan SQL ini di menu SQL Editor Supabase Anda:</span>
                <pre className="text-[11px] leading-relaxed max-h-48 overflow-y-auto select-all cursor-pointer bg-black/30 p-3 rounded-xl border border-gray-800 text-gray-100 font-mono">
{`-- 1. Matikan RLS agar client-side bisa melakukan insert/upsert/delete langsung
ALTER TABLE IF EXISTS mentors DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS benefits DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS facilities DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS testimonials DISABLE ROW LEVEL SECURITY;

-- 2. Pastikan skema kolom tabel sinkron sempurna dengan aplikasi
CREATE TABLE IF NOT EXISTS mentors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  spec TEXT,
  image TEXT
);

CREATE TABLE IF NOT EXISTS benefits (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT
);

CREATE TABLE IF NOT EXISTS facilities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  badge TEXT,
  rating_text TEXT
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  text TEXT,
  rating NUMERIC,
  image TEXT,
  instansi TEXT
);`}
                </pre>
                <div className="text-[10px] text-gray-400 mt-2">
                  💡 <strong>Cara perbaikan:</strong> Masuk ke panel/console <strong>Supabase</strong> Anda &gt; pilih menu <strong>SQL Editor</strong> di sebelah kiri &gt; klik <strong>New Query</strong> &gt; tempel (paste) kode SQL di atas &gt; klik tombol <strong>Run</strong> di kanan bawah!
                </div>
              </div>
            </div>
          )}
          
          {/* TAB 1: ANALYTICS OVERVIEW */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Header Title */}
              <div className="bg-gradient-to-r from-primary to-[#1e3a8a] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
                <div className="relative z-10">
                  <span className="bg-primary/25 border border-primary/40 text-secondary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                    Landing Page Statistics
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
                    Landing Page Analytics Dashboard
                  </h2>
                  <p className="text-xs text-gray-300 mt-1.5 max-w-xl">
                    Pantau aktivitas pengunjung landing page Mentor CPNS Karantina 2026 secara langsung. Data statistik diperbarui secara berkala berdasarkan interaksi riil peserta.
                  </p>
                </div>
              </div>

              {/* KPI CARDS: WEBSITE VISITORS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                  <h3 className="font-extrabold text-gray-900 text-sm tracking-wider uppercase">Pelacakan Pengunjung Platform (Real-time)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  
                  {/* Card 1: Total Website Visitors */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-primary/20 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">TOTAL VISITORS</span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <strong className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight transition-all duration-300">
                        {analytics.visitorsTotal.toLocaleString('id-ID')}
                      </strong>
                      <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" /> +14.2%
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Akumulasi seluruh session ID pendaftar</p>
                  </div>

                  {/* Card 3: Total Page Views */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-emerald-100 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                        <Eye className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">TOTAL PAGE VIEWS</span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <strong className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                        {analytics.pageViews.toLocaleString('id-ID')}
                      </strong>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        Ratio {(analytics.pageViews / Math.max(1, analytics.visitorsTotal)).toFixed(1)}x
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Klik navigasi & render ulang halaman</p>
                  </div>

                  {/* Card 4: Visitors Today */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-amber-100 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                        <Globe className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">VISITORS TODAY</span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <strong className="text-2xl sm:text-3xl font-black text-amber-600 tracking-tight">
                        {analytics.visitorsToday.toLocaleString('id-ID')}
                      </strong>
                      <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 animate-pulse">
                        ● Live Now
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Statistik kunjungan hari ini</p>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                  {/* Card 7: Visitors This Week */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-cyan-100 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-50 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600 shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">VISITORS THIS WEEK</span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <strong className="text-2xl sm:text-3xl font-black text-cyan-600 tracking-tight">
                        {analytics.visitorsThisWeek.toLocaleString('id-ID')}
                      </strong>
                      <span className="text-[10px] text-cyan-600 font-bold bg-cyan-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        Target Pas
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Siklus belajar 7 hari terakhir</p>
                  </div>

                  {/* Card 8: Visitors This Month */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-purple-100 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">VISITORS THIS MONTH</span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <strong className="text-2xl sm:text-3xl font-black text-purple-600 tracking-tight">
                        {analytics.visitorsThisMonth.toLocaleString('id-ID')}
                      </strong>
                      <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        Target Oke
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Akumulasi performa bulan berjalan</p>
                  </div>

                </div>
              </div>

              {/* CTA TRACKING: WHATSAPP CLICKS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
                  <h3 className="font-extrabold text-gray-900 text-sm tracking-wider uppercase">Konversi Klik Tombol WhatsApp (Daftar Sekarang)</h3>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  
                  {/* Card 1: Total Clicks */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-red-100 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">TOTAL CTA CLICKS</span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <strong className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight">
                        {analytics.ctaClicksTotal.toLocaleString('id-ID')}
                      </strong>
                      <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded-md">
                        Klik Total
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Klik link wa.me pendaftaran utama</p>
                  </div>

                  {/* Card 2: Today's Clicks */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-amber-100 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                        <Activity className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">TODAY'S CLICKS</span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <strong className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        {analytics.ctaClicksToday.toLocaleString('id-ID')}
                      </strong>
                      <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-md animate-pulse">
                        Hari Ini
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Calon siswa konsul WA hari ini</p>
                  </div>

                  {/* Card 3: Weekly Clicks */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-indigo-100 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">WEEKLY CLICKS</span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <strong className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        {analytics.ctaClicksThisWeek.toLocaleString('id-ID')}
                      </strong>
                      <span className="text-[10px] text-indigo-600 font-bold">
                        Bagus
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Total klik 7 hari terakhir</p>
                  </div>

                  {/* Card 4: Monthly Clicks */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-orange-100 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">MONTHLY CLICKS</span>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <strong className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        {analytics.ctaClicksThisMonth.toLocaleString('id-ID')}
                      </strong>
                      <span className="text-[10px] text-orange-600 font-bold">
                        Stabil
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Total klik sebulan berjalan</p>
                  </div>

                </div>
              </div>

              {/* SAAS CONVERSION PERFORMANCE PANEL */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Gauge Column */}
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-xs tracking-wider uppercase mb-1">WhatsApp Conversion Rate (CR)</h4>
                    <p className="text-[10px] text-gray-400">Efektivitas klik tombol Daftar dibandingkan total Unique Visitor</p>
                  </div>

                  {/* Circle Graphics */}
                  <div className="my-6 flex flex-col items-center justify-center relative">
                    {/* Ring calculation */}
                    {(() => {
                      const cr = ((analytics.ctaClicksTotal / Math.max(1, analytics.visitorsUnique)) * 100);
                      const crStr = cr.toFixed(1);
                      return (
                        <>
                          <div className="relative w-36 h-36 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="transparent" />
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="40" 
                                stroke="#CE0F0F" 
                                strokeWidth="8" 
                                fill="transparent" 
                                strokeDasharray="251.2" 
                                strokeDashoffset={251.2 - (251.2 * Math.min(100, cr)) / 100}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute text-center">
                              <span className="text-3xl font-black text-gray-900 block">{crStr}%</span>
                              <span className="text-[9px] text-gray-400 font-extrabold uppercase tracking-widest mt-0.5">CONVERSION</span>
                            </div>
                          </div>
                          <div className="mt-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              cr >= 25 ? 'bg-green-100 text-green-700' : cr >= 15 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {cr >= 25 ? 'Outstanding Performance 🔥' : cr >= 15 ? 'Healthy Conversion 👍' : 'Needs Optimization ⚠️'}
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-400">Unik Pengunjung:</span>
                      <strong className="text-gray-800 font-bold">{analytics.visitorsUnique}</strong>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-400">WhatsApp Clicks:</span>
                      <strong className="text-red-600 font-bold">{analytics.ctaClicksTotal}</strong>
                    </div>
                  </div>
                </div>

                {/* Funnel Progress Column */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-xs tracking-wider uppercase mb-1">Registration Funnel & Insights</h4>
                    <p className="text-[10px] text-gray-400">Tahapan konversi dari melihat landing page hingga siswa melunasi tagihan Karantina</p>
                  </div>

                  <div className="space-y-4 my-4">
                    {/* Step 1: Views */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="font-bold text-gray-700 flex items-center gap-1.5">
                          <span className="w-5 h-5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-md flex items-center justify-center">1</span>
                          Total Page Views (Awareness)
                        </span>
                        <strong className="text-gray-900 font-black">{analytics.pageViews} views</strong>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    {/* Step 2: Clicks */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="font-bold text-gray-700 flex items-center gap-1.5">
                          <span className="w-5 h-5 bg-red-100 text-red-700 text-[10px] font-black rounded-md flex items-center justify-center">2</span>
                          CTA WhatsApp Clicks (Interest)
                        </span>
                        <div className="text-right">
                          <strong className="text-gray-900 font-black">{analytics.ctaClicksTotal} clicks</strong>
                          <span className="text-[10px] text-gray-400 ml-1.5">({((analytics.ctaClicksTotal / Math.max(1, analytics.pageViews)) * 100).toFixed(1)}%)</span>
                        </div>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${(analytics.ctaClicksTotal / Math.max(1, analytics.pageViews) * 100)}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Funnel insights paragraph */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-150 text-[11px] text-gray-600">
                    💡 <strong>Insight Penjualan:</strong> Tingkat penyaluran siswa yang lunas adalah <strong>{((totalApproved / Math.max(1, totalRegistrants)) * 100).toFixed(1)}%</strong> dari total pendaftar di database. Kami menyarankan follow-up berkala via WhatsApp kepada <strong>{users.filter(u => u.role === 'Peserta' && u.status !== 'Approved').length} pendaftar yang belum menyelesaikan pembayaran</strong> untuk meningkatkan konversi pendapatan!
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: REGISTRATIONS & PAYMENTS MANAGEMENT */}
          {activeTab === 'registrations' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Verifikasi Siswa & Pembayaran</h2>
                  <p className="text-xs text-gray-500 mt-1">Setujui bukti transfer, kelola status peserta, dan terbitkan kuitansi Lunas otomatis.</p>
                </div>
                
                {/* Search input */}
                <div className="relative max-w-xs w-full">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input 
                    id="student-search-input"
                    type="text"
                    placeholder="Cari nama, email, kota..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 focus:border-primary rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              {/* Table of students */}
              <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-500">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-[10px] border-b border-gray-150">
                      <tr>
                        <th className="p-4">Peserta</th>
                        <th className="p-4">Info Kontak</th>
                        <th className="p-4">Target Instansi</th>
                        <th className="p-4">Kota & Daftar</th>
                        <th className="p-4">Status Akun</th>
                        <th className="p-4">Bukti Trans</th>
                        <th className="p-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-gray-400">
                            Tidak ada peserta pendaftar dalam daftar pencarian.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((stud) => (
                          <tr key={stud.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4">
                              <strong className="text-gray-900 block font-bold">{stud.name}</strong>
                              <span className="text-[10px] text-gray-400">Inv: #{stud.invoiceNo || 'INV-183020'}</span>
                            </td>
                            <td className="p-4">
                              <span className="block">{stud.email}</span>
                              <span className="text-[10px] text-gray-400">WA: +{stud.whatsapp}</span>
                            </td>
                            <td className="p-4 font-medium text-gray-900">{stud.targetInstansi}</td>
                            <td className="p-4">
                              <span className="block">{stud.origin}</span>
                              <span className="text-[10px] text-gray-400">{stud.joinedAt}</span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase inline-block ${stud.status === 'Approved' ? 'bg-green-100 text-green-700' : stud.status === 'Pending' ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-red-100 text-red-700'}`}>
                                {stud.status === 'Approved' ? 'LUNAS (Aktif)' : stud.status === 'Pending' ? 'Verifikasi Keuangan' : 'Belum Bayar'}
                              </span>
                            </td>
                            <td className="p-4">
                              {stud.paymentProof ? (
                                <a 
                                  href={stud.paymentProof || null} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-primary hover:underline font-bold text-[10px] block"
                                >
                                  🔎 Lihat Gambar
                                </a>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                              {stud.status === 'Pending' && (
                                <>
                                  <button 
                                    id={`approve-btn-${stud.id}`}
                                    onClick={() => handleApprovePayment(stud.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-lg inline-flex items-center justify-center cursor-pointer"
                                    title="Setujui Pembayaran"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    id={`reject-btn-${stud.id}`}
                                    onClick={() => handleRejectPayment(stud.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg inline-flex items-center justify-center cursor-pointer"
                                    title="Tolak Bukti"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                              
                              <button 
                                id={`delete-user-btn-${stud.id}`}
                                onClick={() => handleDeleteUser(stud.id)}
                                className="border border-gray-200 hover:bg-gray-100 hover:text-red-600 p-1.5 rounded-lg inline-flex items-center justify-center cursor-pointer"
                                title="Hapus Akun Peserta"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: MENTORS CRUD */}
          {activeTab === 'mentors' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Kelola Mentor ASN & Pengajar</h2>
                <p className="text-xs text-gray-500 mt-1">Tambahkan pengajar baru yang kompeten dan atur spesialisasi bidang TWK, TIU, TKP.</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Add/Edit form */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-xs h-max">
                  <h4 className="font-extrabold text-gray-900 text-base mb-4 flex items-center gap-1.5">
                    {editingMentorId ? (
                      <>
                        <Edit3 className="w-5 h-5 text-amber-500" />
                        <span>Ubah Data Mentor</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-primary" />
                        <span>Tambahkan Mentor Baru</span>
                      </>
                    )}
                  </h4>

                  <form onSubmit={handleAddMentor} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Nama Mentor (Beserta Gelar):</label>
                      <input 
                        id="new-mentor-name"
                        type="text"
                        required
                        placeholder="Contoh: Andi Wijaya, S.H."
                        value={newMentorName}
                        onChange={(e) => setNewMentorName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Jabatan / Profesi Instansi:</label>
                      <input 
                        id="new-mentor-role"
                        type="text"
                        required
                        placeholder="Contoh: PNS Kemenkumham RI"
                        value={newMentorRole}
                        onChange={(e) => setNewMentorRole(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Keahlian Mengajar:</label>
                      <input 
                        id="new-mentor-spec"
                        type="text"
                        required
                        placeholder="Contoh: Ahli TWK & Pilar Negara"
                        value={newMentorSpec}
                        onChange={(e) => setNewMentorSpec(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block flex items-center justify-between">
                        <span>Foto Profil Mentor:</span>
                        <span className="text-[10px] text-gray-400">Upload foto lokal</span>
                      </label>
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-150">
                        {newMentorImage ? (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-white shrink-0 shadow-xs">
                            <img 
                              src={newMentorImage || null} 
                              alt="Mentor Avatar Preview" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              type="button"
                              onClick={() => setNewMentorImage('')}
                              className="absolute inset-0 bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                              title="Hapus foto"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full border border-dashed border-gray-300 bg-white flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <label className="inline-flex bg-primary/10 hover:bg-primary/20 text-primary font-bold px-3.5 py-2 rounded-xl text-xs cursor-pointer items-center gap-1.5 transition-all border border-dashed border-primary/20">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{newMentorImage ? 'Ganti Foto' : 'Upload Foto'}</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    if (typeof reader.result === 'string') {
                                      setNewMentorImage(reader.result);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          <p className="text-[9px] text-gray-400 mt-1">Saran aspek rasio 1:1.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {editingMentorId && (
                        <button 
                          type="button"
                          onClick={handleCancelEditMentor}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all text-xs cursor-pointer"
                        >
                          Batal
                        </button>
                      )}
                      <button 
                        id="new-mentor-submit"
                        type="submit"
                        className={`font-bold py-3.5 rounded-xl transition-all shadow-md text-xs cursor-pointer ${editingMentorId ? 'flex-1 bg-amber-500 hover:bg-amber-600 text-white' : 'w-full bg-primary hover:bg-secondary text-white'}`}
                      >
                        {editingMentorId ? 'Simpan Perubahan' : 'Daftarkan Pengajar'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Mentors Grid list */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-extrabold text-gray-900 text-base">Daftar Mentor Saat Ini ({mentors.length})</h4>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {mentors.map((m) => (
                      <div key={m.id} className="bg-white p-4 rounded-2xl border border-gray-150 shadow-xs flex justify-between items-center relative gap-3">
                        <div className="flex gap-3 items-center min-w-0">
                          <img src={m.image || null} alt={m.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
                          <div className="space-y-0.5 min-w-0">
                            <strong className="text-gray-900 block text-xs font-bold truncate">{m.name}</strong>
                            <span className="text-[10px] text-gray-500 block truncate">{m.role}</span>
                            <span className="text-[10px] text-primary font-bold block truncate">{m.spec}</span>
                          </div>
                        </div>

                        {/* Edit & Delete actions */}
                        <div className="flex gap-1 shrink-0">
                          <button
                            id={`edit-mentor-btn-${m.id}`}
                            onClick={() => handleStartEditMentor(m)}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600 transition-colors cursor-pointer border border-amber-200/30"
                            title="Ubah data"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            id={`delete-mentor-btn-${m.id}`}
                            onClick={() => handleDeleteMentor(m.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer border border-red-200/30"
                            title="Hapus mentor"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: MATERIALS CRUD */}
          {activeTab === 'materials' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Kelola Bahan Belajar & Dokumen</h2>
                <p className="text-xs text-gray-500 mt-1">Tambahkan video penjelasan trik pengerjaan, modul PDF, dan link mentoring langsung Zoom.</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                      {/* Form to add */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-xs h-max">
                  <h4 className="font-extrabold text-gray-900 text-base mb-4 flex items-center gap-1.5">
                    {editingMaterialId ? (
                      <>
                        <Edit3 className="w-5 h-5 text-amber-500" />
                        <span>Ubah Bahan Belajar</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-primary" />
                        <span>Tambahkan Bahan Belajar</span>
                      </>
                    )}
                  </h4>

                  <form onSubmit={handleAddMaterial} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Judul Bahan Belajar:</label>
                      <input 
                        id="new-mat-title"
                        type="text"
                        required
                        placeholder="Contoh: Rahasia Cepat Silogisme TIU"
                        value={newMatTitle}
                        onChange={(e) => setNewMatTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Kategori Ujian:</label>
                        <select 
                          id="new-mat-category"
                          value={newMatCategory}
                          onChange={(e) => setNewMatCategory(e.target.value as any)}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none cursor-pointer"
                        >
                          <option value="TWK">TWK</option>
                          <option value="TIU">TIU</option>
                          <option value="TKP">TKP</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Tipe Bahan:</label>
                        <select 
                          id="new-mat-type"
                          value={newMatType}
                          onChange={(e) => setNewMatType(e.target.value as any)}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none cursor-pointer"
                        >
                          <option value="pdf">📂 Dokumen PDF</option>
                          <option value="video">🎬 Video Belajar</option>
                          <option value="zoom">💻 Live Zoom</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Tautan / URL Berkas (YouTube embed, Zoom, PDF):</label>
                      <input 
                        id="new-mat-url"
                        type="text"
                        required
                        placeholder="Contoh: https://www.youtube.com/embed/..."
                        value={newMatUrl}
                        onChange={(e) => setNewMatUrl(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Estimasi Durasi / Halaman:</label>
                      <input 
                        id="new-mat-duration"
                        type="text"
                        placeholder="Contoh: 30 Halaman / 25 Menit"
                        value={newMatDuration}
                        onChange={(e) => setNewMatDuration(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Keterangan Singkat:</label>
                      <textarea 
                        id="new-mat-desc"
                        rows={2}
                        placeholder="Masukkan deskripsi ringkas..."
                        value={newMatDesc}
                        onChange={(e) => setNewMatDesc(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none resize-none"
                      ></textarea>
                    </div>

                    <div className="flex gap-3">
                      {editingMaterialId && (
                        <button 
                          type="button"
                          onClick={handleCancelEditMaterial}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all text-xs cursor-pointer"
                        >
                          Batal
                        </button>
                      )}
                      <button 
                        id="new-mat-submit"
                        type="submit"
                        className={`font-bold py-3.5 rounded-xl transition-all shadow-md text-xs cursor-pointer ${editingMaterialId ? 'flex-1 bg-amber-500 hover:bg-amber-600 text-white' : 'w-full bg-primary hover:bg-secondary text-white'}`}
                      >
                        {editingMaterialId ? 'Simpan Perubahan' : 'Unggah Bahan Belajar'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Materials List */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-extrabold text-gray-900 text-base">Bahan Belajar Aktif ({materials.length})</h4>
                  
                  <div className="space-y-3">
                    {materials.map((mat) => (
                      <div key={mat.id} className="bg-white p-4 rounded-2xl border border-gray-150 shadow-xs flex justify-between items-center text-xs gap-3">
                        <div className="min-w-0">
                          <div className="flex gap-2 items-center">
                            <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 rounded-md uppercase shrink-0">{mat.category}</span>
                            <span className="text-[9px] text-gray-400 font-bold uppercase shrink-0">{mat.type}</span>
                          </div>
                          <strong className="text-gray-900 block mt-1.5 font-bold truncate">{mat.title}</strong>
                          <span className="text-gray-400 text-[10px] block mt-0.5 truncate">{mat.duration} - {mat.url.substring(0, 45)}...</span>
                        </div>

                        <div className="flex gap-1 shrink-0">
                          <button
                            id={`edit-mat-btn-${mat.id}`}
                            onClick={() => handleStartEditMaterial(mat)}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600 transition-colors cursor-pointer border border-amber-200/30"
                            title="Ubah data"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            id={`delete-mat-btn-${mat.id}`}
                            onClick={() => handleDeleteMaterial(mat.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer border border-red-200/30"
                            title="Hapus bahan belajar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 5: TRYOUTS CAT CRUD */}
          {activeTab === 'tryouts' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Kelola Bank Soal & Tryout</h2>
                <p className="text-xs text-gray-500 mt-1">Buat tryout baru lengkap dengan batas waktu, tambahkan soal, kunci jawaban, dan pembahasan materi.</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Form to add */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-xs h-max">
                  <h4 className="font-extrabold text-gray-900 text-base mb-4 flex items-center gap-1.5">
                    {editingTryoutId ? (
                      <>
                        <Edit3 className="w-5 h-5 text-amber-500" />
                        <span>Ubah Paket Tryout</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-primary" />
                        <span>Tambahkan Tryout Baru</span>
                      </>
                    )}
                  </h4>

                  <form onSubmit={handleAddTryout} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Nama / Judul Tryout:</label>
                      <input 
                        id="new-to-title"
                        type="text"
                        required
                        placeholder="Contoh: Paket Simulasi TIU Kuantitatif Akbar"
                        value={newToTitle}
                        onChange={(e) => setNewToTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Kategori:</label>
                        <select 
                          id="new-to-category"
                          value={newToCategory}
                          onChange={(e) => setNewToCategory(e.target.value as any)}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none cursor-pointer"
                        >
                          <option value="TWK">TWK</option>
                          <option value="TIU">TIU</option>
                          <option value="TKP">TKP</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Durasi (Menit):</label>
                        <input 
                          id="new-to-duration"
                          type="number"
                          required
                          value={newToDuration}
                          onChange={(e) => setNewToDuration(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {editingTryoutId && (
                        <button 
                          type="button"
                          onClick={handleCancelEditTryout}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all text-xs cursor-pointer"
                        >
                          Batal
                        </button>
                      )}
                      <button 
                        id="new-to-submit"
                        type="submit"
                        className={`font-bold py-3.5 rounded-xl transition-all shadow-md text-xs cursor-pointer ${editingTryoutId ? 'flex-1 bg-amber-500 hover:bg-amber-600 text-white' : 'w-full bg-primary hover:bg-secondary text-white'}`}
                      >
                        {editingTryoutId ? 'Simpan Perubahan' : 'Buat Paket Tryout'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Tryouts List */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-extrabold text-gray-900 text-base">Paket Tryout Aktif ({tryouts.length})</h4>
                  
                  <div className="space-y-3">
                    {tryouts.map((to) => (
                      <div key={to.id} className="bg-white p-4 rounded-2xl border border-gray-150 shadow-xs flex justify-between items-center text-xs gap-3">
                        <div className="min-w-0">
                          <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 rounded-md uppercase shrink-0">{to.category}</span>
                          <strong className="text-gray-900 block mt-1 font-bold truncate">{to.title}</strong>
                          <span className="text-gray-400 text-[10px] block mt-0.5 truncate">Durasi: {to.duration} Menit - {to.questions.length} Soal</span>
                        </div>

                        <div className="flex gap-1 shrink-0">
                          <button
                            id={`edit-tryout-btn-${to.id}`}
                            onClick={() => handleStartEditTryout(to)}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600 transition-colors cursor-pointer border border-amber-200/30"
                            title="Ubah data"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            id={`delete-tryout-btn-${to.id}`}
                            onClick={() => handleDeleteTryout(to.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer border border-red-200/30"
                            title="Hapus tryout"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 6: LANDING PAGE CMS PANEL */}
          {activeTab === 'cms' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Landing Page CMS</h2>
                <p className="text-xs text-gray-500 mt-1">Ubah kata-kata, harga bimbingan, target hitung mundur, dan kuota sisa pendaftaran secara langsung tanpa coding!</p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-xs">
                
                {cmsSuccess && (
                  <div id="cms-success-msg" className="p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-semibold mb-6">
                    {cmsSuccess}
                  </div>
                )}

                <form onSubmit={handleSaveCMS} className="space-y-6">
                  
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-gray-900 text-base border-b border-gray-100 pb-2">Konten Bagian Atas & Hero</h4>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Headline Utama Hero:</label>
                      <input 
                        id="cms-hero-title"
                        type="text"
                        required
                        value={cmsHeroTitle}
                        onChange={(e) => setCmsHeroTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:bg-white rounded-xl text-xs sm:text-sm outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Sub-headline Detail Hero:</label>
                      <textarea 
                        id="cms-hero-sub"
                        rows={3}
                        required
                        value={cmsHeroSubtitle}
                        onChange={(e) => setCmsHeroSubtitle(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:bg-white rounded-xl text-xs sm:text-sm outline-none resize-none"
                      ></textarea>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Teks Promo Bar Atas:</label>
                      <input 
                        id="cms-promo-text"
                        type="text"
                        required
                        value={cmsPromoText}
                        onChange={(e) => setCmsPromoText(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:bg-white rounded-xl text-xs sm:text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h4 className="font-extrabold text-gray-900 text-base border-b border-gray-100 pb-2">Investasi Biaya Program & Kuota</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Harga Normal Asli (Coret):</label>
                        <input 
                          id="cms-price-orig"
                          type="number"
                          required
                          value={cmsPriceOriginal}
                          onChange={(e) => setCmsPriceOriginal(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Harga Sekarang (Final):</label>
                        <input 
                          id="cms-price-now"
                          type="number"
                          required
                          value={cmsPriceNow}
                          onChange={(e) => setCmsPriceNow(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Batas Maksimum Kuota Kelas:</label>
                        <input 
                          id="cms-quota-total"
                          type="number"
                          required
                          value={cmsQuotaTotal}
                          onChange={(e) => setCmsQuotaTotal(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Jumlah Kuota Terisi (Mock):</label>
                        <input 
                          id="cms-quota-filled"
                          type="number"
                          required
                          value={cmsQuotaFilled}
                          onChange={(e) => setCmsQuotaFilled(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    id="cms-save-btn"
                    type="submit"
                    className="w-full bg-primary hover:bg-secondary text-white font-black py-4 rounded-xl shadow-lg transition-all text-xs sm:text-sm cursor-pointer"
                  >
                    Simpan Seluruh Konten CMS Landing Page
                  </button>

                </form>

              </div>
            </div>
          )}

          {/* TAB 7: BENEFITS CRUD PANEL */}
          {activeTab === 'benefits' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Kelola Benefit Program</h2>
                <p className="text-xs text-gray-500 mt-1">Ubah atau tambahkan benefit unggulan program Karantina untuk menarik calon peserta.</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                {/* Form to add */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-xs h-max">
                  <h4 className="font-extrabold text-gray-900 text-base mb-4 flex items-center gap-1.5">
                    {editingBenefitId ? (
                      <>
                        <Edit3 className="w-5 h-5 text-amber-500" />
                        <span>Ubah Benefit</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-primary" />
                        <span>Tambahkan Benefit Baru</span>
                      </>
                    )}
                  </h4>

                  <form onSubmit={handleAddBenefit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Judul Benefit:</label>
                      <input 
                        id="new-benefit-title"
                        type="text"
                        required
                        placeholder="Contoh: Modul Kunci Sukses SKD 2026"
                        value={newBenefitTitle}
                        onChange={(e) => setNewBenefitTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Icon Deskriptif:</label>
                      <select 
                        id="new-benefit-icon"
                        value={newBenefitIcon}
                        onChange={(e) => setNewBenefitIcon(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none cursor-pointer"
                      >
                        <option value="Clock">🕒 Clock (Waktu/Jadwal)</option>
                        <option value="Users">👥 Users (Grup/Mentor)</option>
                        <option value="Laptop">💻 Laptop (CAT/Simulasi)</option>
                        <option value="Calendar">📅 Calendar (Durasi/Agenda)</option>
                        <option value="TrendingUp">📈 Trending Up (Peluang/Progress)</option>
                        <option value="BookOpen">📖 Book Open (Materi/Modul)</option>
                        <option value="FileCheck">☑ File Check (Kelulusan)</option>
                        <option value="Target">🎯 Target (Fokus/Target)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Penjelasan Singkat:</label>
                      <textarea 
                        id="new-benefit-desc"
                        rows={3}
                        required
                        placeholder="Berikan penjelasan singkat yang menarik..."
                        value={newBenefitDesc}
                        onChange={(e) => setNewBenefitDesc(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none resize-none"
                      ></textarea>
                    </div>

                    <div className="flex gap-3">
                      {editingBenefitId && (
                        <button 
                          type="button"
                          onClick={handleCancelEditBenefit}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all text-xs cursor-pointer"
                        >
                          Batal
                        </button>
                      )}
                      <button 
                        id="new-benefit-submit"
                        type="submit"
                        className={`font-bold py-3.5 rounded-xl transition-all shadow-md text-xs cursor-pointer ${editingBenefitId ? 'flex-1 bg-amber-500 hover:bg-amber-600 text-white' : 'w-full bg-primary hover:bg-secondary text-white'}`}
                      >
                        {editingBenefitId ? 'Simpan Perubahan' : 'Tambahkan Benefit'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Benefits List */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-extrabold text-gray-900 text-base">Daftar Benefit Aktif ({benefits.length})</h4>
                  
                  <div className="space-y-3">
                    {benefits.map((b) => (
                      <div key={b.id} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex justify-between items-start gap-4 text-xs">
                        <div className="flex gap-3 items-start min-w-0">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 font-bold">
                            <Award className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <strong className="text-gray-900 block text-sm font-bold truncate">{b.title}</strong>
                            <p className="text-gray-500 mt-1 leading-relaxed text-xs break-words">{b.description}</p>
                          </div>
                        </div>

                        <div className="flex gap-1 shrink-0">
                          <button
                            id={`edit-benefit-btn-${b.id}`}
                            onClick={() => handleStartEditBenefit(b)}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600 transition-colors cursor-pointer border border-amber-200/30"
                            title="Ubah data"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            id={`delete-benefit-btn-${b.id}`}
                            onClick={() => handleDeleteBenefit(b.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer border border-red-200/30"
                            title="Hapus benefit"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: FACILITIES CRUD PANEL */}
          {activeTab === 'facilities' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Kelola Fasilitas Karantina</h2>
                <p className="text-xs text-gray-500 mt-1">Sajikan akomodasi bintang 3, ruang belajar eksklusif, dan fasilitas pendukung karantina lainnya.</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                {/* Form to add */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-xs h-max">
                  <h4 className="font-extrabold text-gray-900 text-base mb-4 flex items-center gap-1.5">
                    {editingFacilityId ? (
                      <>
                        <Edit3 className="w-5 h-5 text-amber-500" />
                        <span>Ubah Detail Fasilitas</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-primary" />
                        <span>Tambahkan Fasilitas Baru</span>
                      </>
                    )}
                  </h4>

                  <form onSubmit={handleAddFacility} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Nama Fasilitas:</label>
                      <input 
                        id="new-facility-title"
                        type="text"
                        required
                        placeholder="Contoh: Kamar Hotel Twin-Sharing AC"
                        value={newFacilityTitle}
                        onChange={(e) => setNewFacilityTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Badge Label:</label>
                        <input 
                          id="new-facility-badge"
                          type="text"
                          placeholder="Contoh: Hotel Bintang 3"
                          value={newFacilityBadge}
                          onChange={(e) => setNewFacilityBadge(e.target.value)}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Status / Rating:</label>
                        <input 
                          id="new-facility-rating"
                          type="text"
                          placeholder="Contoh: Premium Comfort"
                          value={newFacilityRating}
                          onChange={(e) => setNewFacilityRating(e.target.value)}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block flex items-center justify-between">
                        <span>Foto Fasilitas:</span>
                        <span className="text-[10px] text-gray-400">Upload foto lokal</span>
                      </label>
                      <div className="flex items-center gap-3">
                        {newFacilityImage ? (
                          <div className="relative w-20 h-16 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                            <img 
                              src={newFacilityImage || null} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              type="button"
                              onClick={() => setNewFacilityImage('')}
                              className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-600 text-white p-0.5 rounded-full shadow transition-colors"
                              title="Hapus foto"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-20 h-16 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center shrink-0">
                            <span className="text-[9px] text-gray-400 text-center">Belum ada foto</span>
                          </div>
                        )}
                        <label className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary font-bold px-4 py-3 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all border border-dashed border-primary/20">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{newFacilityImage ? 'Ganti Foto' : 'Upload Foto'}</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  if (typeof reader.result === 'string') {
                                    setNewFacilityImage(reader.result);
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Deskripsi Detail:</label>
                      <textarea 
                        id="new-facility-desc"
                        rows={3}
                        required
                        placeholder="Terangkan keunggulan dan spesifikasi lengkap fasilitas..."
                        value={newFacilityDesc}
                        onChange={(e) => setNewFacilityDesc(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none resize-none"
                      ></textarea>
                    </div>

                    <div className="flex gap-3">
                      {editingFacilityId && (
                        <button 
                          type="button"
                          onClick={handleCancelEditFacility}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all text-xs cursor-pointer"
                        >
                          Batal
                        </button>
                      )}
                      <button 
                        id="new-facility-submit"
                        type="submit"
                        className={`font-bold py-3.5 rounded-xl transition-all shadow-md text-xs cursor-pointer ${editingFacilityId ? 'flex-1 bg-amber-500 hover:bg-amber-600 text-white' : 'w-full bg-primary hover:bg-secondary text-white'}`}
                      >
                        {editingFacilityId ? 'Simpan Perubahan' : 'Tambahkan Fasilitas'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Facilities List */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-extrabold text-gray-900 text-base">Daftar Fasilitas Aktif ({facilities.length})</h4>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {facilities.map((f) => (
                      <div key={f.id} className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-xs flex flex-col justify-between text-xs">
                        <div className="relative h-40 bg-gray-100">
                          <img 
                            src={f.image || null} 
                            alt={f.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {f.badge && (
                            <span className="absolute top-3 left-3 bg-primary text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                              {f.badge}
                            </span>
                          )}
                        </div>

                        <div className="p-4 space-y-2 flex-1">
                          <div className="flex justify-between items-center text-[10px] text-primary font-bold uppercase">
                            <span>{f.ratingText || 'Tersedia'}</span>
                          </div>
                          <strong className="text-gray-900 block text-sm font-extrabold leading-tight">{f.title}</strong>
                          <p className="text-gray-500 leading-relaxed text-xs line-clamp-3">{f.description}</p>
                        </div>

                        <div className="p-4 pt-0 flex justify-end gap-2 border-t border-gray-50 mt-2">
                          <button
                            id={`edit-facility-btn-${f.id}`}
                            onClick={() => handleStartEditFacility(f)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-[10px] transition-colors cursor-pointer border border-amber-200/30"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Ubah</span>
                          </button>
                          <button
                            id={`delete-facility-btn-${f.id}`}
                            onClick={() => handleDeleteFacility(f.id)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[10px] transition-colors cursor-pointer border border-red-200/30"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: REVIEWS CRUD PANEL */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Kelola Ulasan & Testimoni</h2>
                <p className="text-xs text-gray-500 mt-1">Tampilkan testimoni kelulusan alumni asli CPNS sebagai bukti jaminan kualitas kelas karantina.</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                {/* Form to add */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-xs h-max">
                  <h4 className="font-extrabold text-gray-900 text-base mb-4 flex items-center gap-1.5">
                    {editingReviewId ? (
                      <>
                        <Edit3 className="w-5 h-5 text-amber-500" />
                        <span>Ubah Ulasan Testimoni</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-primary" />
                        <span>Tambahkan Ulasan Baru</span>
                      </>
                    )}
                  </h4>

                  <form onSubmit={handleAddReview} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Nama Alumni:</label>
                      <input 
                        id="new-review-name"
                        type="text"
                        required
                        placeholder="Contoh: Rian Anggoro, S.Tr"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Instansi Penempatan:</label>
                        <input 
                          id="new-review-instansi"
                          type="text"
                          required
                          placeholder="Contoh: Kemenkumham"
                          value={newReviewInstansi}
                          onChange={(e) => setNewReviewInstansi(e.target.value)}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Bintang (1-5):</label>
                        <select 
                          id="new-review-rating"
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs outline-none cursor-pointer font-bold"
                        >
                          <option value="5">⭐⭐⭐⭐⭐ 5 Star</option>
                          <option value="4">⭐⭐⭐⭐ 4 Star</option>
                          <option value="3">⭐⭐⭐ 3 Star</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block flex items-center justify-between">
                        <span>Foto Profil Alumni:</span>
                        <span className="text-[10px] text-gray-400">Upload foto lokal</span>
                      </label>
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-150">
                        {newReviewImage ? (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-white shrink-0">
                            <img 
                              src={newReviewImage || null} 
                              alt="Alumni Avatar Preview" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              type="button"
                              onClick={() => setNewReviewImage('')}
                              className="absolute inset-0 bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                              title="Hapus foto"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full border border-dashed border-gray-300 bg-white flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <label className="inline-flex bg-primary/10 hover:bg-primary/20 text-primary font-bold px-3.5 py-2 rounded-xl text-xs cursor-pointer items-center gap-1.5 transition-all border border-dashed border-primary/20">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{newReviewImage ? 'Ganti Foto' : 'Upload Foto'}</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    if (typeof reader.result === 'string') {
                                      setNewReviewImage(reader.result);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          <p className="text-[9px] text-gray-400 mt-1">Format 1:1 direkomendasikan.</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Isi Ulasan Testimoni:</label>
                      <textarea 
                        id="new-review-text"
                        rows={4}
                        required
                        placeholder="Tuliskan cerita kelulusan dan kesan pesan alumni terhadap program bimbingan..."
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 focus:border-primary focus:bg-white rounded-xl text-xs outline-none resize-none"
                      ></textarea>
                    </div>

                    <div className="flex gap-3">
                      {editingReviewId && (
                        <button 
                          type="button"
                          onClick={handleCancelEditReview}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all text-xs cursor-pointer"
                        >
                          Batal
                        </button>
                      )}
                      <button 
                        id="new-review-submit"
                        type="submit"
                        className={`font-bold py-3.5 rounded-xl transition-all shadow-md text-xs cursor-pointer ${editingReviewId ? 'flex-1 bg-amber-500 hover:bg-amber-600 text-white' : 'w-full bg-primary hover:bg-secondary text-white'}`}
                      >
                        {editingReviewId ? 'Simpan Perubahan' : 'Tambahkan Ulasan Alumni'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-extrabold text-gray-900 text-base">Testimoni Alumni Aktif ({testimonials.length})</h4>
                  
                  <div className="space-y-3">
                    {testimonials.map((t) => (
                      <div key={t.id} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 text-xs">
                        <div className="flex gap-3 items-start flex-1">
                          <img 
                            src={t.image || null} 
                            alt={t.name}
                            className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <strong className="text-gray-900 block text-sm font-bold">{t.name}</strong>
                              <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-md border border-green-200">Lolos CPNS</span>
                            </div>
                            <span className="text-gray-400 block text-[10px] mt-0.5">{t.instansi} • {t.role}</span>
                            <div className="flex items-center gap-0.5 my-1.5 text-amber-500">
                              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                            <p className="text-gray-500 leading-relaxed text-xs italic">"{t.text}"</p>
                          </div>
                        </div>

                        <div className="flex sm:flex-col gap-1.5 shrink-0 self-end sm:self-start">
                          <button
                            id={`edit-review-btn-${t.id}`}
                            onClick={() => handleStartEditReview(t)}
                            className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-[10px] transition-colors cursor-pointer border border-amber-200/30"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Ubah</span>
                          </button>
                          <button 
                            id={`delete-review-btn-${t.id}`}
                            onClick={() => handleDeleteReview(t.id)}
                            className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[10px] transition-colors cursor-pointer border border-red-200/30"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
