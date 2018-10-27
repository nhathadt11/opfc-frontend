import React from 'react';
import { Menu, Dropdown, Badge } from 'antd';
import {
  element, number, arrayOf, shape, func,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';
import moment from 'moment';
import { decreaseNotificationCount } from '../../../modules/Account/actions/notification';
import './NotificationDropdown.css';
import { NotificationContentStyled, NotificationTimeStyled } from './NotificationDropdown.styled';

const NotificationDropdown = ({
  children, count, notificationList, decreaseNotificationCountAction,
}) => {
  const menu = (
    <Menu>
      {
        isEmpty(notificationList) ? (
          <Menu.Item className="opfc-notification-item">
            You have nothing new.
          </Menu.Item>
        ) : map(notificationList, n => (
          <Menu.Item className="opfc-notification-item" onClick={decreaseNotificationCountAction}>
            <NotificationContentStyled bold>
              {n['FromUsername']}
            </NotificationContentStyled>
              ordered
            <NotificationContentStyled bold>
              {n['Message']}
            </NotificationContentStyled>
            <NotificationTimeStyled>
              {moment.utc(n['CreatedAt']).fromNow()}
            </NotificationTimeStyled>
          </Menu.Item>
        ))
      }
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter" trigger="click">
      <Badge count={count}>
        { children }
      </Badge>
    </Dropdown>
  );
};

NotificationDropdown.propTypes = {
  children: element.isRequired,
  count: number.isRequired,
  notificationList: arrayOf(shape({})).isRequired,
  decreaseNotificationCountAction: func.isRequired,
};

const mapStateToProps = state => ({
  count: state.accountReducer.notification.count,
  notificationList: state.accountReducer.notification.notificationList,
});

const mapDispatchToProps = {
  decreaseNotificationCountAction: decreaseNotificationCount,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(NotificationDropdown);
