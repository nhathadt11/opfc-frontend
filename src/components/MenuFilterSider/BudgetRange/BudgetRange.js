import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { func, number } from 'prop-types';
import { Slider, InputNumber } from 'antd';
import { MenuFilterItemStyled, MenuFilterItemTitleStyled, NumberRangeStyled } from '../MenuFilterSider.styled';
import { changeFullTextSearchCriteria } from '../../../modules/General/actions/general';

const BudgetRange = ({ priceFrom, priceTo, changeFullTextSearchCriteriaAction }) => (
  <MenuFilterItemStyled>
    <MenuFilterItemTitleStyled htmlFor="">Budget</MenuFilterItemTitleStyled>
    <Slider
      range
      defaultValue={[priceFrom, priceTo]}
      min={100}
      max={10000000}
      step={10}
      value={[priceFrom, priceTo]}
      onChange={([from, to]) => {
        changeFullTextSearchCriteriaAction('priceFrom', from);
        changeFullTextSearchCriteriaAction('priceTo', to);
      }}
    />
    <NumberRangeStyled>
      <InputNumber
        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/\$\s?|(,*)/g, '')}
        onChange={value => changeFullTextSearchCriteriaAction('priceFrom', value)}
        value={priceFrom}
      />
      <InputNumber
        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/\$\s?|(,*)/g, '')}
        onChange={value => changeFullTextSearchCriteriaAction('priceTo', value)}
        value={priceTo}
      />
    </NumberRangeStyled>
  </MenuFilterItemStyled>
);

BudgetRange.propTypes = {
  priceFrom: number.isRequired,
  priceTo: number.isRequired,
  changeFullTextSearchCriteriaAction: func.isRequired,
};

const mapStateToProps = state => ({
  priceFrom: state.generalReducer.fullTextSearch.priceFrom,
  priceTo: state.generalReducer.fullTextSearch.priceTo,
});

const mapDispatchToProps = {
  changeFullTextSearchCriteriaAction: changeFullTextSearchCriteria,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(BudgetRange);
