import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function submitVote({ pollId, optionId }) {
  const requestBody = {
    pollId,
    optionId,
  };

  return axios.put('http://localhost:5000/polls/vote', requestBody);
}

export default function useSubmitVote(setVoted) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => submitVote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activePoll'] });
      queryClient.refetchQueries(['activePolls']).then(() => setVoted(true));
    },
  });

  return mutation;
}
