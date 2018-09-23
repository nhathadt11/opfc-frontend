import React, { Component } from 'react';
import { Modal } from 'antd';
import CreateBrand from './CreateBrand';
import './CreateBrandModal.css';

class CreateBrandModal extends Component {
  state = {
    visible: true,
  }

  render() {
    const { visible } = this.state;

    return (
      <Modal
        title="Basic Modal"
        visible={visible}
        wrapClassName="opfc-create-brand-modal-container"
        style={{ width: 988 }}
        centered
        footer={null}
      >
        <CreateBrand />
      </Modal>
    );
  }
}

export default CreateBrandModal;
