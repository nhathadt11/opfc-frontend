import React from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import MenuCardGrid from '../../../../../containers/MenuCardGrid/MenuCardGrid';

const StepPickMenus = ({ selectedMenus }) => (
  <div>
    <MenuCardGrid dataList={selectedMenus} />
  </div>
);

StepPickMenus.propTypes = {
  selectedMenus: arrayOf(shape({
    id: number,
  })).isRequired,
};

const mapStateToProps = state => ({
  selectedMenus: state.eventPlannerReducer.event.selectedMenus,
});

export default compose(
  connect(mapStateToProps),
)(StepPickMenus);
