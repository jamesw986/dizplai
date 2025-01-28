import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

const styles = {
  card: {
    width: '100%',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '8vh',
    backgroundColor: 'transparent',
    outline: 'solid white',
    '&:hover': {
      backgroundColor: 'rgba(181, 153, 247, 0.14)',
    },
  },
  cardActionArea: {
    '&[data-active]': {
      backgroundColor: 'rgba(181, 153, 247, 0.81)',
    },
  },
};

export default function PollOption({
  option,
  selectedOption,
  setSelectedOption,
}) {
  const optionText = option.option;

  const handleClick = () => {
    setSelectedOption(option);
  };

  const isOptionSelected = () => {
    if (!selectedOption) return false;

    return selectedOption._id === option._id;
  };

  return (
    <Card sx={styles.card}>
      <CardActionArea
        onClick={handleClick}
        data-active={isOptionSelected() ? '' : undefined}
        sx={styles.cardActionArea}
      >
        <CardContent>
          <Typography variant="h5" color="white">
            {optionText}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
