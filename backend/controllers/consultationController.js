const Consultant = require('../models/Consultant');

// @desc    Mendapatkan daftar semua konsultan
// @route   GET /api/consultations
// @access  Private
const getConsultants = async (req, res) => {
  try {
    // Cari semua dokumen di koleksi Consultant
    const consultants = await Consultant.find({});
    // Kirim hasilnya sebagai JSON
    res.json(consultants);
  } catch (error) {
    // Jika terjadi error, kirim status 500
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// Ekspor fungsi agar bisa digunakan di file routes
// Perbaikan: Menghapus satu kurung kurawal yang berlebih
module.exports = { getConsultants };
