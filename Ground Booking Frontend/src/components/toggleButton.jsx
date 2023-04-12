import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

export default function ColorToggleButton(props) {

  const [role, setRole]=useState("");

  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
    
    // setAlignment(newAlignment);
  };

  const handleToggle = e => {
    setRole(e.target.value);
    props.onToggleChange(e.target.value);
  };

  return (
    <ToggleButtonGroup
      color="success"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton name="role" value="Player" onClick={handleToggle} sx={{color: "whitesmoke"}} defaultChecked>Player</ToggleButton>
      <ToggleButton name="role" value="Ground-in-charge" onClick={handleToggle} sx={{color: "whitesmoke"}}>Ground-in-charge</ToggleButton>
      <ToggleButton name="role" value="Captain" onClick={handleToggle} sx={{color: "whitesmoke"}}>Captain</ToggleButton>
    </ToggleButtonGroup>
  );
}