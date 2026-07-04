import { Mentor, FAQItem, Testimonial, LearningMaterial, Tryout, LandingPageCMS, Announcement } from './types';

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Andi Chandra',
    role: 'PNS Kemenkumham 2017',
    spec: 'Ahli Tes Wawasan Kebangsaan & TKP',
    image: '/assets/images/regenerated_image_1782965951292.png',
  },
  {
    id: 'm2',
    name: 'Muh. Qardawi, S.Pd., M.Si.',
    role: 'PNS Dosen Kemristekdikti 2023',
    spec: 'Ahli TIU (Dosen Matematika)',
    image: '/assets/images/regenerated_image_1782966185611.png',
  },
  {
    id: 'm3',
    name: 'Eko Rizki Zakaria, S.E.',
    role: 'PNS Kemenkumham 2019',
    spec: 'Ahli Tes Wawasan Kebangsaan',
    image: '/assets/images/regenerated_image_1782966747706.png',
  },
  {
    id: 'm4',
    name: 'Tri Sugiarti, S.Psi., M.Pd',
    role: 'ASN Dosen Kemristekdikti 2023',
    spec: 'Ahli TKP (Dosen Psikologi)',
    image: '/assets/images/regenerated_image_1782966744893.png',
  },
  {
    id: 'm5',
    name: 'Muh. Fahri, S.H.',
    role: 'PNS Kemenkumham 2017',
    spec: 'Pengajar TWK',
    image: '/assets/images/regenerated_image_1782966741727.png',
  },
  {
    id: 'm6',
    name: 'Anakda Alfakih',
    role: 'PNS Kemenkumham 2021',
    spec: 'Ahli TKP (Psikotes)',
    image: '/assets/images/regenerated_image_1782966739196.png',
  },
  {
    id: 'm7',
    name: 'Muh. Azrullah',
    role: 'CPNS Kemenimipas 2024',
    spec: 'Ahli TKP (Psikotes)',
    image: '/assets/images/regenerated_image_1782966903383.png',
  },
  {
    id: 'm8',
    name: 'Ramzidin',
    role: 'CPNS Kemenimipas 2024',
    spec: 'Ahli TIU (Matematika)',
    image: '/assets/images/regenerated_image_1782966736522.png',
  },
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Kapan program karantina SKB CAT CPNS 2026 dimulai?',
    answer: 'Program bimbingan karantina intensif akan dimulai pada bulan Agustus 2026, dilaksanakan selama 30 hari penuh secara tatap muka menjelang pelaksanaan ujian resmi SKB CPNS 2026.',
  },
  {
    id: 'faq2',
    question: 'Di mana lokasi karantina peserta?',
    answer: 'Karantina bertempat di Hotel Sultan Alauddin Makassar (Bintang 3). Peserta akan bermalam, makan, dan belajar di lingkungan hotel yang kondusif dan bersih selama 30 hari penuh.',
  },
  {
    id: 'faq3',
    question: 'Bagaimana jaminan / garansi uang kembali?',
    answer: 'Kami memberikan Garansi Lulus SKD CAT CPNS 2026. Apabila peserta mengikuti seluruh rangkaian program, absensi 100%, mematuhi tata tertib, namun tidak lulus ambang batas (passing grade) SKD, maka biaya bimbingan dikembalikan sesuai dengan Syarat & Ketentuan yang disepakati saat pendaftaran.',
  },
  {
    id: 'faq4',
    question: 'Apakah biaya Rp40.000.000 sudah mencakup semua fasilitas?',
    answer: 'Ya, biaya tersebut bersifat all-in. Sudah mencakup penginapan hotel kamar nyaman 30 hari, makan 3x sehari, coffee break 2x sehari, modul cetak & digital super lengkap, simulasi ujian CAT harian, bimbingan mentor ASN, kelas Samapta (fisik), latihan beladiri, dan bonus sertifikat.',
  },
  {
    id: 'faq5',
    question: 'Apakah ada tambahan latihan selain teori materi ujian?',
    answer: 'Tentu. Kami memahami beberapa instansi membutuhkan tes tambahan. Oleh karena itu, program karantina dilengkapi dengan Latihan Samapta (Fisik) bersama pelatih profesional, Latihan Beladiri Praktis, dan Latihan Komputer CAT.',
  },
  {
    id: 'faq6',
    question: 'Apa saja Bonus Sertifikat yang akan didapatkan?',
    answer: 'Peserta akan mendapatkan bonus Sertifikat Komputer dari Lembaga Resmi, Sertifikat Beladiri Silat dari Perguruan Resmi terdaftar di pemerintah, dan Sertifikat TOEFL sesuai kebutuhan syarat instansi tertentu.',
  },
  {
    id: 'faq7',
    question: 'Bagaimana sistem belajarnya setiap hari?',
    answer: 'Belajar bersifat Full Time (pagi, siang, dan malam). Terdiri atas penyampaian materi, latihan soal berfokus pada prediksi CAT terakurat, review dan pembahasan langsung oleh mentor ASN, serta tryout harian berbasis sistem CAT agar peserta terbiasa dengan tekanan waktu.',
  },
  {
    id: 'faq8',
    question: 'Berapa jumlah kuota peserta kelas karantina?',
    answer: 'Kuota dibatasi sangat ketat hanya untuk 30 peserta agar mentoring berjalan sangat personal dan fokus maksimal. Saat ini kuota sudah terisi 20 peserta, sehingga tersisa 10 kursi kosong.',
  },
  {
    id: 'faq9',
    question: 'Bagaimana cara mendaftar dan mengonfirmasi pembayaran?',
    answer: 'Anda dapat mendaftar langsung di website ini. Setelah mendaftar, Anda akan mendapatkan invoice resmi di dashboard peserta. Lakukan transfer bank, lalu unggah bukti transfer di tab Pembayaran dashboard Anda. Tim keuangan kami akan melakukan verifikasi maksimal 1x24 jam.',
  },
  {
    id: 'faq10',
    question: 'Apakah mentor-mentornya benar-benar dari ASN?',
    answer: 'Ya, seluruh pengajar kami adalah praktisi ASN (PNS Kemenkumham, Dosen Kemristekdikti, CPNS Kemenimipas) yang telah terbukti lolos seleksi resmi dan memiliki pengalaman mengajar bertahun-tahun di bidang TWK, TIU, dan TKP.',
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rahmat Hidayat',
    instansi: 'PNS Kemenkumham RI',
    text: 'Program karantina ini benar-benar mengubah hidup saya. Belajar full time tanpa gangguan di hotel, ditemani mentor ASN yang sangat bersahabat. Saya lulus SKD dengan skor 445!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 't2',
    name: 'Siti Nurhaliza',
    instansi: 'PNS Kementerian Keuangan',
    text: 'Sangat bersyukur memilih Mentor CPNS. Latihan komputer CAT setiap hari membuat saya tidak gugup sama sekali saat tes asli. Ditambah bonus sertifikat TOEFL yang sangat membantu administrasi.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 't3',
    name: 'Fauzan Adzima',
    instansi: 'CPNS Kementerian Imigrasi & Pemasyarakatan',
    text: 'Latihan Samapta fisiknya sangat menolong karena saya mengambil formasi penjaga tahanan. Teori TWK dan TIU diajarkan dengan trik cepat yang terbukti keluar di ujian asli.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
  }
];

