import React from 'react';
import {
  Row, Col, Avatar, Rate,
} from 'antd';
import './ReviewItem.css';

const ReviewItem = () => (
  <Row type="flex" className="opfc-review-item">
    <Col className="opfc-review-item-info">
      <Avatar size={64} icon="user" />
      <div className="opfc-review-item-log">
        <section>John Doe</section>
        <section>New York</section>
        <section>2 weeks ago</section>
      </div>
    </Col>
    <Col className="opfc-review-item-content">
      <section className="opfc-review-item-info-title">Rating title</section>
      <div><Rate defaultValue={3.5} allowHalf /></div>
      <p className="opfc-review-item-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget ante id urna blandit venenatis in vitae enim.
      </p>
    </Col>
  </Row>
);

export default ReviewItem;
