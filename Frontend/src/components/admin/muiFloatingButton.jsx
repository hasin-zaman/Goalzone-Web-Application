import * as React from 'react';
import { Tooltip, Zoom } from '@mui/material'
import Fab from '@mui/material/Fab';
import { Add } from '@mui/icons-material';

export default function MUIFloatingButton({ toolTip, onClick }) {
  return (
    onClick ?
    <Tooltip title={toolTip} placement='top-start' arrow enterDelay={200} leaveDelay={200} TransitionComponent={Zoom}>
        <Fab size="small" color="success" aria-label="add" sx={{float: 'right', display: 'relative', bottom: '65px', right: '60px'}} onClick={onClick}>
            <Add />
        </Fab>
    </Tooltip>
    :
    null
  );
}