import React from 'react';
import { func } from 'prop-types';
import {
  Input, Button, Icon, Form,
} from 'antd';

const FormItem = Form.Item;

const StepBrandName = ({ next }) => (
  <Form layout="inline">
    <FormItem>
      <span htmlFor="brandName">Name</span>
    </FormItem>
    <FormItem>
      <Input id="brandName" size="large" title="Brand Name" />
    </FormItem>
    <FormItem>
      <Button type="primary" size="large" onClick={next}>
        <Icon type="right-circle" theme="outlined" style={{ fontSize: 24 }} />
      </Button>
    </FormItem>
  </Form>
);

StepBrandName.propTypes = {
  next: func.isRequired,
};

export default StepBrandName;
