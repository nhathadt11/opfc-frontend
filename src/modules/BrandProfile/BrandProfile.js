import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
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
  }

  componentDidMount() {
    const {
      fetchBrandDetailRequestAction,
      fetchBrandMenuManyRequestAction,
      fetchBrandMealManyRequestAction,
      match,
    } = this.props;
    const { params: { id } } = match;

    fetchBrandDetailRequestAction(id);
    fetchBrandMenuManyRequestAction(id);
    fetchBrandMealManyRequestAction(id);
  }

  render() {
    const { brand } = this.props;

    return (
      <BrandProfileStyled>
        <BrandProfileHeader brand={brand} />
        <BrandProfileContent brand={brand} />
      </BrandProfileStyled>
    );
  }
}

const mapStateToProps = state => ({
  brand: state.brandProfileReducer.brand.brandDetail,
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
