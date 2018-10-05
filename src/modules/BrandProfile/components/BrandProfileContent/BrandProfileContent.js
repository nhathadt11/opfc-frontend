import React, { Component } from 'react';
import { Tabs, Button, Icon } from 'antd';
import LocalIcon from '../../../../fonts/LocalFont';
import MenuTab from '../BrandProfileContentTabs/MenuTab/MenuTab';
import GalleryTab from '../BrandProfileContentTabs/GalleryTab/GalleryTab';
import './BrandProfileContent.css';

const { TabPane } = Tabs;
const operations = {
  1: <Button onClick={() => console.log('add menu')}><Icon type="plus" /></Button>,
  2: <Button onClick={() => console.log('add meal')}><Icon type="plus" /></Button>,
};

class BrandProfileContent extends Component {
  state = {
    activeTab: 1,
  }

  handleActiveTabChange = key => this.setState({ activeTab: key })

  render() {
    const { activeTab } = this.state;

    return (
      <Tabs
        defaultActiveKey="1"
        size="large"
        className="opfc-brand-profile-content"
        tabBarExtraContent={operations[activeTab]}
        onChange={this.handleActiveTabChange}
      >
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
  }
}

export default BrandProfileContent;
