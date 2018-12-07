import React from 'react';
import {
  Row, Col, Rate, Spin,
} from 'antd';
import { map } from 'lodash';
import {
  arrayOf, shape, string, bool, number,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './ReviewList.css';
import ReviewItem from './ReviewItem/ReviewItem';
import ReviewForm from './ReviewForm/ReviewForm';
import { ReviewListStyled } from './ReviewList.styled';

const ReviewList = ({
  menuName, dataList, fetching, totalRating, averageRatingPoint,
}) => (
  <ReviewListStyled>
    <Row className="opfc-review-menu-name">
      <h2>Reviews for menu {menuName || 'N/A'}</h2>
    </Row>
    <Row className="opfc-review-post">
      <Col span={6} className="opfc-rating-overall">
        <h4>Overall</h4>
        <div className="opfc-rating-overall-point">{averageRatingPoint.toFixed(1)}/5</div>
        <Rate value={averageRatingPoint} allowHalf disabled />
        <p className="opfc-rating-overall-count">{totalRating} Reviews</p>
      </Col>
      <Col span={18}>
        <ReviewForm />
      </Col>
    </Row>
    <Spin spinning={fetching}>
      <Row className="opfc-review-list">
        {
          map(dataList, r => <ReviewItem key={r.ratingId} data={r} />)
        }
      </Row>
    </Spin>
  </ReviewListStyled>
);

ReviewList.propTypes = {
  dataList: arrayOf(shape({})).isRequired,
  menuName: string.isRequired,
  fetching: bool,
  averageRatingPoint: number,
  totalRating: number,
};

ReviewList.defaultProps = {
  fetching: false,
  averageRatingPoint: 0,
  totalRating: 0,
};

const mapStateToProps = state => ({
  fetching: state.ratingReducer.fetching,
});

export default compose(
  connect(mapStateToProps),
)(ReviewList);
