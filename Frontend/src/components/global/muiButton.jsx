import * as React from 'react';
import Button from '@mui/material/Button';

export default function MUIButton(props) {
  const {
    onClick,
    variant = 'contained',
    icon,
    color = "success",
    style = { minWidth: "150px" },
    disabled,
    size = "medium",
    type,
    title,
  } = props;

  return (
    <Button
      onClick={onClick}
      variant={variant}
      endIcon={icon ? icon : null}
      color={color}
      style={style}
      disabled={disabled}
      size={size}
      type={type}
    >
      {title}
    </Button>
  );
}
