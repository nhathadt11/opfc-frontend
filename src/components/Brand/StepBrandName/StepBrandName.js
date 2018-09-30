import React from 'react';
import { func, shape, string } from 'prop-types';
import {
  Input, Button, Icon, Form,
} from 'antd';
import './StepBrandName.css';

const FormItem = Form.Item;

const StepBrandName = ({
  next, formValues, onFormValueChange, form: { validateFieldsAndScroll, getFieldDecorator },
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    validateFieldsAndScroll((err) => {
      if (!err) next();
    });
  };

  return (
    <Form layout="inline" className="opfc-step-brand-name" onSubmit={handleSubmit}>
      <FormItem>
        {
          getFieldDecorator('brandName', {
            initialValue: formValues.brandName,
            rules: [{
              required: true, message: 'Brand Name is required!',
            }],
          })(
            <Input
              name="brandName"
              size="large"
              title="Brand Name"
              placeholder="Enter a Brand Name"
              onChange={e => onFormValueChange('brandName', e.target.value)}
            />,
          )
        }
      </FormItem>
      <Button type="primary" size="large" htmlType="submit" className="opfc-next-step">
        <Icon type="right-circle" theme="outlined" className="opfc-next-step-icon" />
      </Button>
    </Form>
  );
};

StepBrandName.propTypes = {
  next: func.isRequired,
  formValues: shape({
    brandName: string,
  }).isRequired,
  onFormValueChange: func.isRequired,
  form: shape({
    validateFieldsAndScroll: func.isRequired,
    getFieldDecorator: func.isRequired,
  }).isRequired,
};

export default Form.create()(StepBrandName);
