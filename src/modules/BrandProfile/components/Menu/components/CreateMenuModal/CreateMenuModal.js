import React, { Component } from 'react';
import {
  Form, Input, InputNumber, Checkbox, Upload, Button, Icon, Select, Modal, Row, Col, message,
} from 'antd';
import {
  shape, func, bool, arrayOf,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map, filter, isEmpty } from 'lodash';
import './CreateMenuModal.css';
import { hideCreateMenuModal } from '../../../../actions/modals';
import { createMenuRequest } from '../../../../actions/menu';
import Api from '../../../../../../api/Api';

class CreateMenuModal extends Component {
  static propTypes = {
    form: shape({
      getFieldDecorator: func.isRequired,
    }).isRequired,
    visible: bool.isRequired,
    hideCreateMenuModalAction: func.isRequired,
    createMenuRequestAction: func.isRequired,
    selectedMenu: shape({}).isRequired,
    eventTypeList: arrayOf(shape({})).isRequired,
    categoryList: arrayOf(shape({})).isRequired,
    mealList: arrayOf(shape({})).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      uploadedFileList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { selectedMenu } = this.props;

    if (!isEmpty(nextProps.selectedMenu)) {
      this.setState({
        uploadedFileList: map(selectedMenu.photo, photo => ({
          uid: photo,
          name: 'photo',
          url: photo,
        })),
      });
    } else {
      this.setState({ uploadedFileList: [] });
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, selectedMenu } = this.props;

    if ((prevProps.visible !== visible) && (visible)) {
      this.setFormValues(selectedMenu);
    }
  }

  beforeUpload = () => false;

  customRequest = ({ file }) => {
    Api.uploadImage(file)
      .then(({ data }) => {
        this.setState(({ uploadedFileList }) => ({
          uploadedFileList: [
            ...uploadedFileList,
            { uid: data.secure_url, name: data.secure_url, url: data.secure_url },
          ],
        }));
      })
      .catch(this.handleUploadError);
  }

  handleOk = () => {
    const { form: { validateFieldsAndScroll }, createMenuRequestAction, selectedMenu } = this.props;
    const { uploadedFileList } = this.state;

    validateFieldsAndScroll((err, values) => {
      const toBeCreatedMenu = {
        ...selectedMenu,
        ...values,
        eventTypes: map(values.eventTypes, e => Number(e)),
        meals: map(values.meals, m => Number(m)),
        tags: map(values.tags, t => Number(t)),
        photos: uploadedFileList.map(f => f.url),
      };
      if (!err) createMenuRequestAction(toBeCreatedMenu, this.handleCancel);
    });
  }

  handleCancel = () => {
    const { hideCreateMenuModalAction } = this.props;
    hideCreateMenuModalAction();
    this.resetFormValues();
  }

  handleUploadError = () => {
    message.error('Could not upload image');
  }

  handleRemove = (_file) => {
    this.setState(({ uploadedFileList }) => ({
      uploadedFileList: filter(uploadedFileList, file => file.uid !== _file.uid),
    }));
  }

  setFormValues = (menu) => {
    const { form: { setFields } } = this.props;

    setFields({
      menuName: { value: menu.menuName, errors: null },
      description: { value: menu.description, errors: null },
      servingNumber: { value: menu.servingNumber, errors: null },
      price: { value: menu.price, errors: null },
      available: { value: menu.available, errors: null },
      eventTypeIds: { value: map(menu.eventTypeIds, id => id), errors: null },
      mealIds: { value: map(menu.mealIds, id => id), errors: null },
      categoryIds: { value: map(menu.categoryIds, id => id), errors: null },
    });
  }

  resetFormValues = () => {
    const { form: { resetFields } } = this.props;
    resetFields();
  }

  render() {
    const {
      form: { getFieldDecorator },
      visible,
      selectedMenu,
      eventTypeList,
      categoryList,
      mealList,
    } = this.props;
    const { uploadedFileList } = this.state;

    return (
      <Modal
        title={isEmpty(selectedMenu) ? 'Create new Menu' : 'Edit Menu'}
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
                  initialValue: selectedMenu.description,
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
              <Form.Item label="Meals">
                {getFieldDecorator('mealIds', {
                  rules: [{
                    required: true, message: 'Meals is required!',
                  }],
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                  >
                    {
                      map(
                        mealList,
                        m => <Select.Option key={m.id} value={m.id}>{m.mealName}</Select.Option>,
                      )
                    }
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="Event Types">
                {getFieldDecorator('eventTypeIds', {
                  rules: [{
                    required: true, message: 'Event Types is required!',
                  }],
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                  >
                    {
                      map(
                        eventTypeList,
                        t => <Select.Option key={t.id} value={t.id}>{t.eventTypeName}</Select.Option>, //eslint-disable-line
                      )
                    }
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="Categories">
                {
                  getFieldDecorator('categoryIds', {
                    rules: [{
                      required: true, message: 'Categories is required!',
                    }],
                  })(
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                    >
                      {map(categoryList, c => (
                        <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
                      ))}
                    </Select>,
                  )
                }
              </Form.Item>
              <Form.Item label="Images">
                <Upload
                  listType="picture"
                  className="opfc-create-menu-images"
                  customRequest={this.customRequest}
                  fileList={uploadedFileList}
                  onRemove={this.handleRemove}
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
  selectedMenu: state.brandProfileReducer.modal.selectedMenu,
  eventTypeList: state.generalReducer.eventTypeList,
  categoryList: state.generalReducer.categoryList,
  mealList: state.brandProfileReducer.brand.mealList,
});

const mapDispatchToProps = {
  hideCreateMenuModalAction: hideCreateMenuModal,
  createMenuRequestAction: createMenuRequest,
};

export default compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps),
)(CreateMenuModal);
