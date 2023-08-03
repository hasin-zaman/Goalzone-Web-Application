import React from 'react'
import { Tooltip, IconButton, Zoom } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'

export default function MUITooltip({icon, title, color, onClick, style}) {
  return (
    <Tooltip title={title} placement='top-start' arrow enterDelay={200} leaveDelay={200} TransitionComponent={Zoom} style={style}>
        <IconButton color={color} onClick={onClick}> 
            {icon=="delete" ? <Delete /> : <Edit/>}
        </IconButton>
    </Tooltip>
  )
}
