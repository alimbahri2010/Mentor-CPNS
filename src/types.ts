/**
 * Types for Mentor CPNS Karantina App
 */

export interface Mentor {
  id: string;
  name: string;
  role: string;
  spec: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  instansi: string;
  role?: string;
  text: string;
  rating: number;
  image: string;
  videoUrl?: string;
}

export interface LearningMaterial {
  id: string;
  title: string;
  category: 'TWK' | 'TIU' | 'TKP';
  type: 'pdf' | 'video' | 'zoom';
  url: string;
  duration?: string;
  description?: string;
}

export interface TryoutQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed option
  explanation: string;
}

export interface Tryout {
  id: string;
  title: string;
  category: 'TWK' | 'TIU' | 'TKP';
  duration: number; // in minutes
  questions: TryoutQuestion[];
}

export interface TryoutResult {
  id: string;
  userId: string;
  userName: string;
  tryoutId: string;
  tryoutTitle: string;
  category: 'TWK' | 'TIU' | 'TKP';
  score: number;
  correctCount: number;
  totalQuestions: number;
  answers: { [questionId: string]: number };
  submittedAt: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  whatsapp: string;
  origin: string;
  targetInstansi: string;
  role: 'Admin' | 'Finance' | 'Mentor' | 'Peserta';
  status: 'Pending' | 'Waiting Payment' | 'Approved' | 'Rejected';
  paymentProof?: string;
  paymentDate?: string;
  invoiceNo?: string;
  joinedAt: string;
  quizProgress?: { [materialId: string]: number }; // percentage or material id
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'important' | 'info' | 'schedule';
}

export interface LandingPageCMS {
  heroTitle: string;
  heroSubtitle: string;
  countdownTarget: string; // ISO Date String
  priceOriginal: number;
  pricePromo: number;
  priceNow: number;
  quotaTotal: number;
  quotaFilled: number;
  hotelName: string;
  hotelLocation: string;
  hotelRating: number;
  whatsappNumber: string;
  instagramUrl: string;
  tiktokUrl: string;
  facebookUrl: string;
  emailContact: string;
  officeAddress: string;
  officeHours: string;
  showPromoBanner: boolean;
  promoText: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  ratingText?: string;
}

