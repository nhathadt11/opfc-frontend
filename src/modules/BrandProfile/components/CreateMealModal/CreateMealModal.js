import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  shape, func, bool, number, string,
} from 'prop-types';
import { hideCreateMealModal } from '../../actions/modals';
import { createMealRequest } from '../../actions/meal';

class CreateMealModal extends Component {
  static propTypes = {
    form: shape({
      getFieldDecorator: func.isRequired,
      validateFieldsAndScroll: func.isRequired,
      setFieldsValue: func.isRequired,
    }).isRequired,
    hideCreateMealModalAction: func.isRequired,
    visible: bool.isRequired,
    createMealRequestAction: func.isRequired,
    meal: shape({
      id: number,
      mealName: string,
      description: string,
    }).isRequired,
  }

  componentDidUpdate(prevProps) {
    const { meal, form: { setFieldsValue } } = this.props;
    if (JSON.stringify(meal) !== JSON.stringify(prevProps.meal)) {
      setFieldsValue({
        mealName: meal.mealName,
        description: meal.description,
      });
    }
  }

  handleCancel = () => {
    const { hideCreateMealModalAction } = this.props;
    hideCreateMealModalAction();
  }

  handleSubmit = () => {
    const {
      form: { validateFieldsAndScroll, setFields },
      createMealRequestAction,
      hideCreateMealModalAction,
    } = this.props;

    validateFieldsAndScroll((err, values) => {
      if (!err) createMealRequestAction(values, () => {
        hideCreateMealModalAction();
        setFields({
          mealName: { value: null, errors: null },
          description: { value: null, errors: null },
        });
      });
    });
  }

  render() {
    const { form: { getFieldDecorator }, visible, meal } = this.props;

    return (
      <Modal
        title="Create new Meal"
        visible={visible}
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
      >
        <Form>
          <Form.Item label="Name">
            {
              getFieldDecorator('mealName', {
                initialValue: meal.mealName,
                rules: [{ required: true, message: 'Meal name is required!' }],
              })(
                <Input />,
              )
            }
          </Form.Item>
          <Form.Item label="Description">
            {
              getFieldDecorator('description', {
                initialValue: meal.description,
              })(
                <Input.TextArea name="description" />,
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.brandProfileReducer.modal.mealModalVisible,
  meal: state.brandProfileReducer.modal.selectedMeal,
});

const mapDispatchToProps = {
  hideCreateMealModalAction: hideCreateMealModal,
  createMealRequestAction: createMealRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  Form.create(),
)(CreateMealModal);
