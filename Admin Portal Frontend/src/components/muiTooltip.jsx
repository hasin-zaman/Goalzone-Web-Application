import React from 'react'
import { Tooltip, IconButton, Zoom } from '@mui/material'
import { Delete, Edit, Add } from '@mui/icons-material'

export default function MUITooltip({icon, title, color, onClick}) {
  return (
    <Tooltip title={title} placement='top-start' arrow enterDelay={200} leaveDelay={200} TransitionComponent={Zoom} >
        <IconButton color={color} onClick={onClick}> 
            {icon=="delete" ? <Delete /> : icon=="edit" ? <Edit/> : <Add/>}
        </IconButton>
    </Tooltip>
  )
}
