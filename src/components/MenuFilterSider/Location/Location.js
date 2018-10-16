import React from 'react';
import { Cascader } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  arrayOf, shape, array, number, string,
} from 'prop-types';
import { MenuFilterItemStyled, MenuFilterItemTitleStyled } from '../MenuFilterSider.styled';

const onChange = value => console.log(value);

const Location = ({ cityAndDistrictList }) => (
  <MenuFilterItemStyled>
    <MenuFilterItemTitleStyled htmlFor="">Location</MenuFilterItemTitleStyled>
    <Cascader
      placeholder="City / District"
      options={cityAndDistrictList}
      onChange={onChange}
    />
  </MenuFilterItemStyled>
);

Location.propTypes = {
  cityAndDistrictList: arrayOf(shape({
    value: number,
    label: string,
    children: array,
  })).isRequired,
};

const mapStateToProps = state => ({
  cityAndDistrictList: state.generalReducer.cityAndDistrictList,
});

export default compose(
  connect(mapStateToProps),
)(Location);
