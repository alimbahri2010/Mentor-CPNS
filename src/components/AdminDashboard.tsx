import React, { useState } from 'react';
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
  Upload
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
  onLogout
}: AdminDashboardProps) {

  // Current simulation role for testing different dashboards
  const [currentRole, setCurrentRole] = useState<'Super Admin' | 'Admin' | 'Marketing' | 'Finance' | 'Mentor'>(
    currentUser.role as any || 'Super Admin'
  );

  const [activeTab, setActiveTab] = useState<'analytics' | 'registrations' | 'mentors' | 'materials' | 'tryouts' | 'cms' | 'settings' | 'benefits' | 'facilities' | 'reviews'>('analytics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // CRUD Benefit states
  const [newBenefitTitle, setNewBenefitTitle] = useState('');
  const [newBenefitDesc, setNewBenefitDesc] = useState('');
  const [newBenefitIcon, setNewBenefitIcon] = useState('Clock');

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

  // CRUD Material states
  const [newMatTitle, setNewMatTitle] = useState('');
  const [newMatCategory, setNewMatCategory] = useState<'TWK' | 'TIU' | 'TKP'>('TWK');
  const [newMatType, setNewMatType] = useState<'pdf' | 'video' | 'zoom'>('pdf');
  const [newMatUrl, setNewMatUrl] = useState('');
  const [newMatDuration, setNewMatDuration] = useState('');
  const [newMatDesc, setNewMatDesc] = useState('');

  // CRUD Tryout states
  const [newToTitle, setNewToTitle] = useState('');
  const [newToCategory, setNewToCategory] = useState<'TWK' | 'TIU' | 'TKP'>('TWK');
  const [newToDuration, setNewToDuration] = useState(15);

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

  // Add Mentor
  const handleAddMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMentorName || !newMentorRole || !newMentorSpec) return;

    const newMentor: Mentor = {
      id: 'm_' + Date.now(),
      name: newMentorName,
      role: newMentorRole,
      spec: newMentorSpec,
      image: newMentorImage
    };

    onUpdateMentors([newMentor, ...mentors]);
    setNewMentorName('');
    setNewMentorRole('');
    setNewMentorSpec('');
    setNewMentorImage('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80');
  };

  // Delete Mentor
  const handleDeleteMentor = (id: string) => {
    if (confirm('Hapus mentor ini?')) {
      onUpdateMentors(mentors.filter(m => m.id !== id));
    }
  };

  // Add Learning Material
  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatTitle || !newMatUrl) return;

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
    setNewMatTitle('');
    setNewMatUrl('');
    setNewMatDuration('');
    setNewMatDesc('');
  };

  // Delete Learning Material
  const handleDeleteMaterial = (id: string) => {
    if (confirm('Hapus bahan belajar ini?')) {
      onUpdateMaterials(materials.filter(m => m.id !== id));
    }
  };

  // Add Tryout Exam
  const handleAddTryout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToTitle) return;

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
    setNewToTitle('');
  };

  // Delete Tryout Exam
  const handleDeleteTryout = (id: string) => {
    if (confirm('Hapus tryout ini beserta seluruh soalnya?')) {
      onUpdateTryouts(tryouts.filter(t => t.id !== id));
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

  // Add Benefit
  const handleAddBenefit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBenefitTitle || !newBenefitDesc) return;

    const newBenefit: Benefit = {
      id: 'b_' + Date.now(),
      title: newBenefitTitle,
      description: newBenefitDesc,
      iconName: newBenefitIcon
    };

    onUpdateBenefits([newBenefit, ...benefits]);
    setNewBenefitTitle('');
    setNewBenefitDesc('');
  };

  // Delete Benefit
  const handleDeleteBenefit = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus benefit ini?')) {
      onUpdateBenefits(benefits.filter(b => b.id !== id));
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

          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-black shrink-0">
            M
          </div>
          <div>
            <span className="font-extrabold text-xs sm:text-sm text-gray-900 block leading-none">MENTOR CPNS ADMIN</span>
            <span className="text-[10px] text-primary font-bold tracking-widest block uppercase mt-0.5">Control Center</span>
          </div>
        </div>

        {/* Role Switcher Selector for live testing */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
            <span className="text-[10px] text-gray-500 font-bold uppercase">Simulasi Mode:</span>
            <select 
              id="role-simulator-select"
              value={currentRole} 
              onChange={(e) => {
                setCurrentRole(e.target.value as any);
                // Adjust active tabs depending on mock role to stay clean
                if (e.target.value === 'Marketing') selectTab('cms');
              }}
              className="text-xs font-black text-primary bg-transparent outline-none cursor-pointer"
            >
              <option value="Super Admin">🏆 Super Admin</option>
              <option value="Admin">🛠 Admin Utama</option>
              <option value="Marketing">📢 Pemasaran (Marketing)</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button 
              id="admin-logout-btn"
              onClick={onLogout}
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
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
        <aside className={`bg-gray-900 text-gray-300 w-64 p-5 space-y-6 flex flex-col justify-between h-[calc(100vh-64px)] fixed md:sticky top-16 z-20 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black block px-3">Divisi Akses: {currentRole}</span>
              
              <nav className="space-y-1">
                {/* Analytics available to Super Admin, Admin, Marketing */}
                {(currentRole === 'Super Admin' || currentRole === 'Admin' || currentRole === 'Marketing') && (
                  <button 
                    id="admin-tab-analytics"
                    onClick={() => selectTab('analytics')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'analytics' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Statistik Platform</span>
                  </button>
                )}

                {/* Mentors available to Super Admin, Admin, Marketing */}
                {(currentRole === 'Super Admin' || currentRole === 'Admin' || currentRole === 'Marketing') && (
                  <button 
                    id="admin-tab-mentors"
                    onClick={() => selectTab('mentors')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'mentors' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Kelola Pengajar (Mentors)</span>
                  </button>
                )}

                {/* Benefits available to Super Admin, Admin, Marketing */}
                {(currentRole === 'Super Admin' || currentRole === 'Admin' || currentRole === 'Marketing') && (
                  <button 
                    id="admin-tab-benefits"
                    onClick={() => selectTab('benefits')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'benefits' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}
                  >
                    <Award className="w-4 h-4" />
                    <span>Kelola Benefit</span>
                  </button>
                )}

                {/* Facilities available to Super Admin, Admin, Marketing */}
                {(currentRole === 'Super Admin' || currentRole === 'Admin' || currentRole === 'Marketing') && (
                  <button 
                    id="admin-tab-facilities"
                    onClick={() => selectTab('facilities')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'facilities' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Kelola Fasilitas</span>
                  </button>
                )}

                {/* Reviews/Testimonials available to Super Admin, Admin, Marketing */}
                {(currentRole === 'Super Admin' || currentRole === 'Admin' || currentRole === 'Marketing') && (
                  <button 
                    id="admin-tab-reviews"
                    onClick={() => selectTab('reviews')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'reviews' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}
                  >
                    <Star className="w-4 h-4" />
                    <span>Kelola Review</span>
                  </button>
                )}

                {/* CMS available to Super Admin, Admin, Marketing */}
                {(currentRole === 'Super Admin' || currentRole === 'Admin' || currentRole === 'Marketing') && (
                  <button 
                    id="admin-tab-cms"
                    onClick={() => selectTab('cms')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'cms' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Landing Page CMS</span>
                  </button>
                )}
              </nav>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl text-xs border border-white/5 space-y-1 text-center">
            <span className="text-gray-400 block font-semibold">Logged in as:</span>
            <strong className="text-white block">{currentUser.name}</strong>
          </div>
        </aside>

        {/* Admin Dashboard Active Panel */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto w-full max-w-7xl mx-auto">
          
          {/* TAB 1: ANALYTICS OVERVIEW */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Analisis Platform & Statistik</h2>
                  <p className="text-xs text-gray-500 mt-1">Garis besar real-time perkembangan kuota karantina, revenue, dan jumlah registrasi peserta.</p>
                </div>
              </div>

              {/* Analytics KPI Matrix */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">TOTAL REGISTRASI</span>
                    <strong className="text-xl sm:text-2xl font-black text-gray-900 block mt-0.5">{totalRegistrants}</strong>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">PESERTA DISALURKAN</span>
                    <strong className="text-xl sm:text-2xl font-black text-green-600 block mt-0.5">{totalApproved} / {cms.quotaTotal}</strong>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">PENDING VERIFIKASI</span>
                    <strong className="text-xl sm:text-2xl font-black text-amber-600 block mt-0.5">{pendingPayments}</strong>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">TOTAL REVENUE (LUNAS)</span>
                    <strong className="text-xl sm:text-2xl font-black text-blue-600 block mt-0.5">{formatPrice(totalRevenue)}</strong>
                  </div>
                </div>

              </div>

              {/* SVG Trend Chart */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-xs">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-base">Grafik Pendaftaran & Keuangan Bulanan</h4>
                    <p className="text-[10px] text-gray-500">Representasi perkembangan tren registrasi kelas karantina 2026</p>
                  </div>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Tren Meningkat
                  </span>
                </div>

                {/* Styled Responsive SVG Chart */}
                <div className="w-full h-64 bg-gray-50 rounded-2xl border border-gray-100 p-4 flex items-end justify-between relative overflow-hidden">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none opacity-10">
                    <div className="border-b border-gray-900 w-full"></div>
                    <div className="border-b border-gray-900 w-full"></div>
                    <div className="border-b border-gray-900 w-full"></div>
                    <div className="border-b border-gray-900 w-full"></div>
                  </div>

                  {/* Chart Bar 1 */}
                  <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-10 sm:w-16 bg-gray-300 group-hover:bg-primary h-24 rounded-t-lg transition-all relative">
                      <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">5 Pendaftar</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold">Maret</span>
                  </div>

                  {/* Chart Bar 2 */}
                  <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-10 sm:w-16 bg-gray-300 group-hover:bg-primary h-36 rounded-t-lg transition-all relative">
                      <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">8 Pendaftar</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold">April</span>
                  </div>

                  {/* Chart Bar 3 */}
                  <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-10 sm:w-16 bg-gray-300 group-hover:bg-primary h-48 rounded-t-lg transition-all relative">
                      <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">12 Pendaftar</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold">Mei</span>
                  </div>

                  {/* Chart Bar 4 */}
                  <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-10 sm:w-16 bg-primary h-56 rounded-t-lg transition-all relative">
                      <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-100 font-bold">{totalRegistrants} Pendaftar</span>
                    </div>
                    <span className="text-[10px] text-primary font-black">Juni (Karantina)</span>
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
                                  href={stud.paymentProof} 
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
                
                {/* Add form */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-xs h-max">
                  <h4 className="font-extrabold text-gray-900 text-base mb-4 flex items-center gap-1.5">
                    <Plus className="w-5 h-5 text-primary" />
                    <span>Tambahkan Mentor Baru</span>
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
                              src={newMentorImage} 
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

                    <button 
                      id="new-mentor-submit"
                      type="submit"
                      className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs cursor-pointer"
                    >
                      Daftarkan Pengajar
                    </button>
                  </form>
                </div>

                {/* Mentors Grid list */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-extrabold text-gray-900 text-base">Daftar Mentor Saat Ini ({mentors.length})</h4>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {mentors.map((m) => (
                      <div key={m.id} className="bg-white p-4 rounded-2xl border border-gray-150 shadow-xs flex gap-3 items-center relative">
                        <img src={m.image} alt={m.name} className="w-14 h-14 rounded-full object-cover" />
                        <div className="space-y-0.5">
                          <strong className="text-gray-900 block text-xs font-bold">{m.name}</strong>
                          <span className="text-[10px] text-gray-500 block">{m.role}</span>
                          <span className="text-[10px] text-primary font-bold block">{m.spec}</span>
                        </div>

                        {/* Delete action */}
                        <button 
                          id={`delete-mentor-btn-${m.id}`}
                          onClick={() => handleDeleteMentor(m.id)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 p-1 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
                    <Plus className="w-5 h-5 text-primary" />
                    <span>Tambahkan Bahan Belajar</span>
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

                    <button 
                      id="new-mat-submit"
                      type="submit"
                      className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs cursor-pointer"
                    >
                      Unggah Bahan Belajar
                    </button>
                  </form>
                </div>

                {/* Materials List */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-extrabold text-gray-900 text-base">Bahan Belajar Aktif ({materials.length})</h4>
                  
                  <div className="space-y-3">
                    {materials.map((mat) => (
                      <div key={mat.id} className="bg-white p-4 rounded-2xl border border-gray-150 shadow-xs flex justify-between items-center text-xs">
                        <div>
                          <div className="flex gap-2 items-center">
                            <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 rounded-md uppercase">{mat.category}</span>
                            <span className="text-[9px] text-gray-400 font-bold uppercase">{mat.type}</span>
                          </div>
                          <strong className="text-gray-900 block mt-1.5 font-bold">{mat.title}</strong>
                          <span className="text-gray-400 text-[10px] block mt-0.5">{mat.duration} - {mat.url.substring(0, 45)}...</span>
                        </div>

                        <button 
                          id={`delete-mat-btn-${mat.id}`}
                          onClick={() => handleDeleteMaterial(mat.id)}
                          className="text-gray-400 hover:text-red-600 p-2 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
                    <Plus className="w-5 h-5 text-primary" />
                    <span>Tambahkan Tryout Baru</span>
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

                    <button 
                      id="new-to-submit"
                      type="submit"
                      className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs cursor-pointer"
                    >
                      Buat Paket Tryout
                    </button>
                  </form>
                </div>

                {/* Tryouts List */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-extrabold text-gray-900 text-base">Paket Tryout Aktif ({tryouts.length})</h4>
                  
                  <div className="space-y-3">
                    {tryouts.map((to) => (
                      <div key={to.id} className="bg-white p-4 rounded-2xl border border-gray-150 shadow-xs flex justify-between items-center text-xs">
                        <div>
                          <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 rounded-md uppercase">{to.category}</span>
                          <strong className="text-gray-900 block mt-1 font-bold">{to.title}</strong>
                          <span className="text-gray-400 text-[10px] block mt-0.5">Durasi: {to.duration} Menit - {to.questions.length} Soal</span>
                        </div>

                        <button 
                          id={`delete-tryout-btn-${to.id}`}
                          onClick={() => handleDeleteTryout(to.id)}
                          className="text-gray-400 hover:text-red-600 p-2 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
                    <Plus className="w-5 h-5 text-primary" />
                    <span>Tambahkan Benefit Baru</span>
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

                    <button 
                      id="new-benefit-submit"
                      type="submit"
                      className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs cursor-pointer"
                    >
                      Tambahkan Benefit
                    </button>
                  </form>
                </div>

                {/* Benefits List */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-extrabold text-gray-900 text-base">Daftar Benefit Aktif ({benefits.length})</h4>
                  
                  <div className="space-y-3">
                    {benefits.map((b) => (
                      <div key={b.id} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex justify-between items-start gap-4 text-xs">
                        <div className="flex gap-3 items-start">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 font-bold">
                            <Award className="w-4 h-4" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block text-sm font-bold">{b.title}</strong>
                            <p className="text-gray-500 mt-1 leading-relaxed text-xs">{b.description}</p>
                          </div>
                        </div>

                        <button 
                          id={`delete-benefit-btn-${b.id}`}
                          onClick={() => handleDeleteBenefit(b.id)}
                          className="text-gray-400 hover:text-red-600 p-2 rounded-lg shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
                              src={newFacilityImage} 
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
                            src={f.image} 
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
                              src={newReviewImage} 
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
                            src={t.image} 
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
