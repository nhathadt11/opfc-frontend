import React, { Fragment, Component } from 'react';
import { Row, Col } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  arrayOf, shape, string, number, func,
} from 'prop-types';
import MealCard from '../../MealCard/MealCard';
import CreateMealModal from '../../CreateMealModal/CreateMealModal';
import { fetchMealManyRequest } from '../../../actions/meal';

class MealTab extends Component {
  static propTypes = {
    mealList: arrayOf(shape({
      id: number,
      mealName: string,
      description: string,
    })).isRequired,
    fetchMealManyRequestAction: func.isRequired,
  }

  componentDidMount() {
    const { fetchMealManyRequestAction } = this.props;
    fetchMealManyRequestAction();
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
  mealList: state.brandProfileReducer.meal.mealList,
});

const mapDispatchToProps = {
  fetchMealManyRequestAction: fetchMealManyRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MealTab);
