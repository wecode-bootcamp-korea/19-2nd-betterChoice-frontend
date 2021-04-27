import React from 'react';
import { useState } from 'react/cjs/react.development';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import StarRating from '../../../../../Components/StarRating/StarRating';
import { useLocation, useParams } from 'react-router-dom';

import { API } from '../../../../../config';

const PostReview = ({ setReviewData, setIsModalOn }) => {
  const history = useHistory();
  const params = useParams();
  const id = params.id;
  console.log(id);

  const [imgBase64, setImgBase64] = useState(''); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [uploadedfile, setUploadedFile] = useState([]); // 업로드한 파일
  const [reviewRate, setReviewRate] = useState(0);
  const [reviewDesc, setReviewDesc] = useState('');

  // 이미지파일 업로드
  const fileChangeHandler = e => {
    const files = e.target.files;
    setUploadedFile(files[0]);
  };

  //업로드한 이미지 미리보기
  const handleChangeFile = e => {
    e.preventDefault();

    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };

    const file = e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      setImgFile(file); // 파일 상태 업데이트
    }
  };

  // 내용 보내기
  const descChangeHandler = e => {
    const description = e.target.value;
    setReviewDesc(description);
  };

  // 리뷰 작성 완료 시 fetch post
  const submitReview = e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('files', uploadedfile);
    fd.append('rate', reviewRate);
    fd.append('content', reviewDesc);

    const Authorization = localStorage.getItem('ACCESS_TOKEN');

    fetch(`${API}/reviews/hotel/${id}`, {
      method: 'POST',
      headers: {
        Authorization: Authorization,
      },
      body: fd,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        console.log(response['MESSAGE'] !== 'SUCCESS');
        if (response['MESSAGE'] === 'SUCCESS') {
          alert('리뷰가 정상적으로 등록되었습니다.');
          setIsModalOn(false);
        } else {
          alert('리뷰를 등록할 수 없는 사용자입니다.');
          // history.push('/');
        }
      });
  };

  return (
    <Background>
      <MainWrapper>
        <ImageUploader
          onChange={handleChangeFile}
          name="uploadedImg"
          id="uploadedImg"
          type="file"
          accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
        >
          {imgBase64 ? (
            <Preview>
              <img src={imgBase64} alt="imgPreview" />
            </Preview>
          ) : null}
          <InsideUploader>
            <IconWrap>
              <svg>
                <path d="M24 12c0-6.627-5.372-12-12-12C5.373 0 0 5.373 0 12s5.373 12 12 12c6.628 0 12-5.373 12-12zm-10.767 3.75a1.25 1.25 0 0 1-2.5 0v-3.948l-1.031 1.031a1.25 1.25 0 0 1-1.768-1.768L12 7l4.066 4.065a1.25 1.25 0 0 1-1.768 1.768l-1.065-1.065v3.982z"></path>
              </svg>
            </IconWrap>
            <Advice> 리뷰 이미지 업로드</Advice>
            <Uploader
              id="ImageUploader"
              onChange={fileChangeHandler}
              type="file"
              accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
            />
          </InsideUploader>
        </ImageUploader>
        <ContentsUploader>
          <StarRatingWrapper>
            <StarRating setReviewRate={setReviewRate} />
          </StarRatingWrapper>
          <ContentsInput
            type="text"
            placeholder="내용을 입력하세요"
            onChange={descChangeHandler}
          ></ContentsInput>
          <BtnContainer>
            <SubmitBtn onClick={submitReview}>작성 완료</SubmitBtn>
            <CloseBtn onClick={() => setIsModalOn(false)}>닫기</CloseBtn>
          </BtnContainer>
        </ContentsUploader>
      </MainWrapper>
    </Background>
  );
};

export default PostReview;

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
`;

const MainWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 50%;
  width: 600px;
  height: auto;
  padding: 20px;
  transform: translate(-50%, 100%);
  background-color: #fff;
  border-radius: 16px;
`;

const ImageUploader = styled.div`
  flex-basis: 50%;
  border: 3px solid ${props => props.theme.borderGray};
  width: 100%;
  border-radius: 8px;
  padding: 15px;
  height: 300px;
  cursor: pointer;
  position: relative;
`;

const InsideUploader = styled.div`
  position: relative;
  border: 2px dashed rgb(218, 218, 218);
  border-radius: 6px;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const IconWrap = styled.div`
  position: absolute;
  top: 45%;
  left: 45%;
  transition: (-50%, -40%);
  display: block;
  padding: 1px;
  svg {
    color: #767676;
    width: 48px;
    height: 48px;
    path {
      fill: currentColor;
    }
  }
`;

const Advice = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  padding: auto 48px;
  position: absolute;
  top: 60%;
`;

const Uploader = styled.input`
  height: 100%;
  opacity: 0;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 0px;
  font-size: 0px;
  height: 100%;
`;

const Preview = styled.div`
  top: 0;
  left: 0;
  z-index: 700;
  position: absolute;
  border-radius: 8px;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;

const ContentsUploader = styled.div`
  margin-left: 10px;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &:focus {
    outline: none;
  }
`;

const StarRatingWrapper = styled.div``;

const ContentsInput = styled.textarea`
  font-size: ${props => props.theme.fontSizeMedium};
  margin-top: 5px;
  padding: 20px;
  width: 100%;
  height: 100%;
  border: 3px solid ${props => props.theme.borderGray};
  border-radius: 8px;
  &:focus {
    outline: none;
  }
`;

const BtnContainer = styled.div`
  width: 100%;
`;

const SubmitBtn = styled.button`
  width: 50%;
  border-radius: 8px;
  margin-top: 5px;
  padding: 10px 0;
  font-size: ${props => props.theme.fontSizeMedium};
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.mainColor};
  &:focus {
    outline: none;
  }
`;

const CloseBtn = styled.button`
  width: 50%;
  border-radius: 8px;
  margin-top: 5px;
  padding: 10px 0;
  font-size: ${props => props.theme.fontSizeMedium};
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.mainColor};
  &:focus {
    outline: none;
  }
`;
