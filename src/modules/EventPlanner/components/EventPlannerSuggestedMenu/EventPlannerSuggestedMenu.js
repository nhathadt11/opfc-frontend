import React, { Fragment } from 'react';
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
import { ComboTotalStyled, ComnoTotalTitleStyled } from './EventPlannerSuggestionMenu.styled';

const EventPlannerSuggestedMenu = ({ suggestedMenuList, fetching, selectMenuManyAction }) => (
  <Spin spinning={fetching} className="opfc-spinning">
    <Row type="flex">
      {
        map(suggestedMenuList, (m, index) => (
          <Card
            key={index}
            bordered
            actions={[
              <span />,
              <Button type="default" onClick={() => selectMenuManyAction(m.menus)}><Icon type="plus" />Add</Button>,
              <Fragment>
                <ComnoTotalTitleStyled>Total: </ComnoTotalTitleStyled>
                <ComboTotalStyled>{m.comboTotal}</ComboTotalStyled>
              </Fragment>,
            ]}
          >
            <MenuCardGrid dataList={m.menus} />
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
