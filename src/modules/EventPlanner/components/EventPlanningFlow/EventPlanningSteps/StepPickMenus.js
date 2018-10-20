import React, { Component } from 'react';
import {
  arrayOf, shape, number, func,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Layout, Affix } from 'antd';
import MenuCardGrid from '../../../../../containers/MenuCardGrid/MenuCardGrid';
import StepPickMenuSider from './StepPickMenuSider';
import { fetchSuggestedMenuManyRequest } from '../../../actions/planningFlow';

class StepPickMenus extends Component {
  static propTypes = {
    suggestedMenuList: arrayOf(shape({
      id: number,
    })).isRequired,
    fetchSuggestedMenuManyRequestAction: func.isRequired,
  }

  componentDidMount() {
    const { fetchSuggestedMenuManyRequestAction } = this.props;
    fetchSuggestedMenuManyRequestAction();
  }

  render() {
    const { suggestedMenuList } = this.props;

    return (
      <Layout>
        <Layout.Sider theme="light" width={280}>
          <Affix offsetTop={30}>
            <StepPickMenuSider />
          </Affix>
        </Layout.Sider>
        <Layout.Content>
          <MenuCardGrid dataList={suggestedMenuList} />
        </Layout.Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  suggestedMenuList: state.eventPlannerReducer.event.suggestedMenuList,
});

const mapDispatchToProps = {
  fetchSuggestedMenuManyRequestAction: fetchSuggestedMenuManyRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(StepPickMenus);
