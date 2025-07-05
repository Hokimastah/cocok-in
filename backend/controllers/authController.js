const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fungsi untuk menghasilkan token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token berlaku selama 30 hari
  });
};

// @desc    Mendaftarkan pengguna baru
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { fullName, email, password, nickName, dateOfBirth, gender } = req.body;

  try {
    // 1. Cek apakah email sudah terdaftar
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // 2. Buat pengguna baru
    const user = await User.create({
      fullName,
      email,
      password, // Password akan di-hash oleh middleware di model
      nickName,
      dateOfBirth,
      gender,
    });

    // 3. Jika pengguna berhasil dibuat, kirim kembali data dan token
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Data pengguna tidak valid' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Login pengguna
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Cari pengguna berdasarkan email
    const user = await User.findOne({ email });

    // 2. Jika pengguna ada dan password cocok, kirim token
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Email atau password salah' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
