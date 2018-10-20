import React from 'react';
import { Row, Col, Rate } from 'antd';
import { map } from 'lodash';
import { arrayOf, shape, string } from 'prop-types';
import './ReviewList.css';
import ReviewItem from './ReviewItem/ReviewItem';
import ReviewForm from './ReviewForm/ReviewForm';
import { ReviewListStyled } from './ReviewList.styled';

const ReviewList = ({ menuName, dataList }) => (
  <ReviewListStyled>
    <Row>
      <h2>Reviews for menu {menuName || 'N/A'}</h2>
    </Row>
    <Row>
      <Col span={6} className="opfc-rating-overall">
        <h4>Overall</h4>
        <div className="opfc-rating-overall-point">4/5</div>
        <Rate value={4.5} disabled />
        <p className="opfc-rating-overall-count">324 Reviews</p>
      </Col>
      <Col span={18}>
        <ReviewForm />
      </Col>
    </Row>
    {
      map(dataList, r => <ReviewItem key={r.ratingId} data={r} />)
    }
  </ReviewListStyled>
);

ReviewList.propTypes = {
  dataList: arrayOf(shape({})).isRequired,
  menuName: string.isRequired,
};

export default ReviewList;
