import React from 'react';
import Sider from 'antd/lib/layout/Sider';
import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { shape, func } from 'prop-types';
import LocalIcon from '../../../../fonts/LocalFont';
import './EventPlannerSider.css';

const EventPlannerSider = ({ history }) => (
  <Sider className="opfc-event-planner-sider">
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['/profile/event-planner/account']}
      mode="inline"
      onClick={e => history.push(e.key)}
      selectedKeys={[history.location.pathname]}
    >
      <Menu.Item key="/profile/event-planner/account">
        <LocalIcon type="icon-account" />
        Account
      </Menu.Item>
      <Menu.Item key="/profile/event-planner/event">
        <LocalIcon type="icon-event" />
        Event
      </Menu.Item>
      <Menu.Item key="/profile/event-planner/order">
        <LocalIcon type="icon-order" />
        Order
      </Menu.Item>
      <Menu.Item key="/profile/event-planner/address">
        <LocalIcon type="icon-address" />
        Address
      </Menu.Item>
      <Menu.Item key="/profile/event-planner/payment">
        <Icon type="credit-card" theme="filled" />
        Payment
      </Menu.Item>
      <Menu.Item key="/profile/event-planner/bookmark">
        <LocalIcon type="icon-bookmark-filled" />
        Bookmark
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
