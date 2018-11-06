import React from 'react';
import { Menu, Dropdown, Badge } from 'antd';
import {
  element, number, arrayOf, shape, func,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';
import moment from 'moment';
import { markNotificationAsReadRequest } from '../../../modules/Account/actions/notification';
import './NotificationDropdown.css';
import { NotificationContentStyled, NotificationTimeStyled } from './NotificationDropdown.styled';

const NotificationDropdown = ({
  children, count, notificationList, markNotificationAsReadRequestAction,
}) => {
  const menu = (
    <Menu className="opfc-notification-dropdown-menu">
      {
        isEmpty(notificationList) ? (
          <Menu.Item className="opfc-notification-item">
            You have nothing new.
          </Menu.Item>
        ) : map(notificationList, ({ key, val }) => (
          <Menu.Item
            key={key}
            className={`opfc-notification-item ${val['Read'] ? 'notification-item-read' : ''}`}
            onClick={() => markNotificationAsReadRequestAction(key)}
          >
            <NotificationContentStyled bold>
              {val['Subject']}
            </NotificationContentStyled>
            {val['Verb']}
            <NotificationContentStyled bold>
              {val['Object']}
            </NotificationContentStyled>
            <NotificationTimeStyled>
              {moment.utc(val['CreatedAt']).fromNow()}
            </NotificationTimeStyled>
          </Menu.Item>
        ))
      }
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
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
  markNotificationAsReadRequestAction: func.isRequired,
};

const mapStateToProps = state => ({
  count: state.accountReducer.notification.count,
  notificationList: state.accountReducer.notification.notificationList,
});

const mapDispatchToProps = {
  markNotificationAsReadRequestAction: markNotificationAsReadRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(NotificationDropdown);
