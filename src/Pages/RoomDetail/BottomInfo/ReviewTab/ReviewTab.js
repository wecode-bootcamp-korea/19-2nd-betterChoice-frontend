import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { API } from '../../../../config';

import styled from 'styled-components';
import EachReview from './EachReview/EachReview';
import PostReview from './PostReview/PostReview';

const ReviewTab = () => {
  const location = useLocation();
  const params = useParams();
  const [reviewData, setReviewData] = useState([]);
  const [isModalOn, setIsModalOn] = useState(false);

  // FETCH POST한 정보를 최종적으로 리뷰탭에 GET방식으로 뿌려주는 통신

  useEffect(() => {
    const { id } = params;

    fetch(`${API}/reviews/hotel/${id}`)
      .then(res => res.json())
      .then(data => {
        setReviewData(data.RESULTS);
      });
  }, []);

  // 리뷰 작성 시 모달창 생성
  const showReviewModal = () => {
    setIsModalOn(!isModalOn);
  };

  console.log(reviewData);

  return (
    <ReviewTabWrapper>
      <ButtonContainer>
        <BuildReview onClick={showReviewModal}>리뷰 작성</BuildReview>
      </ButtonContainer>
      {isModalOn && (
        <PostReview setIsModalOn={setIsModalOn} setReviewData={setReviewData} />
      )}
      {reviewData &&
        reviewData.map(review => {
          return <EachReview review={review} key={review.title} />;
        })}
    </ReviewTabWrapper>
  );
};

export default ReviewTab;

const ReviewTabWrapper = styled.ul`
  padding: 20px 0;
`;

const ReviewRateContainer = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const BuildReview = styled.button`
  padding: 10px 20px;
  font-size: ${props => props.theme.fontSizeMedium};
  border-radius: 8px;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.mainColor};
`;
