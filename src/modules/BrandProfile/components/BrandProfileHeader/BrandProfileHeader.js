import React from 'react';
import { string, shape } from 'prop-types';
import {
  Row, Avatar, Col, Icon,
} from 'antd';
import { StatSpanStyled, StatSpanNumberStyled } from './BrandProfileHeader.styled';
import './BrandProfileHeader.css';

const IconText = ({ type, text }) => (
  <StatSpanStyled>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </StatSpanStyled>
);

IconText.propTypes = {
  type: string.isRequired,
  text: string.isRequired,
};

const BrandProfileHeader = ({ brand }) => (
  <Row type="flex" gutter={64} className="opfc-brand-profile-header">
    <Col>
      <Avatar size={128} icon="user" src={brand.avatar} />
    </Col>
    <Col>
      <h1>{brand.brandName}</h1>
      <p>
        <StatSpanStyled>
          <StatSpanNumberStyled>{brand.menuCount || 0}</StatSpanNumberStyled>
          <span>Menus</span>
        </StatSpanStyled>
        <StatSpanStyled>
          <StatSpanNumberStyled>{brand.mealCount || 0}</StatSpanNumberStyled>
          <span>Meals</span>
        </StatSpanStyled>
      </p>
      <p>
        <IconText type="star-o" text="156" />
        <IconText type="like-o" text="156" />
        <IconText type="message" text="2" />
      </p>
    </Col>
    <Col>
      <p>
        {brand.description}
      </p>
      <Row>
        <Col span={8} className="opfc-brand-info-label">Hotline</Col>
        <Col>{brand.phone}</Col>
      </Row>
      <Row>
        <Col span={8} className="opfc-brand-info-label">Email</Col>
        <Col>{brand.email}</Col>
      </Row>
      <Row>
        <Col span={8} className="opfc-brand-info-label">Number of Member</Col>
        <Col>{brand.participantNumber}</Col>
      </Row>
    </Col>
  </Row>
);

BrandProfileHeader.propTypes = {
  brand: shape({}).isRequired,
};

export default BrandProfileHeader;
