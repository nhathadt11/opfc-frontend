import React from 'react';
import { Layout, Button, Input } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { shape, func } from 'prop-types';
import './Header.css';
import { UserIconGroupStyled, LogoStyled } from './Header.styled';
import MenuBrowse from './MenuBrowse/MenuBrowse';
import CreateProfileButton from '../Brand/CreateProfileButton/CreateProfileButton';

const Header = ({ history: { push } }) => (
  <Layout.Header className="header">
    <LogoStyled src="/tasty.png" alt="Logo" onClick={() => push('/')} />

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
      <Link to="/cart">
        <Button icon="notification" size="large" shape="circle" className="header-icon" />
      </Link>
      <Link to="/profile/event-planner/account">
        <Button icon="heart" size="large" shape="circle" className="header-icon" />
      </Link>
      <Link to="/profile/brand">
        <Button icon="meh" size="large" shape="circle" className="header-icon" />
      </Link>
      <CreateProfileButton />
    </UserIconGroupStyled>
  </Layout.Header>
);

Header.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(Header);
