import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import BrandProfileHeader from './components/BrandProfileHeader/BrandProfileHeader';
import BrandProfileContent from './components/BrandProfileContent/BrandProfileContent';
import { BrandProfileStyled } from './BrandProfile.styled';
import { fetchMealManyRequest } from './actions/meal';

class BrandProfile extends Component {
  static propTypes = {
    fetchMealManyRequestAction: func.isRequired,
  }

  componentDidMount() {
    const { fetchMealManyRequestAction } = this.props;
    fetchMealManyRequestAction();
  }

  render() {
    return (
      <BrandProfileStyled>
        <BrandProfileHeader />
        <BrandProfileContent />
      </BrandProfileStyled>
    );
  }
}

const mapDispatchToProps = {
  fetchMealManyRequestAction: fetchMealManyRequest,
};

export default compose(
  connect(undefined, mapDispatchToProps),
)(BrandProfile);
