import React from 'react';
import {
  Modal, Form, Input, Cascader, Select,
} from 'antd';
import {
  bool, func, shape, string, arrayOf,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const { Option } = Select;

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

const EditEventPlannerAddressModal = ({
  title, visible, handleOk, handleCancel, form: { getFieldDecorator }, data, cityAndDistrictList,
}) => {
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>,
  );

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form className="opfc-event-planner-account">
        <FormItem
          {...formItemLayout}
          label="Receiver"
        >
          {getFieldDecorator('receiver', {
            initialValue: data.receiver,
            rules: [{
              required: true, message: 'Please input receiver!',
            }],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phoneNumber', {
            initialValue: data.phoneNumber,
            rules: [{ required: true, message: 'Please input receiver phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="City and District"
        >
          {getFieldDecorator('cityDistrict', {
            initialValue: [data.city, data.district, data.ward],
            rules: [{ type: 'array', required: true, message: 'Please select your City and District!' }],
          })(
            <Cascader options={cityAndDistrictList} />,
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

EditEventPlannerAddressModal.propTypes = {
  title: string,
  visible: bool.isRequired,
  handleOk: func.isRequired,
  handleCancel: func.isRequired,
  form: shape({
    getFieldDecorator: func.isRequired,
  }).isRequired,
  data: shape({
    receiver: string,
    city: string,
    district: string,
    ward: string,
    phoneNumber: string,
  }).isRequired,
  cityAndDistrictList: arrayOf(shape({})).isRequired,
};

EditEventPlannerAddressModal.defaultProps = {
  title: 'Create Address',
};

const mapStateToProps = state => ({
  cityAndDistrictList: state.generalReducer.cityAndDistrictList,
});

export default compose(
  Form.create(),
  connect(mapStateToProps),
)(EditEventPlannerAddressModal);
