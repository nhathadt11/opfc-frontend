import React from 'react';
import {
  Form, Input, DatePicker, Cascader, InputNumber, Select, Row, Col,
} from 'antd';
import { compose } from 'redux';
import { shape, func, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { map } from 'lodash';
import './StepEvent.css';
import { createEventRequest } from '../../../actions/event';

const { RangePicker } = DatePicker;

const StepEvent = ({
  form: { getFieldDecorator, validateFieldsAndScroll },
  next,
  createEventRequestAction,
  selectedEvent,
  eventTypeList,
  cityAndDistrictList,
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
                initialValue: selectedEvent.eventName,
                rules: [{ required: true, message: 'Event name is required!' }],
              })(
                <Input />,
              )
            }
          </Form.Item>
          <Form.Item label="Time Range">
            {
              getFieldDecorator('timeRange', {
                initialValue: [
                  selectedEvent.endAt && moment(selectedEvent.startAt).isValid() ? moment(selectedEvent.startAt) : null, //eslint-disable-line
                  selectedEvent.endAt && moment(selectedEvent.endAt).isValid() ? moment(selectedEvent.endAt) : null, //eslint-disable-line
                ],
                rules: [{ required: true, message: 'Time range is required!' }],
              })(
                <RangePicker showTime format="YYYY-MM-DD HH:mm" />,
              )
            }
          </Form.Item>
          <Form.Item label="City/District/Ward">
            {
              getFieldDecorator('cityDistrictWard', {
                initialValue: [selectedEvent.city, selectedEvent.district, selectedEvent.ward],
                rules: [{ required: true, message: 'City/District/Ward is required!' }],
              })(
                <Cascader options={cityAndDistrictList} />,
              )
            }
          </Form.Item>
          <Form.Item label="Address">
            {
              getFieldDecorator('address', {
                initialValue: selectedEvent.address,
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
                initialValue: selectedEvent.budget,
                rules: [{ required: true, message: 'Budget is required!' }],
              })(
                <Input />,
              )
            }
          </Form.Item>
          <Form.Item label="Serving number">
            {
              getFieldDecorator('servingNumber', {
                initialValue: selectedEvent.servingNumber,
                rules: [{ required: true, message: 'Serving number is required!' }],
              })(
                <InputNumber />,
              )
            }
          </Form.Item>
          <Form.Item label="Event Type">
            {
              getFieldDecorator('eventType', {
                initialValue: selectedEvent.eventTypeId,
                rules: [{ required: true, message: 'Event Type is required!' }],
              })(
                <Select>
                  {
                    map(
                      eventTypeList,
                      t => <Select.Option key={t.id} value={t.id}>{t.eventTypeName}</Select.Option>,
                    )
                  }
                </Select>,
              )
            }
          </Form.Item>
          <Form.Item label="Description">
            {
              getFieldDecorator('description', {
                initialValue: selectedEvent.description,
              })(
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
  selectedEvent: shape({}).isRequired,
  eventTypeList: arrayOf(shape({})).isRequired,
  cityAndDistrictList: arrayOf(shape({})).isRequired,
};

const mapStateToProps = state => ({
  selectedEvent: state.eventPlannerReducer.event.event,
  eventTypeList: state.generalReducer.eventTypeList,
  cityAndDistrictList: state.generalReducer.cityAndDistrictList,
});

const mapDispatchToProps = {
  createEventRequestAction: createEventRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  Form.create(),
)(StepEvent);
