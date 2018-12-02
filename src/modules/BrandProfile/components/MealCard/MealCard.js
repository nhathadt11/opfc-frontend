import React from 'react';
import {
  Card, Row, Col, Button, Icon, Modal,
} from 'antd';
import {
  shape, string, number, func, bool,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './MealCard.css';
import { showCreateMealModal } from '../../actions/modals';
import { deleteMealRequest } from '../../actions/meal';
import { MealDescriptionStyled } from './MenuCard.styled';

const MealCard = ({
  meal, showCreateMealModalAction, deleteMealRequestAction, profiling,
}) => {
  const confirmDelete = () => {
    const modal = Modal.confirm({
      title: 'Delete Meal',
      content: 'Are you sure to delete this meal?',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => deleteMealRequestAction(meal.id, modal.destroy),
    });
  };

  return (
    <Card hoverable style={{ height: '100%' }}>
      <Row type="flex" className="opfc-meal-title">
        <Col><h3>{meal.mealName}</h3></Col>
        {
          profiling && (
            <Col className="opfc-meal-actions">
              <Button shape="circle" onClick={() => showCreateMealModalAction(meal)}>
                <Icon type="edit" theme="outlined" />
              </Button>
              <Button type="danger" shape="circle" onClick={confirmDelete}>
                <Icon type="delete" theme="outlined" />
              </Button>
            </Col>
          )
        }
      </Row>
      <MealDescriptionStyled className="opfc-3-line-truncation">
        {meal.description}
      </MealDescriptionStyled>
    </Card>
  );
};

MealCard.propTypes = {
  meal: shape({
    id: number,
    mealName: string,
    description: string,
  }).isRequired,
  profiling: bool,
  showCreateMealModalAction: func.isRequired,
  deleteMealRequestAction: func.isRequired,
};

MealCard.defaultProps = {
  profiling: false,
};

const mapDispatchToProps = {
  showCreateMealModalAction: showCreateMealModal,
  deleteMealRequestAction: deleteMealRequest,
};

export default compose(
  connect(undefined, mapDispatchToProps),
)(MealCard);
