import { Mentor, FAQItem, Testimonial, LearningMaterial, Tryout, LandingPageCMS, Announcement, Benefit, Facility } from './types';

export const INITIAL_MENTORS: Mentor[] = [];

export const INITIAL_FAQS: FAQItem[] = [];

export const INITIAL_TESTIMONIALS: Testimonial[] = [];

export const INITIAL_MATERIALS: LearningMaterial[] = [];

export const INITIAL_TRYOUTS: Tryout[] = [];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [];

export const INITIAL_CMS_DATA: LandingPageCMS = {
  heroTitle: 'GARANSI LULUS SKD CAT CPNS 2026',
  heroSubtitle: 'Program Karantina Intensif 30 Hari - Belajar Full Time, Dibimbing Mentor ASN Berpengalaman, Bermalam di Hotel Bintang 3',
  countdownTarget: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
  priceOriginal: 55000000,
  pricePromo: 48000000,
  priceNow: 40000000,
  quotaTotal: 30,
  quotaFilled: 0,
  hotelName: 'Hotel Sultan Alauddin Makassar',
  hotelLocation: 'Makassar, Sulawesi Selatan',
  hotelRating: 3,
  whatsappNumber: '6285242308996',
  instagramUrl: 'https://instagram.com/mentorcpns',
  tiktokUrl: 'https://tiktok.com/@mentorcpns',
  facebookUrl: 'https://facebook.com/mentorcpns',
  emailContact: 'info@mentorcpns.com',
  officeAddress: 'Hotel Sultan Alauddin Makassar, Jl. Sultan Alauddin No.259, Makassar, Sulawesi Selatan',
  officeHours: 'Setiap Hari, 08:00 - 22:00 WITA',
  showPromoBanner: true,
  promoText: '🔥 KUOTA TERBATAS! Segera Amankan Kursi Karantina Anda Sekarang Juga!'
};

export const INITIAL_BENEFITS: Benefit[] = [];

export const INITIAL_FACILITIES: Facility[] = [];
