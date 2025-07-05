const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
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
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = { getUserProfile };