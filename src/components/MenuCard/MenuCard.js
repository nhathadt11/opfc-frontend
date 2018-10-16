import React from 'react';
import {
  Card, Icon, Row, Col,
} from 'antd';
import { bool, shape, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { MenuCardTitleStyled, CatergoryLabelStyled, MenuCardContentStyled } from './MenuCard.styled';
import LocalIcon from '../../fonts/LocalFont';

const MenuCard = ({ loading, history, menu }) => (
  <Card
    loading={loading}
    style={{ width: 200, height: '100%' }}
    hoverable
    bordered={false}
    cover={<img alt="example" src="https://66.media.tumblr.com/a2f0c1471f30dd3e89325ee9f6b86bc8/tumblr_pflxnarapM1sxuwguo1_640.jpg" />}
    onClick={() => history.push(`/menus/${menu.id}`)}
  >
    <CatergoryLabelStyled>Breakfast</CatergoryLabelStyled>
    <Row style={{ marginBottom: 20 }}>
      <Col span={8}>
        <Icon type="team" theme="outlined" style={{ color: '#f68b40' }} />
        <span style={{ marginLeft: 5 }}>{menu.servingNumber}</span>
      </Col>
      <Col span={8}>
        <LocalIcon type="icon-bookmark" theme="outlined" style={{ color: '#f68b40' }} />
        <span style={{ marginLeft: 5 }}>{menu.totalBookmark}</span>
      </Col>
      <Col span={8}>
        <Icon type="star" theme="outlined" style={{ color: '#f68b40' }} />
        <span style={{ marginLeft: 5 }}>{menu.totalRating}</span>
      </Col>
    </Row>

    <Row>
      <Card.Meta
        title={<MenuCardTitleStyled>{menu.menuName}</MenuCardTitleStyled>}
        description={<MenuCardContentStyled>{menu.description}</MenuCardContentStyled>}
      />
    </Row>
  </Card>
);

MenuCard.propTypes = {
  loading: bool,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  menu: shape({}),
};

MenuCard.defaultProps = {
  loading: false,
  menu: {},
};

export default withRouter(MenuCard);
