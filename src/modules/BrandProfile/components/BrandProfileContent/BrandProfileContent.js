import React, { Component } from 'react';
import { Tabs, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { func, bool } from 'prop-types';
import LocalIcon from '../../../../fonts/LocalFont';
import MenuTab from '../BrandProfileContentTabs/MenuTab/MenuTab';
import GalleryTab from '../BrandProfileContentTabs/GalleryTab/GalleryTab';
import './BrandProfileContent.css';
import { showCreateMenuModal, showCreateMealModal } from '../../actions/modals';
import MealTab from '../BrandProfileContentTabs/MealTab/MealTab';


const { TabPane } = Tabs;

class BrandProfileContent extends Component {
  static propTypes = {
    showCreateMenuModalAction: func.isRequired,
    showCreateMealModalAction: func.isRequired,
    profiling: bool,
  }

  static defaultProps = {
    profiling: false,
  }

  state = {
    activeTab: 1,
  }

  handleActiveTabChange = key => this.setState({ activeTab: key })

  render() {
    const { showCreateMenuModalAction, showCreateMealModalAction, profiling } = this.props;
    const { activeTab } = this.state;
    const operations = {
      1: <Button onClick={() => showCreateMenuModalAction()}><Icon type="plus" /></Button>,
      2: <Button onClick={() => showCreateMealModalAction()}><Icon type="plus" /></Button>,
    };

    return (
      <Tabs
        defaultActiveKey="1"
        size="large"
        className="opfc-brand-profile-content"
        tabBarExtraContent={profiling && operations[activeTab]}
        onChange={this.handleActiveTabChange}
      >
        <TabPane
          tab={<span><LocalIcon type="icon-menu" />Menu</span>}
          key="1"
        >
          <MenuTab profiling={profiling} />
        </TabPane>
        <TabPane
          tab={<span><LocalIcon type="icon-dish" />Meals</span>}
          key="2"
        >
          <MealTab profiling={profiling} />
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

const mapDispatchToProps = {
  showCreateMenuModalAction: showCreateMenuModal,
  showCreateMealModalAction: showCreateMealModal,
};

export default compose(
  connect(undefined, mapDispatchToProps),
)(BrandProfileContent);
