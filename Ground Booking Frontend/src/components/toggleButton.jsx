import * as React from 'react';
import {ToggleButtonGroup} from 'formik-mui';

export default function ToggleButtonMUI() {

  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="success"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
    </ToggleButtonGroup>
  );
}