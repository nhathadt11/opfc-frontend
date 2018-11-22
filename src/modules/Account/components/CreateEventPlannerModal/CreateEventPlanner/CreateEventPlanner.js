import React, { Component } from 'react';
import {
  Form, Row, Col, Input, Upload, Icon, message, Button, Cascader,
} from 'antd';
import { func, shape, arrayOf } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './CreateEventPlanner.css';
import Api from '../../../../../api/Api';
import { createAccountRequest } from '../../../../Account/actions/account';
import { cascaderFilter } from '../../../../../utils/Utils';

const FormItem = Form.Item;

class CreateEventPlanner extends Component {
  static propTypes = {
    form: shape({
      getFieldDecorator: func.isRequired,
      validateFieldsAndScroll: func.isRequired,
    }).isRequired,
    cityAndDistrictList: arrayOf(shape({})).isRequired,
    createAccountRequestAction: func.isRequired,
    onSuccess: func.isRequired,
    onCancel: func.isRequired,
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

    const { form: { validateFieldsAndScroll }, createAccountRequestAction, onSuccess } = this.props;
    const { imageUrl } = this.state;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        createAccountRequestAction({
          ...values,
          cityId: values.cityDistrict[0],
          districtId: values.cityDistrict[1],
          avatar: imageUrl,
        }, onSuccess);
      }
    });
  }

  handleUploadError = () => {
    message.error('Could not upload image');
  }

  render() {
    const { form: { getFieldDecorator }, cityAndDistrictList, onCancel } = this.props;
    const { imageUrl, loading } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Avatar</div>
      </div>
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
                getFieldDecorator('phone', {
                  rules: [{
                    required: true, message: 'Phone is required!',
                  }],
                })(
                  <Input
                    className="opfc-brand-account-input-phone"
                  />,
                )
              }
            </FormItem>
            <FormItem label="Email">
              {
                getFieldDecorator('email', {
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
                <Cascader options={cityAndDistrictList} showSearch={{ filter: cascaderFilter }} />,
              )}
            </FormItem>
            <FormItem label="Address">
              {
                getFieldDecorator('address', {
                  rules: [{
                    required: true, message: 'Address is required!',
                  }],
                })(
                  <Input
                    className="opfc-brand-account-input"
                  />,
                )
              }
            </FormItem>
            <div className="opfc-event-planner-register-actions">
              <Button type="primary" htmlType="submit">Register</Button>
              <Button onClick={onCancel}>Cancel</Button>
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

const mapDispatchToProps = {
  createAccountRequestAction: createAccountRequest,
};

export default compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps),
)(CreateEventPlanner);
