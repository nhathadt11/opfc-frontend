import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import { map } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { arrayOf, shape, number, string } from 'prop-types';
import { MenuFilterItemStyled, MenuFilterItemTitleStyled } from '../MenuFilterSider.styled';

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

const EventType = ({ eventTypeList }) => (
  <MenuFilterItemStyled>
    <MenuFilterItemTitleStyled htmlFor="">Event Type</MenuFilterItemTitleStyled>
    <Checkbox.Group
      style={{ width: '100%' }}
      defaultValue={['Apple']}
      onChange={onChange}
    >
      <Row>
        {
          map(eventTypeList, event => (
            <Col span={24} key={event.id}>
              <Checkbox value={event.id}>{event.eventTypeName}</Checkbox>
            </Col>
          ))
        }
      </Row>
    </Checkbox.Group>
  </MenuFilterItemStyled>
);

EventType.propTypes = {
  eventTypeList: arrayOf(shape({
    id: number,
    eventTypeName: string,
  })).isRequired,
};

const mapStateToProps = state => ({
  eventTypeList: state.generalReducer.eventTypeList,
});

export default compose(
  connect(mapStateToProps),
)(EventType);
