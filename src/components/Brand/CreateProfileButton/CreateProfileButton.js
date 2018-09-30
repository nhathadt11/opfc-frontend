import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'antd';
import CreateBrand from '../CreateBrand';

class CreateProfileButton extends Component {
  state = {
    visible: false,
  }

  showModal = () => this.setState({ visible: true })

  handleOk = () => this.setState({ visible: false })

  handleCancel = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state;

    return (
      <Fragment>
        <Button type="primary" size="large" onClick={this.showModal}>Create a Profile</Button>
        <Modal
          title="Basic Modal"
          visible={visible}
          wrapClassName="opfc-create-brand-modal-container"
          width={988}
          centered
          footer={null}
          onCancel={this.handleCancel}
        >
          <CreateBrand onSuccess={this.handleOk} />
        </Modal>
      </Fragment>
    );
  }
}

export default CreateProfileButton;
