const pollService = require('../services/pollService');
const pollRepository = require('../repositories/pollRepository');
const voteRepository = require('../repositories/voteRepository');

jest.mock('../repositories/pollRepository');
jest.mock('../repositories/voteRepository');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Poll service', () => {
  test('createPoll should end the currently active poll and create a new poll', async () => {
    pollRepository.createPoll.mockResolvedValue('I am a new poll');

    const result = await pollService.createPoll('poll options');

    expect(pollRepository.endActivePoll).toHaveBeenCalled();
    expect(pollRepository.createPoll).toHaveBeenCalledWith('poll options');
    expect(result).toEqual('I am a new poll');
  });

  test('createPoll should throw an error if the poll failed to be created', async () => {
    pollRepository.createPoll.mockResolvedValue(null);

    const expectedErrorMessage = 'Failed to create poll. Please try again';

    await expect(pollService.createPoll('poll options')).rejects.toThrow(
      expectedErrorMessage,
    );
  });

  test('createPoll should rethrow if an error was thrown in the pollRepository', async () => {
    const errorMessage = 'Failed to create poll';
    pollRepository.createPoll.mockRejectedValue(new Error(errorMessage));

    await expect(pollService.createPoll).rejects.toThrow(errorMessage);
  });

  test('getPoll should return the matching poll', async () => {
    pollRepository.findPollById.mockResolvedValue('matching poll');

    const result = await pollService.getPoll('pollId');

    expect(pollRepository.findPollById).toHaveBeenCalledWith('pollId');
    expect(result).toEqual('matching poll');
  });

  test('getPollVotes should return votes formatted for client use', async () => {
    const mockVotes = [
      {
        _id: 'voteId',
        createdAt: new Date(),
        optionId: 'optionId1',
        pollId: {
          _id: 'pollId',
          votingOptions: [
            { _id: 'optionId1', option: 'option 1' },
            { _id: 'optionId2', option: 'option 2' },
          ],
        },
      },
    ];

    voteRepository.findVotesByPollId.mockResolvedValue(mockVotes);

    const result = await pollService.getPollVotes('pollId');

    expect(voteRepository.findVotesByPollId).toHaveBeenCalledWith('pollId');

    const expectedResult = {
      pollId: 'pollId',
      votes: [
        {
          voteId: mockVotes[0]._id,
          createdAt: mockVotes[0].createdAt,
          optionText: mockVotes[0].pollId.votingOptions[0].option,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
  });
});
