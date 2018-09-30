import React from 'react';
import { Form, Input, Select } from 'antd';
import { shape, func, string } from 'prop-types';
import './StepBrandAccount.css';

const FormItem = Form.Item;

const StepBrandAccount = ({ form: { getFieldDecorator }, formValues, onFormValueChange }) => {
  const prefixSelector = getFieldDecorator('privatePhonePrefix', {
    initialValue: formValues.privatePhonePrefix,
  })(
    <Select style={{ width: 70 }}>
      <Select.Option value="84">+84</Select.Option>
      <Select.Option value="85">+85</Select.Option>
      <Select.Option value="86">+86</Select.Option>
      <Select.Option value="87">+87</Select.Option>
    </Select>,
  );

  return (
    <Form>
      <FormItem label="Username">
        <Input
          className="opfc-brand-account-input"
          value={formValues.username}
          onChange={e => onFormValueChange('username', e.target.value)}
        />
      </FormItem>
      <FormItem label="Password">
        <Input
          type="password"
          className="opfc-brand-account-input"
          value={formValues.password}
          onChange={e => onFormValueChange('password', e.target.value)}
        />
      </FormItem>
      <FormItem label="Confirm password">
        <Input
          type="password"
          className="opfc-brand-account-input"
          value={formValues.confirmPassword}
          onChange={e => onFormValueChange('confirmPassword', e.target.value)}
        />
      </FormItem>
      <FormItem label="Phone">
        <Input
          className="opfc-brand-account-input-phone"
          addonBefore={prefixSelector}
          value={formValues.privatePhone}
          onChange={e => onFormValueChange('privatePhone', e.target.value)}
        />
      </FormItem>
      <FormItem label="Email">
        <Input
          className="opfc-brand-account-input"
          value={formValues.privateEmail}
          onChange={e => onFormValueChange('privateEmail', e.target.value)}
        />
      </FormItem>
    </Form>
  );
};

StepBrandAccount.propTypes = {
  form: shape({
    getFieldDecorator: func.isRequired,
  }).isRequired,
  formValues: shape({
    username: string,
    password: string,
    confirmPassword: string,
    privatePhone: string,
    email: string,
  }).isRequired,
  onFormValueChange: func.isRequired,
};

export default Form.create()(StepBrandAccount);
