const Major = require('../models/Major');

// @desc    Mendapatkan semua prospek karir yang unik (trending)
// @route   GET /api/careers
// @access  Private
const getTrendingCareers = async (req, res) => {
  try {
    const majors = await Major.find({});
    const uniqueCareers = new Set();

    majors.forEach(major => {
      if (major.careerProspects && major.careerProspects.length > 0) {
        major.careerProspects.forEach(career => uniqueCareers.add(career));
      }
    });

    const trendingCareers = Array.from(uniqueCareers);

    // Untuk demo, kita tambahkan data gaji dummy
    const careersWithDetails = trendingCareers.map(career => ({
        name: career,
        salary: `Rp. ${Math.floor(Math.random() * 17 + 8)}jt - ${Math.floor(Math.random() * 15 + 26)}jt`
    }));

    res.json(careersWithDetails);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = { getTrendingCareers };