import React from 'react';
import { Tabs } from 'antd';
import LocalIcon from '../../../../fonts/LocalFont';


const { TabPane } = Tabs;

const BrandProfileContent = () => (
  <Tabs defaultActiveKey="2" size="large">
    <TabPane
      tab={<span><LocalIcon type="icon-menu" />Menu</span>}
      key="1"
    >
      Menus Content
    </TabPane>
    <TabPane
      tab={<span><LocalIcon type="icon-dish" />Meals</span>}
      key="2"
    >
      Meals Content
    </TabPane>
    <TabPane
      tab={<span><LocalIcon type="icon-gallery" />Gallery</span>}
      key="3"
    >
      Gallery Content
    </TabPane>
  </Tabs>
);

export default BrandProfileContent;
