import React from 'react';
import { string } from 'prop-types';
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

const BrandProfileHeader = () => (
  <Row style={{ padding: 50 }} type="flex" gutter={64} className="opfc-brand-profile-header">
    <Col>
      <Avatar size={128} icon="user" />
    </Col>
    <Col>
      <h1>Brand Name</h1>
      <p>
        <StatSpanStyled>
          <StatSpanNumberStyled>12</StatSpanNumberStyled>
          <span>Menus</span>
        </StatSpanStyled>
        <StatSpanStyled>
          <StatSpanNumberStyled>36</StatSpanNumberStyled>
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget ante id urna blandit venenatis in vitae enim. Nam a placerat lacus. Curabitur pellentesque turpis nisi, id volutpat leo eleifend at
      </p>
      <Row>
        <Col span={8} className="opfc-brand-info-label">Hotline</Col>
        <Col>123456789</Col>
      </Row>
      <Row>
        <Col span={8} className="opfc-brand-info-label">Email</Col>
        <Col>johndoe@gmail.com</Col>
      </Row>
      <Row>
        <Col span={8} className="opfc-brand-info-label">Number of Member</Col>
        <Col>12</Col>
      </Row>
    </Col>
  </Row>
);

export default BrandProfileHeader;
