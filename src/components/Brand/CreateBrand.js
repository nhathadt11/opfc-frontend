import React, { Component } from 'react';
import {
  Steps, Button, Row, Col,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';
import './CreateBrand.css';
import StepBrandName from './StepBrandName/StepBrandName';
import StepBrandInformation from './StepBrandInformation/StepBrandInformation';
import StepBrandAccount from './StepBrandAccount/StepBrandAccount';
import { createBrandRequest } from '../../modules/Account/actions/createBrand';

const { Step } = Steps;

class CreateBrand extends Component {
  static propTypes = {
    createBrandRequest: func.isRequired,
    onSuccess: func.isRequired,
    submitting: bool.isRequired,
  }

  state = {
    current: 0,
    formValues: {
      publicPhonePrefix: '84',
      privatePhonePrefix: '84',
    },
  }

  steps = [{
    title: 'Brand Name',
    content: props => <StepBrandName next={() => this.next()} {...props} />,
  }, {
    title: 'Information',
    content: props => <StepBrandInformation next={() => this.next()} {...props} />,
  }, {
    title: 'Account',
    content: props => <StepBrandAccount done={this.handleSubmit} {...props} />,
  }];

  handleFormValueChange = (field, value) => {
    this.setState(({ formValues }) => ({
      formValues: {
        ...formValues,
        [field]: value,
      },
    }));
  }

  handleSubmit = () => {
    const { createBrandRequest: createBrandRequestAction, onSuccess } = this.props;
    const { formValues } = this.state;

    createBrandRequestAction(formValues, onSuccess);
  }

  next() {
    this.setState(({ current }) => ({ current: current + 1 }));
  }

  prev() {
    this.setState(({ current }) => ({ current: current - 1 }));
  }

  render() {
    const { submitting } = this.props;
    const { current, formValues } = this.state;

    return (
      <Row type="flex" className="opfc-create-brand-container">
        <Col style={{ padding: 100 }}>
          <Steps current={current} direction="vertical">
            {this.steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </Col>
        <Col className="opfc-step-content">
          {this.steps[current].content({
            formValues,
            onFormValueChange: this.handleFormValueChange,
          })}
          <div className="steps-action">
            {
              (current < this.steps.length - 1) && (current !== 0)
              && <Button type="primary" size="large"><label htmlFor="brand-form">Next</label></Button>
            }
            {
              current === this.steps.length - 1
              && <Button type="primary" size="large" onClick={this.handleSubmit} loading={submitting}>Done</Button>
            }
            {
              current > 0
              && (
              <Button style={{ marginLeft: 8 }} size="large" onClick={() => this.prev()}>
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

const mapStateToProps = state => ({
  submitting: state.accountReducer.submitting,
});

const mapDispatchToProps = {
  createBrandRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(CreateBrand);
