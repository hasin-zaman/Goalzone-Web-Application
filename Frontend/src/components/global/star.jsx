import React from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const StyledStar = styled(FaStar)`
  color: ${props => props.selected || props.$hovered ? 'orange' : 'grey'};
`;

const Star = ({ selected, $hovered, onClick, onMouseEnter, onMouseLeave, size, cursor }) => (
  <StyledStar
    selected={selected}
    $hovered={$hovered}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    size={size}
    cursor={cursor}
  />
);

export default Star;