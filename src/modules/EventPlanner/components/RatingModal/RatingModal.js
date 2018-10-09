import React from 'react';
import {
  Row, Col, Rate, Modal,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import { hideRatingModal } from '../../actions/planningFlow';
import {
  RatingModalTitleStyled, RatingEventTitleStyled, RatingEventNameStyled,
  RatingEventTimeTitleStyled, RatingEventTimeValueStyled,
} from './RatingModal.styled';
import './RatingModal.css';

const RatingModal = ({ visible, hideRatingModalAction }) => (
  <Modal
    visible={visible}
    onCancel={hideRatingModalAction}
  >
    <Row>
      <RatingModalTitleStyled>Rating for Brand ABC</RatingModalTitleStyled>
    </Row>
    <Row>
      <RatingEventTitleStyled>Event</RatingEventTitleStyled>
      <RatingEventNameStyled>Lorem Ipsum</RatingEventNameStyled>
      <RatingEventTimeTitleStyled>on</RatingEventTimeTitleStyled>
      <RatingEventTimeValueStyled>Sept 14th, 10:00 pm - 12:00 pm</RatingEventTimeValueStyled>
    </Row>
    <Row className="opfc-event-rating-content">
      <Col>
        <Row>
          <Col span={12} className="opfc-event-rating-label">Support Service</Col>
          <Col span={12}><Rate allowHalf defaultValue={2.5} /></Col>
        </Row>
        <Row>
          <Col span={12} className="opfc-event-rating-label">Varieties</Col>
          <Col span={12}><Rate allowHalf defaultValue={5} /></Col>
        </Row>
        <Row>
          <Col span={12} className="opfc-event-rating-label">Food Quality</Col>
          <Col span={12}><Rate allowHalf defaultValue={3.5} /></Col>
        </Row>
        <Row>
          <Col span={12} className="opfc-event-rating-label">On Time</Col>
          <Col span={12}><Rate allowHalf defaultValue={3.5} /></Col>
        </Row>
        <Row>
          <Col span={12} className="opfc-event-rating-label">Resonable Price</Col>
          <Col span={12}><Rate allowHalf defaultValue={3.5} /></Col>
        </Row>
        <Row>
          <Col span={12} className="opfc-event-rating-label">Caterer Attitude</Col>
          <Col span={12}><Rate allowHalf defaultValue={4.5} /></Col>
        </Row>
      </Col>
    </Row>
  </Modal>
);

RatingModal.propTypes = {
  visible: bool.isRequired,
  hideRatingModalAction: func.isRequired,
};

const mapStateToProps = state => ({
  visible: state.eventPlannerReducer.event.ratingModalVisible,
});

const mapDispatchToProps = {
  hideRatingModalAction: hideRatingModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(RatingModal);
