import React, { Component } from 'react';
import {
  Form, Row, Col, Input, Upload, Icon, Select, InputNumber, Cascader,
} from 'antd';
import { func, shape, string } from 'prop-types';
import './StepBrandInformation.css';

const FormItem = Form.Item;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const residences = [{
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
    }).isRequired,
    formValues: shape({
      brandName: string,
    }).isRequired,
    onFormValueChange: func.isRequired,
  }

  state = {
    loading: false,
    imageUrl: null,
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
    if (info.file.status === 'error') {
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
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
      <Form layout="vertical">
        <Row type="flex" gutter={24}>
          <Col>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/jsonplaceholder.typicode.com/posts/"
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" className="opfc-brand-avatar" /> : uploadButton}
            </Upload>
            <FormItem label="Bio">
              <Input.TextArea
                style={{ width: 200 }}
                value={formValues.description}
                onChange={e => onFormValueChange('description', e.target.value)}
              />
            </FormItem>
          </Col>
          <Col>
            <FormItem label="Brand Name">
              <Input readOnly value={formValues.brandName} />
            </FormItem>
            <FormItem label="Hotline">
              <Input
                addonBefore={prefixSelector}
                style={{ width: '100%' }}
                value={formValues.publicPhone}
                onChange={e => onFormValueChange('publicPhone', e.target.value)}
              />
            </FormItem>
            <FormItem label="Email">
              <Input
                value={formValues.publicEmail}
                onChange={e => onFormValueChange('publicEmail', e.target.value)}
              />
            </FormItem>
            <FormItem label="Number of member">
              <InputNumber
                value={formValues.participantNumber}
                onChange={value => onFormValueChange('participantNumber', value)}
              />
            </FormItem>
            <Row>
              <FormItem
                label="City/District/Ward"
              >
                {getFieldDecorator('cityDistrictWard', {
                  initialValue: [formValues.city, formValues.district, formValues.ward],
                  rules: [{ type: 'array', required: true, message: 'Please select your City/District/Ward!' }],
                })(
                  <Cascader
                    options={residences}
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
      </Form>
    );
  }
}

export default Form.create()(StepBrandInformation);
