import React from 'react';
import { Row, Col, Rate } from 'antd';
import './ReviewList.css';
import ReviewItem from './ReviewItem/ReviewItem';
import ReviewForm from './ReviewForm/ReviewForm';
import { ReviewListStyled } from './ReviewList.styled';

const ReviewList = () => (
  <ReviewListStyled>
    <Row>
      <h2>Reviews for ABC menu</h2>
    </Row>
    <Row>
      <Col span={6} className="opfc-rating-overall">
        <h4>Overall</h4>
        <div className="opfc-rating-overall-point">4/5</div>
        <Rate value={4.5} />
        <p className="opfc-rating-overall-count">324 Reviews</p>
      </Col>
      <Col span={18}>
        <ReviewForm />
      </Col>
    </Row>
    {
      Array.from(Array(5)).map(() => (
        <ReviewItem />
      ))
    }
  </ReviewListStyled>
);

export default ReviewList;
