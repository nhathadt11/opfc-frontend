import React from 'react';
import { Modal } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import Login from '../Login/Login';
import { hideLoginModal, showRoleChoiceModal } from '../../actions/modal';

const LoginModal = ({ visible, hideLoginModalAction, showRoleChoiceModalAction }) => (
  <Modal
    title="Login"
    footer={null}
    visible={visible}
    maskClosable
    centered
    width={350}
    onCancel={hideLoginModalAction}
  >
    <Login registerNow={showRoleChoiceModalAction} />
  </Modal>
);

LoginModal.propTypes = {
  visible: bool.isRequired,
  hideLoginModalAction: func.isRequired,
  showRoleChoiceModalAction: func.isRequired,
};

const mapStateToProps = state => ({
  visible: state.accountReducer.modal.loginModalVisible,
});

const mapDispatchToProps = {
  hideLoginModalAction: hideLoginModal,
  showRoleChoiceModalAction: showRoleChoiceModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(LoginModal);
