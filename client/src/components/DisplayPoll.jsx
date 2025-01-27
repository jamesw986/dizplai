import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PollOptions from './PollOptions';
import { useState } from 'react';
import SubmitVote from './SubmitVote';

export default function DisplayPoll({ pollData, setVoted }) {
  const [selectedOption, setSelectedOption] = useState();

  return (
    <Stack spacing={4}>
      <Typography variant="h3" color="white">
        {pollData.question}
      </Typography>
      <PollOptions
        options={pollData.votingOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <SubmitVote
        pollId={pollData.id}
        selectedOption={selectedOption}
        setVoted={setVoted}
      />
    </Stack>
  );
}
