const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  pollId: { type: mongoose.Types.ObjectId, required: true, ref: 'Poll' },
  optionId: { type: mongoose.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
