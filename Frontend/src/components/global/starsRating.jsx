import React, { useState, useEffect } from 'react';
import { Tooltip, Zoom } from '@mui/material';
import Star from './star';

const StarsRating = ({ totalStars, starSize, style, onChange, disableHover, disableSelection, selected, loggedIn }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(function(){
    if(selected){
      setSelectedStars(selected);
    }
  }, [])

  const handleStarClick = (selected) => {
    if(!disableSelection){
      setSelectedStars(selected);
      onChange(selected)
    }
  };

  const handleStarHover = (hovered) => {
    if(!disableHover){
      setHoveredStar(hovered);
    }
  };

  return (
    <Tooltip
      title={disableSelection && !selected ? loggedIn ? 'Only one review per ground is allowed. You may edit your posted review.' : 'You need to log in first.' : ''}
      placement="top-end"
      arrow
      enterDelay={200}
      leaveDelay={200}
      TransitionComponent={Zoom}
    >
      <div style={style}>
        {[...Array(totalStars)].map((_, index) => (
          <Star
            key={index}
            selected={index < selectedStars}
            $hovered={index < hoveredStar}
            onClick={() => handleStarClick(index + 1)}
            onMouseEnter={() => handleStarHover(index + 1)}
            onMouseLeave={() => handleStarHover(0)}
            size={starSize}
            cursor={disableSelection ? 'default' : 'pointer'}
          />
        ))}
      </div>
    </Tooltip>
  );
};

export default StarsRating;