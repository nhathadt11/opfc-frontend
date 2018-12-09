import React, { Component } from 'react';
import { Tabs, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  func, bool, shape, string,
} from 'prop-types';
import { withRouter } from 'react-router-dom';
import LocalIcon from '../../../../fonts/LocalFont';
import MenuTab from '../BrandProfileContentTabs/MenuTab/MenuTab';
import MealTab from '../BrandProfileContentTabs/MealTab/MealTab';
import OrderTab from '../BrandProfileContentTabs/OrderTab/OrderTab';
// import GalleryTab from '../BrandProfileContentTabs/GalleryTab/GalleryTab';
import './BrandProfileContent.css';
import { showCreateMenuModal, showCreateMealModal } from '../../actions/modals';


const { TabPane } = Tabs;

class BrandProfileContent extends Component {
  static propTypes = {
    showCreateMenuModalAction: func.isRequired,
    showCreateMealModalAction: func.isRequired,
    profiling: bool,
    history: shape({
      push: func.isRequired,
    }).isRequired,
    match: shape({
      path: string,
    }).isRequired,
  }

  static defaultProps = {
    profiling: false,
  }

  handleActiveTabChange = (key) => {
    const { history: { push } } = this.props;
    push(key);
  }

  render() {
    const { showCreateMenuModalAction, showCreateMealModalAction, profiling } = this.props;
    const { match: { params: { tab } } } = this.props;
    const operations = {
      menu: <Button onClick={() => showCreateMenuModalAction()}><Icon type="plus" /></Button>,
      meal: <Button onClick={() => showCreateMealModalAction()}><Icon type="plus" /></Button>,
    };

    return (
      <Tabs
        defaultActiveKey="/profile/brand"
        size="large"
        className="opfc-brand-profile-content"
        tabBarExtraContent={profiling && operations[tab]}
        onChange={this.handleActiveTabChange}
        activeKey={tab}
      >
        <TabPane
          tab={<span><LocalIcon type="icon-menu" />Menu</span>}
          key="menu"
        >
          <MenuTab profiling={profiling} />
        </TabPane>
        <TabPane
          tab={<span><LocalIcon type="icon-dish" />Meal</span>}
          key="meal"
        >
          <MealTab profiling={profiling} />
        </TabPane>
        {/* <TabPane
          tab={<span><LocalIcon type="icon-gallery" />Gallery</span>}
          key="3"
        >
          <GalleryTab />
        </TabPane> */}
        {
          profiling && (
            <TabPane
              tab={<span><Icon type="form" />Order</span>}
              key="order"
            >
              <OrderTab />
            </TabPane>
          )
        }
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
  withRouter,
)(BrandProfileContent);
