import React from 'react';
import {
  Card, Icon, Row, Col, Avatar,
} from 'antd';
import { bool, shape, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  isEmpty, isString, isArray, split,
} from 'lodash';
import {
  MenuCardTitleStyled, CatergoryLabelStyled, MenuCardContentStyled,
  ByStyled, BrandNameStyled,
} from './MenuCard.styled';
import LocalIcon from '../../fonts/LocalFont';
import './MenuCard.css';
import { MENU_PHOTO_PLACHOLDER } from '../../constants/AppConstants';

const colorList = ['#78aea4', '#c9b6c7', '#ffd6d6', '#86dbc7', '#ae5d75'];
const randomRage = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getCategoryNameSingle = (menu) => {
  if (!menu) return 'N/A';

  if (!isEmpty(menu.categoryNames)) return menu.categoryNames[0];
  if (!isEmpty(menu.categoryList)) return menu.categoryList[0].name;

  return 'N/A';
};

const getThumbnailPhoto = ({ photo }) => {
  if (isEmpty(photo)) return MENU_PHOTO_PLACHOLDER;
  if (isArray(photo)) return photo[0];
  if (isString(photo)) return split(photo, ';')[0];

  return MENU_PHOTO_PLACHOLDER;
};

const MenuCard = ({ loading, history, menu }) => (
  <Card
    loading={loading}
    style={{ width: 200, height: '100%' }}
    hoverable
    bordered={false}
    className="opfc-menu-card"
    cover={<img className="ofpc-menu-image-cover" alt="example" src={getThumbnailPhoto(menu)} />}
    onClick={() => history.push(`/menus/${menu.id}`)}
  >
    <CatergoryLabelStyled>{getCategoryNameSingle(menu)}</CatergoryLabelStyled>
    <Row style={{ marginBottom: 10 }}>
      <Col span={8}>
        <Icon type="team" theme="outlined" style={{ color: '#f68b40' }} />
        <span style={{ marginLeft: 5 }}>{menu.servingNumber || 0}</span>
      </Col>
      <Col span={8}>
        <LocalIcon type="icon-bookmark" theme="outlined" style={{ color: '#f68b40' }} />
        <span style={{ marginLeft: 5 }}>{menu.totalBookmark || 0}</span>
      </Col>
      <Col span={8}>
        <Icon type="star" theme="outlined" style={{ color: '#f68b40' }} />
        <span style={{ marginLeft: 5 }}>{menu.totalRating || 0}</span>
      </Col>
    </Row>

    <Row>
      <Card.Meta
        title={<MenuCardTitleStyled>{menu.menuName}</MenuCardTitleStyled>}
        description={<MenuCardContentStyled>{menu.description}</MenuCardContentStyled>}
      />
    </Row>

    <Row>
      <Col className="opfc-brand-name">
        <ByStyled>By</ByStyled>
        <Avatar size={18} style={{ backgroundColor: colorList[randomRage(1, 5)] }}>
          {String(menu.brandName).charAt(0)}
        </Avatar>
        <BrandNameStyled
          onClick={(e) => { e.stopPropagation(); history.push(`/brand/${menu.brandId}`); }}
        >
          {menu.brandName}
        </BrandNameStyled>
      </Col>
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
