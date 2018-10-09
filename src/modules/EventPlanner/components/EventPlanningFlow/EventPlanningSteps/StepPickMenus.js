import React from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import MenuCardGrid from '../../../../../containers/MenuCardGrid/MenuCardGrid';
import StepPickMenuSider from './StepPickMenuSider';

const StepPickMenus = ({ selectedMenus }) => (
  <Layout>
    <Layout.Sider theme="light" width={280}>
      <StepPickMenuSider />
    </Layout.Sider>
    <Layout.Content>
      <MenuCardGrid dataList={selectedMenus} />
    </Layout.Content>
  </Layout>
);

StepPickMenus.propTypes = {
  selectedMenus: arrayOf(shape({
    id: number,
  })).isRequired,
};

const mapStateToProps = state => ({
  selectedMenus: state.eventPlannerReducer.event.selectedMenus,
});

export default compose(
  connect(mapStateToProps),
)(StepPickMenus);
