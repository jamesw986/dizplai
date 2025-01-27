import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const styles = {
  card: {
    width: '100%',
    height: '8vh',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  cardContent: { position: 'relative', height: '100%', padding: 0 },
  cardBox: { width: '100%', height: '100%', position: 'relative' },
  linearProgress: {
    height: '100%',
    backgroundColor: 'rgba(179, 149, 253, 0.18)',
  },
  optionTextBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontWeight: 'bold',
  },
  votePercentageBox: {
    position: 'absolute',
    top: '50%',
    right: 1,
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontWeight: 'bold',
  },
};

function calculateVotePercentage(optionVoteCount, totalPollVotes) {
  return (optionVoteCount / totalPollVotes) * 100;
}

export default function PollResult({ option, totalVotes }) {
  const optionText = option.option;

  const votePercentage = calculateVotePercentage(option.votes, totalVotes);

  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Box sx={styles.cardBox}>
          <LinearProgress
            variant="determinate"
            value={votePercentage}
            sx={styles.linearProgress}
          />
          <Box sx={styles.optionTextBox}>
            <Typography variant="body2">{optionText}</Typography>
          </Box>
          <Box sx={styles.votePercentageBox}>
            <Typography variant="body2">
              {`${votePercentage.toFixed(0)}%`}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
