import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SimplePaper() {
  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     '& > :not(style)': {
    //       m: 1,
    //       width: 500,
    //       height: 300,
    //     },
    //   }}
    // >
    <Paper elevation={10} className="loginBox">
      <div className='form'>
      <h2>Login</h2>
      <TextField
          id="standard-helperText"
          label="Email"
          helperText="eg. abc@abc.com"
          variant="standard"
        />
        <TextField
          id="standard-helperText"
          label="Password"
          variant="standard"
        />
        <Button variant="contained" color="secondary">Login</Button>
      </div>
    </Paper>
    // </Box>
  );
}
