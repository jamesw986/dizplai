const Vote = require('../models/Vote');

async function createVote(voteData) {
  const vote = new Vote(voteData);
  return await vote.save();
}

async function findVotesByPollId(pollId) {
  return await Vote.find({ pollId }).populate('pollId');
}

module.exports = {
  createVote,
  findVotesByPollId,
};
