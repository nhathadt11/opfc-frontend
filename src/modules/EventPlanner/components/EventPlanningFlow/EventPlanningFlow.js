import React, { Component, Fragment } from 'react';
import { Steps, Button, Icon } from 'antd';
import { map } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import StepEvent from './EventPlanningSteps/StepEvent';
import { EventStepContentStyled, ActionButtonGroupStyled } from './EventStepFlow.styled';
import StepPickMenus from './EventPlanningSteps/StepPickMenus';
import Cart from '../../../Cart/containers/Cart/Cart';
import { nextEventPlanStep, prevEventPlanStep } from '../../actions/planningFlow';

const { Step } = Steps;

class EventPlanningFlow extends Component {
  static propTypes = {
    submitting: bool.isRequired,
    currentStep: bool.isRequired,
    nextEventPlanStepAction: func.isRequired,
    prevEventPlanStepAction: func.isRequired,
  }

  constructor(props) {
    super(props);

    this.steps = [
      { title: 'Event', content: <StepEvent next={this.next} /> },
      { title: 'Menus', content: <StepPickMenus next={this.next} prev={this.prev} /> },
      { title: 'Cart', content: <Cart /> },
      { title: 'Payment', content: 'Payment' },
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
    const { submitting, currentStep } = this.props;

    return (
      <Fragment>
        <Steps current={currentStep} style={{ width: 800, alignSelf: 'center', marginTop: 30 }}>
          {
            map(this.steps, (step, index) => <Step title={step.title} key={index} />)
          }
        </Steps>
        <EventStepContentStyled>{this.steps[currentStep].content}</EventStepContentStyled>
        <ActionButtonGroupStyled>
          {
            (currentStep <= this.steps.length - 1) && (currentStep !== 0)
            && <Button size="large" onClick={this.prev} disabled={submitting}><Icon type="left" theme="outlined" />Prev</Button>
          }
          {
            (currentStep === this.steps.length - 1)
            && <Button type="primary" size="large" loading={submitting}>Done</Button>
          }
          {
            currentStep > 0 && (currentStep !== this.steps.length - 1)
            && <Button size="large" type="primary" onClick={this.next} loading={submitting}>Next<Icon type="right" theme="outlined" /></Button>
          }
          {
            currentStep === 0 && <Button size="large" type="primary" loading={submitting}><label htmlFor="form-event">Next</label><Icon type="right" theme="outlined" /></Button>
          }
        </ActionButtonGroupStyled>
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
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventPlanningFlow);
