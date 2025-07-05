const mongoose = require('mongoose');

const MajorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  primaryRiasecType: { type: String, required: true, enum: ['R', 'I', 'A', 'S', 'E', 'C'] },
  careerProspects: [String],
});

module.exports = mongoose.model('Major', MajorSchema);
