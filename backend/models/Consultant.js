const mongoose = require('mongoose');

const ConsultantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: { type: String, required: true },
  major: { type: String, required: true },
  status: { type: String, enum: ['Mahasiswa', 'Profesional', 'Dosen'], required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  profilePictureUrl: { type: String, default: 'https://placehold.co/64x64/E0E0E0/4A3780?text=C' }
});

module.exports = mongoose.model('Consultant', ConsultantSchema);
