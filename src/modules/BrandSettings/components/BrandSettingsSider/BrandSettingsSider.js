import React from 'react';
import Sider from 'antd/lib/layout/Sider';
import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { shape, func } from 'prop-types';
import LocalIcon from '../../../../fonts/LocalFont';
import './BrandSettingsSider.css';

const EventPlannerSider = ({ history }) => (
  <Sider className="opfc-brand-settings-sider">
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['/profile/settings/account']}
      mode="inline"
      onClick={e => history.push(e.key)}
      selectedKeys={[history.location.pathname]}
    >
      <Menu.Item key="/profile/settings/account">
        <LocalIcon type="icon-account" />
        Account
      </Menu.Item>
      <Menu.Item key="/profile/settings/information">
        <Icon type="info-circle" theme="filled" />
        Information
      </Menu.Item>
      <Menu.Item key="/profile/settings/service-location">
        <LocalIcon type="icon-address" />
        Service Location
      </Menu.Item>
    </Menu>
  </Sider>
);

EventPlannerSider.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(EventPlannerSider);
