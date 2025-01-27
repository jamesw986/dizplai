import './App.css';
import Stack from '@mui/material/Stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Poll from './components/Poll';
import Logo from './assets/dizplai.svg';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <img src={Logo} alt="Dizplai logo" />
      <Stack spacing={4}>
        <Poll />
      </Stack>
    </QueryClientProvider>
  );
}

export default App;
