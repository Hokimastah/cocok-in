const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fungsi untuk menghasilkan token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Mendaftarkan pengguna baru
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  console.log('--- LANGKAH 1: Permintaan registrasi diterima. ---');
  const { fullName, email, password } = req.body;
  console.log('--- LANGKAH 2: Data yang diterima:', { fullName, email });

  try {
    console.log('--- LANGKAH 3: Mencari apakah email sudah ada di database...');
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('--- GAGAL: Email sudah terdaftar. Mengirim error.');
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    console.log('--- LANGKAH 4: Email tersedia. Mulai membuat user baru...');
    // Di sinilah middleware .pre('save') dari User.js akan berjalan
    const user = await User.create({
      fullName,
      email,
      password,
    });

    console.log('--- LANGKAH 5: User berhasil dibuat di database.');

    if (user) {
      console.log('--- LANGKAH 6: Mengirim respons sukses ke pengguna...');
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user._id),
      });
      console.log('--- PROSES REGISTRASI SELESAI ---');
    } else {
      console.log('--- GAGAL: Gagal membuat user (data tidak valid).');
      res.status(400).json({ message: 'Data pengguna tidak valid' });
    }
  } catch (error) {
    console.error('!!! ERROR FATAL DI CONTROLLER !!!', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
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
