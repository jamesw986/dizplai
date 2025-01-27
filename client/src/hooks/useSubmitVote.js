import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

async function submitVote({ pollId, optionId }) {
  const requestBody = {
    pollId,
    optionId,
  };

  return axios.put('http://localhost:3000/polls/vote', requestBody);
}

export default function useSubmitVote() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => submitVote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activePoll'] });
    },
  });

  return mutation;
}
