import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { InputNumber } from 'antd';
import { number, func } from 'prop-types';
import { MenuFilterItemStyled, MenuFilterItemTitleStyled, NumberRangeStyled } from '../MenuFilterSider.styled';
import { changeFullTextSearchCriteria } from '../../../modules/General/actions/general';

const ServingNumber = ({
  servingNumberFrom, servingNumberTo, changeFullTextSearchCriteriaAction,
}) => (
  <MenuFilterItemStyled>
    <MenuFilterItemTitleStyled htmlFor="">Serving Number</MenuFilterItemTitleStyled>
    <NumberRangeStyled servingNumber>
      <InputNumber
        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/\$\s?|(,*)/g, '')}
        onChange={value => changeFullTextSearchCriteriaAction('servingNumberFrom', value)}
        value={servingNumberFrom}
        min={1}
      />
      <InputNumber
        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/\$\s?|(,*)/g, '')}
        onChange={value => changeFullTextSearchCriteriaAction('servingNumberTo', value)}
        value={servingNumberTo}
        max={1000}
      />
    </NumberRangeStyled>
  </MenuFilterItemStyled>
);

ServingNumber.propTypes = {
  servingNumberFrom: number.isRequired,
  servingNumberTo: number.isRequired,
  changeFullTextSearchCriteriaAction: func.isRequired,
};

const mapStateToProps = state => ({
  servingNumberFrom: state.generalReducer.fullTextSearch.servingNumberFrom,
  servingNumberTo: state.generalReducer.fullTextSearch.servingNumberTo,
});

const mapDispatchToProps = {
  changeFullTextSearchCriteriaAction: changeFullTextSearchCriteria,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ServingNumber);
