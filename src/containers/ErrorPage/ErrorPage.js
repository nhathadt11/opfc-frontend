import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import {
  OopsStyled, ErrorMessage, HelpfulLinkContainerStyled, HelpfulLinkStyled,
} from './ErrorPage.styled';

const ErrorPage = () => (
  <Layout style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }}
  >
    <Row style={{ left: -5, marginBottom: 20 }}><img src="/tasty.png" alt="Tasty" height={65} /></Row>
    <Row>
      <Col span={18}>
        <OopsStyled>
          Oops!
        </OopsStyled>
        <ErrorMessage>
          Unexpected error has been occurred during process.
        </ErrorMessage>
        <HelpfulLinkContainerStyled>
          <h3>Here are some helpful links instead:</h3>
          <HelpfulLinkStyled><Link to="/">Home</Link></HelpfulLinkStyled>
          <HelpfulLinkStyled><Link to="/help">Help</Link></HelpfulLinkStyled>
        </HelpfulLinkContainerStyled>
      </Col>
      <Col span={6}>
        <img src="/chef-sad.jpg" alt="Error" width={250} />
      </Col>
    </Row>
    <Row>FPT Capstone 2018</Row>
  </Layout>
);

export default ErrorPage;
