import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Cancel } from '@mui/icons-material';

export default function MUIButton(props) {
  return (
      <Button onClick={props.onClick} variant="contained" endIcon={props.color=="error" ? <Cancel /> : <SendIcon />} color={props.color} style={props.style} disabled={props.disabled}>
        {props.title}
      </Button>
  );
}