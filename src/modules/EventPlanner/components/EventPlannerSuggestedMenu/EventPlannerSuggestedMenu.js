import React from 'react';
import {
  Row, Spin, Card, Icon, Button,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  arrayOf, shape, bool, func,
} from 'prop-types';
import { map } from 'lodash';
import MenuCardGrid from '../../../../containers/MenuCardGrid/MenuCardGrid';
import { selectMenuMany } from '../../actions/planningFlow';

const EventPlannerSuggestedMenu = ({ suggestedMenuList, fetching, selectMenuManyAction }) => (
  <Spin spinning={fetching}>
    <Row type="flex">
      {
        map(suggestedMenuList, (m, index) => (
          <Card
            key={index}
            bordered
            actions={[<Button type="default" onClick={() => selectMenuManyAction(m)}><Icon type="plus" />Add</Button>]}
          >
            <MenuCardGrid dataList={m} />
          </Card>))
      }
    </Row>
  </Spin>
);

EventPlannerSuggestedMenu.propTypes = {
  suggestedMenuList: arrayOf(arrayOf(shape({}))).isRequired,
  fetching: bool.isRequired,
  selectMenuManyAction: func.isRequired,
};

const mapStateToProps = state => ({
  suggestedMenuList: state.eventPlannerReducer.event.suggestedMenuList,
  fetching: state.eventPlannerReducer.event.fetching,
});

const mapDispatchToProps = {
  selectMenuManyAction: selectMenuMany,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventPlannerSuggestedMenu);
