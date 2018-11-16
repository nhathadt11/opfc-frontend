import React from 'react';
import {
  Row, Rate, Modal, Form,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  bool, func, shape, string, number,
} from 'prop-types';
import moment from 'moment';
import { hideRatingModal } from '../../actions/planningFlow';
import {
  RatingModalTitleStyled, RatingEventTitleStyled, RatingEventNameStyled,
  RatingEventTimeTitleStyled, RatingEventTimeValueStyled,
} from './RatingModal.styled';
import './RatingModal.css';
import { rateBrandRequest } from '../../actions/order';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const RatingModal = ({
  visible, hideRatingModalAction, rate, rateBrandRequestAction,
  form: { validateFieldsAndScroll, getFieldDecorator },
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        rateBrandRequestAction(rate.orderLineId, values, hideRatingModalAction);
      }
    });
  };

  return (
    <Modal
      visible={visible}
      onCancel={hideRatingModalAction}
      onOk={handleSubmit}
    >
      <Row>
        <RatingModalTitleStyled>Rating for {rate.brandName}</RatingModalTitleStyled>
      </Row>
      <Row>
        <RatingEventTitleStyled>Event</RatingEventTitleStyled>
        <RatingEventNameStyled>{rate.eventName}</RatingEventNameStyled>
        <RatingEventTimeTitleStyled>on</RatingEventTimeTitleStyled>
        <RatingEventTimeValueStyled>{moment(rate.eventDate).format('MMM DD')}</RatingEventTimeValueStyled>
      </Row>
      <Row className="opfc-event-rating-content">
        <Form layout="inline">
          <FormItem label="Support Service" {...formItemLayout}>
            {
              getFieldDecorator('supportService', {
                rules: [{
                  required: true, message: 'Support Service is required!',
                }],
              })(<Rate allowHalf />)
            }
          </FormItem>
          <FormItem label="Varieties" {...formItemLayout}>
            {
              getFieldDecorator('diffVateries', {
                rules: [{
                  required: true, message: 'Varieties is required!',
                }],
              })(<Rate allowHalf />)
            }
          </FormItem>
          <FormItem label="Food Quality" {...formItemLayout}>
            {
              getFieldDecorator('foodQuality', {
                rules: [{
                  required: true, message: 'Food Quality is required!',
                }],
              })(<Rate allowHalf />)
            }
          </FormItem>
          <FormItem label="On Time" {...formItemLayout}>
            {
              getFieldDecorator('onTime', {
                rules: [{
                  required: true, message: 'On Time is required!',
                }],
              })(<Rate allowHalf />)
            }
          </FormItem>
          <FormItem label="Resonable Price" {...formItemLayout}>
            {
              getFieldDecorator('resonablePrice', {
                rules: [{
                  required: true, message: 'Resonable Price is required!',
                }],
              })(<Rate allowHalf />)
            }
          </FormItem>
          <FormItem label="Caterer Attitude" {...formItemLayout}>
            {
              getFieldDecorator('attitude', {
                rules: [{
                  required: true, message: 'Caterer Attitude is required!',
                }],
              })(<Rate allowHalf />)
            }
          </FormItem>
        </Form>
      </Row>
    </Modal>
  );
};

RatingModal.propTypes = {
  visible: bool.isRequired,
  hideRatingModalAction: func.isRequired,
  rate: shape({
    brandName: string,
    orderLineId: number,
  }).isRequired,
  rateBrandRequestAction: func.isRequired,
  form: shape({
    getFieldDecorator: func.isRequired,
    validateFieldsAndScroll: func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  visible: state.eventPlannerReducer.event.ratingModalVisible,
  rate: state.eventPlannerReducer.event.rate,
});

const mapDispatchToProps = {
  hideRatingModalAction: hideRatingModal,
  rateBrandRequestAction: rateBrandRequest,
};

export default compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps),
)(RatingModal);
