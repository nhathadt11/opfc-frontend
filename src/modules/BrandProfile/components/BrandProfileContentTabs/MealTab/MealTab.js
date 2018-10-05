import React from 'react';
import { Row, Col } from 'antd';
import MealCard from '../../MealCard/MealCard';

const MealTab = () => (
  <Row type="flex" gutter={24}>
    {
      Array.from(Array(12)).map((meal, index) => (
        <Col
          key={index}
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          style={{ marginTop: 16 }}
        >
          <MealCard />
        </Col>
      ))
    }
  </Row>
);

export default MealTab;
