const mongoose = require('mongoose');

function validateVotingOptionsLength(value) {
  return value.length >= 2 && value.length <= 7;
}

const votingOptionsSchema = new mongoose.Schema({
  option: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  votingOptions: {
    type: [votingOptionsSchema],
    validate: {
      validator: validateVotingOptionsLength,
      message: 'Polls must contain between 2 and 7 voting options',
    },
  },
  createdAt: { type: Date, default: Date.now() },
  isActive: { type: Boolean, default: true },
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
