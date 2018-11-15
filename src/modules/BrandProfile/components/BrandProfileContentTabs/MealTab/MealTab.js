import React, { Fragment, Component } from 'react';
import { Row, Col, Spin } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  arrayOf, shape, string, number, bool,
} from 'prop-types';
import MealCard from '../../MealCard/MealCard';
import CreateMealModal from '../../CreateMealModal/CreateMealModal';
import { fetchBrandMealManyRequest } from '../../../actions/brand';
import './MealTab.css';

// eslint-disable-next-line
class MealTab extends Component {
  static propTypes = {
    mealList: arrayOf(shape({
      id: number,
      mealName: string,
      description: string,
    })).isRequired,
    fetching: bool,
    profiling: bool,
  }

  static defaultProps = {
    fetching: false,
    profiling: false,
  }

  render() {
    const { mealList, fetching, profiling } = this.props;

    return (
      <Fragment>
        <Spin spinning={fetching}>
          <Row type="flex" gutter={24}>
            {
              mealList.map(meal => (
                <Col
                  key={meal.id}
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  style={{ marginTop: 16 }}
                >
                  <MealCard meal={meal} profiling={profiling} />
                </Col>
              ))
            }
          </Row>
        </Spin>
        <CreateMealModal />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mealList: state.brandProfileReducer.brand.mealList,
  fetching: state.brandProfileReducer.brand.fetchingMeal,
});

const mapDispatchToProps = {
  fetchBrandMealManyRequestAction: fetchBrandMealManyRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MealTab);
