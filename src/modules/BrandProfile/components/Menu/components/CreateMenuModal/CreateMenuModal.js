import React, { Component } from 'react';
import {
  Form, Input, InputNumber, Checkbox, Upload, Button, Icon, Select, Modal, Row, Col, message,
} from 'antd';
import { shape, func, bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './CreateMenuModal.css';
import { hideCreateMenuModal } from '../../../../actions/modals';
import { createMenuRequest } from '../../../../actions/menu';
import Api from '../../../../../../api/Api';

const tags = [
  { id: 1, name: 'Wedding' },
  { id: 2, name: 'Birthday' },
  { id: 3, name: 'Family' },
];

class CreateMenuModal extends Component {
  static propTypes = {
    form: shape({
      getFieldDecorator: func.isRequired,
    }).isRequired,
    visible: bool.isRequired,
    hideCreateMenuModalAction: func.isRequired,
    createMenuRequestAction: func.isRequired,
  }

  state = {
    uploadedFileList: [],
    uploading: {},
  }

  beforeUpload = () => false;

  customRequest = ({ file }) => {
    this.setState(({ uploading }) => ({
      uploading: { ...uploading, [file.uid]: true },
    }));

    Api.uploadImage(file)
      .then(({ data }) => {
        this.setState(({ uploadedFileList, uploading }) => ({
          uploadedFileList: [...uploadedFileList, data.secure_url],
          uploading: { ...uploading, [file.uid]: false },
        }));
      })
      .catch(this.handleUploadError);
  }

  getTagOptions = () => tags.map(tag => (
    <Select.Option key={tag.id}>{tag.name}</Select.Option>
  ))

  handleOk = () => {
    const { form: { validateFieldsAndScroll }, createMenuRequestAction } = this.props;
    const { uploadedFileList } = this.state;

    validateFieldsAndScroll((err, values) => {
      const toBeCreatedMenu = { ...values, photos: uploadedFileList };
      if (!err) createMenuRequestAction(toBeCreatedMenu, this.handleCancel);
    });
  }

  handleCancel = () => {
    const { hideCreateMenuModalAction } = this.props;
    hideCreateMenuModalAction();
  }

  handleUploadError = () => {
    message.error('Could not upload image');
  }

  render() {
    const { form: { getFieldDecorator }, visible } = this.props;

    return (
      <Modal
        title="Create new menu"
        visible={visible}
        centered
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={600}
      >
        <Form>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Menu name">
                {getFieldDecorator('menuName', {
                  rules: [{
                    required: true, message: 'Menu name is required!',
                  }],
                })(
                  <Input />,
                )}
              </Form.Item>
              <Form.Item label="Description">
                {getFieldDecorator('description', {
                  rules: [{
                    required: true, message: 'Description is required!',
                  }],
                })(
                  <Input.TextArea />,
                )}
              </Form.Item>
              <Form.Item label="Serving Number">
                {getFieldDecorator('servingNumber', {
                  rules: [{
                    required: true, message: 'Serving number is required!',
                  }],
                })(
                  <InputNumber />,
                )}
              </Form.Item>
              <Form.Item label="Price">
                {getFieldDecorator('price', {
                  rules: [{
                    required: true, message: 'Price is required!',
                  }],
                })(
                  <InputNumber />,
                )}
              </Form.Item>
              <Form.Item label="Available">
                {
                  getFieldDecorator('available')(<Checkbox defaultChecked />)
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Event Types">
                {getFieldDecorator('eventTypes', {
                  rules: [{
                    required: true, message: 'Event Types is required!',
                  }],
                })(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                  >
                    {this.getTagOptions()}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="Meals">
                {getFieldDecorator('meals', {
                  rules: [{
                    required: true, message: 'Meals is required!',
                  }],
                })(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                  >
                    {this.getTagOptions()}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="Tags">
                {
                  getFieldDecorator('tags')(
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                    >
                      {this.getTagOptions()}
                    </Select>,
                  )
                }
              </Form.Item>
              <Form.Item label="Images">
                <Upload
                  listType="picture"
                  className="opfc-create-menu-images"
                  customRequest={this.customRequest}
                >
                  <Button>
                    <Icon type="upload" /> Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.brandProfileReducer.modal.menuModalVisible,
});

const mapDispatchToProps = {
  hideCreateMenuModalAction: hideCreateMenuModal,
  createMenuRequestAction: createMenuRequest,
};

export default compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps),
)(CreateMenuModal);
