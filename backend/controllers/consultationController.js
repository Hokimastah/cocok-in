const Consultant = require('../models/Consultant');

const getConsultants = async (req, res) => {
  try {
    const consultants = await Consultant.find({});
    res.json(consultants);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = { getConsultants };
