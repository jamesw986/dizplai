const Poll = require('../models/Poll');

async function findActivePoll() {
  try {
    return await Poll.findOne({ isActive: true });
  } catch (error) {
    throw new Error('Failed to find active poll', { cause: error });
  }
}

async function endActivePoll() {
  try {
    return await Poll.updateOne({ isActive: true }, { isActive: false });
  } catch (error) {
    throw new Error('Failed to end active poll', { cause: error });
  }
}

async function createPoll(pollOptions) {
  try {
    const poll = new Poll(pollOptions);
    return await poll.save();
  } catch (error) {
    throw new Error('Failed to create poll', { cause: error });
  }
}

async function findPollById(pollId) {
  try {
    return await Poll.findById(pollId);
  } catch (error) {
    throw new Error(`Failed to find poll with ID: ${pollId}`, { cause: error });
  }
}

async function updatePollVotes(pollId, optionId) {
  try {
    return await Poll.findByIdAndUpdate(
      pollId,
      { $inc: { 'votingOptions.$[elem].votes': 1 } },
      { arrayFilters: [{ 'elem._id': optionId }], new: true },
    );
  } catch (error) {
    throw new Error(`Failed to update votes for poll with ID ${pollId}`, {
      cause: error,
    });
  }
}

async function findActivePolls() {
  try {
    return await Poll.find({ isActive: true });
  } catch (error) {
    throw new Error('Failed to find active polls', { cause: error });
  }
}

module.exports = {
  findActivePoll,
  endActivePoll,
  createPoll,
  findPollById,
  updatePollVotes,
  findActivePolls,
};
