import React, { Component } from 'react';
import {
  Steps, Button, Row, Col,
} from 'antd';
import StepBrandName from './StepBrandName/StepBrandName';
import StepBrandInformation from './StepBrandInformation/StepBrandInformation';

const { Step } = Steps;

class CreateBrand extends Component {
  state = {
    current: 1,
  }

  steps = [{
    title: 'Brand Name',
    content: <StepBrandName next={() => this.next()} />,
  }, {
    title: 'Information',
    content: <StepBrandInformation />,
  }, {
    title: 'Account',
    content: 'Last-content',
  }];

  next() {
    this.setState(({ current }) => ({ current: current + 1 }));
  }

  prev() {
    this.setState(({ current }) => ({ current: current - 1 }));
  }

  render() {
    const { current } = this.state;

    return (
      <Row>
        <Col span={8}>
          <Steps current={current} direction="vertical">
            {this.steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </Col>
        <Col span={16}>
          <div className="steps-content">{this.steps[current].content}</div>
          <div className="steps-action">
            {
              (current < this.steps.length - 1) && (current !== 0)
              && <Button type="primary" onClick={() => this.next()}>Next</Button>
            }
            {
              current === this.steps.length - 1
              && <Button type="primary">Done</Button>
            }
            {
              current > 0
              && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
              )
            }
          </div>
        </Col>
      </Row>
    );
  }
}

export default CreateBrand;
