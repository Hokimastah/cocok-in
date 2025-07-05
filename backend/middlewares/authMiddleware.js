const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Cek apakah header Authorization ada dan dimulai dengan 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 1. Ambil token dari header (setelah 'Bearer ')
      token = req.headers.authorization.split(' ')[1];

      // 2. Verifikasi token menggunakan secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Ambil data pengguna dari database berdasarkan id di token
      //    dan lampirkan ke object request agar bisa diakses di rute selanjutnya
      //    '-password' berarti kita tidak ikut sertakan field password
      req.user = await User.findById(decoded.id).select('-password');

      // 4. Lanjutkan ke proses selanjutnya (controller)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Tidak terotorisasi, token gagal' });
    }
  }

  // Jika tidak ada token sama sekali
  if (!token) {
    res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' });
  }
};

module.exports = { protect };
