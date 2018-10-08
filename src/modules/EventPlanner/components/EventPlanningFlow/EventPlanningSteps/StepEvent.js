import React from 'react';
import {
  Form, Input, DatePicker, Cascader, InputNumber, Select, Row, Col,
} from 'antd';
import { compose } from 'redux';
import { shape, func } from 'prop-types';
import { connect } from 'react-redux';
import './StepEvent.css';
import { createEventRequest } from '../../../actions/event';

const { RangePicker } = DatePicker;

const locations = [{
  value: 'Ho Chi Minh',
  label: 'Ho Chi Minh',
  children: [{
    value: 'Go Vap',
    label: 'Go Vap',
    children: [{
      value: 'Phuong 14',
      label: 'Phuong 14',
    }],
  }],
}, {
  value: 'Da Nang',
  label: 'Da Nang',
  children: [{
    value: 'Quan Hai Chau',
    label: 'Quan Hai Chau',
    children: [{
      value: 'Phuong 10',
      label: 'Phuong 10',
    }],
  }],
}];

const StepEvent = ({
  form: { getFieldDecorator, validateFieldsAndScroll },
  next,
  createEventRequestAction,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    validateFieldsAndScroll((err, values) => {
      if (!err) createEventRequestAction(values, next);
    });
  };

  return (
    <Form className="opfc-step-event-form" onSubmit={handleSubmit}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Event Name">
            {
              getFieldDecorator('eventName', {
                rules: [{ required: true, message: 'Event name is required!' }],
              })(
                <Input />,
              )
            }
          </Form.Item>
          <Form.Item label="Time Range">
            {
              getFieldDecorator('timeRange', {
                rules: [{ required: true, message: 'Time range is required!' }],
              })(
                <RangePicker showTime format="YYYY-MM-DD HH:mm" />,
              )
            }
          </Form.Item>
          <Form.Item label="City/District/Ward">
            {
              getFieldDecorator('cityDistrictWard', {
                rules: [{ required: true, message: 'City/District/Ward is required!' }],
              })(
                <Cascader options={locations} />,
              )
            }
          </Form.Item>
          <Form.Item label="Address">
            {
              getFieldDecorator('address', {
                rules: [{ required: true, message: 'Address is required!' }],
              })(
                <Input />,
              )
            }
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Budget">
            {
              getFieldDecorator('budget', {
                rules: [{ required: true, message: 'Budget is required!' }],
              })(
                <Input />,
              )
            }
          </Form.Item>
          <Form.Item label="Serving number">
            {
              getFieldDecorator('servingNumber', {
                rules: [{ required: true, message: 'Serving number is required!' }],
              })(
                <InputNumber />,
              )
            }
          </Form.Item>
          <Form.Item label="Event Type">
            {
              getFieldDecorator('eventType', {
                rules: [{ required: true, message: 'Event Type is required!' }],
              })(
                <Select>
                  <Select.Option value="1">Wedding</Select.Option>
                  <Select.Option value="2">Birthday</Select.Option>
                  <Select.Option value="3">Family</Select.Option>
                </Select>,
              )
            }
          </Form.Item>
          <Form.Item label="Description">
            {
              getFieldDecorator('description')(
                <Input.TextArea />,
              )
            }
          </Form.Item>
        </Col>
      </Row>
      <input type="submit" id="form-event" style={{ display: 'none' }} />
    </Form>
  );
};

StepEvent.propTypes = {
  form: shape({
    getFieldDecorator: func.isRequired,
    validateFieldsAndScroll: func.isRequired,
  }).isRequired,
  next: func.isRequired,
  createEventRequestAction: func.isRequired,
};

const mapDispatchToProps = {
  createEventRequestAction: createEventRequest,
};

export default compose(
  connect(undefined, mapDispatchToProps),
  Form.create(),
)(StepEvent);
