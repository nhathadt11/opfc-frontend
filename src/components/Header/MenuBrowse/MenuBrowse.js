import React from 'react';
import {
  Menu, Popover, Button, Icon,
} from 'antd';

const content = (
  <Menu style={{ width: 256 }} mode="vertical">
    <Menu.SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>} />
    <Menu.SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
      <Menu.Item key="5">Option 5</Menu.Item>
      <Menu.Item key="6">Option 6</Menu.Item>
      <Menu.SubMenu key="sub3" title="Submenu">
        <Menu.Item key="7">Option 7</Menu.Item>
        <Menu.Item key="8">Option 8</Menu.Item>
      </Menu.SubMenu>
    </Menu.SubMenu>
    <Menu.SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
      <Menu.Item key="9">Option 9</Menu.Item>
      <Menu.Item key="10">Option 10</Menu.Item>
      <Menu.Item key="11">Option 11</Menu.Item>
      <Menu.Item key="12">Option 12</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

const MenuBrowse = () => (
  <Popover overlayClassName="opfc-browse-popup-content" placement="bottomLeft" content={content} trigger="click">
    <Button size="large">Browse</Button>
  </Popover>
);

export default MenuBrowse;
