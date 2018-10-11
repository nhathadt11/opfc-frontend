import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import {
  Form, Input, Cascader, Select, Button,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './EventPlannerAccount.css';
import { EventPlannerTabTitleStyled } from '../../EventPlanner.styled';
import { createAccountRequest } from '../../../Account/actions/account';

const FormItem = Form.Item;
const { Option } = Select;

const residences = [{
  value: 'Ho Chi Minh',
  label: 'Ho Chi Minh',
  children: [{
    value: 'Go Vap',
    label: 'Go Vap',
    children: [{
      value: 'Phuong 14',
      label: 'Phuong 14',
    }],
  }],
}, {
  value: 'Da Nang',
  label: 'Da Nang',
  children: [{
    value: 'Quan Hai Chau',
    label: 'Quan Hai Chau',
    children: [{
      value: 'Phuong 10',
      label: 'Phuong 10',
    }],
  }],
}];

class EventPlannerAccount extends Component {
  static propTypes = {
    form: shape({
      validateFieldsAndScroll: func.isRequired,
    }).isRequired,
    createAccountRequestAction: func.isRequired,
  }

  componentDidMount() {
    const { account: { user } } = this.props;
    this.updateFormValues(user);
  }

  updateFormValues = (account) => {
    const { form: { setFieldsValue } } = this.props;
    setFieldsValue({
      username: account.username,
      password: account.password,
      confirmPassword: account.password,
      email: account.email,
      cityDistrictWard: [account.city, account.district, account.ward],
      phone: account.phone,
      address: account.address,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      createAccountRequestAction,
      account: { user },
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const account = {
          ...user,
          username: values.username,
          email: values.email,
          password: values.password,
          phone: values.phonePrefix + values.phone,
          city: values.cityDistrictWard[0],
          district: values.cityDistrictWard[1],
          ward: values.cityDistrictWard[2],
          address: values.address,
        };
        createAccountRequestAction(account, this.updateFormValues);
      }
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('phonePrefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    return (
      <div>
        <EventPlannerTabTitleStyled>Account</EventPlannerTabTitleStyled>
        <Form className="opfc-event-planner-account" onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="Username"
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: 'Please input your Username!',
              }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Confirm Password"
          >
            {getFieldDecorator('confirmPassword', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="City/District/Ward"
          >
            {getFieldDecorator('cityDistrictWard', {
              rules: [{ type: 'array', required: true, message: 'Please select your City/District/Ward!' }],
            })(
              <Cascader options={residences} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Address"
          >
            {getFieldDecorator('address', {
              rules: [{ required: true, message: 'Please input your address!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Phone Number"
          >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />,
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Save</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  account: state.accountReducer.account.account,
});

const mapDispatchToProps = {
  createAccountRequestAction: createAccountRequest,
};

export default compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps),
)(EventPlannerAccount);
