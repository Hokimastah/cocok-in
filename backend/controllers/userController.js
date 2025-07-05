const User = require('../models/User');

// @desc    Mendapatkan profil pengguna yang sedang login
// @route   GET /api/users/profile
// @access  Private (membutuhkan token)
const getUserProfile = async (req, res) => {
  // Data pengguna (req.user) sudah didapatkan dari middleware 'protect'
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      nickName: user.nickName,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
    });
  } else {
    res.status(404).json({ message: 'Pengguna tidak ditemukan' });
  }
};

module.exports = {
  getUserProfile,
};
