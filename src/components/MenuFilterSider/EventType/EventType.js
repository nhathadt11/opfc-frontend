import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import { map } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  arrayOf, shape, number, string, func,
} from 'prop-types';
import { MenuFilterItemStyled, MenuFilterItemTitleStyled } from '../MenuFilterSider.styled';
import { changeFullTextSearchCriteria } from '../../../modules/General/actions/general';

const EventType = ({ eventTypeList, changeFullTextSearchCriteriaAction }) => {
  const onChange = checkedValues => changeFullTextSearchCriteriaAction('eventTypeNames', checkedValues);

  return (
    <MenuFilterItemStyled>
      <MenuFilterItemTitleStyled htmlFor="">Event Type</MenuFilterItemTitleStyled>
      <Checkbox.Group
        style={{ width: '100%' }}
        onChange={onChange}
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
    </MenuFilterItemStyled>
  );
};

EventType.propTypes = {
  eventTypeList: arrayOf(shape({
    id: number,
    eventTypeName: string,
  })).isRequired,
  changeFullTextSearchCriteriaAction: func.isRequired,
};

const mapStateToProps = state => ({
  eventTypeList: state.generalReducer.eventTypeList,
});

const mapDispatchToProps = {
  changeFullTextSearchCriteriaAction: changeFullTextSearchCriteria,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventType);
