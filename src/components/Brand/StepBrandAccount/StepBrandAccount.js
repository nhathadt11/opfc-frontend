import React from 'react';
import { Form, Input } from 'antd';
import { shape, func, string } from 'prop-types';
import './StepBrandAccount.css';

const FormItem = Form.Item;

const StepBrandAccount = ({
  form: {
    getFieldDecorator, validateFieldsAndScroll, getFieldValue,
  },
  formValues, onFormValueChange, done,
}) => {
  // const prefixSelector = getFieldDecorator('privatePhonePrefix', {
  //   initialValue: formValues.privatePhonePrefix,
  // })(
  //   <Select style={{ width: 70 }}>
  //     <Select.Option value="84">+84</Select.Option>
  //     <Select.Option value="85">+85</Select.Option>
  //     <Select.Option value="86">+86</Select.Option>
  //     <Select.Option value="87">+87</Select.Option>
  //   </Select>,
  // );
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    validateFieldsAndScroll((err) => {
      if (!err) done();
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem label="Username">
        {
          getFieldDecorator('username', {
            initialValue: formValues.username,
            rules: [{
              required: true, message: 'Username is required!',
            }],
          })(
            <Input
              className="opfc-brand-account-input"
              onChange={e => onFormValueChange('username', e.target.value)}
            />,
          )
        }
      </FormItem>
      <FormItem label="Password">
        {
          getFieldDecorator('password', {
            initialValue: formValues.password,
            rules: [{
              required: true, message: 'Password is required!',
            }],
          })(
            <Input
              type="password"
              className="opfc-brand-account-input"
              onChange={e => onFormValueChange('password', e.target.value)}
            />,
          )
        }
      </FormItem>
      <FormItem label="Confirm password">
        {
          getFieldDecorator('confirmPassword', {
            initialValue: formValues.confirmPassword,
            rules: [{
              required: true, message: 'You must confirm your password!',
            }, {
              validator: compareToFirstPassword,
            }],
          })(
            <Input
              type="password"
              className="opfc-brand-account-input"
              onChange={e => onFormValueChange('confirmPassword', e.target.value)}
            />,
          )
        }
      </FormItem>
      <FormItem label="Phone">
        {
          getFieldDecorator('privatePhone', {
            initialValue: formValues.privatePhone,
            rules: [{
              required: true, message: 'Phone is required!',
            }],
          })(
            <Input
              className="opfc-brand-account-input-phone"
              // addonBefore={prefixSelector}
              onChange={e => onFormValueChange('privatePhone', e.target.value)}
            />,
          )
        }
      </FormItem>
      <FormItem label="Email">
        {
          getFieldDecorator('privateEmail', {
            initialValue: formValues.privateEmail,
            rules: [{
              required: true, message: 'Email is required!',
            }, {
              type: 'email', message: 'The input is not valid Email!',
            }],
          })(
            <Input
              className="opfc-brand-account-input"
              onChange={e => onFormValueChange('privateEmail', e.target.value)}
            />,
          )
        }
      </FormItem>
      <input type="submit" id="brand-form" style={{ display: 'none' }} />
    </Form>
  );
};

StepBrandAccount.propTypes = {
  form: shape({
    getFieldDecorator: func.isRequired,
    validateFieldsAndScroll: func.isRequired,
  }).isRequired,
  formValues: shape({
    username: string,
    password: string,
    confirmPassword: string,
    privatePhone: string,
    email: string,
  }).isRequired,
  onFormValueChange: func.isRequired,
  done: func.isRequired,
};

export default Form.create()(StepBrandAccount);
