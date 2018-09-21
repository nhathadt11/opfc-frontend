import React from 'react';
import { Layout, Button, Input } from 'antd';
import './Header.css';
import { UserIconGroupStyled } from './Header.styled';

const Header = () => (
  <Layout.Header className="header">
    <img src="/tasty.png" alt="Logo" />

    <Input.Search
      placeholder="Menus"
      size="large"
      className="header-search"
      enterButton
    />

    <UserIconGroupStyled>
      <Button icon="notification" size="large" shape="circle" className="header-icon" />
      <Button icon="heart" size="large" shape="circle" className="header-icon" />
      <Button icon="meh" size="large" shape="circle" className="header-icon" />
      <Button type="primary" size="large">Create a Profile</Button>
    </UserIconGroupStyled>
  </Layout.Header>
);

export default Header;
