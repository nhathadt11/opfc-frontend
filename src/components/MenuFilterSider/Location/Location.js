import React from 'react';
import { Cascader } from 'antd';
import { MenuFilterItemStyled, MenuFilterItemTitleStyled } from '../MenuFilterSider.styled';

const options = [{
  value: 'Ho Chi Minh',
  label: 'Ho Chi Minh',
  children: [{
    value: 'Go Vap',
    label: 'Go Vap',
    children: [{
      value: 'Phuong 14',
      label: 'Phuong 14',
    }],
  }],
}, {
  value: 'Da Nang',
  label: 'Da Nang',
  children: [{
    value: 'Quan Hai Chau',
    label: 'Quan Hai Chau',
    children: [{
      value: 'Phuong 10',
      label: 'Phuong 10',
    }],
  }],
}];

const onChange = value => console.log(value);

const Location = () => (
  <MenuFilterItemStyled>
    <MenuFilterItemTitleStyled htmlFor="">Location</MenuFilterItemTitleStyled>
    <Cascader
      placeholder="City / District / Ward"
      options={options}
      onChange={onChange}
    />
  </MenuFilterItemStyled>
);

export default Location;
