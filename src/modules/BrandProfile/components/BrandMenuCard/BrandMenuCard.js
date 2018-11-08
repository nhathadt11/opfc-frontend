import React from 'react';
import {
  Card, Row, Col, Button, Icon, Modal,
} from 'antd';
import { shape, func, bool } from 'prop-types';
import { join, isEmpty } from 'lodash';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import './BrandMenuCard.css';
import { MenuInfoTitleStyled, MenuInfoValueStyled } from './BrandMenuCard.styled';

const BrandMenuCard = ({
  menu, openEditModal, profiling, history,
}) => {
  const confirmDelete = () => Modal.confirm({
    title: 'Delete Menu',
    content: 'Are you sure to delete this menu?',
    okText: 'Delete',
    cancelText: 'Cancel',
  });
  const { push } = history;

  return (
    <Card hoverable onClick={() => push(`/menus/${menu.id}`)} style={{ height: '100%' }}>
      <Row type="flex" className="opfc-meal-title">
        <Col><h3>{menu.menuName}</h3></Col>
        {
          profiling && (
            <Col className="opfc-meal-actions">
              <Button shape="circle" onClick={(e) => { e.stopPropagation(); openEditModal(); }}>
                <Icon type="edit" theme="outlined" />
              </Button>
              <Button type="danger" shape="circle" onClick={(e) => { e.stopPropagation(); confirmDelete(); }}>
                <Icon type="delete" theme="outlined" />
              </Button>
            </Col>
          )
        }
      </Row>
      <Row>
        <Col>
          <MenuInfoTitleStyled>Servings:</MenuInfoTitleStyled>
          <MenuInfoValueStyled>{menu.servingNumber}</MenuInfoValueStyled>
        </Col>
      </Row>
      <Row>
        <Col>
          <MenuInfoTitleStyled>Price:</MenuInfoTitleStyled>
          <MenuInfoValueStyled>{menu.price}</MenuInfoValueStyled>
        </Col>
      </Row>
      <Row>
        <Col>
          <MenuInfoTitleStyled>Meals:</MenuInfoTitleStyled>
          <MenuInfoValueStyled>{isEmpty(menu.mealNames) ? 'N/A' : join(menu.mealNames, ', ')}</MenuInfoValueStyled>
        </Col>
      </Row>
      <Row>
        <Col>
          <MenuInfoTitleStyled>Description:</MenuInfoTitleStyled>
          <MenuInfoValueStyled desc>{menu.description ? menu.description : 'N/A'}</MenuInfoValueStyled>
        </Col>
      </Row>
      <Row>
        <Col>
          <MenuInfoTitleStyled>Event Types:</MenuInfoTitleStyled>
          <MenuInfoValueStyled>{isEmpty(menu.eventTypeNames) ? 'N/A' : join(menu.eventTypeNames, ', ')}</MenuInfoValueStyled>
        </Col>
      </Row>
      <Row>
        <Col>
          <MenuInfoTitleStyled>Categories:</MenuInfoTitleStyled>
          <MenuInfoValueStyled>{isEmpty(menu.categoryNames) ? 'N/A' : join(menu.categoryNames, ', ')}</MenuInfoValueStyled>
        </Col>
      </Row>
    </Card>
  );
};

BrandMenuCard.propTypes = {
  menu: shape({}),
  openEditModal: func.isRequired,
  profiling: bool,
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

BrandMenuCard.defaultProps = {
  menu: {},
  profiling: false,
};

export default compose(
  withRouter,
)(BrandMenuCard);
