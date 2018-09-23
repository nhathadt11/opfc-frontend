import React from 'react';
import { Layout, Button, Input } from 'antd';
import './Header.css';
import { UserIconGroupStyled, LogoStyled } from './Header.styled';
import MenuBrowse from './MenuBrowse/MenuBrowse';

const Header = () => (
  <Layout.Header className="header">
    <LogoStyled src="/tasty.png" alt="Logo" />

    <div>
      <MenuBrowse />

      <Input.Search
        placeholder="Menus"
        size="large"
        className="header-search"
        enterButton
      />
    </div>

    <UserIconGroupStyled>
      <Button icon="notification" size="large" shape="circle" className="header-icon" />
      <Button icon="heart" size="large" shape="circle" className="header-icon" />
      <Button icon="meh" size="large" shape="circle" className="header-icon" />
      <Button type="primary" size="large">Create a Profile</Button>
    </UserIconGroupStyled>
  </Layout.Header>
);

export default Header;
