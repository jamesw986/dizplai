const mongoose = require('mongoose');
const pollRepository = require('../repositories/pollRepository');
const voteRepository = require('../repositories/voteRepository');

async function createPoll(pollOptions) {
  try {
    await pollRepository.endActivePoll();
    const poll = await pollRepository.createPoll(pollOptions);

    if (!poll) {
      throw new Error('Failed to create poll. Please try again');
    }

    return poll;
  } catch (error) {
    throw error;
  }
}

async function getPoll(pollId) {
  try {
    const poll = await pollRepository.findPollById(pollId);

    if (!poll) {
      throw new Error(`No poll found with ID ${pollId}`);
    }

    return poll;
  } catch (error) {
    throw error;
  }
}

async function getPollVotes(pollId) {
  try {
    const votes = await voteRepository.findVotesByPollId(pollId);

    if (!votes) {
      throw new Error(`No votes found for poll with ID ${pollId}`);
    }

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
  } catch (error) {
    throw error;
  }
}

async function voteOnPoll(pollId, optionId) {
  await pollRepository.updatePollVotes(pollId, optionId);
  await voteRepository.createVote({ pollId, optionId });
}

async function getActivePolls() {
  try {
    const activePolls = await pollRepository.findActivePolls();

    if (!activePolls) {
      throw new Error('There are no currently active polls');
    }

    const formattedPolls = activePolls.map((poll) => {
      const { _id, question, votingOptions } = poll;
      return {
        id: _id.toString(),
        question,
        votingOptions,
      };
    });

    return formattedPolls;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPoll,
  getPollVotes,
  voteOnPoll,
  getPoll,
  getActivePolls,
};
