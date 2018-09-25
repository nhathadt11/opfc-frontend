import React from 'react';
import { Tabs } from 'antd';
import LocalIcon from '../../../../fonts/LocalFont';
import MenuTab from '../BrandProfileContentTabs/MenuTab/MenuTab';
import GalleryTab from '../BrandProfileContentTabs/GalleryTab/GalleryTab';
import './BrandProfileContent.css';


const { TabPane } = Tabs;

const BrandProfileContent = () => (
  <Tabs defaultActiveKey="1" size="large" className="opfc-brand-profile-content">
    <TabPane
      tab={<span><LocalIcon type="icon-menu" />Menu</span>}
      key="1"
    >
      <MenuTab />
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
      <GalleryTab />
    </TabPane>
  </Tabs>
);

export default BrandProfileContent;
