import React from 'react';
import {
  Row, Col, Avatar, Rate,
} from 'antd';
import moment from 'moment';
import { shape } from 'prop-types';
import './ReviewItem.css';

const ReviewItem = ({ data }) => (
  <Row type="flex" className="opfc-review-item">
    <Col className="opfc-review-item-info">
      <Avatar size={64} icon="user" />
      <div className="opfc-review-item-log">
        <section>{data.author || 'N/A'}</section>
        <section>{data.cityName || 'N/A'}</section>
        <section>{data.rateTime && moment(data.rateTime).isValid() ? moment(data.rateTime).fromNow() : 'N/A'}</section>
      </div>
    </Col>
    <Col className="opfc-review-item-content">
      <section className="opfc-review-item-info-title">{data.title || 'N/A'}</section>
      <div><Rate defaultValue={data.rate} allowHalf disabled /></div>
      <p className="opfc-review-item-text">
        {data.comment || 'N/A'}
      </p>
    </Col>
  </Row>
);

ReviewItem.propTypes = {
  data: shape({}).isRequired,
};

export default ReviewItem;
