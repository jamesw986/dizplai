import useGetActivePoll from '../hooks/useGetActivePoll';
import DisplayPoll from './DisplayPoll';
import { useState } from 'react';
import PollResults from './PollResults';

export default function Poll() {
  const [voted, setVoted] = useState(false);

  const { isPending, isFetching, isError, data, error } = useGetActivePoll();

  if (isPending || isFetching) {
    return <span>Loading poll...</span>;
  }

  if (isError) {
    return <span>Error loading poll: {error.message}</span>;
  }

  if (voted) {
    return <PollResults pollData={data} />;
  }

  return <DisplayPoll pollData={data} setVoted={setVoted} />;
}