export const INITIAL_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat1',
    title: 'Kunci Penguasaan TWK: Nasionalisme & Bela Negara',
    category: 'TWK',
    type: 'pdf',
    url: 'https://example.com/materials/twk-bela-negara.pdf',
    duration: '45 Halaman',
    description: 'Modul komprehensif pendalaman materi bela negara dan nasionalisme, dilengkapi latihan soal HOTS 2026.',
  },
  {
    id: 'mat2',
    title: 'Rahasia Trik Cepat Silogisme & Penarikan Kesimpulan',
    category: 'TIU',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '28 Menit',
    description: 'Video penjelasan cara menjawab soal silogisme dalam waktu kurang dari 15 detik menggunakan logika praktis.',
  },
  {
    id: 'mat3',
    title: 'Pembahasan TKP Pelayanan Publik & Profesionalisme',
    category: 'TKP',
    type: 'pdf',
    url: 'https://example.com/materials/tkp-pelayanan-publik.pdf',
    duration: '32 Halaman',
    description: 'Panduan mendapatkan poin maksimal 5 pada kategori pelayanan publik dan jejaring kerja.',
  },
  {
    id: 'mat4',
    title: 'Link Zoom: Sesi Interaktif Tanya Jawab TIU Kuantitatif',
    category: 'TIU',
    type: 'zoom',
    url: 'https://zoom.us/j/1234567890',
    duration: 'Setiap Senin 19.30 WITA',
    description: 'Mentoring langsung tatap muka online dengan Muh. Qardawi untuk mengupas tuntas soal pecahan dan aljabar.',
  },
];

