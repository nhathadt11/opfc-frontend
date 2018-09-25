import React from 'react';
import {
  Card, Icon, Row, Col,
} from 'antd';
import { bool, shape, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { MenuCardTitleStyled, CatergoryLabelStyled } from './MenuCard.styled';

const MenuCard = ({ loading, history }) => (
  <Card
    loading={loading}
    style={{ width: 200 }}
    hoverable
    bordered={false}
    cover={<img alt="example" src="https://www.thelocal.it/userdata/images/article/69523836b0191608c41d640feead8da2be5462038d3409e1e3900fad039c7fc8.jpg" />}
    onClick={() => history.push('/menus/1')}
  >
    <CatergoryLabelStyled>Breakfast</CatergoryLabelStyled>
    <Row style={{ marginBottom: 20 }}>
      <Col span={8}>
        <Icon type="team" theme="outlined" style={{ color: '#f68b40' }} />
        <span style={{ marginLeft: 5 }}>10</span>
      </Col>
      <Col span={8}>
        <Icon type="heart" theme="outlined" style={{ color: '#f68b40' }} />
        <span style={{ marginLeft: 5 }}>50</span>
      </Col>
      <Col span={8}>
        <Icon type="star" theme="outlined" style={{ color: '#f68b40' }} />
        <span style={{ marginLeft: 5 }}>5</span>
      </Col>
    </Row>

    <Row>
      <Card.Meta
        title={<MenuCardTitleStyled>Bread</MenuCardTitleStyled>}
        description="Yummy bread"
      />
    </Row>
  </Card>
);

MenuCard.propTypes = {
  loading: bool,
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

MenuCard.defaultProps = {
  loading: false,
};

export default withRouter(MenuCard);
