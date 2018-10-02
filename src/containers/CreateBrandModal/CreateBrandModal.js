import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { bool, func } from 'prop-types';
import CreateBrand from '../../components/Brand/CreateBrand';
import { hideBrandCreateModal } from '../../modules/Account/actions/modal';

const CreateBrandModal = ({ visible, hideModal }) => (
  <Modal
    visible={visible}
    onOk={hideModal}
    onCancel={hideModal}
    width={988}
    centered
    footer={null}
  >
    <CreateBrand onSuccess={hideModal} />
  </Modal>
);

CreateBrandModal.propTypes = {
  visible: bool.isRequired,
  hideModal: func.isRequired,
};

const mapStateToProps = state => ({
  visible: state.accountReducer.modal.brandModalVisible,
});

const mapDispatchToProps = {
  hideModal: hideBrandCreateModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(CreateBrandModal);
