import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import BrandProfileHeader from './components/BrandProfileHeader/BrandProfileHeader';
import BrandProfileContent from './components/BrandProfileContent/BrandProfileContent';
import { BrandProfileStyled } from './BrandProfile.styled';
import { fetchMealManyRequest } from './actions/meal';

class BrandProfile extends Component {
  static propTypes = {
    fetchMealManyRequestAction: func.isRequired,
    brand: shape({}).isRequired,
  }

  componentDidMount() {
    const { fetchMealManyRequestAction } = this.props;
    fetchMealManyRequestAction();
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
  brand: state.accountReducer.account.account.brand,
});

const mapDispatchToProps = {
  fetchMealManyRequestAction: fetchMealManyRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(BrandProfile);
