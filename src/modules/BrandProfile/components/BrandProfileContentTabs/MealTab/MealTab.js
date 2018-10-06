import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
import MealCard from '../../MealCard/MealCard';
import CreateMealModal from '../../CreateMealModal/CreateMealModal';

const MealTab = () => (
  <Fragment>
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
            <MealCard
              meal={{ id: 1, mealName: 'Chicken', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget ante id urna blandit venenatis in vitae enim.' }}
            />
          </Col>
        ))
      }
    </Row>
    <CreateMealModal />
  </Fragment>
);

export default MealTab;
