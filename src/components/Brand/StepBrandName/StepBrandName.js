import React from 'react';
import { func, shape, string } from 'prop-types';
import {
  Input, Button, Icon, Form,
} from 'antd';
import './StepBrandName.css';

const StepBrandName = ({ next, formValues, onFormValueChange }) => (
  <Form layout="inline" className="opfc-step-brand-name">
    <Input
      name="brandName"
      value={formValues.brandName}
      size="large"
      title="Brand Name"
      placeholder="Enter a Brand Name"
      onChange={e => onFormValueChange('brandName', e.target.value)}
    />
    <Button type="primary" size="large" onClick={next} className="opfc-next-step">
      <Icon type="right-circle" theme="outlined" className="opfc-next-step-icon" />
    </Button>
  </Form>
);

StepBrandName.propTypes = {
  next: func.isRequired,
  formValues: shape({
    brandName: string,
  }).isRequired,
  onFormValueChange: func.isRequired,
};

export default StepBrandName;
