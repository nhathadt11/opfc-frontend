import React, { Component } from 'react';
import { shape, func, arrayOf } from 'prop-types';
import {
  Form, Input, Cascader, Button,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './EventPlannerAccount.css';
import { EventPlannerTabTitleStyled } from '../../EventPlanner.styled';
import { createAccountRequest } from '../../../Account/actions/account';

const FormItem = Form.Item;
// const { Option } = Select;

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

class EventPlannerAccount extends Component {
  static propTypes = {
    form: shape({
      validateFieldsAndScroll: func.isRequired,
    }).isRequired,
    createAccountRequestAction: func.isRequired,
    cityAndDistrictList: arrayOf(shape({})).isRequired,
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
      cityDistrict: [account.cityId, account.districtId],
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
          phone: values.phone,
          city: values.cityDistrict[0],
          district: values.cityDistrict[1],
          address: values.address,
        };
        createAccountRequestAction(account, this.updateFormValues);
      }
    });
  }

  render() {
    const { form: { getFieldDecorator }, cityAndDistrictList } = this.props;

    // const prefixSelector = getFieldDecorator('phonePrefix', {
    //   initialValue: '86',
    // })(
    //   <Select style={{ width: 70 }}>
    //     <Option value="86">+86</Option>
    //     <Option value="87">+87</Option>
    //   </Select>,
    // );

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
            label="City and District"
          >
            {getFieldDecorator('cityDistrict', {
              rules: [{ type: 'array', required: true, message: 'Please select your City and District!' }],
            })(
              <Cascader options={cityAndDistrictList} />,
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
              <Input style={{ width: '100%' }} />,
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
  cityAndDistrictList: state.generalReducer.cityAndDistrictList,
});

const mapDispatchToProps = {
  createAccountRequestAction: createAccountRequest,
};

export default compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps),
)(EventPlannerAccount);
