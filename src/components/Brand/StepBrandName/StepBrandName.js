import React, { PureComponent } from 'react';
import { func, shape, string } from 'prop-types';
import {
  Input, Button, Icon, Form,
} from 'antd';
import { isEmpty, debounce } from 'lodash';
import './StepBrandName.css';
import Api from '../../../api/Api';

const FormItem = Form.Item;

class StepBrandName extends PureComponent {
  static propTypes = {
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

  state = {
    validateStatus: undefined,
  }

  isBrandNameAvailable = debounce((brandName, callback) => {
    Api.isBrandNameAvailable(brandName)
      .then(() => {
        callback();
        this.setState({ validateStatus: 'success' });
      })
      .catch(({ response }) => {
        callback(response.data.message);
        this.setState({ validateStatus: 'error' });
      });
  }, 400)

  handleSubmit = (e) => {
    const { next, form: { validateFieldsAndScroll } } = this.props;
    e.preventDefault();

    validateFieldsAndScroll((err) => {
      if (!err) next();
    });
  };


  render() {
    const { form: { getFieldDecorator }, formValues, onFormValueChange } = this.props;
    const { validateStatus } = this.state;

    return (
      <Form layout="inline" className="opfc-step-brand-name" onSubmit={this.handleSubmit}>
        <FormItem validateStatus={validateStatus} hasFeedback className="opfc-brand-name-feedback">
          {
            getFieldDecorator('brandName', {
              initialValue: formValues.brandName,
              rules: [{
                validator: (rule, value, callback) => {
                  this.setState({ validateStatus: 'validating' });

                  if (isEmpty(value)) callback('Brand Name is required!');

                  this.isBrandNameAvailable(value, callback);
                },
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
  }
}

export default Form.create()(StepBrandName);
