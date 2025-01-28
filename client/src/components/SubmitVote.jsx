import useSubmitVote from '../hooks/useSubmitVote';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const styles = {
  card: {
    width: '100%',
    alignSelf: 'center',
    outline: 'solid white',
    '&:hover': {
      backgroundColor: 'rgba(181, 153, 247, 0.62)',
      cursor: 'pointer',
    },
  },
};

export default function SubmitVote({ pollId, selectedOption, setVoted }) {
  const mutation = useSubmitVote(setVoted);

  const handleClick = () => {
    const optionId = selectedOption._id;

    mutation.mutate({ pollId, optionId });
  };

  return (
    <Card sx={styles.card}>
      <CardActionArea
        disabled={selectedOption ? false : true}
        onClick={handleClick}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Submit
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
