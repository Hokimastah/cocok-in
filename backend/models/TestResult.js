const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  answers: [{ questionId: { type: String, required: true }, answer: { type: String, required: true } }],
  scores: {
    realistic: { type: Number, default: 0 },
    investigative: { type: Number, default: 0 },
    artistic: { type: Number, default: 0 },
    social: { type: Number, default: 0 },
    enterprising: { type: Number, default: 0 },
    conventional: { type: Number, default: 0 },
  },
  resultCode: { type: String },
  completedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('TestResult', TestResultSchema);
