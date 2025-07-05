const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema({
  // Menghubungkan hasil tes dengan pengguna tertentu
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Referensi ke model User
  },
  // Menyimpan jawaban pengguna dalam format [{ questionId, answer }]
  answers: [
    {
      questionId: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
  // Menyimpan skor untuk setiap tipe kepribadian
  scores: {
    realistic: { type: Number, default: 0 },
    investigative: { type: Number, default: 0 },
    artistic: { type: Number, default: 0 },
    social: { type: Number, default: 0 },
    enterprising: { type: Number, default: 0 },
    conventional: { type: Number, default: 0 },
  },
  // Menyimpan 3 tipe kepribadian teratas sebagai hasil akhir
  resultCode: {
    type: String, // Contoh: "SIA" (Social, Investigative, Artistic)
  },
  // Timestamp kapan tes diselesaikan
  completedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('TestResult', TestResultSchema);
