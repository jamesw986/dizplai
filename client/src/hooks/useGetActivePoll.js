import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getActivePoll() {
  const response = await axios.get('http://localhost:3000/polls/active');

  return response.data[0];
}

export default function useGetActivePoll() {
  return useQuery({
    queryKey: ['activePoll'],
    queryFn: getActivePoll,
  });
}
