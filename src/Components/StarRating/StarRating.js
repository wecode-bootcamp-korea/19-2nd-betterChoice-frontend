import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

const StarRating = ({ setReviewRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const starClick = ratingValue => {
    setRating(ratingValue);
    setReviewRate(ratingValue);
  };

  return (
    <div>
      {[...Array(5)].map((star, idx) => {
        const ratingValue = (idx + 1) * 2;
        return (
          <StarContainer key={idx} color={ratingValue <= (hover || rating)}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => starClick(ratingValue)}
            />
            <FaStar
              className="star"
              size={40}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </StarContainer>
        );
      })}
    </div>
  );
};

export default StarRating;

const StarContainer = styled.label`
  input[type='radio'] {
    display: none;
  }

  .star {
    cursor: pointer;
    transition: color 200ms;
    color: ${props => (props.color ? '#ffc107' : '#e4e5e9')};
  }
`;
