import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function AlertDialog({ open, onClose, onClick, color, title, text, button1, button2}) {
    const handleCancel = () => {
        onClose();
      };
    
      const handleEvent = () => {
        onClick();
      };
  
    return (
    <Dialog open={open} onClose={handleCancel}  
    PaperProps={{
        style: {
          backgroundColor: '#121212',
          color: 'whitesmoke',
        },
      }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'rgba(132, 136, 132)' }}>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleCancel} autoFocus>{button1}</Button>
        <Button color={color} onClick={handleEvent} autoFocus>{button2}</Button>
      </DialogActions>
    </Dialog>
  );
}
