import React from 'react';
import { Row } from 'antd';
import './ReviewList.css';
import ReviewItem from './ReviewItem/ReviewItem';

const ReviewList = () => (
  <div>
    <Row>
      <h2>Reviews for ABC menu</h2>
    </Row>
    {
      Array.from(Array(5)).map(() => (
        <ReviewItem />
      ))
    }
  </div>
);

export default ReviewList;
