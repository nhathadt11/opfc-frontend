import React from 'react';
import { Form, Input, Select } from 'antd';
import { shape, func } from 'prop-types';
import './StepBrandAccount.css';

const FormItem = Form.Item;

const StepBrandAccount = ({ form: { getFieldDecorator } }) => {
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select style={{ width: 70 }}>
      <Select.Option value="86">+86</Select.Option>
      <Select.Option value="87">+87</Select.Option>
    </Select>,
  );

  return (
    <Form>
      <FormItem label="Username">
        <Input className="opfc-brand-account-input" />
      </FormItem>
      <FormItem label="Password">
        <Input className="opfc-brand-account-input" />
      </FormItem>
      <FormItem label="Confirm password">
        <Input className="opfc-brand-account-input" />
      </FormItem>
      <FormItem label="Phone">
        <Input className="opfc-brand-account-input-phone" addonBefore={prefixSelector} />
      </FormItem>
      <FormItem label="Email">
        <Input className="opfc-brand-account-input" />
      </FormItem>
    </Form>
  );
};

StepBrandAccount.propTypes = {
  form: shape({
    getFieldDecorator: func.isRequired,
  }).isRequired,
};

export default Form.create()(StepBrandAccount);
