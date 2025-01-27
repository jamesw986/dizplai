import Stack from '@mui/material/Stack';
import PollResult from './PollResult';
import Typography from '@mui/material/Typography';

function getTotalVotesInPoll(votingOptions) {
  return votingOptions.reduce(
    (voteCount, currentOption) => (voteCount += currentOption.votes),
    0,
  );
}

export default function PollResults({ pollData }) {
  const votingOptions = pollData.votingOptions;
  const totalVotes = getTotalVotesInPoll(votingOptions);

  const results = votingOptions.map((option) => {
    const optionText = option.option;
    return (
      <PollResult key={optionText} option={option} totalVotes={totalVotes} />
    );
  });

  return (
    <Stack spacing={4}>
      <Typography variant="h5" color="white">
        Thank you for your response
      </Typography>
      <Stack spacing={4}>{results}</Stack>
    </Stack>
  );
}
