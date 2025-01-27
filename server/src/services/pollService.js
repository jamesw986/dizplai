const mongoose = require('mongoose');
const pollRepository = require('../repositories/pollRepository');
const voteRepository = require('../repositories/voteRepository');

async function createPoll(pollOptions) {
  await pollRepository.endActivePoll();
  const poll = await pollRepository.createPoll(pollOptions);

  return poll;
}

async function getPoll(pollId) {
  const poll = await pollRepository.findPollById(pollId);

  return poll;
}

async function getPollVotes(pollId) {
  const votes = await voteRepository.findVotesByPollId(pollId);

  const formattedVotes = votes.map((vote) => {
    const poll = vote.pollId;
    const chosenOption = poll.votingOptions.find(
      (option) => option._id.toString() === vote.optionId.toString(),
    );

    return {
      voteId: vote._id,
      createdAt: vote.createdAt,
      optionText: chosenOption.option,
    };
  });

  return { pollId, votes: formattedVotes };
}

async function voteOnPoll(pollId, optionId) {
  // Updating the poll and creating a new vote record are wrapped in a transaction to ensure atomicity
  // const session = await mongoose.startSession();
  // session.startTransaction();

  await pollRepository.updatePollVotes(pollId, optionId);
  await voteRepository.createVote({ pollId, optionId });

  // await session.commitTransaction();
  // session.endSession();
}

async function getActivePolls() {
  const activePolls = await pollRepository.findActivePolls();

  const formattedPolls = activePolls.map((poll) => {
    const { _id, question, votingOptions } = poll;
    return {
      id: _id.toString(),
      question,
      votingOptions,
    };
  });

  return formattedPolls;
}

module.exports = {
  createPoll,
  getPollVotes,
  voteOnPoll,
  getPoll,
  getActivePolls,
};
