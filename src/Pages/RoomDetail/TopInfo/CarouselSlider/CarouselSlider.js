import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const CarouselSlider = ({ imgs }) => {
  return (
    <Container>
      <StyledSlider {...settings}>
        {imgs.hotel_image &&
          imgs.hotel_image.map((el, idx) => {
            return (
              <div key={idx}>
                <ImageContainer>
                  <Image src={el} />
                </ImageContainer>
              </div>
            );
          })}
      </StyledSlider>
    </Container>
  );
};

export default CarouselSlider;

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  centerMode: false,
};

const Container = styled.div`
  overflow: hidden;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
`;

const ImageContainer = styled.div`
  margin: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 350px;
  border-radius: 4px;
`;
