import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

type ControlledRadioButtonsGroupProps = {
  teamMode: string;
  setTeamMode: (teamMode: string) => void;
};

export default function ControlledRadioButtonsGroup({
  teamMode,
  setTeamMode,
}: ControlledRadioButtonsGroupProps) {
  // const [value, setValue] = React.useState('2');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamMode((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl onSubmit={(e) => e.preventDefault()}>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={teamMode}
        onChange={handleChange}
      >
        <FormControlLabel
          value="2"
          control={<Radio />}
          label="2"
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 44,
            },
          }}
        />
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="3"
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 44,
            },
          }}
        />
      </RadioGroup>
    </FormControl>
  );
}
