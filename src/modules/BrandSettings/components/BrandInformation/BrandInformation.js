import React, { Component } from 'react';
import {
  Form, Row, Col, Input, Upload, Icon, InputNumber, Cascader, message, Button,
} from 'antd';
import {
  func, shape, string, arrayOf, bool,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import './BrandInformation.css';
import Api from '../../../../api/Api';
import { updateBrandInformationRequest } from '../../actions/settings';

const FormItem = Form.Item;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

class BrandInformation extends Component {
  static propTypes = {
    form: shape({
      getFieldDecorator: func.isRequired,
      validateFieldsAndScroll: func.isRequired,
    }).isRequired,
    formValues: shape({
      brandName: string,
    }),
    cityAndDistrictList: arrayOf(shape({})).isRequired,
    updateBrandInformationRequestAction: func.isRequired,
    submitting: bool,
    userAvatar: string,
  }

  static defaultProps = {
    formValues: {},
    submitting: false,
    userAvatar: null,
  }

  state = {
    loading: false,
    imageUrl: null,
    secureUrl: null,
  }

  componentDidMount() {
    const { form: { setFieldsValue }, formValues, userAvatar } = this.props;

    setFieldsValue(formValues);
    this.setState({ imageUrl: formValues.avatar || userAvatar });
  }

  beforeUpload = (file) => {
    this.setState({ loading: true });

    Api.uploadImage(file).then(({ data }) => {
      getBase64(file, imageUrl => this.setState({
        imageUrl,
        secureUrl: data.secure_url,
        loading: false,
      }));
    }).catch(this.handleUploadError);

    return false;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll }, updateBrandInformationRequestAction, formValues,
    } = this.props;
    const { secureUrl } = this.state;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        updateBrandInformationRequestAction({
          ...formValues,
          ...values,
          avatar: secureUrl,
        });
      }
    });
  }

  handleUploadError = () => {
    message.error('Could not upload image');
  }

  render() {
    const {
      form: { getFieldDecorator },
      formValues,
      cityAndDistrictList,
      submitting,
    } = this.props;
    const { imageUrl, loading } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Avatar</div>
      </div>
    );

    // const prefixSelector = getFieldDecorator('publicPhonePrefix', {
    //   initialValue: formValues.publicPhonePrefix,
    // })(
    //   <Select style={{ width: 70 }}>
    //     <Select.Option value="84">+84</Select.Option>
    //     <Select.Option value="85">+85</Select.Option>
    //     <Select.Option value="86">+86</Select.Option>
    //     <Select.Option value="87">+87</Select.Option>
    //   </Select>,
    // );

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
                  rules: [{
                    required: true, message: 'Bio is required!',
                  }],
                })(
                  <Input.TextArea style={{ width: 200 }} />,
                )
              }
            </FormItem>
          </Col>
          <Col>
            <FormItem label="Hotline">
              {
                getFieldDecorator('phone', {
                  rules: [{
                    required: true, message: 'Hotline is required!',
                  }],
                })(
                  <Input
                    // addonBefore={prefixSelector}
                    style={{ width: '100%' }}
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
                  <Input />,
                )
              }
            </FormItem>
            <FormItem label="Number of member">
              {
                getFieldDecorator('participantNumber', {
                  rules: [{
                    required: true, message: 'Number of member is required!',
                  }],
                })(
                  <InputNumber min={1} />,
                )
              }
            </FormItem>
            <Row>
              <FormItem
                label="City and District"
              >
                {getFieldDecorator('cityDistrict', {
                  rules: [{ type: 'array', required: true, message: 'Please select City and District!' }],
                })(
                  <Cascader options={cityAndDistrictList} />,
                )}
              </FormItem>
            </Row>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" loading={submitting}>Save</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  cityAndDistrictList: state.generalReducer.cityAndDistrictList,
  formValues: state.accountReducer.account.account.brand,
  userAvatar: state.accountReducer.account.account.user.avatar,
  submitting: state.settingsReducer.brandInformation.submitting,
});

const mapDispatchToProps = {
  updateBrandInformationRequestAction: updateBrandInformationRequest,
};

export default compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps),
)(BrandInformation);
