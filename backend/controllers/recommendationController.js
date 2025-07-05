const TestResult = require('../models/TestResult');
const Major = require('../models/Major');

// @desc    Mendapatkan rekomendasi jurusan berdasarkan hasil tes
// @route   GET /api/recommendations
// @access  Private
const getRecommendations = async (req, res) => {
  try {
    // 1. Dapatkan hasil tes dari pengguna yang sedang login
    const testResult = await TestResult.findOne({ user: req.user._id });

    if (!testResult || !testResult.resultCode) {
      return res.status(404).json({ message: 'Hasil tes tidak ditemukan. Silakan selesaikan tes terlebih dahulu.' });
    }

    // 2. Ambil tipe kepribadian utama dari hasil tes (huruf pertama)
    const primaryType = testResult.resultCode.charAt(0);

    // 3. Cari semua jurusan yang cocok dengan tipe utama pengguna
    const recommendedMajors = await Major.find({ primaryRiasecType: primaryType });

    if (recommendedMajors.length === 0) {
        return res.status(404).json({ message: 'Belum ada rekomendasi jurusan yang cocok untuk Anda saat ini.' });
    }

    res.json(recommendedMajors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  getRecommendations,
};
