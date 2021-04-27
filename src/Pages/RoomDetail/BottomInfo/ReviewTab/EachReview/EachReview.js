import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const EachReview = ({ review }) => {
  const {
    nickname,
    rate,
    rate_comment,
    content,
    created_at,
    image_url,
  } = review;

  return (
    <ReviewWrapper>
      <ImgContainer>
        <img
          src="//image.goodchoice.kr/profile/ico/ico_25.png"
          alt="icon img"
        />
      </ImgContainer>
      <ContentsContainer>
        <div className="review_title">{rate_comment}</div>
        <IconContainer>
          {rate >= 10 && (
            <>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </>
          )}
          {rate >= 8 && rate < 10 && (
            <>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </>
          )}
          {rate >= 6 && rate < 8 && (
            <>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </>
          )}
          {rate >= 4 && rate < 6 && (
            <>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </>
          )}
          {rate >= 2 && rate < 4 && (
            <>
              <FontAwesomeIcon icon={faStar} />
            </>
          )}
        </IconContainer>
        <span className="rate"> {parseFloat(rate).toFixed(1)}</span>
        <div className="uploader">{nickname}</div>
        {image_url.length !== 0 && (
          <ImgWrapper isImgUploaded={image_url}>
            {image_url.map(img => {
              return <img key={img} src={img} alt="review img" />;
            })}
          </ImgWrapper>
        )}

        <p className="contents">{content}</p>
        <div className="dates_passed">작성일자 : {created_at}</div>
      </ContentsContainer>
    </ReviewWrapper>
  );
};

export default EachReview;

const ReviewWrapper = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.borderGray};
  img {
    width: 55px;
    height: 55px;
  }
`;

const ImgContainer = styled.div`
  margin-right: 20px;
`;

const ContentsContainer = styled.div`
  .rate,
  .option_name,
  .uploader,
  .contents {
    margin: 15px 0;
  }

  .uploader {
    color: ${props => props.theme.fontGray};
  }

  .contents {
    font-size: 20px;
  }

  .review_title {
    margin-bottom: 15px;
    font-size: ${props => props.theme.fontSizeMedium};
    font-weight: ${props => props.theme.fontWeightBold};
    color: ${props => props.theme.black};
  }

  .option_name,
  .dates_passed {
    color: ${props => props.theme.fontGray};
  }
`;

const IconContainer = styled.span`
  color: #ffc107;
  font-size: 20px;
`;

const ImgWrapper = styled.div`
  display: ${props => (props.isImgUploaded ? 'flex' : 'none')};
  width: 33%;
  height: 250px;
  margin: 10px 0;
  img {
    margin-right: 5px;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;
