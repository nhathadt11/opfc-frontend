import React, { Component } from 'react';
import {
  Form, Row, Col, Input, Upload, Icon, Select, message, Button, Cascader,
} from 'antd';
import { func, shape, arrayOf } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './CreateEventPlanner.css';
import Api from '../../../../../api/Api';

const FormItem = Form.Item;

class CreateEventPlanner extends Component {
  static propTypes = {
    form: shape({
      getFieldDecorator: func.isRequired,
      validateFieldsAndScroll: func.isRequired,
    }).isRequired,
    cityAndDistrictList: arrayOf(shape({})).isRequired,
  }

  state = {
    loading: false,
    imageUrl: null,
  }

  beforeUpload = (file) => {
    this.setState({ loading: true });

    Api.uploadImage(file).then(({ data }) => {
      this.setState({ imageUrl: data.secure_url });
    }).catch(this.handleUploadError);

    return false;
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form: { getFieldValue } } = this.props;
    if (value && value !== getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { form: { validateFieldsAndScroll } } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        // TODO: submit with values
      }
    });
  }

  handleUploadError = () => {
    message.error('Could not upload image');
  }

  render() {
    const { form: { getFieldDecorator }, cityAndDistrictList } = this.props;
    const { imageUrl, loading } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Avatar</div>
      </div>
    );

    const prefixSelector = getFieldDecorator('publicPhonePrefix', {
      initialValue: '84',
    })(
      <Select style={{ width: 70 }}>
        <Select.Option value="84">+84</Select.Option>
        <Select.Option value="85">+85</Select.Option>
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>,
    );

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Row type="flex" gutter={24} style={{ flexFlow: 'unset' }}>
          <Col>
            <Upload
              name="avatar"
              listType="picture-card"
              className="opfc-event-planner-register-avatar"
              showUploadList={false}
              action="/jsonplaceholder.typicode.com/posts/"
              beforeUpload={this.beforeUpload}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" className="opfc-create-event-planner-avatar" /> : uploadButton}
            </Upload>
          </Col>
          <Col>
            <FormItem label="Username">
              {
                getFieldDecorator('username', {
                  rules: [{
                    required: true, message: 'Username is required!',
                  }],
                })(
                  <Input className="opfc-brand-account-input" />,
                )
              }
            </FormItem>
            <FormItem label="Password">
              {
                getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Password is required!',
                  }],
                })(
                  <Input
                    type="password"
                    className="opfc-brand-account-input"
                  />,
                )
              }
            </FormItem>
            <FormItem label="Confirm password">
              {
                getFieldDecorator('confirmPassword', {
                  rules: [{
                    required: true, message: 'You must confirm your password!',
                  }, {
                    validator: this.compareToFirstPassword,
                  }],
                })(
                  <Input
                    type="password"
                    className="opfc-brand-account-input"
                  />,
                )
              }
            </FormItem>
            <FormItem label="Phone">
              {
                getFieldDecorator('privatePhone', {
                  rules: [{
                    required: true, message: 'Phone is required!',
                  }],
                })(
                  <Input
                    className="opfc-brand-account-input-phone"
                    addonBefore={prefixSelector}
                  />,
                )
              }
            </FormItem>
            <FormItem label="Email">
              {
                getFieldDecorator('privateEmail', {
                  rules: [{
                    required: true, message: 'Email is required!',
                  }, {
                    type: 'email', message: 'The input is not valid Email!',
                  }],
                })(
                  <Input
                    className="opfc-brand-account-input"
                  />,
                )
              }
            </FormItem>
            <FormItem
              label="City and District"
            >
              {getFieldDecorator('cityDistrict', {
                rules: [{ type: 'array', required: true, message: 'Please select City and District!' }],
              })(
                <Cascader options={cityAndDistrictList} />,
              )}
            </FormItem>
            <div className="opfc-event-planner-register-actions">
              <Button type="primary" htmlType="submit">Register</Button>
              <Button>Cancel</Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  cityAndDistrictList: state.generalReducer.cityAndDistrictList,
});

export default compose(
  Form.create(),
  connect(mapStateToProps),
)(CreateEventPlanner);
