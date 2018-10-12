import React, { Fragment, Component } from 'react';
import { Row, Col } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  arrayOf, shape, string, number, func,
} from 'prop-types';
import { withRouter } from 'react-router-dom';
import MealCard from '../../MealCard/MealCard';
import CreateMealModal from '../../CreateMealModal/CreateMealModal';
import { fetchBrandMealManyRequest } from '../../../actions/brand';

class MealTab extends Component {
  static propTypes = {
    mealList: arrayOf(shape({
      id: number,
      mealName: string,
      description: string,
    })).isRequired,
    fetchBrandMealManyRequestAction: func.isRequired,
    match: shape({}).isRequired,
  }

  componentDidMount() {
    const { fetchBrandMealManyRequestAction, match } = this.props;
    const { params: { id } } = match;

    fetchBrandMealManyRequestAction(id);
  }

  render() {
    const { mealList } = this.props;

    return (
      <Fragment>
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
                <MealCard meal={meal} />
              </Col>
            ))
          }
        </Row>
        <CreateMealModal />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mealList: state.brandProfileReducer.brand.mealList,
});

const mapDispatchToProps = {
  fetchBrandMealManyRequestAction: fetchBrandMealManyRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(MealTab);
