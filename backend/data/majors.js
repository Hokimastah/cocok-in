const majors = [
  // Tipe R - Realistic
  {
    name: 'Teknik Sipil',
    description: 'Mempelajari perancangan, pembangunan, dan pemeliharaan infrastruktur.',
    primaryRiasecType: 'R',
    careerProspects: ['Insinyur Sipil', 'Manajer Konstruksi', 'Konsultan Proyek'],
  },
  {
    name: 'Teknik Mesin',
    description: 'Mempelajari desain, manufaktur, dan pemeliharaan sistem mekanik.',
    primaryRiasecType: 'R',
    careerProspects: ['Insinyur Mesin', 'Manajer Produksi', 'Desainer Produk'],
  },

  // Tipe I - Investigative
  {
    name: 'Teknik Informatika',
    description: 'Mempelajari ilmu komputer, pemrograman, dan pengembangan perangkat lunak.',
    primaryRiasecType: 'I',
    careerProspects: ['Software Engineer', 'Data Scientist', 'IT Consultant'],
  },
  {
    name: 'Kedokteran',
    description: 'Mempelajari ilmu medis untuk mendiagnosis, mengobati, dan mencegah penyakit.',
    primaryRiasecType: 'I',
    careerProspects: ['Dokter Umum', 'Dokter Spesialis', 'Peneliti Medis'],
  },
   {
    name: 'Farmasi',
    description: 'Mempelajari tentang obat-obatan, mulai dari pembuatan hingga distribusinya.',
    primaryRiasecType: 'I',
    careerProspects: ['Apoteker', 'Peneliti Farmasi', 'Regulator Obat'],
  },

  // Tipe A - Artistic
  {
    name: 'Desain Komunikasi Visual (DKV)',
    description: 'Mempelajari cara menyampaikan pesan melalui elemen visual.',
    primaryRiasecType: 'A',
    careerProspects: ['Graphic Designer', 'Illustrator', 'UI/UX Designer'],
  },
  {
    name: 'Arsitektur',
    description: 'Mempelajari seni dan ilmu merancang bangunan dan struktur fisik lainnya.',
    primaryRiasecType: 'A',
    careerProspects: ['Arsitek', 'Desainer Interior', 'Perencana Kota'],
  },

  // Tipe S - Social
  {
    name: 'Ilmu Komunikasi',
    description: 'Mempelajari proses komunikasi di berbagai tingkatan, dari individu hingga media.',
    primaryRiasecType: 'S',
    careerProspects: ['Public Relations', 'Jurnalis', 'Digital Marketer'],
  },
  {
    name: 'Psikologi',
    description: 'Mempelajari perilaku dan proses mental manusia.',
    primaryRiasecType: 'S',
    careerProspects: ['Psikolog Klinis', 'Konselor', 'HRD Specialist'],
  },

  // Tipe E - Enterprising
  {
    name: 'Manajemen Bisnis',
    description: 'Mempelajari cara merencanakan, mengelola, dan mengoperasikan sebuah bisnis.',
    primaryRiasecType: 'E',
    careerProspects: ['Manajer Bisnis', 'Konsultan Manajemen', 'Wirausahawan'],
  },
  {
    name: 'Hukum',
    description: 'Mempelajari sistem aturan yang berlaku di masyarakat dan pemerintahan.',
    primaryRiasecType: 'E',
    careerProspects: ['Pengacara', 'Notaris', 'Legal Corporate'],
  },

  // Tipe C - Conventional
  {
    name: 'Akuntansi',
    description: 'Mempelajari pencatatan, pengukuran, dan pelaporan informasi keuangan.',
    primaryRiasecType: 'C',
    careerProspects: ['Akuntan Publik', 'Auditor', 'Analis Keuangan'],
  },
  {
    name: 'Statistika',
    description: 'Mempelajari cara mengumpulkan, menganalisis, dan menyajikan data.',
    primaryRiasecType: 'C',
    careerProspects: ['Ahli Statistik', 'Analis Data', 'Aktuaris'],
  },
];

module.exports = majors;
