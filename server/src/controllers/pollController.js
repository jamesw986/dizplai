const pollService = require('../services/pollService');

function send500Response(res, error) {
  console.error(error);
  res
    .status(error.status || 500)
    .json({
      status: 'FAILED',
      message: error.message || error,
      cause: error.cause,
    });
}

async function createPoll(req, res) {
  const { question, votingOptions } = req.body;

  try {
    const newPoll = await pollService.createPoll({
      question,
      votingOptions,
    });

    res.status(201).json(newPoll);
  } catch (error) {
    send500Response(res, error);
  }
}

async function getPoll(req, res) {
  const { pollId } = req.params;

  try {
    const poll = await pollService.getPoll(pollId);

    res.status(200).json(poll);
  } catch (error) {
    send500Response(res, error);
  }
}

async function getPollVotes(req, res) {
  const { pollId } = req.params;

  try {
    const votes = await pollService.getPollVotes(pollId);

    res.status(200).json(votes);
  } catch (error) {
    send500Response(res, error);
  }
}

async function voteOnPoll(req, res) {
  const { pollId, optionId } = req.body;

  try {
    await pollService.voteOnPoll(pollId, optionId);

    return res.status(201).json({ message: 'Vote cast successfully' });
  } catch (error) {
    send500Response(res, error);
  }
}

async function getActivePolls(req, res) {
  try {
    const activePolls = await pollService.getActivePolls();

    return res.status(200).json(activePolls);
  } catch (error) {
    send500Response(res, error);
  }
}

module.exports = {
  createPoll,
  getPoll,
  getPollVotes,
  voteOnPoll,
  getActivePolls,
};
