import React, { Component } from 'react';
import { Steps } from 'antd';
import { CheckoutStyled, CheckoutStepsStyled } from './Checkout.styled';

const { Step } = Steps;

const steps = [{
  title: 'Login',
  content: () => 'Login',
}, {
  title: 'Address',
  content: () => 'Address',
}, {
  title: 'Payment',
  content: () => 'Payment',
}];

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next = () => {
    this.setState(({ current }) => ({ current: current + 1 }));
  }

  prev = () => {
    this.setState(({ current }) => ({ current: current - 1 }));
  }

  render() {
    const { current } = this.state;
    return (
      <CheckoutStyled>
        <CheckoutStepsStyled>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </CheckoutStepsStyled>
        <div className="steps-content">{steps[current].content({ next: this.next, prev: this.prev })}</div>
      </CheckoutStyled>
    );
  }
}

export default Checkout;
