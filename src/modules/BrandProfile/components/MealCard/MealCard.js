import React from 'react';
import {
  Card, Row, Col, Button, Icon,
} from 'antd';
import './MealCard.css';

const MealCard = () => (
  <Card hoverable>
    <Row type="flex" className="opfc-meal-title">
      <Col><h3>Meal Name</h3></Col>
      <Col className="opfc-meal-actions">
        <Button shape="circle">
          <Icon type="edit" theme="outlined" />
        </Button>
        <Button type="danger" shape="circle">
          <Icon type="delete" theme="outlined" />
        </Button>
      </Col>
    </Row>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Integer eget ante id urna blandit venenatis in vitae enim.
    </p>
  </Card>
);

export default MealCard;
