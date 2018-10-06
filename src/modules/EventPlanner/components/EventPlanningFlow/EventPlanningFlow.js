import React, { Component, Fragment } from 'react';
import { Steps, Button, Icon } from 'antd';
import { map } from 'lodash';
import StepEvent from './EventPlanningSteps/StepEvent';
import { EventStepContentStyled, ActionButtonGroupStyled } from './EventStepFlow.styled';
import StepPickMenus from './EventPlanningSteps/StepPickMenus';
import Cart from '../../../Cart/containers/Cart/Cart';

const { Step } = Steps;

class EventPlanningFlow extends Component {
  constructor(props) {
    super(props);

    this.steps = [
      { title: 'Event', content: <StepEvent next={this.next} /> },
      { title: 'Menus', content: <StepPickMenus next={this.next} prev={this.prev} /> },
      { title: 'Cart', content: <Cart /> },
      { title: 'Payment', content: 'Payment' },
    ];
  }

  state = {
    current: 0,
  }

  next = () => this.setState(({ current }) => ({ current: current + 1 }))

  prev = () => this.setState(({ current }) => ({ current: current - 1 }))

  render() {
    const { current } = this.state;

    return (
      <Fragment>
        <Steps current={current} style={{ width: 800, alignSelf: 'center', marginTop: 30 }}>
          {
            map(this.steps, (step, index) => <Step title={step.title} key={index} />)
          }
        </Steps>
        <EventStepContentStyled>{this.steps[current].content}</EventStepContentStyled>
        <ActionButtonGroupStyled>
          {
            (current <= this.steps.length - 1) && (current !== 0)
            && <Button size="large" onClick={this.prev}><Icon type="left" theme="outlined" />Prev</Button>
          }
          {
            (current === this.steps.length - 1)
            && <Button type="primary" size="large">Done</Button>
          }
          {
            current > 0 && (current !== this.steps.length - 1)
            && <Button size="large" type="primary" onClick={this.next}>Next<Icon type="right" theme="outlined" /></Button>
          }
          {
            current === 0 && <Button size="large" type="primary"><label htmlFor="form-event">Next</label><Icon type="right" theme="outlined" /></Button>
          }
        </ActionButtonGroupStyled>
      </Fragment>
    );
  }
}

export default EventPlanningFlow;
