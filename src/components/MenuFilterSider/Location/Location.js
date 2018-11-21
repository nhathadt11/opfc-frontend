import React from 'react';
import { Cascader } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  arrayOf, shape, array, number, string, func,
} from 'prop-types';
import { MenuFilterItemStyled, MenuFilterItemTitleStyled } from '../MenuFilterSider.styled';
import { changeFullTextSearchCriteria } from '../../../modules/General/actions/general';

const Location = ({ cityAndDistrictList, changeFullTextSearchCriteriaAction, location }) => (
  <MenuFilterItemStyled>
    <MenuFilterItemTitleStyled htmlFor="">Location</MenuFilterItemTitleStyled>
    <Cascader
      placeholder="City / District"
      options={cityAndDistrictList}
      value={location}
      onChange={value => changeFullTextSearchCriteriaAction('location', value)}
    />
  </MenuFilterItemStyled>
);

Location.propTypes = {
  cityAndDistrictList: arrayOf(shape({
    value: number,
    label: string,
    children: array,
  })).isRequired,
  location: arrayOf(number).isRequired,
  changeFullTextSearchCriteriaAction: func.isRequired,
};

const mapStateToProps = state => ({
  cityAndDistrictList: state.generalReducer.cityAndDistrictList,
  location: state.generalReducer.fullTextSearch.location,
});

const mapDispatchToProps = {
  changeFullTextSearchCriteriaAction: changeFullTextSearchCriteria,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Location);
