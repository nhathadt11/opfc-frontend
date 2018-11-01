import React, { Component } from 'react';
import {
  number, func,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Layout, Affix } from 'antd';
import StepPickMenuSider from './StepPickMenuSider';
import { fetchSuggestedMenuManyRequest } from '../../../actions/planningFlow';
import EventPlannerSuggestedMenu from '../../EventPlannerSuggestedMenu/EventPlannerSuggestedMenu';

class StepPickMenus extends Component {
  static propTypes = {
    eventId: number.isRequired,
    fetchSuggestedMenuManyRequestAction: func.isRequired,
  }

  componentDidMount() {
    const { fetchSuggestedMenuManyRequestAction, eventId } = this.props;
    fetchSuggestedMenuManyRequestAction(eventId);
  }

  render() {
    return (
      <Layout>
        <Layout.Sider theme="light" width={280}>
          <Affix offsetTop={30}>
            <StepPickMenuSider />
          </Affix>
        </Layout.Sider>
        <Layout.Content>
          <EventPlannerSuggestedMenu />
        </Layout.Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  eventId: state.eventPlannerReducer.event.event.id,
});

const mapDispatchToProps = {
  fetchSuggestedMenuManyRequestAction: fetchSuggestedMenuManyRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(StepPickMenus);
