import Stack from '@mui/material/Stack';
import PollOption from './PollOption';

export default function PollOptions({
  options,
  selectedOption,
  setSelectedOption,
}) {
  const votingOptions = options.map((option) => {
    const optionText = option.option;

    return (
      <PollOption
        key={optionText}
        option={option}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    );
  });

  return <Stack spacing={4}>{votingOptions}</Stack>;
}
