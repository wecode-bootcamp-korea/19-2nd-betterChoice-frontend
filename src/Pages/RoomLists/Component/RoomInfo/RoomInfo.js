import { React } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { queryToString } from '../../../../utils/queryString';
import moment from 'moment';
import StatusLabel from '../StatusLabel/StatusLabel';
import styled from 'styled-components';

const RoomInfo = ({ roomInfoArr }) => {
  const history = useHistory();
  const location = useLocation();

  const goToRoomDetail = id => {
    const getMainInfo = location.search
      .substr(location.search.indexOf('?') + 1)
      .split('&');
    const newObj = {
      check_in: moment(getMainInfo[2].split('=')[1]).format('YYYY-MM-DD'),
      check_out: moment(getMainInfo[3].split('=')[1]).format('YYYY-MM-DD'),
    };
    const queryId = queryToString(newObj);
    history.push(`/room/detail/${id}${queryId}`);
  };

  const countStars = rate => {
    return '★'.repeat(Math.ceil(rate / 2));
  };

  const countComment = rate => {
    const commentMapper = {
      [rate >= 7]: '좋아요',
      [rate >= 8]: '우수해요',
      [rate >= 9]: '최고에요',
      [rate < 7]: '만족해요',
    };
    return <span>{commentMapper.true}</span>;
  };

  return (
    <>
      <Wrapper>
        {roomInfoArr &&
          roomInfoArr.map(data => {
            const {
              id,
              thumbnail_image,
              hotel_review_rate,
              name,
              address,
              star,
              lowest_original_price,
              lowest_discount_price,
            } = data;

            return (
              <RoomLists
                key={id}
                onClick={() => {
                  goToRoomDetail(id);
                }}
              >
                <RoomImg>
                  <img src={thumbnail_image} alt="roomImg" />
                </RoomImg>
                <RoomDesc>
                  <ul>
                    {star === 5 && (
                      <StatusLabel
                        text="5성급"
                        color={({ theme }) => theme.fiveStars}
                      />
                    )}
                    {star === 4 && (
                      <StatusLabel
                        text="4성급"
                        color={({ theme }) => theme.fourStars}
                      />
                    )}
                    {star === 3 && (
                      <StatusLabel
                        text="3성급"
                        color={({ theme }) => theme.threeStars}
                      />
                    )}

                    <Name>{name}</Name>
                    <Address>{address}</Address>
                    {hotel_review_rate !== null && (
                      <ReviewWrap>
                        <Star>{countStars(hotel_review_rate)}</Star>
                        <ReviewRate>
                          {String(hotel_review_rate).slice(0, 3)}
                        </ReviewRate>
                        <ReviewStatus>
                          {countComment(hotel_review_rate)}
                        </ReviewStatus>
                      </ReviewWrap>
                    )}
                    <RoomPrice>
                      <Price>{lowest_original_price.toLocaleString()}원</Price>
                      <DiscountPrice>
                        {lowest_discount_price.toLocaleString()}원
                      </DiscountPrice>
                    </RoomPrice>
                  </ul>
                </RoomDesc>
              </RoomLists>
            );
          })}
      </Wrapper>
    </>
  );
};

export default RoomInfo;

const Wrapper = styled.section`
  width: 1000px;
`;

const RoomLists = styled.div`
  position: relative;
  display: flex;
  height: 280px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.boxGray};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out;
  }
`;

const RoomImg = styled.div`
  ${({ theme }) => theme.flexCenter}
  img {
    height: 280px;
  }
`;

const RoomDesc = styled.div`
  padding: 20px;
`;

const Name = styled.li`
  margin: 10px 0;
  font-size: 25px;
  font-weight: calc(${({ theme }) => theme.fontWeightBold}*0.7);
`;

const Address = styled.li`
  margin-bottom: 50px;
  font-size: 16px;
  color: ${({ theme }) => theme.middleGray};
`;

const ReviewWrap = styled.div`
  margin-top: -10px;
`;
const Star = styled.span`
  display: block;
  margin-bottom: 2px;
  color: ${({ theme }) => theme.yellow};
`;

const ReviewRate = styled.span`
  display: inline-block;
  text-align: center;
  width: 40px;
  height: 25px;
  line-height: 23px;
  border-radius: 4px;
  margin-top: 10px;
  margin-right: 5px;
  font-size: 15px;
  color: ${({ theme }) => theme.fontGray};
  color: white;
  background-color: #003580;
`;

const ReviewStatus = styled.span`
  display: inline-block;
  margin-top: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.fontGray};
`;

const RoomPrice = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  right: 30px;
  bottom: 30px;
`;

const Price = styled.li`
  margin-bottom: 10px;
  text-decoration: line-through;
`;

const DiscountPrice = styled.li`
  font-weight: ${({ theme }) => theme.fontWeightBold};
  font-size: calc(${({ theme }) => theme.fontSizeMedium}*1.3);
`;
