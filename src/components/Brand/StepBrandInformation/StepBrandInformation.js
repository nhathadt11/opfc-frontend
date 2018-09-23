import React, { Component } from 'react';
import {
  Form, Row, Col, Input, Upload, Icon, Select, InputNumber,
} from 'antd';
import { func, shape } from 'prop-types';
import './StepBrandInformation.css';

const FormItem = Form.Item;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

class StepBrandInformation extends Component {
  static propTypes = {
    form: shape({
      getFieldDecorator: func.isRequired,
    }).isRequired,
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
    const { form: { getFieldDecorator } } = this.props;
    const { imageUrl, loading } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

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
        <Row type="flex" gutter={24} style={{ padding: '50px 10px' }}>
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
          </Col>
          <Col>
            <FormItem label="Brand Name">
              <Input readOnly value="OPFC" />
            </FormItem>
            <FormItem label="Description">
              <Input.TextArea />
            </FormItem>
            <FormItem label="Hotline">
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </FormItem>
            <FormItem label="Email">
              <Input value="johndoe@gmail.com" />
            </FormItem>
            <FormItem label="Number of member">
              <InputNumber />
            </FormItem>
            <Row>
              <Col span={8}>
                <FormItem label="City">
                  <Select defaultValue="lucy" style={{ width: 'calc(100% - 10px)' }}>
                    <Select.Option value="jack">Jack</Select.Option>
                    <Select.Option value="lucy">Lucy</Select.Option>
                    <Select.Option value="Yiminghe">yiminghe</Select.Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="District">
                  <Select defaultValue="lucy" style={{ width: 'calc(100% - 10px)' }}>
                    <Select.Option value="jack">Jack</Select.Option>
                    <Select.Option value="lucy">Lucy</Select.Option>
                    <Select.Option value="Yiminghe">yiminghe</Select.Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Ward">
                  <Select defaultValue="lucy" style={{ width: 'calc(100% - 10px)' }}>
                    <Select.Option value="jack">Jack</Select.Option>
                    <Select.Option value="lucy">Lucy</Select.Option>
                    <Select.Option value="Yiminghe">yiminghe</Select.Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(StepBrandInformation);
