const mongoose = require('mongoose');

const MajorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Kode RIASEC yang paling cocok untuk jurusan ini
  // Contoh: 'S' untuk Sosial, 'A' untuk Artistik, dll.
  primaryRiasecType: {
    type: String,
    required: true,
    enum: ['R', 'I', 'A', 'S', 'E', 'C'], // Hanya boleh salah satu dari 6 tipe ini
  },
  // Opsional: daftar karir yang relevan
  careerProspects: [String],
});

module.exports = mongoose.model('Major', MajorSchema);
