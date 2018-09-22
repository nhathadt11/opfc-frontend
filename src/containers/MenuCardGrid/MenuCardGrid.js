import React from 'react';
import { map } from 'lodash';
import { Row, Col } from 'antd';
import MenuCard from '../../components/MenuCard/MenuCard';

const MenuCardGrid = () => (
  <Row type="flex" gutter={24} style={{ margin: 'auto 24px' }}>
    {
      map(Array.from(Array(12)), (_, index) => <Col style={{ margin: '12px 0' }}><MenuCard key={index} /></Col>)
    }
  </Row>
);

export default MenuCardGrid;
