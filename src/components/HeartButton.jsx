import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeart as regularHeart } from '@fortawesome/free-solid-svg-icons';

const HeartButton = () => {
  const [isLiked, setLiked] = useState(false);

  const handleLikeToggle = () => {
    setLiked(!isLiked);
  };

  return (
    <button onClick={handleLikeToggle}>
      <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart} color={isLiked ? 'red' : 'black'} />
    </button>
  );
};

export default HeartButton;
