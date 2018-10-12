import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { func, shape, bool } from 'prop-types';
import { withRouter } from 'react-router-dom';
import BrandProfileHeader from './components/BrandProfileHeader/BrandProfileHeader';
import BrandProfileContent from './components/BrandProfileContent/BrandProfileContent';
import { BrandProfileStyled } from './BrandProfile.styled';
import { fetchMealManyRequest } from './actions/meal';
import { fetchBrandDetailRequest, fetchBrandMenuManyRequest, fetchBrandMealManyRequest } from './actions/brand';

class BrandProfile extends Component {
  static propTypes = {
    fetchBrandDetailRequestAction: func.isRequired,
    fetchBrandMenuManyRequestAction: func.isRequired,
    fetchBrandMealManyRequestAction: func.isRequired,
    brand: shape({}).isRequired,
    match: shape({}).isRequired,
    profiling: bool.isRequired,
    loggedInBrand: shape({}).isRequired,
  }

  componentDidMount() {
    const {
      fetchBrandDetailRequestAction,
      fetchBrandMenuManyRequestAction,
      fetchBrandMealManyRequestAction,
      match,
      profiling,
    } = this.props;

    let brandId = match.params.id;

    if (profiling) {
      const { loggedInBrand } = this.props;
      brandId = loggedInBrand.id;
    }

    fetchBrandDetailRequestAction(brandId);
    fetchBrandMenuManyRequestAction(brandId);
    fetchBrandMealManyRequestAction(brandId);
  }

  render() {
    const { brand, profiling } = this.props;

    return (
      <BrandProfileStyled>
        <BrandProfileHeader brand={brand} />
        <BrandProfileContent profiling={profiling} />
      </BrandProfileStyled>
    );
  }
}

const mapStateToProps = state => ({
  brand: state.brandProfileReducer.brand.brandDetail,
  loggedInBrand: state.accountReducer.account.account.brand,
});

const mapDispatchToProps = {
  fetchMealManyRequestAction: fetchMealManyRequest,
  fetchBrandDetailRequestAction: fetchBrandDetailRequest,
  fetchBrandMenuManyRequestAction: fetchBrandMenuManyRequest,
  fetchBrandMealManyRequestAction: fetchBrandMealManyRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(BrandProfile);
