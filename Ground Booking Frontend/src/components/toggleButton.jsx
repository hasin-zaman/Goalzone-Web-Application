import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="success"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="Player" sx={{color: "whitesmoke"}}>Player</ToggleButton>
      <ToggleButton value="Ground-in-charge" sx={{color: "whitesmoke"}}>Ground-in-charge</ToggleButton>
      <ToggleButton value="Captain" sx={{color: "whitesmoke"}}>Captain</ToggleButton>
    </ToggleButtonGroup>
  );
}