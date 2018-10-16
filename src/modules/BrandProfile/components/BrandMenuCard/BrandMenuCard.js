import React from 'react';
import {
  Card, Row, Col, Button, Icon, Modal, Tag,
} from 'antd';
import { shape, func, bool } from 'prop-types';
import {
  find, map, join, isEmpty,
} from 'lodash';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import './BrandMenuCard.css';
import { MenuInfoTitleStyled, MenuInfoValueStyled } from './BrandMenuCard.styled';

const tags = [
  { id: 1, name: 'Wedding' },
  { id: 2, name: 'Birthday' },
  { id: 3, name: 'Family' },
];

const tagById = (id) => {
  const found = find(tags, tag => tag.id === id);

  return found ? found.name : undefined;
};

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
    <Card hoverable onClick={() => push(`/menus/${menu.id}`)}>
      <Row type="flex" className="opfc-meal-title">
        <Col><h3>{menu.menuName}</h3></Col>
        {
          profiling && (
            <Col className="opfc-meal-actions">
              <Button shape="circle" onClick={openEditModal}>
                <Icon type="edit" theme="outlined" />
              </Button>
              <Button type="danger" shape="circle" onClick={confirmDelete}>
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
          <MenuInfoTitleStyled>Event Types:</MenuInfoTitleStyled>
          <MenuInfoValueStyled>{isEmpty(menu.eventTypeNames) ? 'N/A' : join(menu.eventTypeNames, ', ')}</MenuInfoValueStyled>
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
          <MenuInfoTitleStyled>Descrition:</MenuInfoTitleStyled>
          <MenuInfoValueStyled>{menu.description ? menu.description : 'N/A'}</MenuInfoValueStyled>
        </Col>
      </Row>
      <Row className="opfc-brand-menu-card-tag">
        {
          map(menu.tagList, tag => <Tag key={tag}>{tagById(tag)}</Tag>)
        }
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
