import React from 'react';
import { Form, Select } from 'antd';
import { compose } from 'redux';
import { shape, func, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import { map, filter, some } from 'lodash';

const FormItem = Form.Item;

const StepServiceLocation = ({
  formValues, form, onFormValueChange, cityList, districtList, next,
}) => {
  const selectedDistrictList = filter(
    districtList,
    d => some(formValues.serviceCityIds, id => d.cityId === id),
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err) => {
      if (!err) next();
    });
  };

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <FormItem
        label="Service Cities"
      >
        {form.getFieldDecorator('serviceCityIds', {
          // initialValue: formValues.serviceLocationIds,
          rules: [{ type: 'array', required: true, message: 'Please select service cities!' }],
        })(
          <Select
            onChange={values => onFormValueChange('serviceCityIds', values)}
            mode="multiple"
            showSearch
          >
            { map(cityList, c => (
              <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
            )) }
          </Select>,
        )}
      </FormItem>
      <FormItem
        label="Service Districts"
      >
        {form.getFieldDecorator('serviceLocationIds', {
          // initialValue: formValues.serviceLocationIds,
          rules: [{ type: 'array', required: true, message: 'Please select service districts!' }],
        })(
          <Select
            onChange={values => onFormValueChange('serviceLocationIds', values)}
            mode="multiple"
            showSearch
          >
            { map(selectedDistrictList, d => (
              <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>
            )) }
          </Select>,
        )}
      </FormItem>
      <input type="submit" id="brand-form" style={{ display: 'none' }} />
    </Form>
  );
};

StepServiceLocation.propTypes = {
  formValues: shape({}).isRequired,
  form: shape({
    getFieldDecorator: func.isRequired,
    validateFieldsAndScroll: func.isRequired,
  }).isRequired,
  onFormValueChange: func.isRequired,
  cityList: arrayOf(shape({})).isRequired,
  districtList: arrayOf(shape({})).isRequired,
  next: func.isRequired,
};

const mapStateToProps = state => ({
  districtList: state.generalReducer.districtList,
  cityList: state.generalReducer.cityList,
});

export default compose(
  Form.create(),
  connect(mapStateToProps),
)(StepServiceLocation);
