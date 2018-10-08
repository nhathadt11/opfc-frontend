import React from 'react';
import {
  Card, Row, Col, Button, Icon, Modal, Tag,
} from 'antd';
import { shape, func } from 'prop-types';
import { find } from 'lodash';
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

const BrandMenuCard = ({ menu, openEditModal }) => {
  const confirmDelete = () => Modal.confirm({
    title: 'Delete Menu',
    content: 'Are you sure to delete this menu?',
    okText: 'Delete',
    cancelText: 'Cancel',
  });

  return (
    <Card hoverable>
      <Row type="flex" className="opfc-meal-title">
        <Col><h3>{menu.menuName}</h3></Col>
        <Col className="opfc-meal-actions">
          <Button shape="circle" onClick={openEditModal}>
            <Icon type="edit" theme="outlined" />
          </Button>
          <Button type="danger" shape="circle" onClick={confirmDelete}>
            <Icon type="delete" theme="outlined" />
          </Button>
        </Col>
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
          <MenuInfoTitleStyled>Event Type:</MenuInfoTitleStyled>
          <MenuInfoValueStyled>{menu.eventType}</MenuInfoValueStyled>
        </Col>
      </Row>
      <Row>
        <Col>
          <MenuInfoTitleStyled>Number of meals:</MenuInfoTitleStyled>
          <MenuInfoValueStyled>{[...menu.meals].length}</MenuInfoValueStyled>
        </Col>
      </Row>
      <Row>
        <Col>
          <MenuInfoTitleStyled>Descrition:</MenuInfoTitleStyled>
          <MenuInfoValueStyled>{menu.description}</MenuInfoValueStyled>
        </Col>
      </Row>
      <Row className="opfc-brand-menu-card-tag">
        {
          menu.tags.map(tag => <Tag key={tag}>{tagById(tag)}</Tag>)
        }
      </Row>
    </Card>
  );
};

BrandMenuCard.propTypes = {
  menu: shape({}),
  openEditModal: func.isRequired,
};

BrandMenuCard.defaultProps = {
  menu: {},
};

export default BrandMenuCard;
