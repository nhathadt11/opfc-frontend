import React, { Component } from 'react';
import {
  Form, Row, Col, Input, Upload, Icon, Select, InputNumber, Cascader, message,
} from 'antd';
import { func, shape, string } from 'prop-types';
import { filter } from 'lodash';
import './StepBrandInformation.css';
import Api from '../../../api/Api';

const FormItem = Form.Item;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const locations = [{
  value: 'Ho Chi Minh',
  label: 'Ho Chi Minh',
  children: [{
    value: 'Go Vap',
    label: 'Go Vap',
    children: [{
      value: 'Phuong 14',
      label: 'Phuong 14',
    }],
  }],
}, {
  value: 'Da Nang',
  label: 'Da Nang',
  children: [{
    value: 'Quan Hai Chau',
    label: 'Quan Hai Chau',
    children: [{
      value: 'Phuong 10',
      label: 'Phuong 10',
    }],
  }],
}];

class StepBrandInformation extends Component {
  static propTypes = {
    form: shape({
      getFieldDecorator: func.isRequired,
      validateFieldsAndScroll: func.isRequired,
    }).isRequired,
    formValues: shape({
      brandName: string,
    }).isRequired,
    onFormValueChange: func.isRequired,
    next: func.isRequired,
  }

  state = {
    loading: false,
    imageUrl: null,
  }

  beforeUpload = (file) => {
    const { onFormValueChange } = this.props;
    this.setState({ loading: true });

    Api.uploadImage(file).then(({ data }) => {
      onFormValueChange('avatar', data.secure_url);

      getBase64(file, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }).catch(this.handleUploadError);

    return false;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { form: { validateFieldsAndScroll }, next } = this.props;
    validateFieldsAndScroll((err) => {
      if (!err) next();
    });
  }

  handleUploadError = () => {
    message.error('Could not upload image');
  }

  render() {
    const { form: { getFieldDecorator }, formValues, onFormValueChange } = this.props;
    const { imageUrl, loading } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Avatar</div>
      </div>
    );

    const prefixSelector = getFieldDecorator('publicPhonePrefix', {
      initialValue: formValues.publicPhonePrefix,
    })(
      <Select style={{ width: 70 }} onChange={value => onFormValueChange('phonePrefix', value)}>
        <Select.Option value="84">+84</Select.Option>
        <Select.Option value="85">+85</Select.Option>
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>,
    );

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Row type="flex" gutter={24}>
          <Col>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/jsonplaceholder.typicode.com/posts/"
              beforeUpload={this.beforeUpload}
            >
              {(imageUrl || formValues.avatar) ? <img src={imageUrl || formValues.avatar} alt="avatar" className="opfc-brand-avatar" /> : uploadButton}
            </Upload>
            <FormItem label="Bio">
              {
                getFieldDecorator('description', {
                  initialValue: formValues.description,
                  rules: [{
                    required: true, message: 'Bio is required!',
                  }],
                })(
                  <Input.TextArea
                    style={{ width: 200 }}
                    onChange={e => onFormValueChange('description', e.target.value)}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col>
            <FormItem label="Hotline">
              {
                getFieldDecorator('publicPhone', {
                  initialValue: formValues.publicPhone,
                  rules: [{
                    required: true, message: 'Hotline is required!',
                  }],
                })(
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: '100%' }}
                    onChange={e => onFormValueChange('publicPhone', e.target.value)}
                  />,
                )
              }
            </FormItem>
            <FormItem label="Email">
              {
                getFieldDecorator('publicEmail', {
                  initialValue: formValues.publicEmail,
                  rules: [{
                    required: true, message: 'Email is required!',
                  }, {
                    type: 'email', message: 'The input is not valid Email!',
                  }],
                })(
                  <Input
                    onChange={e => onFormValueChange('publicEmail', e.target.value)}
                  />,
                )
              }
            </FormItem>
            <FormItem label="Number of member">
              {
                getFieldDecorator('participantNumber', {
                  initialValue: formValues.participantNumber,
                  rules: [{
                    required: true, message: 'Number of member is required!',
                  }],
                })(
                  <InputNumber
                    min={1}
                    onChange={value => onFormValueChange('participantNumber', value)}
                  />,
                )
              }
            </FormItem>
            <Row>
              <FormItem
                label="City/District/Ward"
              >
                {getFieldDecorator('cityDistrictWard', {
                  initialValue: filter(
                    [formValues.city, formValues.district, formValues.ward],
                    item => item,
                  ),
                  rules: [{ type: 'array', required: true, message: 'Please select City/District/Ward!' }],
                })(
                  <Cascader
                    options={locations}
                    onChange={
                      (values) => {
                        onFormValueChange('city', values[0]);
                        onFormValueChange('district', values[1]);
                        onFormValueChange('ward', values[2]);
                      }
                    }
                  />,
                )}
              </FormItem>
            </Row>
          </Col>
        </Row>
        <input type="submit" id="brand-form" style={{ display: 'none' }} />
      </Form>
    );
  }
}

export default Form.create()(StepBrandInformation);
