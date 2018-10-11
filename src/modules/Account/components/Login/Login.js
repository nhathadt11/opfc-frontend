import React, { Component } from 'react';
import { shape, func, bool } from 'prop-types';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './Login.css';
import { loginAccountRequest } from '../../actions/account';

const FormItem = Form.Item;

class Login extends Component {
  static propTypes = {
    form: shape({
      validateFields: func.isRequired,
      getFieldDecorator: func.isRequired,
    }).isRequired,
    registerNow: func.isRequired,
    loginAccountRequestAction: func.isRequired,
    hideLoginModal: func.isRequired,
    submitting: bool.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { form: { validateFields }, loginAccountRequestAction, hideLoginModal } = this.props;
    validateFields((err, values) => {
      if (!err) {
        loginAccountRequestAction(values.username, values.password, hideLoginModal);
      }
    });
  }

  render() {
    const { form: { getFieldDecorator }, registerNow, submitting } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>,
          )}
          <a href="#" className="opfc-event-planner-forget-password">Forgot password</a> {/*eslint-disable-line*/}
          <Button type="primary" htmlType="submit" className="opfc-event-planner-login" loading={submitting}>Log in</Button>
          Or <a href="#" onClick={registerNow}>register now!</a> {/*eslint-disable-line*/}
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  submitting: state.accountReducer.account.submitting,
});

const mapDispatchToProps = {
  loginAccountRequestAction: loginAccountRequest,
};

export default compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