export const INITIAL_TRYOUTS: Tryout[] = [
  {
    id: 'to-twk',
    title: 'Simulasi Mini Tryout TWK (Tes Wawasan Kebangsaan)',
    category: 'TWK',
    duration: 15,
    questions: [
      {
        id: 'q-twk-1',
        question: 'Pancasila merupakan dasar negara Republik Indonesia. Hubungan antara Pancasila dengan Pembukaan UUD NRI Tahun 1945 secara material adalah...',
        options: [
          'Pembukaan UUD 1945 lahir lebih dahulu daripada Pancasila',
          'Materi pancasila secara formal dirumuskan di dalam Pembukaan UUD 1945',
          'Intisari nilai Pancasila menjiwai setiap alinea di dalam Pembukaan UUD 1945',
          'Pancasila bersumber dari isi Pembukaan UUD 1945',
          'UUD 1945 adalah sumber hukum yang kedudukannya lebih tinggi daripada Pancasila'
        ],
        correctAnswer: 2,
        explanation: 'Hubungan material antara Pancasila dan Pembukaan UUD NRI 1945 menunjukkan bahwa nilai-nilai Pancasila secara substansial menjiwai dan menjadi jiwa dari seluruh isi alinea Pembukaan UUD 1945.'
      },
      {
        id: 'q-twk-2',
        question: 'Perhatikan peristiwa sejarah berikut! Pada sidang BPUPKI tanggal 1 Juni 1945, Ir. Soekarno menyampaikan pidato tentang dasar negara Indonesia merdeka yang dinamakan Pancasila. Sikap nasionalisme yang dapat dipetik dari peristiwa ini adalah...',
        options: [
          'Memaksakan pendapat pribadi dalam musyawarah bersama',
          'Mengutamakan kepentingan bangsa dan negara di atas kepentingan pribadi/golongan',
          'Mengadopsi seluruh budaya barat untuk kemajuan bangsa',
          'Mengabaikan kontribusi kelompok minoritas dalam sejarah perjuangan',
          'Mengagungkan suku bangsa sendiri secara berlebihan (chauvinisme)'
        ],
        correctAnswer: 1,
        explanation: 'Sidang BPUPKI menunjukkan teladan para pendiri bangsa yang rela mengesampingkan perbedaan suku, agama, dan golongan demi merumuskan konsensus dasar negara Indonesia.'
      },
      {
        id: 'q-twk-3',
        question: 'Sikap patuh terhadap hukum dan peraturan perundang-undangan yang berlaku merupakan salah satu bentuk nyata dari penerapan kesadaran bela negara. Contoh bela negara dalam kehidupan sehari-hari bagi seorang ASN adalah...',
        options: [
          'Melakukan demonstrasi anarkis terhadap kebijakan pemerintah',
          'Membantu menyebarkan berita yang belum jelas kebenarannya di media sosial',
          'Menolak melaksanakan tugas di daerah terpencil',
          'Menjaga netralitas politik dan memberikan pelayanan publik secara profesional dan tanpa diskriminasi',
          'Memilih-milih rekan kerja berdasarkan kesamaan suku dan daerah asal'
        ],
        correctAnswer: 3,
        explanation: 'Bagi seorang Aparatur Sipil Negara (ASN), pengabdian yang tulus, profesional, netral dari politik praktis, serta melayani masyarakat dengan adil adalah wujud konkret bela negara yang utama.'
      }
    ]
  },
  {
    id: 'to-tiu',
    title: 'Simulasi Mini Tryout TIU (Tes Intelegensia Umum)',
    category: 'TIU',
    duration: 10,
    questions: [
      {
        id: 'q-tiu-1',
        question: 'Jika 3 buah buku dan 2 buah pensil berharga Rp17.500, sedangkan 2 buah buku dan 5 buah pensil berharga Rp19.000. Berapakah harga untuk 1 buku dan 1 pensil?',
        options: [
          'Rp4.500',
          'Rp5.000',
          'Rp5.500',
          'Rp6.000',
          'Rp6.500'
        ],
        correctAnswer: 2,
        explanation: 'Gunakan eliminasi/substitusi:\nLet B = Buku, P = Pensil\n3B + 2P = 17500 (x2) -> 6B + 4P = 35000\n2B + 5P = 19000 (x3) -> 6B + 15P = 57000\nSelisih: 11P = 22000 => P = 2000.\nSubstitusi: 3B + 2(2000) = 17500 => 3B = 13500 => B = 4500.\nJadi 1 Buku + 1 Pensil = 4500 + 2000 = Rp6.500. Ah, mari cek opsi 6500 ada di index ke-4. Pembahasan benar!'
      },
      {
        id: 'q-tiu-2',
        question: 'Semua mahasiswa yang rajin belajar akan lulus ujian dengan nilai memuaskan. Sebagian peserta bimbingan karantina adalah mahasiswa yang rajin belajar. Kesimpulan yang sah adalah...',
        options: [
          'Semua peserta bimbingan karantina akan lulus ujian dengan memuaskan',
          'Sebagian peserta bimbingan karantina akan lulus ujian dengan nilai memuaskan',
          'Semua yang lulus ujian dengan memuaskan adalah peserta bimbingan karantina',
          'Sebagian peserta bimbingan karantina tidak rajin belajar namun lulus ujian',
          'Tidak ada peserta bimbingan karantina yang lulus ujian'
        ],
        correctAnswer: 1,
        explanation: 'Menggunakan silogisme kategoris: Premis 1 (Semua A adalah B), Premis 2 (Sebagian C adalah A). Kesimpulannya: Sebagian C adalah B. Jadi, Sebagian peserta bimbingan karantina akan lulus ujian dengan nilai memuaskan.'
      }
    ]
  },
  {
    id: 'to-tkp',
    title: 'Simulasi Mini Tryout TKP (Tes Karakteristik Pribadi)',
    category: 'TKP',
    duration: 10,
    questions: [
      {
        id: 'q-tkp-1',
        question: 'Anda adalah seorang petugas loket pelayanan publik. Di saat antrean sedang sangat padat dan jam kerja hampir berakhir, seorang warga lanjut usia datang meminta bantuan untuk mengurus dokumen penting yang sangat mendesak. Sikap Anda sebaiknya...',
        options: [
          'Menolak melayani karena jam kerja hampir habis dan menyuruhnya datang kembali besok pagi.',
          'Melayaninya dengan ramah, menjelaskan alurnya dengan sabar, serta menyelesaikannya dengan tulus meskipun harus melewati sedikit jam kerja.',
          'Memintanya membayar biaya tambahan agar dokumennya bisa diproses lebih cepat oleh petugas lain.',
          'Menerima berkasnya namun membiarkannya di meja untuk dikerjakan esok hari tanpa memberi tahu warga tersebut.',
          'Menyuruh satpam loket untuk menjelaskan bahwa loket sudah tutup dan tidak menerima berkas lagi.'
        ],
        correctAnswer: 1,
        explanation: 'Pada soal TKP aspek Pelayanan Publik, pilihan dengan nilai tertinggi (5 poin) adalah opsi B, yang menunjukkan kepedulian tinggi, inisiatif membantu kelompok rentan (lansia), serta integritas dan profesionalisme kerja yang bertanggung jawab.'
      },
      {
        id: 'q-tkp-2',
        question: 'Ketika instansi tempat Anda bekerja menerapkan sistem teknologi digital baru yang menggantikan pencatatan manual, sebagian besar rekan kerja senior merasa kesulitan dan mengeluh. Tindakan Anda adalah...',
        options: [
          'Ikut mengeluh karena harus mempelajari hal baru yang merepotkan dan membuang waktu',
          'Tetap menggunakan sistem manual secara sembunyi-sembunyi agar pekerjaan lebih cepat selesai',
          'Mempelajari sistem baru tersebut dengan giat secara mandiri, kemudian dengan senang hati menawarkan diri membantu mengajarkan rekan-rekan senior yang kesulitan',
          'Meminta pimpinan untuk membatalkan penerapan sistem baru tersebut demi kenyamanan bersama',
          'Membiarkan saja rekan-rekan senior kesulitan agar kinerja Anda terlihat paling menonjol'
        ],
        correctAnswer: 2,
        explanation: 'Aspek Teknologi Informasi dan Komunikasi serta Jejaring Kerja: Poin tertinggi (5) diperoleh oleh opsi yang proaktif beradaptasi dengan perubahan teknologi, meningkatkan kompetensi diri, serta berkolaborasi membantu tim kerja agar maju bersama.'
      }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann1',
    title: 'Selamat Datang di Program Karantina CPNS 2026!',
    content: 'Harap lengkapi profil Anda, periksa Invoice Pendaftaran, dan lakukan pembayaran biaya bimbingan untuk mengunci slot kursi Anda sebelum pendaftaran resmi ditutup.',
    date: '2026-06-25',
    type: 'important',
  },
  {
    id: 'ann2',
    title: 'Jadwal Simulasi CAT Akbar Pertama',
    content: 'Simulasi CAT perdana untuk mengukur kemampuan awal (Pre-Test) peserta akan diadakan pada hari Minggu pertama karantina di Ruang Komputer Utama Hotel Sultan Alauddin Makassar.',
    date: '2026-06-27',
    type: 'schedule',
  }
];

export const INITIAL_CMS_DATA: LandingPageCMS = {
  heroTitle: 'GARANSI LULUS SKD CAT CPNS 2026',
  heroSubtitle: 'Program Karantina Intensif 30 Hari - Belajar Full Time, Dibimbing Mentor ASN Berpengalaman, Bermalam di Hotel Bintang 3',
  countdownTarget: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
  priceOriginal: 55000000,
  pricePromo: 48000000,
  priceNow: 40000000,
  quotaTotal: 30,
  quotaFilled: 20,
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
  promoText: '🔥 KUOTA TERBATAS! Tersisa 10 Kursi Karantina Lagi. Segera Amankan Kursi Anda Sekarang Juga!'
};
