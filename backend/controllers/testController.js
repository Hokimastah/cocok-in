const TestResult = require('../models/TestResult');

const questions = [
    { id: 'q1', text: 'Saya suka bekerja dengan peralatan atau mesin.', type: 'realistic' },
    { id: 'q2', text: 'Saya suka melakukan eksperimen.', type: 'investigative' },
    { id: 'q3', text: 'Saya suka mendesain atau menciptakan hal-hal baru.', type: 'artistic' },
    { id: 'q4', text: 'Saya suka membantu atau mengajar orang lain.', type: 'social' },
    { id: 'q5', text: 'Saya suka memimpin tim atau menjual ide.', type: 'enterprising' },
    { id: 'q6', text: 'Saya suka bekerja dengan data dan hal-hal yang terorganisir.', type: 'conventional' },
    { id: 'q7', text: 'Saya lebih suka bekerja di luar ruangan.', type: 'realistic' },
    { id: 'q8', text: 'Saya menikmati memecahkan masalah yang rumit.', type: 'investigative' },
    { id: 'q9', text: 'Saya sering dianggap sebagai orang yang kreatif.', type: 'artistic' },
    { id: 'q10', text: 'Saya merasa puas ketika bisa menolong orang lain.', type: 'social' },
];

const getTestQuestions = async (req, res) => {
  res.json(questions.map(({ id, text }) => ({ id, text })));
};

const submitTest = async (req, res) => {
  const { answers } = req.body;
  const userId = req.user._id;
  if (!answers || answers.length === 0) {
    return res.status(400).json({ message: 'Jawaban tidak boleh kosong' });
  }
  try {
    const scores = { realistic: 0, investigative: 0, artistic: 0, social: 0, enterprising: 0, conventional: 0 };
    answers.forEach(answer => {
      if (answer.answer === 'ya') {
        const question = questions.find(q => q.id === answer.questionId);
        if (question && scores.hasOwnProperty(question.type)) {
          scores[question.type]++;
        }
      }
    });
    const sortedScores = Object.entries(scores).sort(([,a],[,b]) => b-a);
    const resultCode = sortedScores.slice(0, 3).map(item => item[0].charAt(0).toUpperCase()).join('');
    const testResult = await TestResult.findOneAndUpdate(
      { user: userId },
      { user: userId, answers, scores, resultCode, completedAt: new Date() },
      { new: true, upsert: true }
    );
    res.status(201).json(testResult);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = { getTestQuestions, submitTest };