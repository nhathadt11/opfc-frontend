import React from 'react';
import { element, func } from 'prop-types';
import { Dropdown, Menu } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { logoutAccountRequest } from '../../../modules/Account/actions/account';

const ProfileDropdown = ({ children, logoutAccountRequestAction }) => {
  const menu = (
    <Menu>
      <Menu.Item onClick={logoutAccountRequestAction}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      {children}
    </Dropdown>
  );
};

ProfileDropdown.propTypes = {
  children: element.isRequired,
  logoutAccountRequestAction: func.isRequired,
};

const mapDispatchToProps = {
  logoutAccountRequestAction: logoutAccountRequest,
};

export default compose(
  connect(undefined, mapDispatchToProps),
)(ProfileDropdown);
