const Poll = require('../models/Poll');

async function findActivePoll() {
  return await Poll.findOne({ isActive: true });
}

async function endActivePoll() {
  return await Poll.updateOne({ isActive: true }, { isActive: false });
}

async function createPoll(pollOptions) {
  const poll = new Poll(pollOptions);
  return await poll.save();
}

async function findPollById(pollId) {
  return await Poll.findById(pollId);
}

async function updatePollVotes(pollId, optionId) {
  return await Poll.findByIdAndUpdate(
    pollId,
    { $inc: { 'votingOptions.$[elem].votes': 1 } },
    { arrayFilters: [{ 'elem._id': optionId }], new: true },
  );
}

async function findActivePolls() {
  return await Poll.find({ isActive: true });
}

module.exports = {
  findActivePoll,
  endActivePoll,
  createPoll,
  findPollById,
  updatePollVotes,
  findActivePolls,
};
