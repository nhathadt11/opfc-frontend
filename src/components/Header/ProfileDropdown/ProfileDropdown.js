import React from 'react';
import {
  element, func, shape, number,
} from 'prop-types';
import { Dropdown, Menu } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAccountRequest } from '../../../modules/Account/actions/account';

const ProfileDropdown = ({ children, logoutAccountRequestAction, user: { userRoleId } }) => {
  const menu = (
    <Menu>
      {
        userRoleId === 2 && (
          <Menu.Item>
            <Link to="/profile/settings/account">
              Settings
            </Link>
          </Menu.Item>
        )
      }
      <Menu.Item onClick={logoutAccountRequestAction}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter">
      {children}
    </Dropdown>
  );
};

ProfileDropdown.propTypes = {
  children: element.isRequired,
  logoutAccountRequestAction: func.isRequired,
  user: shape({
    userRoleId: number,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.accountReducer.account.account.user,
});

const mapDispatchToProps = {
  logoutAccountRequestAction: logoutAccountRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ProfileDropdown);
