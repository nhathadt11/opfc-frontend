import React from 'react';
import {
  Checkbox, Row, Col, Spin,
} from 'antd';
import { map } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  arrayOf, shape, number, string, func, bool,
} from 'prop-types';
import { MenuFilterItemStyled, MenuFilterItemTitleStyled } from '../MenuFilterSider.styled';
import { changeFullTextSearchCriteria } from '../../../modules/General/actions/general';
import './EventType.css';

const EventType = ({
  eventTypeList, changeFullTextSearchCriteriaAction, eventTypeNames, fetching,
}) => {
  const onChange = checkedValues => changeFullTextSearchCriteriaAction('eventTypeNames', checkedValues);

  return (
    <MenuFilterItemStyled>
      <MenuFilterItemTitleStyled htmlFor="">Event Type</MenuFilterItemTitleStyled>
      <Spin spinning={fetching}>
        <Checkbox.Group
          style={{ width: '100%' }}
          onChange={onChange}
          value={eventTypeNames}
          className="opfc-event-type-list"
        >
          <Row>
            {
              map(eventTypeList, event => (
                <Col span={24} key={event.id}>
                  <Checkbox value={event.eventTypeName}>{event.eventTypeName}</Checkbox>
                </Col>
              ))
            }
          </Row>
        </Checkbox.Group>
      </Spin>
    </MenuFilterItemStyled>
  );
};

EventType.propTypes = {
  eventTypeList: arrayOf(shape({
    id: number,
    eventTypeName: string,
  })).isRequired,
  changeFullTextSearchCriteriaAction: func.isRequired,
  eventTypeNames: arrayOf(string).isRequired,
  fetching: bool.isRequired,
};

const mapStateToProps = state => ({
  eventTypeList: state.generalReducer.eventTypeList,
  fetching: state.generalReducer.fetchingEventTypeList,
  eventTypeNames: state.generalReducer.fullTextSearch.eventTypeNames,
});

const mapDispatchToProps = {
  changeFullTextSearchCriteriaAction: changeFullTextSearchCriteria,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventType);
