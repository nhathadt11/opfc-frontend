import React, { Component, Fragment } from 'react';
import {
  Steps, Button, Icon, Affix,
} from 'antd';
import { map } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { bool, func, number } from 'prop-types';
import StepEvent from './EventPlanningSteps/StepEvent';
import { EventStepContentStyled, ActionButtonGroupStyled } from './EventStepFlow.styled';
import StepPickMenus from './EventPlanningSteps/StepPickMenus';
import Cart from '../../../Cart/containers/Cart/Cart';
import { nextEventPlanStep, prevEventPlanStep, createOrderRequest } from '../../actions/planningFlow';
import './EventPlanningFlow.css';

const { Step } = Steps;

const PaymentContent = (
  <div className="opfc-payment-content-container">
    <Icon type="warning" style={{ fontSize: 48, color: '#ffcc00', marginBottom: 12 }} />
    <section className="opfc-payment-warning">The next process requires payment from PayPal.</section>
    <section className="opfc-payment-warning">Review your cart in care before finalizing it.</section>
  </div>
);

class EventPlanningFlow extends Component {
  static propTypes = {
    submitting: bool.isRequired,
    currentStep: number.isRequired,
    nextEventPlanStepAction: func.isRequired,
    prevEventPlanStepAction: func.isRequired,
    createOrderRequestAction: func.isRequired,
  }

  constructor(props) {
    super(props);

    this.steps = [
      { title: 'Event', content: <StepEvent next={this.next} /> },
      { title: 'Menu Suggestion', content: <StepPickMenus next={this.next} prev={this.prev} /> },
      { title: 'Cart', content: <Cart /> },
      { title: 'Payment', content: PaymentContent },
    ];
  }

  next = () => {
    const { nextEventPlanStepAction } = this.props;
    nextEventPlanStepAction();
  }

  prev = () => {
    const { prevEventPlanStepAction } = this.props;
    prevEventPlanStepAction();
  }

  render() {
    const { submitting, currentStep, createOrderRequestAction } = this.props;

    return (
      <Fragment>
        <Affix offsetTop={0} className="opfc-event-planning-steps-affix">
          <Steps current={currentStep} style={{ width: 800, alignSelf: 'center', padding: '15px 0' }}>
            {
              map(this.steps, (step, index) => <Step title={step.title} key={index} />)
            }
          </Steps>
        </Affix>
        <EventStepContentStyled>{this.steps[currentStep].content}</EventStepContentStyled>
        <Affix offsetBottom={0}>
          <ActionButtonGroupStyled>
            {
              (currentStep <= this.steps.length - 1) && (currentStep !== 0)
              && <Button size="large" onClick={this.prev} disabled={submitting}><Icon type="left" theme="outlined" />Prev</Button>
            }
            {
              (currentStep === this.steps.length - 1)
              && <Button type="primary" size="large" loading={submitting} onClick={createOrderRequestAction}>Proceed</Button>
            }
            {
              currentStep > 0 && (currentStep !== this.steps.length - 1)
              && <Button size="large" type="primary" onClick={this.next} loading={submitting}>Next<Icon type="right" theme="outlined" /></Button>
            }
            {
              currentStep === 0 && (
                <Button size="large" type="primary" loading={submitting}>
                  <label htmlFor="form-event" className="opfc-pointer-cursor">Next</label>
                  <Icon type="right" theme="outlined" />
                </Button>
              )
            }
          </ActionButtonGroupStyled>
        </Affix>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { submitting, currentStep } = state.eventPlannerReducer.event;

  return {
    submitting,
    currentStep,
  };
};

const mapDispatchToProps = {
  nextEventPlanStepAction: nextEventPlanStep,
  prevEventPlanStepAction: prevEventPlanStep,
  createOrderRequestAction: createOrderRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventPlanningFlow);
