import * as React from 'react';
import styled from 'styled-components';
import { TextField, Tooltip, Zoom } from '@mui/material';

const FormField = styled(TextField)`
  width: 100%;
  background-color: #eef2e6;
  border-radius: 7px;

  & .MuiInputLabel-root {
    color: black;
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: black;
    }

    &:hover fieldset {
      border-color: black;
    }

    &.Mui-focused fieldset {
      border-color: green;
    }
  }

  & .MuiInputLabel-root.Mui-focused {
    color: green;
  }
`;

export default function MUITextField(props) {
  return (
    <Tooltip
      title={props.disabled ? props.loggedIn ? 'Only one review per ground is allowed. You may edit your posted review.' : 'You need to log in first.' : ''}
      placement="top-end"
      arrow
      enterDelay={200}
      leaveDelay={200}
      TransitionComponent={Zoom}
    >
      <FormField
        label={props.label}
        variant={props.variant}
        disabled={props.disabled}
        name={props.name}
        value={props.value || props.defaultValue}
        onChange={props.onChange}
        multiline={props.multiline}
        rows={props.rows}
        placeholder={props.placeholder}
        style={props.style}
      />
    </Tooltip>
  );
}
