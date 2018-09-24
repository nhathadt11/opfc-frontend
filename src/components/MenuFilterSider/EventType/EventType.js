import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import { map } from 'lodash';
import { MenuFilterItemStyled, MenuFilterItemTitleStyled } from '../MenuFilterSider.styled';

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

const options = [
  { label: 'Wedding', value: 'Wedding' },
  { label: 'Birthday', value: 'Birthday' },
  { label: 'Family', value: 'Family' },
];

const EventType = () => (
  <MenuFilterItemStyled>
    <MenuFilterItemTitleStyled htmlFor="">Event Type</MenuFilterItemTitleStyled>
    <Checkbox.Group
      style={{ width: '100%' }}
      defaultValue={['Apple']}
      onChange={onChange}
    >
      <Row>
        {
          map(options, option => (
            <Col span={24} key={option.value}>
              <Checkbox value={option.value}>{option.label}</Checkbox>
            </Col>
          ))
        }
      </Row>
    </Checkbox.Group>
  </MenuFilterItemStyled>
);

export default EventType;
