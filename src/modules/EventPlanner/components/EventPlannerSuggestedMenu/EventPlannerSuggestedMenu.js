import React, { Fragment } from 'react';
import {
  Row, Spin, Card, Icon, Button, Pagination,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  arrayOf, shape, bool, func, number,
} from 'prop-types';
import { map } from 'lodash';
import MenuCardGrid from '../../../../containers/MenuCardGrid/MenuCardGrid';
import { selectMenuMany, changeSuggestedMenuManyPage } from '../../actions/planningFlow';
import { ComboTotalStyled, ComnoTotalTitleStyled } from './EventPlannerSuggestionMenu.styled';
import './EventPlannerSuggestedMenu.css';

const EventPlannerSuggestedMenu = ({
  suggestedMenuList, fetching, selectMenuManyAction, params, changeSuggestedMenuManyPageAction,
}) => (
  <Fragment>
    <Spin spinning={fetching}>
      <Row type="flex" className="opfc-suggestion-menu-list">
        {
          map(suggestedMenuList, (m, index) => (
            <Card
              key={index}
              bordered
              className="opfc-combo-menu-card"
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
    <Row className="opfc-suggestion-menu-pagination">
      <Pagination
        current={params.page}
        total={params.total}
        pageSize={params.size}
        onChange={changeSuggestedMenuManyPageAction}
      />
    </Row>
  </Fragment>
);

EventPlannerSuggestedMenu.propTypes = {
  suggestedMenuList: arrayOf(arrayOf(shape({}))).isRequired,
  fetching: bool.isRequired,
  selectMenuManyAction: func.isRequired,
  params: shape({
    page: number,
    total: number,
  }).isRequired,
  changeSuggestedMenuManyPageAction: func.isRequired,
};

const mapStateToProps = state => ({
  suggestedMenuList: state.eventPlannerReducer.event.suggestedMenuList,
  fetching: state.eventPlannerReducer.event.fetching,
  params: state.eventPlannerReducer.event.params,
});

const mapDispatchToProps = {
  selectMenuManyAction: selectMenuMany,
  changeSuggestedMenuManyPageAction: changeSuggestedMenuManyPage,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventPlannerSuggestedMenu);
