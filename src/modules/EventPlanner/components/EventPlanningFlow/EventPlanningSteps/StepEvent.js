import React, { Component } from 'react';
import {
  Form, Input, DatePicker, Cascader, InputNumber, Select, Row, Col, TimePicker,
} from 'antd';
import { compose } from 'redux';
import {
  shape, func, arrayOf, oneOfType, string, number,
} from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { map } from 'lodash';
import { withRouter } from 'react-router-dom';
import './StepEvent.css';
import { createEventRequest, fetchEventDetailRequest } from '../../../actions/event';

class StepEvent extends Component {
  static propTypes = {
    form: shape({
      getFieldDecorator: func.isRequired,
      validateFieldsAndScroll: func.isRequired,
    }).isRequired,
    next: func.isRequired,
    createEventRequestAction: func.isRequired,
    selectedEvent: shape({}).isRequired,
    eventTypeList: arrayOf(shape({})).isRequired,
    categoryList: arrayOf(shape({})).isRequired,
    cityAndDistrictList: arrayOf(shape({})).isRequired,
    match: shape({
      params: shape({
        id: oneOfType([string, number]),
      }),
    }).isRequired,
    history: shape({
      push: func,
    }).isRequired,
    fetchEventDetailRequestAction: func.isRequired,
  }

  componentDidMount() {
    const { match: { params: { id } }, fetchEventDetailRequestAction } = this.props;

    if (!/^\d+$/.test(id)) return;
    fetchEventDetailRequestAction(id);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id } }, fetchEventDetailRequestAction } = this.props;
    if (!/^\d+$/.test(id)) return;
    if (prevProps.match.params.id === id) return;

    fetchEventDetailRequestAction(id);
  }

  handleSubmit = (e) => {
    const {
      form: { validateFieldsAndScroll },
      createEventRequestAction,
      selectedEvent,
      next,
      history: { push },
    } = this.props;

    e.preventDefault();

    const navigateToEventDetail = (event) => {
      push(`/profile/event-planner/event/${event.id}`);
      next();
    };
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        createEventRequestAction({
          ...selectedEvent,
          ...values,
        }, navigateToEventDetail);
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      selectedEvent,
      eventTypeList,
      categoryList,
      cityAndDistrictList,
    } = this.props;

    return (
      <Form className="opfc-step-event-form" onSubmit={this.handleSubmit}>
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
            <Form.Item label="Date">
              {
                getFieldDecorator('date', {
                  initialValue: selectedEvent.date && moment(selectedEvent.date).isValid() ? moment(selectedEvent.date) : null, //eslint-disable-line
                  rules: [{ required: true, message: 'Date is required!' }],
                })(
                  <DatePicker format="YYYY-MM-DD" />,
                )
              }
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item label="Start Time">
                  {
                    getFieldDecorator('startAt', {
                      initialValue: selectedEvent.startAt && moment(selectedEvent.startAt).isValid() ? moment(selectedEvent.startAt) : null, //eslint-disable-line
                      rules: [{ required: true, message: 'Start Time is required!' }],
                    })(
                      <TimePicker format="HH:mm" />,
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="End Time">
                  {
                    getFieldDecorator('endAt', {
                      initialValue: selectedEvent.endAt && moment(selectedEvent.endAt).isValid() ? moment(selectedEvent.endAt) : null, //eslint-disable-line
                      rules: [{ required: true, message: 'End Time is required!' }],
                    })(
                      <TimePicker format="HH:mm" />,
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="City and District">
              {
                getFieldDecorator('cityDistrict', {
                  initialValue: [selectedEvent.cityId, selectedEvent.districtId],
                  rules: [{ required: true, message: 'City and District is required!' }],
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
                getFieldDecorator('eventTypeId', {
                  initialValue: selectedEvent.eventTypeId,
                  rules: [{ required: true, message: 'Event Type is required!' }],
                })(
                  <Select
                    showArrow
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} // eslint-disable-line
                  >
                    {
                      map(
                        eventTypeList,
                        t => <Select.Option key={t.id} value={t.id}>{t.eventTypeName}</Select.Option>, // eslint-disable-line
                      )
                    }
                  </Select>,
                )
              }
            </Form.Item>
            <Form.Item label="Categories">
              {
                getFieldDecorator('categoryIds', {
                  initialValue: selectedEvent.categoryIds,
                  rules: [{ required: true, message: 'At least one category is required!' }],
                })(
                  <Select
                    mode="multiple"
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} // eslint-disable-line
                  >
                    {
                      map(
                        categoryList,
                        t => <Select.Option key={t.id} value={t.id}>{t.name}</Select.Option>,
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
  }
}

const mapStateToProps = state => ({
  selectedEvent: state.eventPlannerReducer.event.event,
  eventTypeList: state.generalReducer.eventTypeList,
  categoryList: state.generalReducer.categoryList,
  cityAndDistrictList: state.generalReducer.cityAndDistrictList,
});

const mapDispatchToProps = {
  createEventRequestAction: createEventRequest,
  fetchEventDetailRequestAction: fetchEventDetailRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  Form.create(),
  withRouter,
)(StepEvent);
