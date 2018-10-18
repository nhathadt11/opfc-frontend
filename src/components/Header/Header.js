import React from 'react';
import { Layout, Button, Input } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { shape, func, bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './Header.css';
import { UserIconGroupStyled, LogoStyled } from './Header.styled';
import MenuBrowse from './MenuBrowse/MenuBrowse';
import CreateProfileButton from '../Brand/CreateProfileButton/CreateProfileButton';
import { showLoginModal } from '../../modules/Account/actions/modal';
import { showRatingModal } from '../../modules/EventPlanner/actions/planningFlow';
import NotificationDropdown from './NotificationDropdown/NotificationDropdown';

const Header = ({
  history: { push }, account, loggedIn, showLoginModalAction, showRatingModalAction,
}) => (
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
      <NotificationDropdown>
        <Button icon="notification" size="large" shape="circle" className="header-icon header-icon-notification" />
      </NotificationDropdown>
      <Button icon="heart" size="large" shape="circle" className="header-icon" onClick={showRatingModalAction} />
      {
        loggedIn ? (
          <Link to={
              account.user.userRoleId === 2 ? '/profile/brand' : '/profile/event-planner/account'
            }
          >
            <Button icon="smile" size="large" shape="circle" className="header-icon" />
          </Link>
        ) : (
          <Button icon="meh" size="large" shape="circle" className="header-icon" onClick={showLoginModalAction} />
        )
      }
      {
        !loggedIn && <CreateProfileButton />
      }
    </UserIconGroupStyled>
  </Layout.Header>
);

Header.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
  account: shape({
    account: shape({}),
  }).isRequired,
  loggedIn: bool.isRequired,
  showLoginModalAction: func.isRequired,
  showRatingModalAction: func.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.accountReducer.account.loggedIn,
  account: state.accountReducer.account.account,
});

const mapDispatchToProps = {
  showLoginModalAction: showLoginModal,
  showRatingModalAction: showRatingModal,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Header);
