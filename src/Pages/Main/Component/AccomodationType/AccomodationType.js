import React, { useState, useEffect } from 'react';
import { API } from '../../../../config';
import styled from 'styled-components';

const AccomodationType = ({ accomoType, setAccomoType }) => {
  const [categoryType, setCategoryType] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const handleColor = e => {
    const { id, alt } = e.target;
    setCurrentId(+id);
    setAccomoType(alt);
  };

  useEffect(() => {
    fetch(`${API}/hotels/main`)
      .then(res => res.json())
      .then(res => {
        setCategoryType(res.results);
      });
  }, []);

  return (
    <Wrapper>
      {categoryType &&
        categoryType.map((img, index) => (
          <ImageBox key={img.image_url}>
            <Image
              id={index}
              src={img.image_url}
              alt={img.category}
              onClick={handleColor}
            />
            <Title color={currentId === index}>{img.category}</Title>
          </ImageBox>
        ))}
    </Wrapper>
  );
};

export default AccomodationType;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCenter};
  height: 90px;
`;

const ImageBox = styled.div`
  ${({ theme }) => theme.flexVertical}
`;

const Image = styled.img`
  display: block;
  width: 50px;
  height: 50px;
  margin-right: 50px;
  cursor: pointer;
`;

const Title = styled.span`
  color: ${({ color, theme }) => (color ? theme.mainColor : '#4d4d4d')};
  display: inline-block;
  width: 50px;
  font-size: 14px;
  font-weight: ${({ color, theme }) => color && theme.fontWeightBold};
  text-align: center;
  margin-top: 10px;
`;
