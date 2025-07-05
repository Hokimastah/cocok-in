const Major = require('../models/Major');

const getRecommendations = async (req, res) => {
  try {
    const testResult = await TestResult.findOne({ user: req.user._id });
    if (!testResult || !testResult.resultCode) {
      return res.status(404).json({ message: 'Hasil tes tidak ditemukan. Silakan selesaikan tes terlebih dahulu.' });
    }
    const primaryType = testResult.resultCode.charAt(0);
    const recommendedMajors = await Major.find({ primaryRiasecType: primaryType });
    if (recommendedMajors.length === 0) {
        return res.status(404).json({ message: 'Belum ada rekomendasi jurusan yang cocok.' });
    }
    res.json(recommendedMajors);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = { getRecommendations };